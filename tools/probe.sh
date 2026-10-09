set -x
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'
mkdir -p out/probe && cd out/probe
curl -sL -A "$UA" -o page.html -w '%{http_code} %{url_effective}\n' https://stocksnap.io/photo/RXWC2PDCQQ
grep -oE 'https?://[^"'"'"' ]*(RXWC2PDCQQ)[^"'"'"' ]*' page.html | sort -u
grep -oiE '[^"]*download[^"]*' page.html | sort -u | head -30
curl -sIL -A "$UA" -e https://stocksnap.io/photo/food-eat-RXWC2PDCQQ https://stocksnap.io/download-photo/RXWC2PDCQQ | head -30
curl -s -o ov.json -w '%{http_code}\n' "https://api.openverse.org/v1/images/?q=food%20eat&source=stocksnap&page_size=20"
head -c 400 ov.json
