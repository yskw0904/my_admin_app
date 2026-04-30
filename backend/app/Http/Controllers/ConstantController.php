<?php

namespace App\Http\Controllers;

use App\Enums\ActivityType;

class ConstantController extends Controller
{
    public function activityType() {
        $types = array_map(function (ActivityType $type) {
            return [
                'id' => $type->value,
                'name' => $type->label(),
            ];
        }, ActivityType::cases());

        return response()->json([
            'data' => $types
        ]);
    }
}