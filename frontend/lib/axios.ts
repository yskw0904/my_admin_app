import Axios from 'axios';

const axios = Axios.create({
    // Next.jsのブラウザ側からLaravelへ通信する際のURLfrontend/lib/axios.ts
    // baseURL: '',
    baseURL: process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '') : 'http://localhost:8080',
    // SPA認証（Cookieのやり取り）に必須の設定
    withCredentials: true, 
    // トークンをヘッダーに乗せる設定
    withXSRFToken: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
    },
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        // 🌟 修正1：クライアント側にある「is_logged_in」クッキーを強制的に削除する
        document.cookie = "is_logged_in=; max-age=0; path=/";
        
        // 🌟 修正2：ミドルウェアと同じようにパラメータを付けてログイン画面へ
        window.location.href = "/login?error=session_expired";
      }
    }
    return Promise.reject(error);
  }
);

export default axios;