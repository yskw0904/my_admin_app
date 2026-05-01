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
import { useState } from "react";

type ActivityType = {
  id: string;
  name: string;
};

export default function ActivityForm({ types }: { types: ActivityType[] }) {
  const [error, setError] = useState("");

  const submitStore = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const data = {
      activity_type: "sleep",
      start_time: "2026-04-21 10:00",
      end_time: "2026-04-21 10:01",
      note: "test",
    };

    try {
      await axios.post("/api/activity/store", data);
      console.log("成功！");
      // 成功時の処理（ダイアログを閉じるなど）
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
    <Dialog>
      <DialogTrigger asChild>
        <button>記録を開く</button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={submitStore}>
          <DialogHeader>
            <DialogTitle>行動記録</DialogTitle>
            <DialogDescription>
              記録する行動を入力してください。
            </DialogDescription>
            <p className="text-red-500">{error}</p>
          </DialogHeader>
          <div className="space-y-4 flex flex-col">
            <p>行動</p>
            <select>
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            <button type="submit" className="cursor-pointer">
              記録する
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
