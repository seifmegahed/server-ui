import { getBattery, getFiles } from "@/server/actions";
import { Folder, BatteryFull } from "lucide-react";

export default async function Home() {
  const files = await getFiles("../../");
  const batteryFile = await getBattery();
  const data = batteryFile.toLocaleString();
  return (
    <div className="flex flex-col gap-4 p-4 h-full w-full">
      <div className="flex gap-2 items-center">
        <BatteryFull />
        <div className="text-2xl">Battery {data}</div>
      </div>
      {files.map((file) => (
        <div key={file} className="flex gap-2 items-center">
          <Folder />
          <div className="text-2xl">{file}</div>
        </div>
      ))}
    </div>
  );
}
