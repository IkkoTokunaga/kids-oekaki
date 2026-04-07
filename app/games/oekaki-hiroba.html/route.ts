import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function GET() {
  const htmlPath = join(process.cwd(), "games", "oekaki-hiroba.html");
  const html = await readFile(htmlPath, "utf-8");

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-cache",
    },
  });
}
