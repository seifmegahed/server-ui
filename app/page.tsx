import FileCard from "@/components/file-card";
import { Button } from "@/components/ui/button";
import UploadInput from "@/components/upload-input";
import { getFiles } from "@/server/actions";
import Link from "next/link";

export default async function Home() {
  const files = await getFiles("/home/seifmegahed/uploads/");
  return (
    <div className="flex flex-col gap-2 p-4 h-full w-full">
      <div>
        <Link href="/api/download-ssl-cert">
          <Button>Download SSL Certificate</Button>
        </Link>``
      </div>
      <UploadInput />
      {files.map((fileName) => (
        <FileCard key={fileName} fileName={fileName} />
      ))}
    </div>
  );
}
