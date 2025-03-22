<?php

namespace App\Http\Controllers;

use App\Enums\TransactionType;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DepositController extends Controller
{
    /**
     * Показати сторінку поповнення балансу.
     */
    public function index(): Response
    {
        return Inertia::render('deposit', [
            'balance' => Auth::user()->wallet->balance,
        ]);
    }

    /**
     * Обробка поповнення балансу.
     */
    public function store(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1',
            'method' => 'required|in:paypal,stripe,crypto',
        ]);

        $user = Auth::user();
        $amount = $request->input('amount');
        $method = $request->input('method');

        DB::transaction(function () use ($user, $amount, $method) {
            $user->wallet->balance += $amount;
            $user->wallet->save();

            Transaction::create([
                'user_id' => $user->id,
                'amount' => $amount,
                'method' => $method,
                'status' => 'completed',
                'type' => TransactionType::Deposit->value,
            ]);
        });

        return redirect()->route('deposit.index')->with('success', 'Баланс успішно поповнено!');
    }
}
