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
        
        // Отримуємо валідовані дані
        $validatedData = $request->validated();
        
        // Якщо avatar передано як null, зберігаємо поточне значення
        if ($request->input('avatar') === null) {
            $validatedData['avatar'] = $user->avatar;
        }
        
        // Заповнюємо модель
        $user->fill($validatedData);
    
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }
    
        // Обробка нового аватара
        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
    
            if ($avatar->isValid()) {
                // Видаляємо старий аватар
                if ($user->avatar) {
                    $oldAvatarPath = str_replace('/storage/', '', $user->avatar);
                    Storage::disk('public')->delete($oldAvatarPath);
                }
    
                // Зберігаємо новий аватар
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
