

import FileCard from "@/components/file-card";
import UploadInput from "@/components/upload-input";
import { getFiles } from "@/server/actions";

export default async function Home() {
  const files = await getFiles("/home/seifmegahed/uploads/");
  return (
    <div className="flex flex-col gap-2 p-4 h-full w-full">
      <UploadInput />
      {files.map((fileName) => (
        <FileCard key={fileName} fileName={fileName} />
      ))}
    </div>
  );
}
