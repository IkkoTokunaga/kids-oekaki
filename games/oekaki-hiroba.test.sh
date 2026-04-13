#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FILE="$ROOT/games/oekaki-hiroba.html"
JSON="$ROOT/oekaki-stamps.json"
NEXT_PAGE="$ROOT/app/oekaki/page.tsx"
NEXT_ROUTE="$ROOT/app/oekaki-stamps.json/route.ts"

test -f "$FILE" || { echo "FAIL: missing $FILE"; exit 1; }
test -f "$JSON" || { echo "FAIL: missing $JSON"; exit 1; }
test -f "$NEXT_PAGE" || { echo "FAIL: missing $NEXT_PAGE"; exit 1; }
test -f "$NEXT_ROUTE" || { echo "FAIL: missing $NEXT_ROUTE"; exit 1; }

check() {
  if ! grep -qF "$1" "$FILE"; then
    echo "FAIL: expected: $1"
    exit 1
  fi
}

check "おえかき ひろば"
check "drawCanvas"
check "ぜんぶ けす"
check 'popup-title">スタンプ</p>'
check "やみなべ"
check "テンプレート"
check "いろ"
check "🎨 せん:"
check "refreshCanvasCursor"
check "btnFill"
check "popupFillColors"
check "fillSwatchMount"
check "cloneFillSwatches"
check "floodFillAt"
check "🪣 ぬる"
check "ぬる いろ"
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
check "renderStampAccordion"
check "buildStampUI"
check "stamp-tabs"
check "data-stamp-tab"
check "oekaki-stamps.json"
check "stampsJsonUrl"
check "setStampTab"
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
grep -q 'srcDoc' "$NEXT_PAGE" || { echo "FAIL: Next page should embed legacy HTML via srcDoc"; exit 1; }
grep -q 'allow-scripts allow-same-origin' "$NEXT_PAGE" || { echo "FAIL: iframe sandbox settings missing"; exit 1; }
grep -q 'application/json' "$NEXT_ROUTE" || { echo "FAIL: Next route should return JSON content-type"; exit 1; }

python3 - <<PY
import json
from pathlib import Path
data = json.loads(Path("$JSON").read_text(encoding="utf-8"))
tabs = data.get("tabs")
assert isinstance(tabs, list) and len(tabs) >= 9, "tabs"
labels = {t.get("label") for t in tabs}
assert "かお・きもち" in labels
seen = set()
total = 0
for t in tabs:
    st = t.get("stamps") or []
    for c in st:
        assert c not in seen, f"duplicate char in json: {c!r}"
        seen.add(c)
        total += 1
assert total >= 3500, f"expected large emoji set (~3.7k+), got {total}"

#  variation selector 除きの重複がないこと
norm_seen = set()
for t in tabs:
    for c in t.get("stamps") or []:
        n = c.replace("\ufe0f", "")
        assert n not in norm_seen, f"norm duplicate: {n!r}"
        norm_seen.add(n)
PY

echo "OK: oekaki-hiroba.html checks passed"
