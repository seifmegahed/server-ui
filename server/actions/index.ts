"use server";
import fs from "fs/promises";

const batteryPath = "/sys/class/power_supply/BAT0/";

export const getFiles = async (dir: string) => await fs.readdir(dir);

export const getBattery = async () => await fs.readFile(batteryPath + "status");
