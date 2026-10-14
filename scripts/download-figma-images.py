#!/usr/bin/env python3
"""Download every image fill used in figma/pages.json into public/img/.

Usage:  FIGMA_TOKEN=xxxx python3 scripts/download-figma-images.py

The token is read from the environment only; it is never written to disk.
Files are named after the Figma layer, e.g. "cardboard_no_shadow 1" -> cardboard-no-shadow-1.png
"""
import json, os, re, sys, urllib.request

FILE_KEY = "Syv1JN100VeyFR6SWhlHns"
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
token = os.environ.get("FIGMA_TOKEN")
if not token:
    sys.exit("Set FIGMA_TOKEN first.")

pages = json.load(open(os.path.join(root, "figma", "pages.json")))
refs = {}  # imageRef -> layer name (first seen)


def walk(n):
    if n.get("visible", True) is False:
        return
    for f in n.get("fills", []) or []:
        if f["type"] == "IMAGE":
            refs.setdefault(f["imageRef"], n["name"])
    for c in n.get("children", []) or []:
        walk(c)


for v in pages["nodes"].values():
    walk(v["document"])


def get(url, headers=None):
    req = urllib.request.Request(url, headers=headers or {})
    with urllib.request.urlopen(req) as r:
        return r.read()


# one call returns a temporary URL for every image fill in the file
meta = json.loads(get(f"https://api.figma.com/v1/files/{FILE_KEY}/images", {"X-Figma-Token": token}))
urls = meta["meta"]["images"]

out = os.path.join(root, "public", "img")
os.makedirs(out, exist_ok=True)
used = set()
manifest = {}
for ref, name in refs.items():
    url = urls.get(ref)
    if not url:
        print("missing", name)
        continue
    slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")[:48] or "image"
    base, i = slug, 2
    while slug in used:
        slug = f"{base}-{i}"
        i += 1
    used.add(slug)
    data = get(url)
    ext = "png" if data[:4] == b"\x89PNG" else "jpg" if data[:2] == b"\xff\xd8" else "gif" if data[:3] == b"GIF" else "webp" if data[8:12] == b"WEBP" else "bin"
    with open(os.path.join(out, f"{slug}.{ext}"), "wb") as fh:
        fh.write(data)
    manifest[ref] = f"{slug}.{ext}"
    print(f"{slug}.{ext}  {len(data)//1024}KB")

json.dump(manifest, open(os.path.join(root, "figma", "image-manifest.json"), "w"), indent=1)
print(f"\n{len(manifest)} images saved to public/img/")
