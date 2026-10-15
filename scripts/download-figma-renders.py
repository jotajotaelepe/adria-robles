#!/usr/bin/env python3
"""Render the five page frames from Figma as PNGs into figma/renders/ so the build can be compared against the design.

Usage:  FIGMA_TOKEN=xxxx python3 scripts/download-figma-renders.py
"""
import json, os, sys, urllib.parse, urllib.request

FILE_KEY = "Syv1JN100VeyFR6SWhlHns"
FRAMES = {"home": "1:2", "about": "4:40", "home-long": "6:191", "mobile-home": "25:94", "mobile-about": "27:162"}

token = os.environ.get("FIGMA_TOKEN")
if not token:
    sys.exit("Set FIGMA_TOKEN first.")

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
out = os.path.join(root, "figma", "renders")
os.makedirs(out, exist_ok=True)


def get(url, headers=None):
    req = urllib.request.Request(url, headers=headers or {})
    with urllib.request.urlopen(req) as r:
        return r.read()


q = urllib.parse.urlencode({"ids": ",".join(FRAMES.values()), "format": "png", "scale": "0.5"})
res = json.loads(get(f"https://api.figma.com/v1/images/{FILE_KEY}?{q}", {"X-Figma-Token": token}))
for name, nid in FRAMES.items():
    url = res["images"].get(nid)
    if not url:
        print("missing", name)
        continue
    data = get(url)
    open(os.path.join(out, f"{name}.png"), "wb").write(data)
    print(f"{name}.png  {len(data)//1024}KB")
