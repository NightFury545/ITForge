<?php

namespace App\Events;

use App\Models\Message;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
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
            'message' => $this->message->message,
            'sender_id' => $this->message->sender_id,
            'chat_id' => $this->message->chat_id,
        ];
    }
}
