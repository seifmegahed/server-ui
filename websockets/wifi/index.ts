import { exec } from "child_process";
import { rssiLUT } from "./rssi-lut";

function dBmToPercentage(dBm: number) {
  return rssiLUT.get(dBm) || 0;
}

export function getWifiStatus() {
  exec("sudo iw dev wlp3s0 link", (err, stdout, stderr) => {
    if (err) {
      console.error(`Error: ${stderr}`);
      return;
    }

    // Regex to find signal strength in dBm
    const signalRegex = /signal: (-?\d+) dBm/;
    const match = stdout.match(signalRegex);

    if (match) {
      console.log(
        `WiFi Signal strength: ${match[1]} dBm - Q: ${dBmToPercentage(
          Number(match[1])
        )}%`
      );
    } else {
      console.log("No signal strength information found.");
    }
  });
}
