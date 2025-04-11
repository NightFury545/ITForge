<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function __construct(private UserService $userService)
    {
    }

    /**
     * Повертає сторінку зі списком користувачів через Inertia
     */
    public function index(Request $request): Response
    {
        $users = $this->userService->getUsers();

        return Inertia::render('developers', [
            'users' => $users
        ]);
    }

    /**
     * Повертає сторінку профілю конкретного користувача
     */
    public function show(string $name): Response
    {
        $user = $this->userService->getUserByName($name);

        if (!$user) {
            abort(404, 'User not found');
        }

        return Inertia::render('user-details', [
            'user' => $user
        ]);
    }

    /**
     * Видаляє користувача за айді
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);

        if (Auth::id() !== $user->id) {
            $user->delete();
            return redirect()->back()->with('success', 'Користувача успішно видалено.');
        }
        return redirect()->back()->with('error', 'Ви не можете видалити самого себе.');
    }

    /**
     * Редагує користувача за айді
     */
    public function edit(Request $request, string $id): RedirectResponse
    {
        $user = User::findOrFail($id);

        $user->update([
            'name' => $request->input('name') ?? $user->name,
            'role' => $request->input('role') ?? $user->role,
            'type' => $request->input('type') ?? $user->type,
        ]);

        return redirect()->back()->with('success', 'Користувача успішно оновлено.');
    }
}
