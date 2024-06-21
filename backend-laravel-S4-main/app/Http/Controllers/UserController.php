<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{

    public function index() 
    {
        $users = User::all();
        return response()->json($users, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'fullName' => 'required|string|max:255',
            'phoneNumber' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users,email_user',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name_user' => $request->fullName,
            'phonenumber_user' => $request->phoneNumber,
            'adress_user' => $request->address,
            'email_user' => $request->email,
            'password_user' => Hash::make($request->password),
        ]);

        $token = $user->createToken('AuthToken')->plainTextToken;

        return response()->json([
            'user' => $user,
            'message' => 'User registered successfully.',
            'token' => $token,
        ], 201);
    }

    public function edit(User $user)
    {
        return response()->json($user, 200);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'string|max:255',
            'phonenumber' => 'string|max:255',
            'adress' => 'string|max:255',
            'email' => 'string|email|unique:users,email_user,' . $user->user_id,
        ]);

        $user->update($request->only([
            'name_user', 'phonenumber_user', 'adress_user', 'email_user'
        ]));

        return response()->json([
            'message' => 'User profile updated successfully.',
            'user' => $user,
        ], 200);
    }

    public function changePassword(Request $request, User $user)
    {
        $request->validate([
            'current_password_user' => 'required|string',
            'new_password_user' => 'required|string|min:8|different:current_password',
        ]);

        // Check if the current password matches
        if (!Hash::check($request->current_password_user, $user->password_user)) {
            return response()->json(['error' => 'Current password is incorrect.'], 400);
        }

        // Update password
        $user->password_user = Hash::make($request->new_password_user);
        $user->save();

        return response()->json([
            'message' => 'Password changed successfully.',
        ]);
    }

    public function destroy($id)
    {
        $user = User::find($id);
        if ($user) {
            $user->delete();
            return response()->json(['message' => 'User deleted successfully']);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }
}
