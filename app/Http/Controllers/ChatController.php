<?php

namespace App\Http\Controllers;

use App\Http\Requests\Chat\CreateChatRequest;
use App\Services\ChatService;
use Exception;
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
        try {
            $chat = $this->chatService->createChat($request->validated()['developer_id']);

            if ($chat->wasRecentlyCreated) {
                return to_route('chats.show', ['chatId' => $chat->id])->with('success', 'Чат створено успішно!');
            } else {
                return to_route('chats.show', ['chatId' => $chat->id]);
            }

        } catch (Exception $e) {
            return back()->withErrors(['error' => 'Не вдалося створити чат: ' . $e->getMessage()]);
        }
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
