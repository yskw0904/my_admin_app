<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreActivityRequest;
use App\Services\Activity\ActivityStoreService;

class ActivityController extends Controller
{
    public function store(StoreActivityRequest $request, ActivityStoreService $service) {
        $validated = $request->validated();

        $service->execute($request->user()->id, $validated);

        return response()->json([
            'message' => '保存に成功しました。'
        ]);
    }
}
