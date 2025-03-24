<?php

namespace App\Http\Controllers;

use App\Http\Requests\Chat\CreateChatRequest;
use App\Services\ChatService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ChatController extends Controller
{
    public function __construct(private readonly ChatService $chatService)
    {
    }

    /**
     * Відобразити список чатів користувача.
     */
    public function index(): Response
    {
        $chats = $this->chatService->getUserChats();

        return Inertia::render('chats', [
            'chats' => $chats,
        ]);
    }

    /**
     * Створити новий чат.
     */
    public function store(CreateChatRequest $request): RedirectResponse
    {
        $this->chatService->createChat($request->validated()['developer_id']);

        return to_route('chats.index')->with('success', 'Чат створено успішно!');
    }

    /**
     * Відобразити конкретний чат із повідомленнями.
     */
    public function show(string $chatId): Response
    {
        $chat = $this->chatService->getChat($chatId);

        return Inertia::render('chat', [
            'chat' => $chat,
        ]);
    }


    /**
     * Видалити чат.
     */
    public function destroy(string $chatId): RedirectResponse
    {
        $this->chatService->deleteChat($chatId);
        return to_route('chats.index')->with('success', 'Чат успішно видалено!');
    }
}
