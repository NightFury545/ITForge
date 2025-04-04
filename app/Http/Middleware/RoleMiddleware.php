<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, $role)
    {
        if (!auth()->user() || auth()->user()->role !== $role) {
            return redirect('/');
        }

        return $next($request);
    }
}

