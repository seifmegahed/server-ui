import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

import { getBattery } from "./battery";
import { getWifiStatus } from "./wifi";
import { getTemperature } from "./temperature";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  setInterval(async () => {
    getWifiStatus();
    getTemperature();
    console.log();

    io.sockets.emit("battery", getBattery());
  }, 5000);

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
