import Link from "next/link";

export default function Dashboard() {
  return (
    <>
      <Link
        className="inline-block text-white bg-blue-500 rounded-sm p-2 hover:bg-blue-600 transition-colors"
        href="/activity/create"
      >
        記録する
      </Link>
    </>
  );
}
