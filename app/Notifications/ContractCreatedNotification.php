<?php

namespace App\Notifications;

use App\Models\Contract;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class ContractCreatedNotification extends Notification
{
    use Queueable;

    public function __construct(public Contract $contract)
    {
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'message' => 'Вашу ставку прийнято. Створено контракт на проєкт "' . $this->contract->project->title . '".',
            'contract_id' => $this->contract->id,
            'project_id' => $this->contract->project_id,
            'contract' => $this->contract,
        ];
    }
}
