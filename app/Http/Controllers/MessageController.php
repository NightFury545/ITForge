<?php

namespace App\Http\Controllers;

use App\Http\Requests\Message\CreateMessageRequest;
use App\Services\MessageService;
use Exception;
use Illuminate\Http\JsonResponse;

class MessageController extends Controller
{
    public function __construct(private MessageService $messageService)
    {
    }

    /**
     * Надіслати нове повідомлення.
     */
    public function store(CreateMessageRequest $request)
    {
        try {
            $message = $this->messageService->sendMessage($request->validated());

            return response()->json([
                'message' => $message,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Отримати повідомлення для певного чату.
     */
    public function index(Request $request, int $chatId): JsonResponse
    {
        try {
            $perPage = $request->get('per_page', 20);

            $messages = $this->messageService->getMessages($chatId, $perPage);

            return response()->json([
                'messages' => $messages,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }
}
