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
  assert.match(html, /id="btnLineThicknessState"/);
  assert.match(html, /<span class="tool-name">ふとさ<\/span>/);
  assert.match(html, /var lineThicknessKey/);
  assert.match(html, /function effectiveLineW/);
  assert.match(html, /function lineThicknessMul/);
  assert.match(html, /\.thickness-btn/);
});

test("選択ラベルが3文字程度に切り詰められる", () => {
  assert.match(html, /function truncateStateLabel/);
  assert.match(html, /truncateStateLabel\(templateLabel, 3\)/);
  assert.match(html, /truncateStateLabel\(stampLabel, 3\)/);
  assert.match(html, /truncateStateLabel\(sizeLabel, 3\)/);
  assert.match(html, /truncateStateLabel\(thickLabel, 3\)/);
});

test("ツールバーがアイコン+配色のタイル型ボタン構成になっている", () => {
  assert.match(html, /class="tool-btn tool-line"/);
  assert.match(html, /class="tool-btn tool-fill"/);
  assert.match(html, /class="tool-btn tool-touch"/);
  assert.match(html, /class="tool-btn tool-thick"/);
  assert.match(html, /class="tool-btn tool-photo"/);
  assert.match(html, /class="tool-btn tool-template"/);
  assert.match(html, /class="tool-btn tool-stamp"/);
  assert.match(html, /class="tool-btn tool-chaos"/);
  assert.match(html, /class="tool-btn tool-clear"/);
  assert.match(html, /id="btnColorsState"/);
  assert.match(html, /id="btnFillState"/);
  assert.match(html, /id="btnSizesState"/);
  assert.match(html, /id="btnTemplatesState"/);
  assert.match(html, /id="btnStampsState"/);
  assert.doesNotMatch(html, /class="menu-btn"/);
  assert.doesNotMatch(html, /class="action-btn/);
});
