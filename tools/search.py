"""Search openly licensed photos (Openverse) and build labelled contact sheets."""
import json, sys, io, os, urllib.request, urllib.parse, concurrent.futures as cf
from PIL import Image, ImageDraw, ImageFont

UA = {"User-Agent": "Mozilla/5.0 (hadi-site photo research)"}
def fetch(u, t=60):
    return urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=t).read()

jobs = json.load(open("tools/queries.json"))
os.makedirs("out/sheets", exist_ok=True)
db = {}
try:
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 15)
except Exception:
    font = None
for job in jobs:
    key, q, src = job["key"], job["q"], job.get("source", "stocksnap")
    lic = job.get("license", "cc0,pdm,by")
    u = "https://api.openverse.org/v1/images/?" + urllib.parse.urlencode(
        {"q": q, "source": src, "license": lic, "page_size": job.get("n", 20), "mature": "false", "aspect_ratio": job.get("aspect", "")} if job.get("aspect") else
        {"q": q, "source": src, "license": lic, "page_size": job.get("n", 20), "mature": "false"})
    try:
        res = json.loads(fetch(u))["results"]
    except Exception as e:
        print(key, "ERR", e); continue
    items = [{"i": i, "id": p["id"], "title": p["title"], "url": p["url"], "w": p.get("width"), "h": p.get("height"),
              "lic": p["license"], "lic_ver": p.get("license_version"), "by": p.get("creator"), "by_url": p.get("creator_url"),
              "land": p["foreign_landing_url"], "src": p["source"]} for i, p in enumerate(res)]
    db[key] = items
    def thumb(p):
        try:
            return Image.open(io.BytesIO(fetch(f"https://api.openverse.org/v1/images/{p['id']}/thumb/"))).convert("RGB")
        except Exception:
            return None
    with cf.ThreadPoolExecutor(12) as ex:
        ims = list(ex.map(thumb, items))
    W, H, cols = 300, 200, 5
    rows = max(1, (len(items) + cols - 1) // cols)
    sheet = Image.new("RGB", (cols * W, rows * (H + 24)), "white")
    d = ImageDraw.Draw(sheet)
    for p, im in zip(items, ims):
        x, y = (p["i"] % cols) * W, (p["i"] // cols) * (H + 24)
        if im:
            im.thumbnail((W - 6, H - 6)); sheet.paste(im, (x + 3, y + 3))
        d.text((x + 4, y + H + 3), f"#{p['i']} {p['w']}x{p['h']} {p['lic']}", fill="black", font=font)
    sheet.save(f"out/sheets/{key}.jpg", quality=80)
    print(key, len(items))
json.dump(db, open("out/candidates.json", "w"), indent=1)
