"use client";

import { Folder } from "lucide-react";
import Link from "next/link";
function FileCard({
  fileName,
  onClick,
}: {
  fileName: string;
  onClick?: () => void;
}) {
  return (
    <Link href="/api/download-file">
      <div
        className="flex gap-2 items-center transition-all duration-300 ease-in-out text-gray-400 hover:text-white w-fit"
        onClick={onClick}
      >
        <div>
          <Folder size={20} />
        </div>
        <div className="text-lg line-clamp-1 cursor-pointer">{fileName}</div>
      </div>
    </Link>
  );
}

export default FileCard;
