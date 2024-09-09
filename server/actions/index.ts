"use server";
import { exec } from "child_process";
import fs from "fs/promises";

const batteryPath = "/sys/class/power_supply/BAT0/";

export const getFiles = async (dir: string) => await fs.readdir(dir);

export const getBattery = async () => {
  const statusFile = await fs.readFile(batteryPath + "status");
  const chargeFile = await fs.readFile(batteryPath + "charge_now");
  const chargeFullFile = await fs.readFile(batteryPath + "charge_full");
  return {
    status: statusFile.toString(),
    charge: chargeFile.toString(),
    chargeFull: chargeFullFile.toString(),
  };
  
};

export const toggleScreen = async () => {
  exec("../../toggle-screen.sh");
};
