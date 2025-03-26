<?php

namespace App\Events;

use App\Models\Message;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcastNow
{
    use InteractsWithSockets, SerializesModels;

    /**
     * Створити новий екземпляр події.
     */
    public function __construct(public Message $message)
    {
    }

    /**
     * Канал трансляції.
     */
    public function broadcastOn(): array
    {
        return [new PrivateChannel('chat.' . $this->message->chat_id)];
    }

    /**
     * Ім'я події для фронтенду.
     */
    public function broadcastAs(): string
    {
        return 'message.sent';
    }

    /**
     * Авторизація на каналі.
     *
     * @return array
     */
    public function broadcastWith(): array
    {
        return [
            ...$this->message->toArray(),
            'sender_name' => $this->message->sender->name,
            'avatar' => $this->message->sender->avatar,
        ];
    }
}
