import { readFile } from "node:fs/promises";
import { join } from "node:path";

async function loadLegacyOekakiHtml(): Promise<string> {
  const sourcePath = join(process.cwd(), "games", "oekaki-hiroba.html");
  return readFile(sourcePath, "utf-8");
}

export default async function OekakiPage() {
  const srcDoc = await loadLegacyOekakiHtml();

  return (
    <main className="h-dvh w-full">
      <iframe
        title="おえかき"
        srcDoc={srcDoc}
        className="h-full w-full border-0"
        sandbox="allow-scripts allow-same-origin"
      />
    </main>
  );
}
