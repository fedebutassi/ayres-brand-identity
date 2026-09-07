#!/bin/zsh
set -e
ROOT="${0:A:h}"
mkdir -p "$ROOT/../../generated"
for slide in {1..7}; do
  padded=$(printf "%02d" "$slide")
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --hide-scrollbars --allow-file-access-from-files --window-size=1080,1350 --screenshot="$ROOT/../../generated/probioticos-perros-slide-${padded}.png" "file://$ROOT/carousel.html?slide=$slide"
done
