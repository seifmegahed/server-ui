"use client";

import { toggleScreen } from "@/server/actions";
import { 
  Monitor, 
  // MonitorOff 
} from "lucide-react";

function ScreenControls() {
  return (
    <div className="flex gap-2 items-center cursor-pointer" onClick={() => toggleScreen()}>
      <Monitor size={20} />
      {/* <MonitorOff size={20} /> */}
    </div>
  );
}

export default ScreenControls;
