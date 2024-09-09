import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import fs from "fs";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", async (socket) => {
    console.log("a user connected: ", socket.id);

  });

  setInterval(() => {
    const batteryStatusFile = fs.readFileSync(
      "/sys/class/power_supply/BAT0/status"
    );
    const batteryChargeFile = fs.readFileSync(
      "/sys/class/power_supply/BAT0/charge_now"
    );
    const batteryChargeFullFile = fs.readFileSync(
      "/sys/class/power_supply/BAT0/charge_full"
    );
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
