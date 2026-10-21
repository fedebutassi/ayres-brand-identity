#!/usr/bin/env bash
set -euo pipefail

REPO="$(cd "$(dirname "$0")/../../.." && pwd)"
REEL="$REPO/AYRES-MKT-REFORMA/produccion/reels/fawna-3-gatos/fawna-3-gatos"
FRAMES="$REEL/frames"
MOTION="$REEL/motion"
OUT="$REEL/reel-fawna-3-gatos.mp4"
SCENE_SECS=3.5
TRANS_SECS=0.6

ffmpeg -y \
  -loop 1 -t "$SCENE_SECS" -i "$FRAMES/01.png" \
  -loop 1 -t "$SCENE_SECS" -i "$FRAMES/02.png" \
  -loop 1 -t "$SCENE_SECS" -i "$FRAMES/03.png" \
  -loop 1 -t "$SCENE_SECS" -i "$FRAMES/04.png" \
  -loop 1 -t "$SCENE_SECS" -i "$FRAMES/05.png" \
  -filter_complex "
    [0:v]fade=t=in:st=0:d=0.4[s0];
    [1:v]fade=t=in:st=0:d=${TRANS_SECS}:alpha=1[s1a];
    [s0][s1a]overlay=enable='between(t,${SCENE_SECS}-${TRANS_SECS},${SCENE_SECS})'[t01];
    [t01]trim=0:${SCENE_SECS},setpts=PTS-STARTPTS[v0];
    [1:v]fade=t=in:st=0:d=0.4[s1];
    [2:v]fade=t=in:st=0:d=${TRANS_SECS}:alpha=1[s2a];
    [s1][s2a]overlay=enable='between(t,${SCENE_SECS}-${TRANS_SECS},${SCENE_SECS})'[t12];
    [t12]trim=0:${SCENE_SECS},setpts=PTS-STARTPTS[v1];
    [2:v]fade=t=in:st=0:d=0.4[s2];
    [3:v]fade=t=in:st=0:d=${TRANS_SECS}:alpha=1[s3a];
    [s2][s3a]overlay=enable='between(t,${SCENE_SECS}-${TRANS_SECS},${SCENE_SECS})'[t23];
    [t23]trim=0:${SCENE_SECS},setpts=PTS-STARTPTS[v2];
    [3:v]fade=t=in:st=0:d=0.4[s3];
    [4:v]fade=t=in:st=0:d=${TRANS_SECS}:alpha=1[s4a];
    [s3][s4a]overlay=enable='between(t,${SCENE_SECS}-${TRANS_SECS},${SCENE_SECS})'[t34];
    [t34]trim=0:${SCENE_SECS},setpts=PTS-STARTPTS[v3];
    [4:v]fade=t=out:st=$((${SCENE_SECS%.*})):d=0.6[v4];
    [v0][v1][v2][v3][v4]concat=n=5:v=1:a=0[out]
  " \
  -map "[out]" -c:v libx264 -pix_fmt yuv420p -r 30 -crf 18 -preset slow \
  "$OUT"

echo "Video generado: $OUT"
