<?php

namespace App\Listeners;

use App\Enums\BidStatus;
use App\Enums\ContractStatus;
use App\Enums\ProjectStatus;
use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Events\BidAccepted;
use App\Models\Bid;
use App\Models\Contract;
use App\Models\Transaction;
use App\Notifications\ContractCreatedNotification;
use Exception;
use Illuminate\Support\Facades\DB;

class CreateContract
{
    public function handle(BidAccepted $event): void
    {
        DB::transaction(function () use ($event) {
            $bid = $event->bid;

            if ($bid->status !== 'accepted') {
                return;
            }

            if (Contract::where('project_id', $bid->project_id)->exists()) {
                return;
            }

            $project = $bid->project;
            $client = $project->client;

            if ($client->wallet->balance < $bid->amount) {
                $bid->update(['status' => BidStatus::Pending->value]);
                throw new Exception('Недостатньо коштів для створення контракту.');
            }

            Bid::where('project_id', $project->id)
                ->where('id', '!=', $bid->id)
                ->update(['status' => BidStatus::Rejected->value]);

            $client->wallet->decrement('balance', $bid->amount);

            $contract = Contract::create([
                'project_id' => $project->id,
                'client_id' => $client->id,
                'developer_id' => $bid->developer_id,
                'amount' => $bid->amount,
                'status' => ContractStatus::Active->value,
            ]);

            Transaction::create([
                'user_id' => $client->id,
                'contract_id' => $contract->id,
                'type' => TransactionType::Payment->value,
                'amount' => $bid->amount,
                'status' => TransactionStatus::Pending->value,
                'method' => 'balance',
            ]);

            $project->update(['status' => ProjectStatus::IN_PROGRESS->value]);

            $bid->developer->notify(new ContractCreatedNotification($contract));
        });
    }
}
