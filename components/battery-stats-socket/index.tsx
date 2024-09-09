"use client";

import { useEffect, useState } from "react";
import { socket } from "@/socket";

import {
  BatteryFull,
  BatteryCharging,
  Battery,
  BatteryMedium,
  BatteryLow,
  WifiOff,
} from "lucide-react";

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
      <BatteryIcon status={battery.status} chargeStep={battery.chargeStep} />
      <div className="text-md">{battery.charge}%</div>
    </div>
  );
}

const batteryIconSize = 22;

function BatteryIcon({
  status,
  chargeStep,
}: {
  status: string;
  chargeStep: number;
}) {
  switch (status) {
    case "Charging\n":
      return <BatteryCharging size={batteryIconSize} />;
    default:
      switch (chargeStep) {
        case 3:
          return <BatteryFull size={batteryIconSize} />;
        case 2:
          return <BatteryMedium size={batteryIconSize} />;
        case 1:
          return <BatteryLow size={batteryIconSize} />;
        default:
          return <Battery size={batteryIconSize} />;
      }
  }
}

export default BatteryStatsSocket;
