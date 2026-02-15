const { chromium } = require('playwright');

(async () => {
  console.log('start');
  const browser = await chromium.launch({
    headless: true,
    args: ['--use-gl=angle', '--use-angle=swiftshader'],
  });
  console.log('launched');
  const page = await browser.newPage();
  await page.goto('http://localhost:4173', { waitUntil: 'domcontentloaded' });
  console.log('goto');
  await page.waitForTimeout(300);

  await page.keyboard.down('Space');
  await page.evaluate(async () => {
    await window.advanceTime(1000 / 60);
  });
  await page.keyboard.up('Space');
  console.log('input done');

  await page.evaluate(async () => {
    for (let i = 0; i < 10; i += 1) {
      await window.advanceTime(1000 / 60);
    }
  });
  console.log('advance loop done');

  const state = await page.evaluate(() => window.render_game_to_text());
  console.log('state len', state.length);

  console.log('before dataurl');
  const dataUrlInfo = await page.evaluate(() => {
    const c = document.querySelector('canvas');
    const t0 = performance.now();
    const data = c.toDataURL('image/png');
    return { len: data.length, ms: Number((performance.now() - t0).toFixed(2)) };
  });
  console.log('after dataurl', dataUrlInfo);

  await browser.close();
  console.log('closed');
  process.exit(0);
})();
