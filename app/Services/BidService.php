<?php

namespace App\Services;

use App\Enums\BidStatus;
use App\Events\BidAccepted;
use App\Models\Bid;
use App\Models\Project;
use App\Models\User;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Throwable;

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

        $acceptedBidExists = Bid::where('project_id', $data['project_id'])
            ->where('status', BidStatus::ACCEPTED->value)
            ->exists();

        if ($acceptedBidExists) {
            throw new Exception('Цей проєкт вже має прийняту ставку. Ви не можете створити нову.');
        }

        $existingBid = Bid::where('project_id', $data['project_id'])
            ->where('developer_id', Auth::id())
            ->exists();

        if ($existingBid) {
            throw new Exception('Ви вже залишили ставку на цей проєкт.');
        }

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
     * @throws Exception
     */
    public function deleteBid(string $bidId): ?bool
    {
        $bid = Bid::find($bidId);

        if (!$bid) {
            throw new Exception("Ставку не знайдено.");
        }

        if ($bid->status === BidStatus::ACCEPTED->value) {
            throw new Exception("Ви не можете видалити прийняту ставку.");
        }

        if ($bid->developer_id !== Auth::id()) {
            throw new Exception("Ви не маєте права видаляти цю ставку.");
        }

        return $bid->delete();
    }

    /**
     * Прийняти ставку.
     *
     * @param string $bidId
     * @return void
     * @throws Exception
     * @throws Throwable
     */
    public function acceptBid(string $bidId): void
    {
        $bid = Bid::findOrFail($bidId);

        $project = $bid->project;

        if (Auth::id() !== $project->client_id) {
            throw new Exception('Ви не можете прийняти цю ставку, оскільки не є автором проєкту.');
        }

        try {
            event(new BidAccepted($bid));
        } catch (Throwable $e) {
            throw $e;
        }
    }

}
