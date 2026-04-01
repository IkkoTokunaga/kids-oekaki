#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FILE="$ROOT/games/suuji-quiz-game.html"

test -f "$FILE" || { echo "FAIL: missing $FILE"; exit 1; }

count=$(grep -c '{ q:' "$FILE" || true)
if [ "$count" -lt 35 ]; then
  echo "FAIL: expected at least 35 questions in POOL, got $count"
  exit 1
fi

check() {
  if ! grep -qF "$1" "$FILE"; then
    echo "FAIL: expected: $1"
    exit 1
  fi
}

check "すうじ クイズ"
check 'href="index.html"'
check "var ROUNDS = 10"
check "shufflePick"
check "pinpon"
check "bubuu"

echo "OK: suuji-quiz-game.html checks passed"
