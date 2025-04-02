<?php

namespace App\Http\Controllers;

use App\Enums\ProjectStatus;
use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Models\Chat;
use App\Models\Project;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $siteStats = [
            'totalUsers' => User::count(),
            'totalProjects' => Project::count(),
            'totalChats' => Chat::count(),
            'totalTransactions' => Transaction::count(),
            'newUsersLastWeek' => User::where('created_at', '>=', Carbon::now()->subWeek())->count(),
            'totalDeposits' => Transaction::where('type', TransactionType::Deposit->value)
                ->where('status', TransactionStatus::Completed->value)
                ->sum('amount'),
            'totalPayments' => Transaction::where('type', TransactionType::Payment->value)
                ->where('status', TransactionStatus::Completed->value)
                ->sum('amount'),
            'totalWithdrawals' => Transaction::where('type', TransactionType::Withdraw->value)
                ->where('status', TransactionStatus::Completed->value)
                ->sum('amount'),
            'pendingWithdrawals' => Transaction::where('type', TransactionType::Withdraw->value)
                ->where('status', 'pending')
                ->sum('amount'),
            'inProgressProjects' => Project::where('status', ProjectStatus::IN_PROGRESS->value)->count(),
            'openedProjects' => Project::where('status', ProjectStatus::OPEN->value)->count(),
            'completedProjects' => Project::where('status', ProjectStatus::COMPLETED->value)->count(),
            'projectsCreatedOverTime' => Project::selectRaw('DATE(created_at) as date, count(*) as projects')
                ->groupBy('date')
                ->orderBy('date', 'asc')
                ->get()
                ->map(function ($item) {
                    return [
                        'date' => $item->date,
                        'projects' => $item->projects
                    ];
                }),
        ];

        // Дані профілю користувача
        $profile = [
            'position' => $user->user_type ?? 'Developer',
            'skills' => $user->skills ?? [],
            'walletBalance' => $user->wallet->balance ?? 0,
            'earnings' => [
                'total' => $user->transactions()
                    ->where('type', 'deposit')
                    ->where('status', TransactionStatus::Completed->value)
                    ->sum('amount'),
                'pending' => $user->transactions()
                    ->where('type', 'deposit')
                    ->where('status', TransactionStatus::Pending->value)
                    ->sum('amount'),
                'lastMonth' => $user->transactions()
                    ->where('type', 'deposit')
                    ->where('status', TransactionStatus::Completed->value)
                    ->where('created_at', '>=', Carbon::now()->subMonth())
                    ->sum('amount'),
            ],
            'currentProjects' => $user->projects()
                ->get()
                ->map(function ($project) {
                    return [
                        'id' => $project->id,
                        'name' => $project->title,
                        'status' => $project->status,
                        'budget' => $project->budget,
                    ];
                })
                ->toArray()
        ];

        // Проекти, де користувач є клієнтом
        $projects = $user->projects()
            ->orderBy('created_at', 'asc')
            ->get()
            ->map(function ($project) {
                return [
                    'id' => $project->id,
                    'title' => $project->title,
                    'status' => $project->status,
                    'budget' => $project->budget,
                    'deadline' => $project->project_deadline,
                ];
            })
            ->toArray();

        // Ставки користувача (якщо він розробник)
        $bids = $user->bids()
            ->with('project')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($bid) {
                return [
                    'id' => $bid->id,
                    'project_id' => $bid->project_id,
                    'project_title' => $bid->project->title,
                    'amount' => $bid->amount,
                    'status' => $bid->status,
                    'created_at' => $bid->created_at,
                ];
            })
            ->toArray();

        // Контракти користувача
        $contracts = $user->contracts()
            ->with('project')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($contract) {
                return [
                    'id' => $contract->id,
                    'project_id' => $contract->project_id,
                    'project_title' => $contract->project->title,
                    'amount' => $contract->amount,
                    'status' => $contract->status,
                    'created_at' => $contract->created_at,
                ];
            })
            ->toArray();

        // Транзакції користувача
        $transactions = $user->transactions()
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($transaction) {
                return [
                    'id' => $transaction->id,
                    'type' => $transaction->type,
                    'amount' => $transaction->amount,
                    'status' => $transaction->status,
                    'created_at' => $transaction->created_at,
                ];
            })
            ->toArray();

        return inertia('dashboard', [
            'siteStats' => $siteStats,
            'profile' => $profile,
            'projects' => $projects,
            'bids' => $bids,
            'contracts' => $contracts,
            'transactions' => $transactions,
        ]);
    }
}
