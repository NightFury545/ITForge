<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;
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

        return Inertia::render('Users/Index', [
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

        return Inertia::render('Users/Show', [
            'user' => $user
        ]);
    }
}
