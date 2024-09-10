import fs from "fs";
import { NextResponse, NextRequest } from "next/server";

const folderPath = "/home/seifmegahed/uploads/";

export function GET(
  req: NextRequest,
  { params }: { params: { file: string } }
) {
  const filePath = folderPath + params.file;

  try {
    const fileData = fs.readFileSync(filePath);

    return new NextResponse(fileData, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename=${params.file}`,
      },
    });
  } catch (error) {
    return new NextResponse("File not found", { status: 404 });
  }
}
