import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import ScreenControls from "@/components/screen-controls";
import BatteryStatsSocket from "@/components/battery-stats-socket";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  icons: [{ rel: "icon", url: "/favicon.svg" }],
  title: "SMG",
  description: "SMG Server UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-screen`}
      >
        <div className="flex justify-between items-center px-5 py-3 border-b  ">
          <div className="text-2xl font-bold">SMG Server</div>
          <div className="flex gap-3 items-center">
            <BatteryStatsSocket />
            <ScreenControls />
          </div>
        </div>
        <div>{children}</div>
      </body>
    </html>
  );
}
