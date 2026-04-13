import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = join(__dirname, "..", "games", "oekaki-hiroba.html");
const html = readFileSync(htmlPath, "utf-8");

test("おえかきひろばにふとさUIとロジックがある", () => {
  assert.match(html, /id="btnLineThickness"/);
  assert.match(html, /id="popupLineThickness"/);
  assert.match(html, /data-thickness="xthin"/);
  assert.match(html, /data-thickness="thin"/);
  assert.match(html, /data-thickness="normal"/);
  assert.match(html, /data-thickness="thick"/);
  assert.match(html, /data-thickness="xthick"/);
  assert.match(html, /📏 ふとさ:/);
  assert.match(html, /var lineThicknessKey/);
  assert.match(html, /function effectiveLineW/);
  assert.match(html, /function lineThicknessMul/);
  assert.match(html, /\.thickness-btn/);
});
