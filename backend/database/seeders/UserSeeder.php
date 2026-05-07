<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User; // 🌟 Userモデルを読み込む
use Illuminate\Support\Facades\Hash; // 🌟 パスワード暗号化のために読み込む

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // テストユーザーを作成
        User::create([
            'name' => 'テストユーザー',
            'email' => 'test@example.com',
            'password' => Hash::make('password123'), // 好きなパスワードを設定
        ]);
    }
}
