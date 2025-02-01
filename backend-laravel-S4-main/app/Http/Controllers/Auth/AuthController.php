<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Admin;

class AuthController extends Controller
{

    public function login (Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);
        $user = User::where('email_user', $request->email)->first();
        
        if (!$user || !Hash::check($request->password, $user->password_user)) {
            return response()->json(['error' => 'The provided credentials are incorrect.'], 401);
        }

        $token = $user->createToken('AuthToken');
        return response()->json([
            'user' => $user,
            'token' => $token->plainTextToken
        ]);
    }

    public function logout (Request $request) {
        $user = $request->user();
    
        if (!$user) {
            return response()->json(['error' => 'No authenticated user found.'], 401);
        }
    
        $user->tokens()->delete();
    
        return response()->json(['success' => true, 'message' => 'Logged out Successfully'], 204);
    }

    public function loginAdmin(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $admin = Admin::where('username_admin', $request->username)->first();

        if (!$admin || $request->password == $admin->password_admin) {
            return response()->json(['error' => 'The provided credentials are incorrect.'], 401);
        }

        $token = $admin->createToken('AdminAuthToken')->plainTextToken;

        return response()->json([
            'admin' => $admin,
            'token' => $token,
        ]);
    }

    public function logoutAdmin(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logout successful']);
 
    }

    public function createAdmin(){
        $user = new Admin();

        $user->username_admin = "admin"; 
        $user->password_admin = "admin"; 

        $user->save();
    }
}
