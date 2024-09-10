"use client";

import { useEffect, useState } from "react";
import { socket } from "@/socket";
import BatteryIcon from "@/icons/BatteryIcon";

import { WifiOff } from "lucide-react";

const batteryStatus = {
  Charging: "Charging\n",
  Full: "Full\n",
};

type BatteryDataType = {
  status: string;
  chargeStep: number;
  charge: number;
};

function BatteryStatsSocket() {
  const [connected, setConnected] = useState(false);
  const [battery, setBattery] = useState({
    status: "",
    chargeStep: 0,
    charge: 0,
  });

  useEffect(() => {
    if (!socket) return;
    socket.on("disconnect", () => {
      setConnected(false);
    });
    socket.on("battery", (data: BatteryDataType) => {
      setConnected(true);
      setBattery(data);
    });
    return () => {
      if (!socket) return;
      socket.off("battery");
      socket.off("disconnect");
    };
  }, []);

  if (!connected) return <WifiOff size={16} />;

  return (
    <div className="flex gap-2 items-center">
      <div className="text-sm">
        {battery.status === batteryStatus.Full ? 100 : battery.charge}%
      </div>
      <BatteryIcon
        percentage={
          battery.status === batteryStatus.Full ? 100 : battery.charge
        }
        charging={
          battery.status === batteryStatus.Charging ||
          battery.status === batteryStatus.Full
        }
      />
    </div>
  );
}

export default BatteryStatsSocket;
