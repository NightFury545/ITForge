<?php

namespace App\Services;

use App\Models\Chat;
use App\Models\Message;
use App\Events\MessageSent;
use Exception;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class MessageService
{
    /**
     * Створити нове повідомлення в чаті та оновити інформацію про останнє повідомлення в чаті.
     *
     * @throws Exception
     */
    public function sendMessage(array $data)
    {
        $chat = Chat::find($data['chat_id']);

        if (!$chat) {
            throw new ModelNotFoundException('Чат не знайдено.');
        }

        $user = Auth::user();

        if ($chat->client_id !== $user->id && $chat->developer_id !== $user->id) {
            throw new Exception('Ви не маєте дозволу надсилати повідомлення в цьому чаті.');
        }

        // Створюємо повідомлення
        $message = Message::create([
            'chat_id' => $data['chat_id'],
            'sender_id' => $user->id,
            'message' => $data['message'],
        ]);

        // Оновлюємо дані про останнє повідомлення в чаті
        $chat->update([
            'last_message' => $message->message,
            'last_message_at' => now(),
        ]);

        // Відправляємо подію
        broadcast(new MessageSent($message));

        return $message;
    }

    /**
     * Отримати повідомлення для певного чату з пагінацією.
     *
     * @param int $chatId
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function getMessages(int $chatId, int $perPage = 20): LengthAwarePaginator
    {
        $chat = Chat::find($chatId);

        if (!$chat) {
            throw new ModelNotFoundException('Чат не знайдено.');
        }

        // Перевірка, чи має користувач доступ до чату
        $user = Auth::user();

        if ($chat->client_id !== $user->id && $chat->developer_id !== $user->id) {
            throw new Exception('Ви не маєте доступу до цього чату.');
        }

        // Отримуємо повідомлення для чату з пагінацією
        return Message::where('chat_id', $chatId)
            ->orderBy('created_at', 'asc')
            ->paginate($perPage);
    }
}
