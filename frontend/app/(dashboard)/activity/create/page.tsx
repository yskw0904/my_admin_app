import ActivityForm from './activityForm';

async function getActivityTypes() {
  const res = await fetch(`${process.env.API_URL}/constants/activity-types`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("取得失敗");
  const json = await res.json();
  return json.data;
}

export default async function Create() {
  const types = await getActivityTypes();

  return (
    <>
      <h1>生活リズムの記録</h1>
      <ActivityForm types={types} />
    </>
  );
}
