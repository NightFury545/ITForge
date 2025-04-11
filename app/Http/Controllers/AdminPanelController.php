<?php

namespace App\Http\Controllers;

use App\Models\Bid;
use App\Models\Chat;
use App\Models\Contract;
use App\Models\Message;
use App\Models\Project;
use App\Models\Transaction;
use App\Models\User;
use Inertia\Inertia;

class AdminPanelController
{
    public function index()
    {
        $users = User::all();
        $transactions = Transaction::with('user')->get();
        $bids = Bid::with('developer')->get();
        $projects = Project::with('client')->get();
        $chats = Chat::with(['client', 'developer'])->get();
        $messages = Message::with('sender')->get();
        $contracts = Contract::with(['client', 'developer', 'project'])->get();

        return Inertia::render('admin', [
            'users' => $users,
            'transactions' => $transactions,
            'bids' => $bids,
            'projects' => $projects,
            'chats' => $chats,
            'messages' => $messages,
            'contracts' => $contracts,
        ]);
    }

}
