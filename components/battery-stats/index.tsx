import { getBattery } from "@/server/actions";
import {
  BatteryFull,
  BatteryCharging,
  Battery,
  BatteryMedium,
  BatteryLow,
} from "lucide-react";

async function BatteryStats() {
  const battery = await getBattery();
  const chargeRatio = Number(battery.charge) / Number(battery.chargeFull);
  const chargeStep = Math.round(chargeRatio * 3);
  const charge = Math.max(Math.min(Math.round(chargeRatio * 100), 100), 0);
  return (
    <div className="flex gap-2 items-center">
      <BatteryIcon status={battery.status} chargeStep={chargeStep} />
      <div className="text-md">{charge}%</div>
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
      return <BatteryCharging />;
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

export default BatteryStats;
