"""Download chosen Wikimedia Commons files at 2400px and record attribution."""
import json, io, os, time, urllib.request, urllib.parse, re
from PIL import Image, ImageOps
UA = {"User-Agent": "HadiSitePhotoResearch/1.0 (https://github.com/P2025edro)"}
API = "https://commons.wikimedia.org/w/api.php"
def get(u, t=90): return urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=t).read()
picks = json.load(open("tools/commons-picks.json"))
os.makedirs("out/commons-photos", exist_ok=True)
meta = []
for name, title in picks.items():
    time.sleep(3)
    q = {"action": "query", "format": "json", "titles": title, "prop": "imageinfo", "iiprop": "url|size|extmetadata", "iiurlwidth": 2400}
    try:
        page = next(iter(json.loads(get(API + "?" + urllib.parse.urlencode(q)))["query"]["pages"].values()))
        ii = page["imageinfo"][0]; em = ii["extmetadata"]
        time.sleep(2)
        im = ImageOps.exif_transpose(Image.open(io.BytesIO(get(ii["thumburl"])))).convert("RGB")
        im.thumbnail((2400, 2400), Image.LANCZOS)
        path = f"out/commons-photos/{name}.jpg"; im.save(path, "JPEG", quality=80, optimize=True, progressive=True)
        clean = lambda k: re.sub("<[^>]+>", "", em.get(k, {}).get("value", "")).strip()
        meta.append({"name": name, "file": f"{name}.jpg", "width": im.size[0], "height": im.size[1], "bytes": os.path.getsize(path),
                     "title": title, "page": ii["descriptionurl"], "artist": clean("Artist"), "license": clean("LicenseShortName"),
                     "license_url": clean("LicenseUrl"), "credit": clean("Credit")[:200]})
        print("ok", name, im.size)
    except Exception as e:
        print("FAIL", name, e)
json.dump(meta, open("out/commons-photos/manifest.json", "w"), indent=1)
