<?php

namespace App\Services;

use App\Models\Chat;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use InvalidArgumentException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class ChatService
{
    /**
     * Створити новий чат між авторизованим користувачем і іншим користувачем.
     *
     * @throws Exception
     */
    public function createChat(string $developerId): Chat
    {
        $authUserId = Auth::id();

        if ($authUserId === $developerId) {
            throw new Exception('Ви не можете створити чат із самим собою.');
        }

        $existingChat = Chat::where(function ($query) use ($authUserId, $developerId) {
            $query->where('client_id', $authUserId)->where('developer_id', $developerId);
        })->orWhere(function ($query) use ($authUserId, $developerId) {
            $query->where('client_id', $developerId)->where('developer_id', $authUserId);
        })->first();

        if ($existingChat) {
            return $existingChat;
        }

        return Chat::create([
            'client_id' => $authUserId,
            'developer_id' => $developerId,
            'last_message' => null,
            'last_message_at' => null,
        ]);
    }

    /**
     * Видалити чат.
     */
    public function deleteChat(string $chatId): void
    {
        $chat = Chat::find($chatId);

        if (!$chat) {
            throw new ModelNotFoundException('Чат не знайдено.');
        }

        $this->authorizeChatAccess($chat);
        $chat->delete();
    }

    /**
     * Отримати всі чати користувача.
     */
    public function getUserChats()
    {
        $userId = Auth::id();

        return Chat::where('client_id', $userId)
            ->orWhere('developer_id', $userId)
            ->with([
                'client' => function ($query) {
                    $query->select('id', 'name', 'avatar');
                },
                'developer' => function ($query) {
                    $query->select('id', 'name', 'avatar');
                }
            ])
            ->orderByDesc('last_message_at')
            ->get()
            ->map(function ($chat) use ($userId) {
                if ($chat->client_id === $userId) {
                    $chat->name = $chat->developer->name;
                    $chat->avatar = $chat->developer->avatar;
                } else {
                    $chat->name = $chat->client->name;
                    $chat->avatar = $chat->client->avatar;
                }

                unset($chat->client, $chat->developer);

                return $chat;
            });
    }



    /**
     * Отримати конкретний чат разом із повідомленнями.
     */
    public function getChat(string $chatId)
    {
        $userId = Auth::id();
        $chat = Chat::find($chatId);

        if (!$chat) {
            throw new ModelNotFoundException('Чат не знайдено.');
        }

        $this->authorizeChatAccess($chat);

        $chat->load([
            'client',
            'developer',
            'messages' => function ($query) {
                $query->select([
                    'messages.*',
                    'users.name as sender_name',
                    'users.avatar'
                ])
                    ->leftJoin('users', 'messages.sender_id', '=', 'users.id')
                    ->orderBy('messages.created_at', 'asc');
            }




        ]);

        if ($chat->client_id === $userId) {
            $chat->name = $chat->developer->name;
            $chat->avatar = $chat->developer->avatar;
        } else {
            $chat->name = $chat->client->name;
            $chat->avatar = $chat->client->avatar;
        }

        unset($chat->client, $chat->developer);

        return $chat;
    }


    /**
     * Перевірити, чи користувач має доступ до чату.
     */
    private function authorizeChatAccess(Chat $chat): void
    {
        $userId = Auth::id();

        if ($chat->client_id !== $userId && $chat->developer_id !== $userId) {
            throw new AccessDeniedHttpException('Ви не маєте доступу до цього чату.');
        }
    }
}
