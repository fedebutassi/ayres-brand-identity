const path = require("path");
const { pathToFileURL } = require("url");
const { chromium } = require("playwright");

const root = __dirname;
const output = path.join(root, "output");
const pageUrl = pathToFileURL(path.join(root, "carousel.html")).href;

const render = async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });

  for (let slide = 1; slide <= 7; slide += 1) {
    await page.goto(`${pageUrl}?slide=${slide}`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: path.join(output, `gastritis-gatos-slide-${String(slide).padStart(2, "0")}.png`),
      type: "png",
    });
  }

  await browser.close();
};

render().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
