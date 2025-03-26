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
     * Створити нове повідомлення в чаті та оновити інформацію про останнє повідомлення.
     *
     * @throws Exception
     */
    public function sendMessage(array $data)
    {
        // Знаходимо чат або кидаємо помилку
        $chat = Chat::where('id', $data['chat_id'])->firstOrFail();
        $user = Auth::user();

        // Перевіряємо, чи користувач має доступ до чату
        if ($user->isNot($chat->client) && $user->isNot($chat->developer)) {
            throw new Exception('Ви не маєте дозволу надсилати повідомлення в цьому чаті.');
        }

        // Створюємо повідомлення
        $message = new Message();
        $message->fill([
            'chat_id' => $data['chat_id'],
            'sender_id' => $user->id,
            'message' => $data['message'],
        ]);
        $message->save();

        // Оновлюємо дані про останнє повідомлення в чаті без виклику подій
        $chat->updateQuietly([
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
     * @return LengthAwarePaginator
     * @throws Exception
     */
    public function getMessages(int $chatId): LengthAwarePaginator
    {
        // Перевіряємо, чи існує чат
        if (!Chat::where('id', $chatId)->exists()) {
            throw new ModelNotFoundException('Чат не знайдено.');
        }

        $user = Auth::user();
        $chat = Chat::select(['client_id', 'developer_id'])->where('id', $chatId)->first();

        if ($user->isNot($chat->client) && $user->isNot($chat->developer)) {
            throw new Exception('Ви не маєте доступу до цього чату.');
        }

        return Message::select(['id', 'chat_id', 'sender_id', 'message', 'created_at'])
            ->where('chat_id', $chatId)
            ->orderBy('created_at', 'asc')
            ->get();
    }
}
