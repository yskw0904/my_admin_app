<?php

namespace App\Models;

use App\Enums\ActivityType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{

    /** @use HasFactory<UserFactory> */
    use HasFactory;

    protected $fillable = [
        'daily_record_id',
        'activity_type',
        'start_time',
        'end_time',
    ];

    protected $casts = [
        'activity_type' => ActivityType::class,
        'start_time' => 'datetime',
        'end_time' => 'datetime',
    ];

    public function dailyRecord()
    {
        return $this->belongsTo(DailyRecord::class);
    }
}
