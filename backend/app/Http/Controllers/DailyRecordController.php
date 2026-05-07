<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDailyRecordRequest;
use App\Services\DailyRecord\DailyRecordStoreService;

class DailyRecordController extends Controller
{
    public function store(StoreDailyRecordRequest $request, DailyRecordStoreService $service) {
        $validated = $request->validated();

        $service->execute($request->user()->id, $validated);

        return response()->json([
            'message' => '保存に成功しました。'
        ]);
    }
}
