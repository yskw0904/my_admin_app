<?php

namespace Database\Factories;

use App\Models\Activity;
use App\Models\User;
use App\Enums\ActivityType;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

class ActivityFactory extends Factory
{
    protected $model = Activity::class;

    public function definition(): array
    {
        // 過去1週間の中からランダムな開始時間を生成
        $start = $this->faker->dateTimeBetween('-1 week', 'now');

        // 終了時間は、開始時間から「30分〜180分（3時間）」の間でランダムに追加
        $end = Carbon::instance($start)->addMinutes($this->faker->numberBetween(1, 6) * 30);

        return [
            // User::factory() とするとユーザーごと新規作成されます
            'user_id' => User::factory(),

            // Enumの中からランダムに値（'sleep', 'work' など）を取得
            'activity_type' => $this->faker->randomElement(ActivityType::cases())->value,

            'start_time' => $start,
            'end_time' => $end,
            'note' => $this->faker->optional(0.7)->realText(20), // 70%の確率で適当なメモを入れる
        ];
    }
}
