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
        $users = User::findAll();
        $transactions = Transaction::findAll();
        $bids = Bid::findAll();
        $projects = Project::findAll();
        $chats = Chat::findAll();
        $messages = Message::findAll();
        $contracts = Contract::findAll();

        return Inertia::render('admin-panel', [
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
