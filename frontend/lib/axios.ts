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

export default axios;