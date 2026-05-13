"use client";

import { useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const searchParams = useSearchParams();
  const isSessionExpired = searchParams.get("error") === "session_expired";

  const submitLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.get("/sanctum/csrf-cookie", { withCredentials: true });

      // ログイン情報を送信
      const response = await axios.post("/api/login", {
        email,
        password,
      });

      document.cookie = "is_logged_in=true; path=/; max-age=86400";

      router.push("/");
    } catch (error: any) {
      // バリデーションエラーなどの処理
      if (error.response && error.response.status === 422) {
        alert("ログインに失敗しました。入力内容を確認してください。");
        console.log(error.response.data.errors);
      }
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>ログイン</h1>

      {/* 🌟 パラメータが存在する場合に、通知メッセージを表示 */}
      {isSessionExpired && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm font-bold">
          セッションの有効期限が切れました。安全のため、もう一度ログインしてください。
        </div>
      )}

      <form
        onSubmit={submitLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: "1rem",
        }}
      >
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">ログインする</button>
      </form>
    </div>
  );
}
