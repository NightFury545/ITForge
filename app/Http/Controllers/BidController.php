<?php

namespace App\Http\Controllers;

use App\Http\Requests\Bid\CreateBidRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Services\BidService;
use App\Models\Bid;
use Inertia\Inertia;
use Inertia\Response;

class BidController extends Controller
{
    private BidService $bidService;

    public function __construct(BidService $bidService)
    {
        $this->bidService = $bidService;
    }

    /**
     * Отримати всі ставки для конкретного проєкту.
     *
     * @param int $projectId
     * @return Response
     */
    public function index(int $projectId)
    {
        $bids = $this->bidService->getBids($projectId);

        return Inertia::render('Bids/Index', [
            'bids' => $bids,
        ]);
    }

    /**
     * Отримати конкретну ставку за її ID.
     *
     * @param string $bidId
     * @return JsonResponse
     */
    public function show(string $bidId)
    {
        $bid = $this->bidService->getBidById($bidId);

        if (!$bid) {
            return response()->json(['error' => 'Bid not found'], 404);
        }

        return response()->json($bid);
    }

    /**
     * Створити нову ставку.
     */
    public function store(CreateBidRequest $request): RedirectResponse
    {
        try {
            $this->bidService->createBid($request->validated());

            return redirect()->route('projects.show', $request->project_id)
                ->with('success', 'Ставка успішно додана.');
        } catch (\Exception $e) {
            return redirect()->route('projects.show', $request->project_id)
                ->withErrors(['error' => 'Не вдалося додати ставку: ' . $e->getMessage()]);
        }
    }


    /**
     * Оновити ставку.
     *
     * @param Request $request
     * @param string $bidId
     * @return JsonResponse
     */
    public function update(Request $request, string $bidId)
    {
        $data = $request->validate([
            'amount' => 'sometimes|numeric',
            'proposal' => 'sometimes|string',
            'status' => 'sometimes|string',
        ]);

        $updated = $this->bidService->updateBid($bidId, $data);

        if (!$updated) {
            return response()->json(['error' => 'Bid not found or not updated'], 404);
        }

        return response()->json(['message' => 'Bid updated successfully']);
    }

    /**
     * Видалити ставку.
     *
     * @param string $bidId
     * @return JsonResponse
     */
    public function destroy(string $bidId)
    {
        $deleted = $this->bidService->deleteBid($bidId);

        if (!$deleted) {
            return response()->json(['error' => 'Bid not found'], 404);
        }

        return response()->json(['message' => 'Bid deleted successfully']);
    }
}
