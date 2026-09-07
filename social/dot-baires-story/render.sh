#!/bin/zsh
set -e
ROOT="${0:A:h}"
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --hide-scrollbars --allow-file-access-from-files --window-size=1080,1920 --screenshot="$ROOT/../../generated/dot-baires-alianzas-ayres.png" "file://$ROOT/story.html"
