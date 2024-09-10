import BatteryIcon from "@/icons/BatteryIcon";

const batteryStatus = {
  Charging: "Charging\n",
  Full: "Full\n",
};

export type BatteryDataType = {
  status: string;
  charge: number;
};

function BatteryStats({ battery }: { battery: BatteryDataType }) {
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

export default BatteryStats;
