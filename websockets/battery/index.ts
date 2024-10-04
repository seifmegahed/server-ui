import fs from "fs";

export function getBattery() {
  const batteryStatusFile = fs.readFileSync(
    "/sys/class/power_supply/BAT0/status"
  );
  const batteryChargeFile = fs.readFileSync(
    "/sys/class/power_supply/BAT0/charge_now"
  );
  const batteryChargeFullFile = fs.readFileSync(
    "/sys/class/power_supply/BAT0/charge_full"
  );
  const chargeRatio = Number(batteryChargeFile) / Number(batteryChargeFullFile);
  const chargeStep = Math.round(chargeRatio * 3);
  const charge = Math.max(Math.min(Math.round(chargeRatio * 100), 100), 0);
  return {
    status: batteryStatusFile.toString(),
    charge,
    chargeStep,
  };
}
