"use client";

import axios from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const today = new Date();
  const formattedDate = today.toISOString().slice(0, 10);

  return (
    <>
      <Link
        href={`/activity/create?date=${formattedDate}`}
        className="inline-block text-white bg-blue-500 rounded-sm p-2 hover:bg-blue-600 transition-colors"
      >
        記録する
      </Link>
    </>
  );
}
