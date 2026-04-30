import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

async function getActivityTypes() {
  const res = await fetch(`${process.env.API_URL}/constants/activity-types`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("取得失敗");
  const json = await res.json();
  return json.data;
}

type ActivityType = {
  id: string;
  name: string;
};

export default async function Create() {
  const types: ActivityType[] = await getActivityTypes();
  return (
    <>
      <h1>生活リズムの記録</h1>
      <Dialog>
        <form>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>行動記録</DialogTitle>
              <DialogDescription>
                記録する行動を入力してください。
              </DialogDescription>
            </DialogHeader>
            <div>
              <p>行動</p>
              <select>
                {types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
