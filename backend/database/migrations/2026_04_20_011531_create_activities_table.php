<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('daily_record_id')->constrained()->cascadeOnDelete();

            // 行動の種類（Enumで定義することで不正な値を防ぐ）
            $table->enum('activity_type', [
                'sleep',   // 睡眠
                'meal',    // 食事
                'walk',    // 散歩
                'read',    // 読書
                'nap',     // 昼寝
                'work',    // 作業
                'phone'    // スマホ
            ]);

            // 開始と終了（重複チェックや期間計算を高速化するためにindexを推奨）
            $table->dateTime('start_time')->index();
            $table->dateTime('end_time')->index();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};
