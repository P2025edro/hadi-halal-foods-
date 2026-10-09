"""Download selected CC0 StockSnap photos at high resolution, normalise them for the web,
record licence/credit metadata, and build a review sheet."""
import json, io, os, urllib.request, urllib.parse
from PIL import Image, ImageDraw, ImageFont, ImageOps
UA = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126 Safari/537.36"}
def get(u, t=90):
    r = urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=t)
    return r.read(), r.geturl(), r.headers.get("content-type", "")
sel = json.load(open("tools/selection.json"))
os.makedirs("out/photos", exist_ok=True); os.makedirs("out/review", exist_ok=True)
meta, log, cache = [], [], {}
for s in sel:
    q = s["q"]
    if q not in cache:
        u = "https://api.openverse.org/v1/images/?" + urllib.parse.urlencode({"q": q, "source": "stocksnap", "page_size": 40})
        cache[q] = json.loads(get(u)[0])["results"]
    m = next((p for p in cache[q] if s["id"] in p["url"]), None)
    best = None
    for cand in [f"https://stocksnap.io/download-photo/{s['id']}", f"https://cdn.stocksnap.io/img-thumbs/2880w/{s['id']}.jpg",
                 f"https://cdn.stocksnap.io/img-thumbs/1920w/{s['id']}.jpg", f"https://cdn.stocksnap.io/img-thumbs/1280w/{s['id']}.jpg",
                 f"https://cdn.stocksnap.io/img-thumbs/960w/{s['id']}.jpg"]:
        try:
            data, final, ct = get(cand)
            im = Image.open(io.BytesIO(data)); im.load()
            log.append(f"{s['name']} {cand} -> {final} {im.size}")
            if not best or im.size[0] > best[0].size[0]: best = (im, cand)
            if im.size[0] >= 2400: break
        except Exception as e:
            log.append(f"{s['name']} {cand} FAIL {e}")
    if not best: continue
    im = ImageOps.exif_transpose(best[0]).convert("RGB")
    im.thumbnail((2400, 2400), Image.LANCZOS)
    path = f"out/photos/{s['name']}.jpg"
    im.save(path, "JPEG", quality=80, optimize=True, progressive=True)
    meta.append({"name": s["name"], "file": f"{s['name']}.jpg", "width": im.size[0], "height": im.size[1], "bytes": os.path.getsize(path),
                 "stocksnap_id": s["id"], "title": m and m["title"], "creator": m and m["creator"], "creator_url": m and m.get("creator_url"),
                 "source_page": m and m["foreign_landing_url"], "license": m and m["license"], "downloaded_from": best[1]})
json.dump(meta, open("out/photos/manifest.json", "w"), indent=1)
open("out/photos/fetch-log.txt", "w").write("\n".join(log))
# Review sheet: 3 columns, 600px tiles, labelled
font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 18)
tiles = []
for m in meta:
    im = Image.open(f"out/photos/{m['file']}"); im.thumbnail((600, 420)); tiles.append((m, im))
cols, W, H = 3, 610, 450
for page in range(0, len(tiles), 9):
    chunk = tiles[page:page+9]; rows = (len(chunk)+cols-1)//cols
    sheet = Image.new("RGB", (cols*W, rows*H), "white"); d = ImageDraw.Draw(sheet)
    for i, (m, im) in enumerate(chunk):
        x, y = (i % cols)*W, (i//cols)*H
        sheet.paste(im, (x+5, y+5)); d.text((x+8, y+H-28), f"{m['name']} {m['width']}x{m['height']} {m['bytes']//1024}KB", fill="black", font=font)
    sheet.save(f"out/review/selection-{page//9}.jpg", quality=85)
print("\n".join(log))
