"use server";
import fs from "fs/promises";

export const getFiles = async (dir: string) => await fs.readdir(dir);
