<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConstantController;
use App\Http\Controllers\DailyRecordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// --- ログイン前でもアクセスできるルート ---
Route::post('/login', [AuthController::class, 'login']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/hello', function () {
    return [
        'message' => 'hello world!',
        'status' => 200
    ];
});

// --- ログイン後（Sanctumの認証Cookieを持っている状態）のみアクセス許可 ---
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/activity/store', [ActivityController::class, 'store']);
    Route::post('/daily-record', [DailyRecordController::class, 'store']);
    Route::get('/daily-record', [DailyRecordController::class, 'fetch']);
});

Route::get('/constants/activity-types', [ConstantController::class, 'activityType']);
