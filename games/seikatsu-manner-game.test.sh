#!/usr/bin/env bash
# せいかつマナーすごろくHTMLの必須要素チェック（Docker不要）
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FILE="$ROOT/games/seikatsu-manner-game.html"

test -f "$FILE" || { echo "FAIL: missing $FILE"; exit 1; }

count=$(grep -c 'correctIndex:' "$FILE" || true)
if [ "$count" -ne 50 ]; then
  echo "FAIL: expected 50 quiz entries (correctIndex), got $count"
  exit 1
fi

check() {
  if ! grep -qF "$1" "$FILE"; then
    echo "FAIL: expected substring not found: $1"
    exit 1
  fi
}

check "href=\"/\""
check "TOPへ もどる"
check "げんかんでは くつを ぬいだら"
check "げんかんに はいったら うわぎは"
check "そろえる"
check "いただきます"
check "かして、といいます"
check "せいかい"
check "ざんねん"
check "もういちど"
check "var state = {"
check "questionIndex"
check "stepsCompleted"
check "playPinpon"
check "playBubuu"
check "var TOTAL_STEPS = 10"
check "var ROUNDS_PER_GAME = 10"
check "burstConfetti"
check "confettiLayer"
check "QUIZ_POOL"
check "pickRoundQuizzes"
check "ROUNDS_PER_GAME"

echo "OK: seikatsu-manner-game.html structure checks passed"
