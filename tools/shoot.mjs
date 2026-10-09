import { chromium } from "playwright";
import fs from "node:fs";
const base = process.env.BASE || "https://hadi-halal-foods.vercel.app";
const routes = ["/", "/about", "/categories", "/categories/halal-food-and-meat", "/gallery", "/contact", "/privacy", "/credits", "/nope"];
fs.mkdirSync("out/shots", { recursive: true });
const b = await chromium.launch();
const log = [];
for (const w of [1440, 768, 390]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: "reduce" });
  const p = await ctx.newPage();
  p.on("pageerror", (e) => log.push(`${w} pageerror ${e.message}`));
  p.on("console", (m) => m.type() === "error" && log.push(`${w} console ${m.text()}`));
  for (const r of routes) {
    const res = await p.goto(base + r, { waitUntil: "networkidle" });
    for (let y = 0; y < (await p.evaluate(() => document.body.scrollHeight)); y += 500) { await p.evaluate((yy) => window.scrollTo(0, yy), y); await p.waitForTimeout(120); }
    await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForLoadState("networkidle"); await p.waitForTimeout(600);
    const info = await p.evaluate(() => ({ overflow: document.documentElement.scrollWidth - innerWidth, broken: Array.from(document.images).filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src), title: document.title }));
    log.push(`${w} ${r} ${res.status()} overflow=${info.overflow} broken=${info.broken.length} "${info.title}"`);
    await p.screenshot({ path: `out/shots/${w}${r.replace(/\//g, "_") || "_"}.png`, fullPage: true });
  }
  await ctx.close();
}
await b.close();
fs.writeFileSync("out/shots/log.txt", log.join("\n"));
console.log(log.join("\n"));
