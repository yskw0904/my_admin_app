import Axios from 'axios';

const axios = Axios.create({
    // Next.jsのブラウザ側からLaravelへ通信する際のURL
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

// lib/axios.ts のインターセプター部分

axios.interceptors.response.use(
    (response) => response, // 成功時はそのまま返す
    async (error) => {
        const originalRequest = error.config;

        // 419エラー かつ まだリトライしていない場合
        if (error.response?.status === 419 && !originalRequest._retry) {
            originalRequest._retry = true; // 無限ループ防止

            try {
                // 1. 新しいCSRFトークンを取得
                await axios.get('/sanctum/csrf-cookie');

                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // 2. 最新のトークンをCookieから手動で抜き出す
                const match = document.cookie.match(new RegExp('(^|;\\s*)(XSRF-TOKEN)=([^;]*)'));
                const token = match ? decodeURIComponent(match[3]) : null;
                
                // 3. 古いリクエストのヘッダーを、新しいトークンで上書きする
                if (token) {
                    if (originalRequest.headers && typeof originalRequest.headers.set === 'function') {
                        // 最新のAxiosの書き方
                        originalRequest.headers.set('X-XSRF-TOKEN', token);
                    } else {
                        // 古いAxiosの書き方
                        originalRequest.headers['X-XSRF-TOKEN'] = token;
                    }
                }

                // 4. トークンが更新された状態で再リクエスト！
                return axios(originalRequest);
            } catch (retryError) {
                return Promise.reject(retryError);
            }
        }

        return Promise.reject(error);
    }
);

export default axios;