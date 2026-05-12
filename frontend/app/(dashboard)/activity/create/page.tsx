import { cookies } from "next/headers";
import ActivityForm from "./activityForm";
import {
  Moon,
  Utensils,
  Footprints,
  BookOpen,
  Coffee,
  Briefcase,
  Smartphone,
  CircleHelp,
} from "lucide-react";

// activity_type の ID と アイコンを紐付け
const activityIcons: Record<string, any> = {
  sleep: Moon,
  meal: Utensils,
  walk: Footprints,
  read: BookOpen,
  nap: Coffee,
  work: Briefcase,
  phone: Smartphone,
};

const days = ["日", "月", "火", "水", "木", "金", "土"];

// UTCの文字列を日本時間の「H:mm」に変換する関数
function formatTime(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    hour: "numeric", // "07" ではなく "7" にする
    minute: "2-digit", // 必ず2桁 "00" "30" にする
  }).format(date);
}

async function getActivityTypes() {
  const res = await fetch(`${process.env.API_URL}/constants/activity-types`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("取得失敗");
  const json = await res.json();
  return json.data;
}

async function getDailyRecord(date: string) {
  // 1. ユーザーのブラウザから送られてきたCookieを取得する
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  try {
    // 2. Laravelへ絶対URLでfetchし、HeadersにCookieを詰め込む！
    const res = await fetch(
      `${process.env.API_URL}/daily-record?date=${date}`,
      {
        cache: "no-store",
        headers: {
          Cookie: cookieString,
          Accept: "application/json",
        },
      },
    );

    if (!res.ok) {
      console.error("DailyRecord取得エラー:", res.status);
      return null;
    }

    const json = await res.json();

    return json.data;
  } catch (error) {
    console.error("通信失敗:", error);
    return null;
  }
}

export default async function Create({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {

  // URLから日付を取得
  const resolvedParams = await searchParams;
  const dateParam = resolvedParams.date;
  const targetDate = dateParam ? new Date(dateParam) : new Date();
  const formattedDate = targetDate.toISOString().slice(0, 10);

  const types = await getActivityTypes();
  const dailyRecord = await getDailyRecord(formattedDate);

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6">
      {/* ヘッダー部分 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">生活リズムの記録</h1>
        <p className="text-gray-500 font-medium mt-1">
          {formattedDate}（{days[targetDate.getDay()]}）
        </p>
      </div>

      {/* 登録フォーム（またはモーダル呼び出しボタン） */}
      <div className="flex justify-end">
        <ActivityForm types={types} date={formattedDate} />
      </div>

      {/* 記録表示エリア */}
      {dailyRecord && dailyRecord.activities.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2">
            タイムライン
          </h2>

          {/* タイムライン本体 */}
          <div className="relative border-l-2 border-gray-100 ml-3 space-y-6">
            {dailyRecord.activities.map((activity: any) => {
              const activityName = types.find(
                (type: any) => type.id === activity.activity_type,
              )?.name;

              const IconComponent =
                activityIcons[activity.activity_type] || CircleHelp;

              return (
                <div
                  key={activity.id}
                  className="relative pl-10 mb-8 last:mb-0"
                >
                  {/* 🌟 アイコンを表示する部分 */}
                  <span className="absolute -left-[18px] top-0 flex items-center justify-center w-9 h-9 rounded-full bg-white border-2 border-gray-100 shadow-sm z-10">
                    <IconComponent className="w-5 h-5 text-blue-500" />
                  </span>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <span className="text-sm font-bold text-gray-400 min-w-[120px]">
                      {formatTime(activity.start_time)}
                      {activity.end_time &&
                        ` 〜 ${formatTime(activity.end_time)}`}
                    </span>
                    <span className="text-lg font-bold text-gray-800">
                      {activityName}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 振り返りコメント */}
          {dailyRecord.note && (
            <div className="mt-8 bg-gray-50 rounded-lg p-4 border border-gray-100">
              <h3 className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                振り返りコメント
              </h3>
              {/* whitespace-pre-wrap で改行をそのまま表示する */}
              <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">
                {dailyRecord.note}
              </p>
            </div>
          )}
        </div>
      ) : (
        /* データがない時の表示 */
        <div className="bg-gray-50 rounded-xl border-2 border-gray-200 border-dashed p-10 text-center mb-8">
          <p className="text-gray-500 font-medium">
            この日の記録はまだありません。
          </p>
        </div>
      )}
    </div>
  );
}
