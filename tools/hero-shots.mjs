// Captures the opening arcade at fixed points of its pinned scroll, desktop and mobile.
// Usage: node tools/hero-shots.mjs <outDir> [url]
import { chromium } from 'playwright-core'
import { mkdirSync } from 'node:fs'

const out = process.argv[2] || 'shots'
const url = process.argv[3] || 'http://localhost:5190/'
mkdirSync(out, { recursive: true })

const browser = await chromium.launch({ headless: true, args: ['--use-angle=d3d11'] })
const runs = [
  { name: 'desktop', viewport: { width: 1440, height: 900 }, dpr: 1 },
  { name: 'laptop', viewport: { width: 1280, height: 720 }, dpr: 1 },
  { name: 'tablet', viewport: { width: 820, height: 1180 }, dpr: 1, mobile: true },
  { name: 'mobile', viewport: { width: 390, height: 844 }, dpr: 2, mobile: true },
]
for (const r of runs) {
  const ctx = await browser.newContext({ viewport: r.viewport, deviceScaleFactor: r.dpr, isMobile: !!r.mobile, hasTouch: !!r.mobile, locale: 'pt-BR' })
  const page = await ctx.newPage()
  await page.goto(url, { waitUntil: 'load', timeout: 60000 })
  await page.waitForTimeout(3000)
  const H = r.viewport.height
  for (const [i, f] of [[0, 0], [1, 0.45], [2, 1.0], [3, 1.4]].entries()) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(f[1] * H))
    await page.waitForTimeout(1400)
    await page.screenshot({ path: `${out}/${r.name}-hero-${i}.png` })
  }
  await ctx.close()
}
await browser.close()
