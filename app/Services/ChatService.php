<?php

namespace App\Services;

use App\Models\Chat;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use InvalidArgumentException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class ChatService
{
    /**
     * Створити новий чат між авторизованим користувачем і іншим користувачем.
     */
    public function createChat(string $developerId): Chat
    {
        $authUserId = Auth::id();

        if ($authUserId === $developerId) {
            throw new InvalidArgumentException('Ви не можете створити чат із самим собою.');
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
    public function deleteChat(int $chatId): void
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
                    $query->select('id', 'name', 'avatar'); // Вибираємо тільки необхідні поля для клієнта
                },
                'developer' => function ($query) {
                    $query->select('id', 'name', 'avatar'); // Вибираємо тільки необхідні поля для розробника
                }
            ])
            ->orderByDesc('last_message_at')
            ->get()
            ->map(function ($chat) use ($userId) {
                // Якщо поточний користувач — клієнт, беремо розробника
                if ($chat->client_id === $userId) {
                    $chat->name = $chat->developer->name;
                    $chat->avatar = $chat->developer->avatar;
                } else {
                    // Якщо поточний користувач — розробник, беремо клієнта
                    $chat->name = $chat->client->name;
                    $chat->avatar = $chat->client->avatar;
                }

                // Видаляємо непотрібні дані про поточного користувача
                unset($chat->client, $chat->developer);

                return $chat;
            });
    }



    /**
     * Отримати конкретний чат разом із повідомленнями.
     */
    public function getChat(int $chatId, int $limit = 20)
    {
        $chat = Chat::find($chatId);

        if (!$chat) {
            throw new ModelNotFoundException('Чат не знайдено.');
        }

        $this->authorizeChatAccess($chat);

        return $chat->load([
            'client',
            'developer',
            'messages' => function ($query) use ($limit) {
                $query->orderBy('created_at', 'desc')->limit($limit);
            }
        ]);
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
