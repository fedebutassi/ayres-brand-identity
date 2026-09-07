const path = require("path");
const sharp = require("sharp");

const output = path.join(__dirname, "output");
const thumbWidth = 240;
const thumbHeight = 300;
const gap = 20;
const margin = 20;

const buildPreview = async () => {
  const images = await Promise.all(
    Array.from({ length: 7 }, (_, index) =>
      sharp(path.join(output, `gastritis-gatos-slide-${String(index + 1).padStart(2, "0")}.png`))
        .resize(thumbWidth, thumbHeight)
        .png()
        .toBuffer(),
    ),
  );

  const tiles = images.map((input, index) => ({
    input,
    left: margin + (index % 4) * (thumbWidth + gap),
    top: margin + Math.floor(index / 4) * (thumbHeight + gap),
  }));

  await sharp({ create: { width: 1060, height: 660, channels: 3, background: "#161B1F" } })
    .composite(tiles)
    .png()
    .toFile(path.join(output, "gastritis-gatos-preview.png"));
};

buildPreview().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
