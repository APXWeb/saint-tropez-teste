// Full-page capture with prefers-reduced-motion: the static layout, desktop and mobile.
// Usage: node tools/static-shot.mjs <outDir> [url]
import { chromium } from 'playwright-core'
import { mkdirSync } from 'node:fs'

const out = process.argv[2] || 'shots'
const url = process.argv[3] || 'http://localhost:5190/'
mkdirSync(out, { recursive: true })
const browser = await chromium.launch({ headless: true })
for (const r of [{ name: 'desktop', width: 1440, height: 900 }, { name: 'mobile', width: 390, height: 844 }]) {
  const ctx = await browser.newContext({ viewport: { width: r.width, height: r.height }, reducedMotion: 'reduce', locale: 'pt-BR' })
  const page = await ctx.newPage()
  await page.goto(url, { waitUntil: 'load' })
  // Every image painted before the shot: eager, then decoded.
  await page.evaluate(async () => {
    const imgs = [...document.images]
    imgs.forEach((i) => (i.loading = 'eager'))
    await Promise.all(imgs.map((i) => i.decode().catch(() => {})))
  })
  await page.waitForTimeout(800)
  await page.screenshot({ path: `${out}/static-${r.name}.png`, fullPage: true })
  await ctx.close()
}
await browser.close()
