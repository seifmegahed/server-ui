"use client";

import { toggleScreen } from "@/server/actions";
import {
  Monitor,
  // MonitorOff
} from "lucide-react";

function ScreenControls() {
  return (
    <div onClick={() => toggleScreen()}>
      <Monitor
        size={16}
        className="cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out"
      />
    </div>
  );
}

export default ScreenControls;
