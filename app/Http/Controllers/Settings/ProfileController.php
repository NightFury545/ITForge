<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();

        $user->fill($request->validated());

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');

            if ($avatar->isValid()) {
                if ($user->avatar) {
                    $oldAvatarPath = str_replace('/storage/', '', $user->avatar);
                    logger($oldAvatarPath);
                    if (Storage::disk('public')->exists($oldAvatarPath)) {
                        Storage::disk('public')->delete($oldAvatarPath);
                    }
                }

                $avatarName = $user->id.'_'.time().'.'.$avatar->getClientOriginalExtension();

                $avatarPath = $avatar->storeAs('avatars', $avatarName, 'public');

                $user->avatar = '/storage/'.$avatarPath;
            }
        }

        $user->save();

        return to_route('profile.edit');
    }


    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
