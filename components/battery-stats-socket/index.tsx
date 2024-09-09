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

  if (!connected) return <WifiOff />;

  return (
    <div className="flex gap-2 items-center">
      <BatteryIcon status={battery.status} chargeStep={battery.chargeStep} />
      <div className="text-md">{battery.charge}%</div>
    </div>
  );
}

function BatteryIcon({
  status,
  chargeStep,
}: {
  status: string;
  chargeStep: number;
}) {
  switch (status) {
    case "Charging\n":
      return <BatteryCharging size={20} />;
    default:
      switch (chargeStep) {
        case 3:
          return <BatteryFull />;
        case 2:
          return <BatteryMedium />;
        case 1:
          return <BatteryLow />;
        default:
          return <Battery />;
      }
  }
}

export default BatteryStatsSocket;
