<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDailyRecordRequest;
use App\Models\DailyRecord;
use App\Services\DailyRecord\DailyRecordStoreService;
use Illuminate\Http\Request;

class DailyRecordController extends Controller
{
    public function store(StoreDailyRecordRequest $request, DailyRecordStoreService $service) {
        $validated = $request->validated();

        $service->execute($request->user()->id, $validated);

        return response()->json([
            'message' => '保存に成功しました。'
        ]);
    }

    public function fetch(Request $request) {
        $date = $request->input('date');

        $dailyRecord = DailyRecord::with('activities')->where([
            'user_id' => $request->user()->id,
            'date' => $date,
        ])
        ->first();

        return response()->json([
            'data' => $dailyRecord
        ]);
    }
}
