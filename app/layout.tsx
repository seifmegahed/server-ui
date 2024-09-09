import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import BatteryStats from "@/components/battery-stats";
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-screen`}
      >
        <div className="flex justify-between items-center px-8 py-3">
          <div className="text-3xl">SMG Server</div>
          <div className="flex gap-5 items-center">
            <ScreenControls />
            {/* <BatteryStats /> */}
            <BatteryStatsSocket />
          </div>
        </div>
        <div className="bg-primary">{children}</div>
      </body>
    </html>
  );
}
