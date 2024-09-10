"use client";

import { File } from "lucide-react";
import Link from "next/link";

function FileCard({
  fileName,
  // onClick,
}: {
  fileName: string;
  onClick?: () => void;
}) {
  return (
    <Link href={`/api/download-file/${fileName}`}>
      <div className="flex gap-2 items-center transition-all duration-300 ease-in-out text-gray-400 hover:text-white w-fit">
        <div>
          <File size={20} />
        </div>
        <div className="text-lg line-clamp-1 cursor-pointer">{fileName}</div>
      </div>
    </Link>
  );
}

export default FileCard;
