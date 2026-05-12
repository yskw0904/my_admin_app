"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ActivityType = {
  id: string;
  name: string;
};

type ActivityFormProps = {
  types: ActivityType[];
  date: string;
};

export default function ActivityForm({ types, date }: ActivityFormProps ) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectStartTime, setSelectStartTime] = useState("");
  const [selectEndTime, setSelectEndTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitStore = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // バリデーション（最低限のチェック）
    if (!selectedType || !selectStartTime || !selectEndTime) {
      setError("種別と開始時間と終了時間は必須です。");
      setIsSubmitting(false);
      return;
    }

    const data = {
      date: date,
      activity_type: selectedType,
      start_time: `${date} ${selectStartTime}`,
      end_time: `${date} ${selectEndTime}`,
    };

    try {
      await axios.post("/api/activity/store", data);
      console.log("成功！", data);
      // 成功したらフォームをリセットして、画面を更新（タイムラインに反映）
      setSelectStartTime("");
      setSelectEndTime("");
      setSelectedType("");

      router.refresh();
    } catch (error: any) {
      if (error.response?.status === 401) {
        alert("セッションが切れました。再ログインしてください。");
      } else {
        // バリデーションエラー(422)などの内容を詳細に表示
        setError(error.response?.data?.message || "入力エラー");
      }
    }
  };
  return (
    <form onSubmit={submitStore}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-8 transition-all hover:shadow-md">
        {/* エラー表示エリア */}
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-100">
            {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* 種別セレクトボックス */}
          <div className="w-full sm:w-[200px]">
            <select
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none transition-all cursor-pointer"
              onChange={(e) => setSelectedType(e.target.value)}
              value={selectedType}
            >
              <option value="" disabled>
                活動を選択...
              </option>
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* 時刻入力エリア */}
          <div className="flex items-center gap-2 w-full sm:w-auto flex-1">
            <input
              type="time"
              className="w-full sm:w-[140px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none transition-all"
              onChange={(e) => setSelectStartTime(e.target.value)}
              value={selectStartTime}
            />
            <span className="text-gray-400 font-bold">〜</span>
            <input
              type="time"
              className="w-full sm:w-[140px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none transition-all"
              onChange={(e) => setSelectEndTime(e.target.value)}
              value={selectEndTime}
            />
          </div>

          {/* 送信ボタン */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {isSubmitting ? "保存中..." : "記録する"}
          </button>
        </div>
      </div>
    </form>
  );
}
