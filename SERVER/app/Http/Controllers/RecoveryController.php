<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use App\Models\User;
 
use Illuminate\Support\Str;
class RecoveryController extends Controller
{
    /**
     * Initiate the password reset process.
     */
    public function requestPasswordReset(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email|exists:users',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 400);
            }

            $status = Password::sendResetLink(
                $request->only('email')
            );

            return $status === Password::RESET_LINK_SENT
                ? response()->json([
                    'status' => true,
                    'message' => 'Password reset link sent successfully',
                ], 200)
                : response()->json([
                    'status' => false,
                    'message' => 'Unable to send reset link',
                ], 500);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }


    /**
     * Reset user password.
     */
    public function resetPassword(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required|string|min:3|confirmed',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 400);
            }

            // Get the user by email
            $user = User::where('email', $request->email)->first();

            if (!$user) {
                return response()->json([
                    'status' => false,
                    'message' => 'User not found',
                ], 404);
            }

            // Generate a new token
            $token = Str::random(60);

            // Save the new token and hashed password to the user
            $user->forceFill([
                'password' => Hash::make($request->password),
                'remember_token' => $token,
            ])->save();

            return response()->json([
                'status' => true,
                'message' => 'Password reset successfully',
                'token' => $token, // You can include the token in the response
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
    
}
