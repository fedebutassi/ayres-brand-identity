#!/bin/zsh
set -euo pipefail
cd "${0:A:h}"
ffmpeg -hide_banner -loglevel error -y \
  -loop 1 -t 3 -i frames/scene-1.png -loop 1 -t 3 -i frames/scene-2.png \
  -loop 1 -t 3 -i frames/scene-3.png -loop 1 -t 3 -i frames/scene-4.png \
  -loop 1 -t 3 -i frames/scene-5.png -loop 1 -t 3 -i frames/scene-6.png \
  -filter_complex "[0:v]fps=30,format=yuv420p[v0];[1:v]fps=30,format=yuv420p[v1];[2:v]fps=30,format=yuv420p[v2];[3:v]fps=30,format=yuv420p[v3];[4:v]fps=30,format=yuv420p[v4];[5:v]fps=30,format=yuv420p[v5];[v0][v1]xfade=transition=fade:duration=0.35:offset=2.65[x1];[x1][v2]xfade=transition=fade:duration=0.35:offset=5.3[x2];[x2][v3]xfade=transition=fade:duration=0.35:offset=7.95[x3];[x3][v4]xfade=transition=fade:duration=0.35:offset=10.6[x4];[x4][v5]xfade=transition=fade:duration=0.35:offset=13.25[v]" \
  -map "[v]" -t 15.9 -r 30 -c:v libx264 -profile:v high -level 4.1 -pix_fmt yuv420p -movflags +faststart reel-cachorro-alimento-adulto.mp4
