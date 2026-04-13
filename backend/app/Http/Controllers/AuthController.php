<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // 1. バリデーション
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        // 2. 認証試行（Auth::attemptがパスワードのハッシュ照合などを自動処理）
        if (Auth::attempt($credentials)) {
            // セッション固定攻撃対策
            $request->session()->regenerate();

            return response()->json([
                'user' => Auth::user(),
                'message' => 'ログインに成功しました'
            ]);
        }

        // 3. 失敗時はフロントエンドに422エラー（Unprocessable Content）を返す
        throw ValidationException::withMessages([
            'email' => ['メールアドレスまたはパスワードが間違っています。'],
        ]);
    }

    public function logout(Request $request)
    {
        // APIですが、CookieベースのSPA認証のため 'web' ガードを指定してログアウト
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'ログアウトしました']);
    }
}
