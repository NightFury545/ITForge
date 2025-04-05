<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use Stripe\Exception\ApiErrorException;

class DepositController extends Controller
{
    /**
     * Показати сторінку поповнення балансу.
     */
    public function index(): Response
    {
        return Inertia::render('deposit', [
            'stripeKey' => config('services.stripe.key')
        ]);
    }

    /**
     * Обробка платежу через Stripe.
     */
    public function createPaymentIntent(Request $request): JsonResponse
    {
        $request->validate([
            'amount' => 'required|numeric|min:1|max:10000',
        ]);

        try {
            Stripe::setApiKey(config('services.stripe.secret'));

            $paymentIntent = PaymentIntent::create([
                'amount' => $request->amount * 100,
                'currency' => 'usd',
            ]);

            return response()->json([
                'clientSecret' => $paymentIntent->client_secret,
                'paymentIntentId' => $paymentIntent->id
            ]);
        } catch (ApiErrorException $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Підтвердження транзакції після успішного платежу.
     */
    public function confirmTransaction(Request $request): JsonResponse
    {
        $request->validate([
            'payment_intent_id' => 'required|string',
            'amount' => 'required|numeric|min:1',
        ]);

        try {
            Stripe::setApiKey(config('services.stripe.secret'));
            $paymentIntent = PaymentIntent::retrieve($request->payment_intent_id);

            if ($paymentIntent->status !== 'succeeded') {
                throw new Exception('Payment not completed');
            }

            $user = Auth::user();
            $amount = $request->amount;

            DB::transaction(function () use ($user, $amount, $paymentIntent) {
                $user->wallet->balance += $amount;
                $user->wallet->save();

                Transaction::create([
                    'user_id' => $user->id,
                    'amount' => $amount,
                    'method' => 'stripe',
                    'status' => 'completed',
                    'type' => 'deposit',
                ]);
            });

            return response()->json([
                'success' => true,
                'message' => 'Баланс успішно поповнено!',
                'newBalance' => $user->wallet->balance
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
