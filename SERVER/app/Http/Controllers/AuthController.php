<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Str;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    protected $model;
    public function __construct()
    {
        $this->model = new User();
    }
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);
    
        try {
            if (!Auth::attempt($credentials)) {
                return response(['message' => "Account is not registered"], 200);
            }
    
            $user = Auth::user();
            $token = $user->createToken($request->email . Str::random(8))->plainTextToken;
    
            return response(['token' => $token, 'user' => $user], 200);
        } catch (\Exception $e) {
            return response(['message' => $e->getMessage(), 'status' => false], 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    // Basic
    public function register(Request $request)
    { // Validation

        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password), // Hash the password
            ]);

            return response()->json($user, 201);
            return response(['message' => 'User registered successfully', 'user' => $user], 201);
        } catch (\Throwable $e) {
            //throw $th;
           
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500); 
            return response("Errors");
        }
    }

    // Basic

    // public function logins(Request $request)
    // {
    //     $credentials = $request->only('email', 'password');

    //     if (Auth::attempt($credentials)) {
    //         $user = Auth::user();
    //         $token = $user->createToken('LaravelAuthApp')->accessToken;
    //         return response()->json(['token' => $token], 200);
    //     } else {
    //         return response()->json(['error' => 'Unauthorised'], 401);
    //     }
    // }
}
