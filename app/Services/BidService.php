<?php

namespace App\Services;

use App\Models\Bid;
use App\Models\Project;
use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class BidService
{
    /**
     * Отримати список ставок для проєкту разом із іменами девелоперів.
     *
     * @param int $projectId
     * @return Collection
     */
    public function getBids(int $projectId): Collection
    {
        return Bid::where('project_id', $projectId)
            ->join('users', 'bids.developer_id', '=', 'users.id')
            ->orderBy('bids.created_at', 'desc')
            ->get(['bids.*', 'users.name as developer_name']);
    }

    /**
     * Отримати конкретну ставку за її ID разом із іменем девелопера.
     *
     * @param string $bidId
     * @return Bid|null
     */
    public function getBidById(string $bidId): ?Bid
    {
        return Bid::where('bids.id', $bidId)
            ->join('users', 'bids.developer_id', '=', 'users.id')
            ->first(['bids.*', 'users.name as developer_name']);
    }

    /**
     * @throws Exception
     */
    public function createBid(array $data): Bid
    {
        $project = Project::findOrFail($data['project_id']);

        if (Auth::id() === $project->client_id) {
            throw new Exception('Ви не можете залишити ставку, оскільки ви є власником проєкту.');
        }

        // Перевірка чи користувач вже залишив ставку на цей проєкт
        $existingBid = Bid::where('project_id', $data['project_id'])
            ->where('developer_id', Auth::id())
            ->exists();

        if ($existingBid) {
            throw new Exception('Ви вже залишили ставку на цей проєкт.');
        }

        // Створюємо нову ставку
        return Bid::create([
            'amount' => $data['amount'],
            'proposal' => $data['proposal'],
            'project_id' => $data['project_id'],
            'developer_id' => Auth::id(),
        ]);
    }



    /**
     * Оновити ставку за її ID.
     *
     * @param string $bidId
     * @param array $data
     * @return bool
     */
    public function updateBid(string $bidId, array $data): bool
    {
        return Bid::where('id', $bidId)->update($data);
    }

    /**
     * Видалити ставку за її ID.
     *
     * @param string $bidId
     * @return bool|null
     */
    public function deleteBid(string $bidId): ?bool
    {
        return Bid::where('id', $bidId)->delete();
    }
}
