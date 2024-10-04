import fs from "fs";
import { NextResponse } from "next/server";

const filePath = "/home/seifmegahed/.local/share/mkcert/rootCA.pem";

export function GET() {
  try {
    const fileData = fs.readFileSync(filePath);

    return new NextResponse(fileData, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": "attachment; filename=rootCA.pem",
      },
    });
  } catch (error) {
    return new NextResponse("File not found", { status: 404 });
  }
}
