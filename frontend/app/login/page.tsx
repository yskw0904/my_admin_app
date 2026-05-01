'use client';

import { useState } from 'react';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const submitLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await axios.get('/sanctum/csrf-cookie', { withCredentials: true });

            // ログイン情報を送信
            const response = await axios.post('/api/login', {
                email,
                password,
            });

            document.cookie = "is_logged_in=true; path=/; max-age=86400";
            
            router.push('/');
        } catch (error: any) {
            // バリデーションエラーなどの処理
            if (error.response && error.response.status === 422) {
                alert('ログインに失敗しました。入力内容を確認してください。');
                console.log(error.response.data.errors);
            }
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>ログイン</h1>
            <form onSubmit={submitLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '1rem' }}>
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