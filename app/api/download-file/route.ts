import fs from "fs";

const mp3FilePath = "/home/seifmegahed/test-file.mp3";

export function GET() {
  const response = new Response(fs.readFileSync(mp3FilePath), {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": "attachment; filename=test-file.mp3",
    },
  });
  return response;
}
