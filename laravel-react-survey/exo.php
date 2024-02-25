<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use \App\Models\User;

class AuthController extends Controller
{
    public function register(SignupRequest $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
        ]);

        $token = $user->createToken('MyAppToken')->plainTextToken;

        return response()->json(['token' => $token], 201);
    }




    public function login(LoginRequest $request)
    {
        $credentials = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = $request->user();
        $token = $user->createToken('MyAppToken')->plainTextToken;

        return response()->json([
            'token' => $token,
            'username' => $user->name,
        ], 200);
    }

}





// Route::middleware('auth:sanctum')->group(function(){
//     Route::post('/logout',[AuthController::class, 'logout']);
// });


// Route::post('/signup', [AuthController::class,'signup']);
// Route::post('/login', [AuthController::class,'login']);
