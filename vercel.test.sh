#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
CFG="$ROOT/vercel.json"

test -f "$CFG" || { echo "FAIL: missing $CFG"; exit 1; }

if ! grep -q '{}' "$CFG"; then
  echo "FAIL: vercel.json should be empty object for Next.js"
  exit 1
fi

echo "OK: vercel.json is Next.js-ready"
