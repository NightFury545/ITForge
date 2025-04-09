<?php

namespace App\Services;

use App\Enums\ContractStatus;
use App\Models\Contract;
use App\Models\Review;
use Illuminate\Support\Facades\Auth;
use Exception;

class ReviewService
{
    /**
     * Створює відгук, якщо користувач має право
     *
     * @param array $data
     * @return Review
     * @throws Exception
     */
    public function createReview(array $data): Review
    {
        $user = Auth::user();
        $contract = Contract::findOrFail($data['contract_id']);

        if ($contract->client_id !== $user->id && $contract->developer_id !== $user->id) {
            throw new Exception('Ви не маєте права залишати відгук до цього контракту.');
        }

        if ($contract->status !== ContractStatus::Completed->value) {
            throw new Exception('Відгук можна залишити лише після завершення контракту.');
        }

        $existingReview = Review::where('contract_id', $contract->id)
            ->where('client_id', $user->id)
            ->first();

        if ($existingReview) {
            throw new Exception('Ви вже залишили відгук до цього контракту.');
        }

        return Review::create([
            'contract_id'  => $contract->id,
            'client_id'    => $user->id,
            'rating'       => $data['rating'],
            'comment'      => $data['comment'],
        ]);
    }
}
