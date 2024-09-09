import FileCard from "@/components/file-card";
import { getFiles } from "@/server/actions";

export default async function Home() {
  const files = await getFiles("/media/seifmegahed/Media SMG/Movies");
  return (
    <div className="flex flex-col gap-2 p-4 h-full w-full">
      {files.map((fileName) => (
        <FileCard key={fileName} fileName={fileName} />
      ))}
    </div>
  );
}
