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
}
