# Server UI
Web UI for local Ubuntu Server on a Macbook Pro 13" 2011

The goal is to have some access to the server from a GUI.

This project uses websockets to get the server stats like battery, wifi, temperature, etc. and display them on the UI.
The Frontend and the non-websocket backend is written in Next.js.

The websockets are implemented in `websockets` folder, and it uses `socket.io` to create a websocket server, and spins up the Next.js server on the same port.

## Features

- Battery status
- Wifi signal strength
- Temperature
- Toggle display backlight
- Upload files
- Download files


## Installation

```bash
pnpm install
```

## Usage

Development:

```bash
pnpm dev
```

Production:

```bash
pnpm build
pnpm start
```

## Important Notes

This project is built for a Macbook Pro 13" 2011 running Ubuntu Server 24.04 LTS. It will need some tweaks to work on other machines.
Some functions use `sudo` to access the wifi interface, and some use `iw` to get the wifi signal strength. These commands need to be setup on the server. Some functions use custom bash scripts to that are available at [github](https://github.com/seifmegahed/bash-scripts).

## License

MIT License