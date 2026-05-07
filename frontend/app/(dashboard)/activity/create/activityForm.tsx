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
  const [selectedType, setSelectedType] = useState("");
  const [selectStartTime, setSelectStartTime] = useState("");
  const [selectEndTime, setSelectEndTime] = useState("");
  const [note, setNote] = useState("");

  const submitStore = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const data = {
      activity_type: selectedType,
      start_time: selectStartTime,
      end_time: selectEndTime,
      note: note,
    };

    try {
      await axios.post("/api/activity/store", data);
      console.log("成功！", data);
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
            {/* 種別 */}
            <select
              className="border-2 rounded"
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            {/* 時刻 */}
            <div className="space-x-3 flex-1">
              <input
                type="time"
                className="border-2 rounded"
                onChange={(e) => setSelectStartTime(e.target.value)}
                value={selectStartTime}
              ></input>
              <span>〜</span>
              <input
                type="time"
                className="border-2 rounded"
                onChange={(e) => setSelectEndTime(e.target.value)}
                value={selectEndTime}
              ></input>
            </div>
            {/* コメント */}
            <input
              type="text"
              className="border-2 rounded"
              placeholder="1日の振り返りコメント"
              onChange={(e) => setNote(e.target.value)}
              value={note}
            ></input>
            <button type="submit" className="cursor-pointer">
              記録する
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
