<?php

namespace App\Models;

use App\Enums\ActivityType;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $fillable = [
        'user_id',
        'activity_type',
        'start_time',
        'end_time',
        'note',
    ];

    protected $casts = [
        'activity_type' => ActivityType::class,
        'start_time' => 'datetime',
        'end_time' => 'datetime',
    ];
}
