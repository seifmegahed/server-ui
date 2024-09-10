import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const fileName = file.name;
  const filePath = "/home/seifmegahed/uploads/" + fileName;
  
  // Convert ArrayBuffer to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await fs.writeFile(filePath, buffer);

  return NextResponse.json({ message: "File uploaded successfully" });
}