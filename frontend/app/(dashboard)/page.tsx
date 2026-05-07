"use client";

import axios from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const today = new Date();
  const formattedDate = today.toISOString().slice(0, 10);

  const submitStore = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      date: formattedDate,
    };

    try {
      await axios.post("/api/daily-record/store", data);
      console.log("成功！", data);
      // 成功時の処理（ダイアログを閉じるなど）
      router.push("/activity/create");
    } catch (error: any) {
      if (error.response?.status === 401) {
        alert("セッションが切れました。再ログインしてください。");
      } else if (error.response?.status === 422) {
        console.error("バリデーションエラー:", error.response.data.errors);
      }
    }
  };
  return (
    <>
      <form onSubmit={submitStore}>
        <button
          type="submit"
          className="inline-block text-white bg-blue-500 rounded-sm p-2 hover:bg-blue-600 transition-colors"
        >
          記録する
        </button>
      </form>
    </>
  );
}
