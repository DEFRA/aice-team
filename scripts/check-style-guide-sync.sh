#!/usr/bin/env bash
set -euo pipefail

left="plugins/python/skills/style-guide/references/python-style-guide.md"
right="style-guides/python.md"

if [[ ! -f "$left" ]]; then
  echo "Error: missing file $left"
  exit 1
fi
if [[ ! -f "$right" ]]; then
  echo "Error: missing file $right"
  exit 1
fi

# Use git diff --no-index so differences are shown even outside a repo
# Capture output but don't let git's non-zero exit break the script
diff_output="$(git --no-pager diff --no-index --color=never -- "$left" "$right" || true)"
if [[ -n "$diff_output" ]]; then
  echo "::error file=$left::Files differ: $left != $right"
  echo
  echo "$diff_output"
  exit 1
else
  echo "OK: $left is in sync with $right"
  exit 0
fi
