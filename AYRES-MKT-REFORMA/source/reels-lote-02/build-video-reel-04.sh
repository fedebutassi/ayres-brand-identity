#!/bin/zsh
# Reel 04 — Gato adulto, esterilizado o urinario (clave B2B).
# Mismo pipeline que build-video-reel-07.sh; la ficha pide 22–28 s → 23,1 s.
set -euo pipefail

source_dir="${0:A:h}"
repo_root="${source_dir:h:h:h}"
reel_id="04-gato-adulto-esterilizado-urinario"
reel_dir="$repo_root/AYRES-MKT-REFORMA/produccion/reels/lote-02/$reel_id"
frames="$reel_dir/frames"
motion="$reel_dir/motion"
output="$reel_dir/$reel_id-1080x1920.mp4"
chime="$reel_dir/audio-original.wav"

ffmpeg -hide_banner -loglevel error -y \
  -f lavfi -i "aevalsrc=0.12*sin(2*PI*880*t)*exp(-14*t)+0.07*sin(2*PI*1320*t)*exp(-19*t):s=48000:d=0.35" \
  -af "afade=t=out:st=0.22:d=0.12" "$chime"

# Duraciones por escena: 4.6, 4.9, 4.9, 5.0, 4.8 → total 23.1 s
ffmpeg -hide_banner -loglevel error -y \
  -loop 1 -t 0.45 -i "$motion/01-start.png" \
  -loop 1 -t 4.6 -i "$frames/01.png" \
  -loop 1 -t 0.45 -i "$motion/02-start.png" \
  -loop 1 -t 4.9 -i "$frames/02.png" \
  -loop 1 -t 0.45 -i "$motion/03-start.png" \
  -loop 1 -t 4.9 -i "$frames/03.png" \
  -loop 1 -t 0.45 -i "$motion/04-start.png" \
  -loop 1 -t 5.0 -i "$frames/04.png" \
  -loop 1 -t 0.45 -i "$motion/05-start.png" \
  -loop 1 -t 4.8 -i "$frames/05.png" \
  -i "$chime" -i "$chime" -i "$chime" \
  -filter_complex "[0:v]fps=30,format=yuv420p[s0];[1:v]fps=30,format=yuv420p[f0];[s0][f0]xfade=transition=fade:duration=0.45:offset=0[v0];[2:v]fps=30,format=yuv420p[s1];[3:v]fps=30,format=yuv420p[f1];[s1][f1]xfade=transition=fade:duration=0.45:offset=0[v1];[4:v]fps=30,format=yuv420p[s2];[5:v]fps=30,format=yuv420p[f2];[s2][f2]xfade=transition=fade:duration=0.45:offset=0[v2];[6:v]fps=30,format=yuv420p[s3];[7:v]fps=30,format=yuv420p[f3];[s3][f3]xfade=transition=fade:duration=0.45:offset=0[v3];[8:v]fps=30,format=yuv420p[s4];[9:v]fps=30,format=yuv420p[f4];[s4][f4]xfade=transition=fade:duration=0.45:offset=0[v4];[v0][v1]xfade=transition=fade:duration=0.28:offset=4.32[x1];[x1][v2]xfade=transition=fade:duration=0.28:offset=8.94[x2];[x2][v3]xfade=transition=fade:duration=0.28:offset=13.56[x3];[x3][v4]xfade=transition=fade:duration=0.28:offset=18.28[v];[10:a]adelay=4320|4320[a0];[11:a]adelay=13560|13560[a1];[12:a]adelay=18280|18280[a2];[a0][a1][a2]amix=inputs=3:duration=longest,apad[a]" \
  -map "[v]" -map "[a]" -t 23.1 -r 30 \
  -c:v libx264 -profile:v high -level 4.1 -pix_fmt yuv420p \
  -c:a aac -b:a 160k -movflags +faststart "$output"
print "Generado: $output"
