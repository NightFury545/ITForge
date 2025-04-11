<?php

namespace App\Http\Controllers;

use App\Http\Requests\Message\CreateMessageRequest;
use App\Models\Message;
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

            $messages = $this->messageService->getMessages($chatId);

            return response()->json([
                'messages' => $messages,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Видаляє користувача за айді
     */
    public function destroy(string $id)
    {
        $message = Message::findOrFail($id);

        $message->delete();

        return redirect()->back()->with('success', 'Повідомлення успішно видалено.');
    }
}
