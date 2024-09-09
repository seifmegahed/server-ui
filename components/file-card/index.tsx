import { Folder } from "lucide-react";

function FileCard({
  fileName,
  onClick,
}: {
  fileName: string;
  onClick?: () => void;
}) {
  return (
    <div
      className="flex gap-2 items-center transition-all duration-300 ease-in-out text-gray-400 hover:text-secondary w-fit"
      onClick={onClick}
    >
      <div>
        <Folder size={20} />
      </div>
      <div className="text-lg line-clamp-1 cursor-pointer">{fileName}</div>
    </div>
  );
}

export default FileCard;