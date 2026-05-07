<?php

namespace App\Providers;

use App\Repositories\DailyRecord\DailyRecordRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            \App\Repositories\Activity\ActivityRepositoryInterface::class,
            \App\Repositories\Activity\EloquestActivityRepository::class
        );

        $this->app->bind(
            \App\Repositories\DailyRecord\DailyRecordRepositoryInterface::class,
            \App\Repositories\DailyRecord\EloquestDailyRecordRepository::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
