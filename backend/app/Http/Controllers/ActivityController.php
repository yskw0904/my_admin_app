<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreActivityRequest;
use App\Models\Activity;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class ActivityController extends Controller
{
    public function store(StoreActivityRequest $request) {
        $validated = $request->validated();

        $exists = Activity::where('user_id', $request->user()->id)
            ->where(function ($query) use ($validated) {
                $query->where(function ($q) use ($validated) {
                    $q->where('start_time', '<', $validated['end_time'])
                        ->where('end_time', '>', $validated['start_time']);
                });
            })->exists();

        if ($exists) {
            throw ValidationException::withMessages([
                'start_time' => ['その時間帯には既に別の予定が入っています。'],
            ]);
        }

        $request->user()->activities()->create($validated);

        return response()->json([
            'message' => '保存に成功しました。'
        ]);
    }
}
