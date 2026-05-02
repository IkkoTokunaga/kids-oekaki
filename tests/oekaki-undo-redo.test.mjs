import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = join(__dirname, "..", "games", "oekaki-hiroba.html");
const html = readFileSync(htmlPath, "utf-8");

test("もどす・すすむのボタンUIがある", () => {
  assert.match(html, /id="btnUndo"/);
  assert.match(html, /id="btnRedo"/);
  assert.match(html, /class="tool-btn tool-undo"/);
  assert.match(html, /class="tool-btn tool-redo"/);
  assert.match(html, /<span class="tool-name">もどす<\/span>/);
  assert.match(html, /<span class="tool-name">すすむ<\/span>/);
  assert.match(html, /aria-label="ひとつ もどす"/);
  assert.match(html, /aria-label="ひとつ すすむ"/);
});

test("無効化スタイルが定義されている", () => {
  assert.match(html, /\.tool-btn:disabled/);
  assert.match(html, /\.tool-btn\[aria-disabled="true"\]/);
});

test("履歴スタックと操作関数が実装されている", () => {
  assert.match(html, /var historyStack = \[\]/);
  assert.match(html, /var historyIndex = -1/);
  assert.match(html, /var HISTORY_LIMIT = \d+/);
  assert.match(html, /function snapshotCanvasNative/);
  assert.match(html, /function restoreCanvasNative/);
  assert.match(html, /function pushHistory/);
  assert.match(html, /function applyHistoryEntry/);
  assert.match(html, /function undoHistory/);
  assert.match(html, /function redoHistory/);
  assert.match(html, /function syncHistoryButtons/);
});

test("各操作で履歴がプッシュされる", () => {
  assert.match(html, /if \(wasDrawing\) pushHistory\(\);/);
  assert.match(
    html,
    /if \(activeStamp\)\s*\{\s*placeStamp\(getPoint\(ev\)\);\s*pushHistory\(\);/
  );
  assert.match(html, /clearCanvasWhite\(\);\s*pushHistory\(\);/);
  assert.match(html, /runYaminabe\(\);\s*pushHistory\(\);/);
  assert.match(html, /closeAllPopups\(\);\s*pushHistory\(\);/);
});

test("もどす・すすむボタンのクリックがハンドリングされている", () => {
  assert.match(
    html,
    /document\.getElementById\("btnUndo"\)\.addEventListener\("click", function \(\) \{\s*undoHistory\(\);/
  );
  assert.match(
    html,
    /document\.getElementById\("btnRedo"\)\.addEventListener\("click", function \(\) \{\s*redoHistory\(\);/
  );
});

test("Ctrl+Z / Ctrl+Shift+Z / Ctrl+Y のショートカット対応がある", () => {
  assert.match(html, /undoHistory\(\);/);
  assert.match(html, /redoHistory\(\);/);
  assert.match(html, /ev\.ctrlKey \|\| ev\.metaKey/);
  assert.match(html, /ev\.shiftKey/);
});

test("初回ロード時に初期状態を履歴に積む", () => {
  assert.match(
    html,
    /window\.addEventListener\("load", function \(\) \{[\s\S]*?syncSize\(\);[\s\S]*?updateMenuLabels\(\);[\s\S]*?pushHistory\(\);/
  );
});
