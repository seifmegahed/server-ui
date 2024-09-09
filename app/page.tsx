import { getFiles } from "@/server/actions";
import { Folder } from "lucide-react";

export default async function Home() {
  const files = await getFiles("/");
  return (
    <div className="flex flex-col gap-4 p-4 h-full overflow-y-scroll w-full">
      {files.map((file) => (
        <div key={file} className="flex gap-2 items-center">
          <Folder />
          <div className="text-2xl">
            {file}
          </div>
        </div>
      ))}
    </div>
  );
}
