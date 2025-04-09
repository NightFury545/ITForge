<?php

namespace App\Services;

use App\Enums\BidStatus;
use App\Enums\ContractStatus;
use App\Enums\ProjectStatus;
use App\Enums\TransactionStatus;
use App\Models\Bid;
use App\Models\Contract;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ContractService
{
    public function complete(string $contractId): void
    {
        DB::beginTransaction();

        try {
            $contract = Contract::with(['client', 'developer', 'transaction'])
                ->findOrFail($contractId);

            if (Auth::id() !== $contract->project->client_id) {
                throw new Exception('Лише клієнт може завершити контракт', 403);
            }

            if ($contract->status !== ContractStatus::Active->value) {
                throw new Exception('Контракт має бути активним для завершення', 400);
            }

            $contract->update(['status' => ContractStatus::Completed->value]);

            if ($contract->transaction) {
                $contract->transaction->update([
                    'status' => TransactionStatus::Completed->value
                ]);

                $contract->project->update([
                    'status' => ProjectStatus::COMPLETED->value
                ]);

                $developer = $contract->developer;
                $developer->wallet->increment('balance', $contract->amount);
            }

            DB::commit();

        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function cancel(string $contractId): void
    {
        DB::beginTransaction();

        try {
            $contract = Contract::with(['client', 'developer', 'transaction'])
                ->findOrFail($contractId);

            if (Auth::id() !== $contract->client_id && Auth::id() !== $contract->developer_id) {
                throw new Exception('Ви не можете скасувати цей контракт', 403);
            }

            if ($contract->status !== 'active') {
                throw new Exception('Контракт має бути активним для скасування', 400);
            }

            $contract->update(['status' => ContractStatus::Canceled->value]);

            if ($contract->transaction) {
                $contract->transaction->update([
                    'status' => TransactionStatus::Failed->value
                ]);

                $contract->project->update([
                    'status' => ProjectStatus::OPEN->value
                ]);

                Bid::where('project_id', $contract->project_id)
                    ->update(['status' => BidStatus::Pending->value]);

                $client = $contract->client;
                $client->wallet->increment('balance', $contract->amount);
            }

            DB::commit();

        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
