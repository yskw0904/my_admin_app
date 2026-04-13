import Image from "next/image";

export default async function Home() {
  const apiUrl = process.env.API_URL;
  const req = await fetch(`${apiUrl}/hello`, {
    cache: "no-store",
    headers: {
      Accept: "application/json", // 万が一の404でもHTMLではなくJSONでエラーが返ってきて安全
    },
  });
  const data = await req.json();
  return <div>{data.message}</div>;
}
