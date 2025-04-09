<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Notification;
use App\Models\Contract;

class NotificationsController extends Controller
{
    /**
     * Отримати сповіщення про контракти для поточного користувача
     */
    public function getNotifications(Request $request): JsonResponse
    {
        $user = $request->user();

        $notifications = $user->notifications()
            ->where('type', 'App\Notifications\ContractCreatedNotification')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($notification) {
                $contract = Contract::with(['project'])->findOrFail($notification->data['contract_id']);

                return [
                    'id' => $notification->id,
                    'project' => [
                        'title' => $contract->project->title,
                        'client' => $contract->project->client,
                    ],
                    'message' => $notification->data['message'],
                    'amount' => $contract->amount,
                    'created_at' => $notification->created_at->toDateTimeString(),
                    'is_read' => $notification->read_at !== null,
                    'contract' => $contract,
                    'bid' => [
                        'amount' => $contract->amount,
                        'developer_name' => $contract->developer->name,
                        'developer_avatar' => $contract->developer->avatar,
                    ]
                ];
            });

        $unreadCount = $user->unreadNotifications()
            ->where('type', 'App\Notifications\ContractCreatedNotification')
            ->count();

        return response()->json([
            'contracts' => $notifications,
            'unread_count' => $unreadCount,
        ]);
    }

    /**
     * Позначити сповіщення як прочитані
     */
    public function markAsRead(Request $request)
    {
        $user = $request->user();

        $user->unreadNotifications()
            ->where('type', 'App\Notifications\ContractCreatedNotification')
            ->update(['read_at' => now()]);

        return response()->json(['success' => true]);
    }

    /**
     * Видалити сповіщення
     */
    public function deleteNotification($id)
    {
        $notification = Auth::user()->notifications()->findOrFail($id);
        $notification->delete();

        return response()->json(['success' => true]);
    }
}
