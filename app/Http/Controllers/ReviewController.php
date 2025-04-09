<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Services\ReviewService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function __construct(private readonly ReviewService $reviewService)
    {
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'contract_id' => 'required|string|exists:contracts,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:256',
        ]);

        try {
            $review = $this->reviewService->createReview($validated);

            return response()->json([
                'message' => 'Відгук успішно створено.',
                'review' => $review
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function index(): JsonResponse
    {
        $reviews = Review::with(['contract', 'client'])->latest()->get();

        return response()->json($reviews);
    }
}
