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
            'totalDeposits' => Transaction::where('type', TransactionType::DEPOSIT->value)
                ->where('status', TransactionStatus::COMPLETED->value)
                ->sum('amount'),
            'totalPayments' => Transaction::where('type', TransactionType::PAYMENT->value)
                ->where('status', TransactionStatus::COMPLETED->value)
                ->sum('amount'),
            'totalWithdrawals' => Transaction::where('type', TransactionType::WITHDRAW->value)
                ->where('status', TransactionStatus::COMPLETED->value)
                ->sum('amount'),
            'pendingWithdrawals' => Transaction::where('type', TransactionType::WITHDRAW->value)
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

        $profile = [
            'position' => $user->user_type,
            'skills' => $user->skills ?? [],
            'walletBalance' => $user->wallet->balance ?? 0,
            'earnings' => [
                'total' => Transaction::query()
                    ->whereHas('contract', function ($query) use ($user) {
                        $query->where('developer_id', $user->id);
                    })
                    ->where('type', TransactionType::PAYMENT->value)
                    ->where('status', TransactionStatus::COMPLETED->value)
                    ->sum('amount'),
                'spent' => $user->transactions()
                    ->with('contract')
                    ->whereHas('contract', function ($query) use ($user) {
                        $query->where('client_id', $user->id);
                    })
                    ->where('transactions.type', TransactionType::PAYMENT->value)
                    ->where('transactions.status', TransactionStatus::COMPLETED->value)
                    ->sum('amount'),
                'lastMonthEarned' => Transaction::query()
                    ->whereHas('contract', function ($query) use ($user) {
                        $query->where('developer_id', $user->id);
                    })
                    ->where('type', TransactionType::PAYMENT->value)
                    ->where('status', TransactionStatus::COMPLETED->value)
                    ->where('created_at', '>=', Carbon::now()->subMonth())
                    ->sum('amount'),
                'lastMonthSpent' => $user->transactions()
                    ->with('contract')
                    ->whereHas('contract', function ($query) use ($user) {
                        $query->where('client_id', $user->id);
                    })
                    ->where('transactions.type', TransactionType::PAYMENT->value)
                    ->where('transactions.status', TransactionStatus::COMPLETED->value)
                    ->where('created_at', '>=', Carbon::now()->subMonth())
                    ->sum('amount'),
                'deposit' => $user->transactions()
                    ->where('type', TransactionType::DEPOSIT->value)
                    ->where('status', TransactionStatus::COMPLETED->value)
                    ->sum('amount'),
                'lastMonthDeposit' => $user->transactions()
                    ->where('type', TransactionType::DEPOSIT->value)
                    ->where('status', TransactionStatus::COMPLETED->value)
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

        $contracts = $user->contracts()
            ->with(['project'])
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
                    'client_name' => $contract->client->name,
                    'developer_name' => $contract->developer->name,
                    'bid' => [
                        'amount' => $contract->amount,
                        'developer_name' => $contract->developer->name,
                        'developer_avatar' => $contract->developer->avatar,
                    ],
                    'project' => [
                        'title' => $contract->project->title,
                        'client' => $contract->project->client,
                        'project_deadline' => $contract->project->project_deadline,
                    ],
                ];
            })
            ->toArray();

        $transactions = Transaction::query()
            ->where(function($query) use ($user) {
                $query->where('user_id', $user->id)

                    ->orWhere(function($subQuery) use ($user) {
                        $subQuery->where('type', TransactionType::PAYMENT->value)
                            ->whereHas('contract', function($contractQuery) use ($user) {
                                $contractQuery->where('developer_id', $user->id);
                            });
                    });
            })
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($transaction) {
                return [
                    'id' => $transaction->id,
                    'type' => $transaction->type,
                    'amount' => $transaction->amount,
                    'status' => $transaction->status,
                    'created_at' => $transaction->created_at,
                    'contract_id' => $transaction->contract_id,
                    'developer_id' => $transaction?->contract?->developer_id,
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
