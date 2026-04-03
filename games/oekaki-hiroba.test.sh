#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FILE="$ROOT/games/oekaki-hiroba.html"

test -f "$FILE" || { echo "FAIL: missing $FILE"; exit 1; }

check() {
  if ! grep -qF "$1" "$FILE"; then
    echo "FAIL: expected: $1"
    exit 1
  fi
}

check "おえかき ひろば"
check 'href="/"'
check "drawCanvas"
check "ぜんぶ けす"
check 'popup-title">スタンプ</p>'
check "summary>スタンプ いちらん</summary>"
check "🐛"
check "💐"
check "🪷"
check "やみなべ"
check "テンプレート"
check "いろ"
check "タッチ"
check "data-popup-open"
check "popupStamps"
check "どうろ"
check "ケーキやさん"
check "ゆうえんち"
check "まちなみ"
check "うみ"
check "うちゅう"
check "おしろ"
check "おはなばたけ"
check "stampAccordion"
check "STAMPS"
check "renderStampAccordion"
check "スタンプ いちらん"
check "sprayAt"
check "data-kind=\"spray\""
check "placeStamp"
check 'ctx.font = "76px sans-serif"'
check "runYaminabe"
check "drawRoadTemplate"
check "drawCakeTemplate"
check "drawParkTemplate"
check "drawCityTemplate"
check "drawSeaTemplate"
check "drawSpaceTemplate"
check "drawCastleTemplate"
check "drawGardenTemplate"
check "こうえん"
check "どうぶつえん"
check "すいぞくかん"
check "びょういん"
check "ショッピング"
check "さばんな"
check "がっこう"
check "やま"
check "ビーチ"
check "drawKouenTemplate"
check "drawZooTemplate"
check "drawAquariumTemplate"
check "drawHospitalTemplate"
check "drawShoppingTemplate"
check "drawSavannaTemplate"
check "drawSchoolTemplate"
check "drawMountainTemplate"
check "drawBeachTemplate"
check "bindPopupControls"
check "closeAllPopups"
check "bgCanvas"
check "var ctx = bgCtx;"
check "ResizeObserver"
check "resizeSnapshotDraw"

python3 - <<PY
import ast
import re
from pathlib import Path
text = (Path("$ROOT") / "games" / "oekaki-hiroba.html").read_text(encoding="utf-8")
m = re.search(r"var STAMPS = \[([\s\S]*?)\];", text)
assert m, "STAMPS array not found"
items = ast.literal_eval("[" + m.group(1).strip() + "]")
assert len(items) == 500, f"expected 500 stamps, got {len(items)}"
assert len(set(items)) == 500, "duplicate stamp strings"
PY

echo "OK: oekaki-hiroba.html checks passed"
