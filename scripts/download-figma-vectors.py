#!/usr/bin/env python3
"""Export the hand-drawn vector shapes (badge blob, squiggle) from Figma as SVG into public/svg/.

Usage:  FIGMA_TOKEN=xxxx python3 scripts/download-figma-vectors.py
"""
import json, os, sys, urllib.request, urllib.parse

FILE_KEY = "Syv1JN100VeyFR6SWhlHns"
NODES = {
    "badge": "3:27",  # blob behind "Hello!" / "Later!" (same shape on every page; color set in CSS)
    "squiggle": "16:16",  # the double-hump mark that sits beside project images
}

token = os.environ.get("FIGMA_TOKEN")
if not token:
    sys.exit("Set FIGMA_TOKEN first.")

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
out = os.path.join(root, "public", "svg")
os.makedirs(out, exist_ok=True)


def get(url, headers=None):
    req = urllib.request.Request(url, headers=headers or {})
    with urllib.request.urlopen(req) as r:
        return r.read()


ids = ",".join(NODES.values())
q = urllib.parse.urlencode({"ids": ids, "format": "svg", "svg_outline_text": "false"})
res = json.loads(get(f"https://api.figma.com/v1/images/{FILE_KEY}?{q}", {"X-Figma-Token": token}))
for name, nid in NODES.items():
    url = res["images"].get(nid)
    if not url:
        print("missing", name, nid)
        continue
    data = get(url)
    with open(os.path.join(out, f"{name}.svg"), "wb") as fh:
        fh.write(data)
    print(f"{name}.svg  {len(data)} bytes")
