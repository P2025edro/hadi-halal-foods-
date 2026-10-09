"""Search Wikimedia Commons for large, openly licensed photos and build labelled contact sheets."""
import json, io, os, re, time, urllib.request, urllib.parse, concurrent.futures as cf
from PIL import Image, ImageDraw, ImageFont
UA = {"User-Agent": "HadiSitePhotoResearch/1.0 (https://github.com/P2025edro; contact via repo)"}
API = "https://commons.wikimedia.org/w/api.php"
OK = re.compile(r"^(CC0|Public domain|PD|CC BY \d|CC BY-SA \d)", re.I)
def get(u, t=60):
    return urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=t).read()
font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 14)
jobs = json.load(open("tools/commons-queries.json"))
os.makedirs("out/commons", exist_ok=True)
db = {}
for job in jobs:
    params = {"action": "query", "format": "json", "generator": "search", "gsrnamespace": 6, "gsrlimit": 30,
              "gsrsearch": job["q"] + " filew:>2800 filetype:bitmap", "prop": "imageinfo",
              "iiprop": "url|size|extmetadata", "iiurlwidth": 400}
    time.sleep(4)
    try:
        data = json.loads(get(API + "?" + urllib.parse.urlencode(params)))
    except Exception as e:
        print(job["key"], "ERR", e); continue
    items = []
    for p in sorted(data.get("query", {}).get("pages", {}).values(), key=lambda p: p.get("index", 0)):
        ii = p["imageinfo"][0]; em = ii.get("extmetadata", {})
        lic = em.get("LicenseShortName", {}).get("value", "")
        if not OK.match(lic): continue
        artist = re.sub("<[^>]+>", "", em.get("Artist", {}).get("value", "")).strip()
        items.append({"i": len(items), "title": p["title"], "w": ii["width"], "h": ii["height"], "url": ii["url"],
                      "thumb": ii.get("thumburl"), "page": ii["descriptionurl"], "license": lic, "artist": artist})
    db[job["key"]] = items
    def th(p):
        try: return Image.open(io.BytesIO(get(p["thumb"]))).convert("RGB")
        except Exception: return None
    ims = []
    for p in items:
        ims.append(th(p)); time.sleep(0.4)
    W, H, cols = 300, 210, 5; rows = max(1, (len(items)+cols-1)//cols)
    sheet = Image.new("RGB", (cols*W, rows*(H+22)), "white"); d = ImageDraw.Draw(sheet)
    for p, im in zip(items, ims):
        x, y = (p["i"] % cols)*W, (p["i"]//cols)*(H+22)
        if im: im.thumbnail((W-6, H-6)); sheet.paste(im, (x+3, y+3))
        d.text((x+4, y+H+3), f"#{p['i']} {p['w']}x{p['h']} {p['license'][:12]}", fill="black", font=font)
    sheet.save(f"out/commons/{job['key']}.jpg", quality=80); print(job["key"], len(items))
json.dump(db, open("out/commons/candidates.json", "w"), indent=1)
