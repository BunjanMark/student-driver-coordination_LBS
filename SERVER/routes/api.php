<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RecoveryController;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/



// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// controlls logic / brain of the application

// Route::prefix("/v1")->group(function () {
//     Route::get(
//         "/",
//         function () {
//             echo "API ROUTES";
//         }
//     );

//     // sir Jomar 2
//     // Route::post('/login', [AuthController::class, 'login']);
//     // Route::post('/login', [AuthController::class, 'register']);

//     // Route::get('/wer', function () {
//     //     echo 'heyhey';
//     // });
//     // Route::post('/auth/register', UserController::class, 'createUser');
//     // Route::post('/auth/login', UserController::class, 'loginUser');
// });

Route::get('/wer', function () {
    echo 'heyhey';
});
Route::post('/register', [UserController::class, 'createUser']);

Route::post('/login', [UserController::class, 'loginUser']);


Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

 

Route::post('/password/reset/request', [RecoveryController::class, 'requestPasswordReset']);
Route::post('/password/reset', [RecoveryController::class, 'resetPassword']);