import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import fs from "fs";

import { exec } from "child_process";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

function dBmToPercentage(dBm) {
  if (dBm >= -50) return 100; // Excellent signal
  if (dBm >= -60) return 80;  // Good signal
  if (dBm >= -70) return 60;  // Fair signal
  if (dBm >= -80) return 40;  // Weak signal
  return 20;                  // Very weak signal
}


function getWifiStatus() {
  exec("sudo iw dev wlp3s0 link", (err, stdout, stderr) => {
    if (err) {
      console.error(`Error: ${stderr}`);
      return;
    }

    // Regex to find signal strength in dBm
    const signalRegex = /signal: (-?\d+) dBm/;
    const match = stdout.match(signalRegex);

    if (match) {
      const signalStrength = dBmToPercentage(match[1]);
      console.log(`Signal strength: ${signalStrength}%`);
    } else {
      console.log("No signal strength information found.");
    }
  });
}

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", async (socket) => {
    console.log("a user connected: ", socket.id);
  });

  setInterval(async () => {
    const batteryStatusFile = fs.readFileSync(
      "/sys/class/power_supply/BAT0/status"
    );
    const batteryChargeFile = fs.readFileSync(
      "/sys/class/power_supply/BAT0/charge_now"
    );
    const batteryChargeFullFile = fs.readFileSync(
      "/sys/class/power_supply/BAT0/charge_full"
    );

    // getWifiStatus();

    const chargeRatio =
      Number(batteryChargeFile) / Number(batteryChargeFullFile);
    const chargeStep = Math.round(chargeRatio * 3);
    const charge = Math.max(Math.min(Math.round(chargeRatio * 100), 100), 0);
    io.sockets.emit("battery", {
      status: batteryStatusFile.toString(),
      charge,
      chargeStep,
    });
  }, 1000);

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
