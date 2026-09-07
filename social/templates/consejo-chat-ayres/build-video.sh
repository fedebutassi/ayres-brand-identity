#!/bin/zsh
set -euo pipefail

if (( $# < 3 || $# > 5 )); then
  print -u2 "Uso: zsh build-video.sh <frames-dir> <output-dir> <slug> [a|b] [sufijo]"
  exit 1
fi

frames_dir="${1:A}"
output_dir="${2:A}"
slug="$3"
variant_arg="${4:-}"
suffix="${5:-}"
mkdir -p "$output_dir"

chime="$output_dir/message-chime-original.wav"
ffmpeg -hide_banner -loglevel error -y \
  -f lavfi -i "aevalsrc=0.16*sin(2*PI*1174*t)*exp(-17*t)+0.10*sin(2*PI*1760*t)*exp(-22*t):s=48000:d=0.24" \
  -af "afade=t=out:st=0.16:d=0.08" "$chime"

variants=(a b)
if [[ "$variant_arg" == "a" || "$variant_arg" == "b" ]]; then
  variants=("$variant_arg")
fi

for variant in $variants; do
  output="$output_dir/${slug}-variante-${variant}${suffix}.mp4"
  ffmpeg -hide_banner -loglevel error -y \
    -loop 1 -t 2.0 -i "$frames_dir/variant-${variant}-scene-1.png" \
    -loop 1 -t 2.4 -i "$frames_dir/variant-${variant}-scene-2.png" \
    -loop 1 -t 1.2 -i "$frames_dir/variant-${variant}-scene-3.png" \
    -loop 1 -t 4.0 -i "$frames_dir/variant-${variant}-scene-4.png" \
    -loop 1 -t 2.7 -i "$frames_dir/variant-${variant}-scene-5.png" \
    -i "$chime" -i "$chime" \
    -filter_complex "[0:v]fps=30,format=yuv420p[v0];[1:v]fps=30,format=yuv420p[v1];[2:v]fps=30,format=yuv420p[v2];[3:v]fps=30,format=yuv420p[v3];[4:v]fps=30,format=yuv420p[v4];[v0][v1]xfade=transition=fade:duration=0.25:offset=1.75[x1];[x1][v2]xfade=transition=fade:duration=0.25:offset=3.90[x2];[x2][v3]xfade=transition=fade:duration=0.25:offset=4.85[x3];[x3][v4]xfade=transition=fade:duration=0.25:offset=8.60[v];[5:a]adelay=1800|1800[a0];[6:a]adelay=4900|4900[a1];[a0][a1]amix=inputs=2:duration=longest,apad[a]" \
    -map "[v]" -map "[a]" -t 11.05 -r 30 \
    -c:v libx264 -profile:v high -level 4.1 -pix_fmt yuv420p \
    -c:a aac -b:a 192k -movflags +faststart "$output"
done
