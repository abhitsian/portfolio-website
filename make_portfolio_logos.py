"""Generate small portfolio logos for every project / app in data.js.

Idempotent — run any time to refresh; existing assets/<slug>-logo.png files
are NOT overwritten unless --force is passed. Custom hand-made logos (like
dispatch's) survive re-runs.

Design: 256px rounded-square, vertical gradient background derived
deterministically from the slug, with the project's first 1-2 letters in a
clean monospace face and a subtle corner accent dot — so the index ledger
reads like a coherent design system instead of a wall of placeholder
letters.

Usage:
    python make_portfolio_logos.py            # add missing logos
    python make_portfolio_logos.py --force    # regenerate everything
    python make_portfolio_logos.py --update-data-js   # also patch data.js
"""
from __future__ import annotations

import argparse
import colorsys
import hashlib
import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent
ASSETS = ROOT / "assets"
DATA_JS = ROOT / "data.js"

SIZE = 256
RADIUS = 56


# ---------- pick a deterministic palette per slug ----------

def _hsl_to_rgb(h: float, s: float, l: float) -> tuple[int, int, int]:
    r, g, b = colorsys.hls_to_rgb(h, l, s)
    return int(r * 255), int(g * 255), int(b * 255)


def palette_for(slug: str) -> tuple[tuple[int, int, int], tuple[int, int, int], tuple[int, int, int]]:
    """Return (bg_top, bg_bottom, accent) chosen from the slug's hash so the
    same logo regenerates byte-for-byte across machines and re-runs."""
    h = hashlib.sha1(slug.encode()).digest()
    hue = h[0] / 255.0
    sat = 0.55 + (h[1] / 255.0) * 0.25       # 0.55..0.80 — confident, never washed
    lite_top = 0.34 + (h[2] / 255.0) * 0.10   # darker top
    lite_bot = 0.18 + (h[3] / 255.0) * 0.08   # darker bottom — gradient feels deep
    accent_hue = (hue + 0.5) % 1.0            # complementary
    return (
        _hsl_to_rgb(hue, sat, lite_top),
        _hsl_to_rgb(hue, sat, lite_bot),
        _hsl_to_rgb(accent_hue, 0.75, 0.65),
    )


# ---------- compose one logo ----------

def _glyph_for(name: str) -> str:
    """First letter — or first letter of each word for 2-word names."""
    words = re.split(r"[\s\-_]+", name.strip())
    if len(words) >= 2 and len(words[0]) and len(words[1]):
        return (words[0][0] + words[1][0]).upper()
    return name[:1].upper()


def _gradient(size: int, top: tuple, bot: tuple) -> Image.Image:
    im = Image.new("RGB", (size, size), top)
    d = ImageDraw.Draw(im)
    for y in range(size):
        t = y / (size - 1)
        c = tuple(int(top[i] + (bot[i] - top[i]) * t) for i in range(3))
        d.line([(0, y), (size, y)], fill=c)
    return im


def _rounded_mask(size: int, radius: int) -> Image.Image:
    m = Image.new("L", (size, size), 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, size, size), radius=radius, fill=255)
    return m


def _load_font(size_px: int) -> ImageFont.ImageFont:
    """Find a clean sans/mono on disk — fall back to PIL default if none."""
    for candidate in (
        "/System/Library/Fonts/SFNSMono.ttf",
        "/System/Library/Fonts/Supplemental/Menlo.ttc",
        "/System/Library/Fonts/SFNS.ttf",
        "/Library/Fonts/Arial.ttf",
    ):
        if Path(candidate).exists():
            try:
                return ImageFont.truetype(candidate, size_px)
            except OSError:
                continue
    return ImageFont.load_default()


