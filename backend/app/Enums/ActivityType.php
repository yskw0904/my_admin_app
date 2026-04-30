<?php
namespace App\Enums;

enum ActivityType: string
{
    case SLEEP = 'sleep';
    case MEAL = 'meal';
    case WALK = 'walk';
    case READ = 'read';
    case NAP = 'nap';
    case WORK = 'work';
    case PHONE = 'phone';

    public function label(): string
    {
        return match($this) {
            self::SLEEP => '睡眠',
            self::MEAL => '食事',
            self::WALK => '散歩',
            self::READ => '読書',
            self::NAP => '昼寝',
            self::WORK => '作業',
            self::PHONE => 'スマホ',
        };
    }
}
