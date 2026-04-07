import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function GET() {
  const jsonPath = join(process.cwd(), "oekaki-stamps.json");
  const data = await readFile(jsonPath, "utf-8");

  return new Response(data, {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