def render(slug: str, name: str) -> Image.Image:
    top, bot, accent = palette_for(slug)
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))

    bg = _gradient(SIZE, top, bot).convert("RGBA")
    bg.putalpha(_rounded_mask(SIZE, RADIUS))
    img = Image.alpha_composite(img, bg)

    # subtle top highlight for depth
    highlight = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    hd = ImageDraw.Draw(highlight)
    for y in range(int(SIZE * 0.35)):
        a = int(28 * (1 - y / (SIZE * 0.35)))
        hd.line([(0, y), (SIZE, y)], fill=(255, 255, 255, a))
    h_alpha = highlight.split()[3]
    from PIL import ImageChops
    highlight.putalpha(ImageChops.multiply(h_alpha, _rounded_mask(SIZE, RADIUS)))
    img = Image.alpha_composite(img, highlight)

    # glyph — uppercase 1-2 letters, large
    glyph = _glyph_for(name)
    font_size = 130 if len(glyph) == 1 else 100
    font = _load_font(font_size)
    draw = ImageDraw.Draw(img)
    bbox = draw.textbbox((0, 0), glyph, font=font)
    gw, gh = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx = (SIZE - gw) // 2 - bbox[0]
    ty = (SIZE - gh) // 2 - bbox[1] - 8  # nudge up so it looks centered
    # soft glyph shadow
    shadow = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).text((tx + 2, ty + 4), glyph, font=font, fill=(0, 0, 0, 90))
    shadow = shadow.filter(ImageFilter.GaussianBlur(2))
    img = Image.alpha_composite(img, shadow)
    draw = ImageDraw.Draw(img)
    draw.text((tx, ty), glyph, font=font, fill=(255, 255, 255, 240))

    # corner accent dot
    dot_r = 9
    cx_dot, cy_dot = SIZE - 28, 28
    draw.ellipse((cx_dot - dot_r, cy_dot - dot_r, cx_dot + dot_r, cy_dot + dot_r),
                 fill=(*accent, 255))

    return img


# ---------- data.js read/patch ----------

ENTRY_RE = re.compile(r"\{\s*slug\s*:\s*[\"']([^\"']+)[\"'][^{}]*?name\s*:\s*[\"']([^\"']+)[\"']",
                       re.DOTALL)


def discover_entries() -> list[tuple[str, str, bool]]:
    """Return [(slug, name, has_logo)] for every project/app in data.js."""
    text = DATA_JS.read_text()
    out = []
    for m in ENTRY_RE.finditer(text):
        slug, name = m.group(1), m.group(2)
        # peek at the matched object's body to see if logo: already set
        end = text.find("}", m.end())
        body = text[m.start():end]
        has_logo = "logo:" in body
        out.append((slug, name, has_logo))
    return out


def patch_data_js(slug: str) -> bool:
    """Insert `logo:"assets/<slug>-logo.png",` into the slug's entry. Idempotent."""
    text = DATA_JS.read_text()
    needle = f'slug:"{slug}",'
    if needle not in text:
        # try with single quotes / spaces
        needle = re.search(rf'slug\s*:\s*["\']{re.escape(slug)}["\']\s*,', text)
        if not needle:
            return False
        needle = needle.group(0)
    if f'"assets/{slug}-logo.png"' in text:
        return False  # already linked
    new = text.replace(
        needle,
        f'{needle} logo:"assets/{slug}-logo.png",',
        1,
    )
    if new != text:
        DATA_JS.write_text(new)
        return True
    return False


# ---------- main ----------

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--force", action="store_true",
                         help="Regenerate even if logo already exists")
    parser.add_argument("--update-data-js", action="store_true",
                         help="Also patch data.js to add logo: fields")
    args = parser.parse_args()

    ASSETS.mkdir(exist_ok=True)
    entries = discover_entries()
    wrote, patched = [], []

    for slug, name, has_logo in entries:
        out = ASSETS / f"{slug}-logo.png"
        if out.exists() and not args.force:
            pass
        else:
            img = render(slug, name)
            img.save(out)
            wrote.append(slug)
        if args.update_data_js and not has_logo:
            if patch_data_js(slug):
                patched.append(slug)

    print(f"logos written: {len(wrote)}  /  total entries: {len(entries)}")
    if wrote:
        print("  ", ", ".join(wrote))
    if args.update_data_js:
        print(f"data.js patched: {len(patched)}")
        if patched:
            print("  ", ", ".join(patched))


if __name__ == "__main__":
    main()
