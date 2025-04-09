<?php

namespace App\Http\Controllers;

use App\Services\ContractService;
use Exception;
use Illuminate\Http\JsonResponse;

class ContractController extends Controller
{
    protected ContractService $contractService;

    public function __construct(ContractService $contractService)
    {
        $this->contractService = $contractService;
    }

    public function complete(string $contractId): JsonResponse
    {
        try {
            $this->contractService->complete($contractId);

            return response()->json([
                'message' => 'Контракт успішно завершено та кошти перераховано'
            ]);
        } catch (Exception $e) {
            $statusCode = $e->getCode() >= 400 && $e->getCode() < 500 ? $e->getCode() : 500;
            return response()->json(['error' => $e->getMessage()], $statusCode);
        }
    }

    public function cancel(string $contractId): JsonResponse
    {
        try {
            $this->contractService->cancel($contractId);

            return response()->json(['message' => 'Контракт скасовано']);
        } catch (Exception $e) {
            $statusCode = $e->getCode() >= 400 && $e->getCode() < 500 ? $e->getCode() : 500;
            return response()->json(['error' => $e->getMessage()], $statusCode);
        }
    }
}
