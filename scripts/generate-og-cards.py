"""
Generate 1200x630 PNG share cards (Open Graph / Twitter / LinkedIn) into public/og/.

Usage (from the repo root, on a machine with Pillow and the Segoe UI fonts):
    npm run og-data > og-data.json
    python scripts/generate-og-cards.py og-data.json

The PNGs are committed, so this only needs re-running when a title, subtitle,
result metric or tag changes, or when a case study or article is added.
"""
import json
import os
import sys

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, "public")
W, H = 1200, 630

BG = (15, 17, 21)
BRAND = (79, 70, 229)
BRAND_2 = (124, 58, 237)
BRAND_LIGHT = (165, 180, 252)
TEXT = (250, 250, 250)
TEXT_2 = (161, 161, 170)
TEXT_3 = (113, 113, 122)
CHIP_BORDER = (63, 63, 70)
CHIP_BG = (24, 26, 32)

FONT_DIR = os.environ.get("WINDIR", r"C:\Windows") + r"\Fonts"
BOLD = os.path.join(FONT_DIR, "segoeuib.ttf")
REGULAR = os.path.join(FONT_DIR, "segoeui.ttf")
SEMI = os.path.join(FONT_DIR, "seguisb.ttf")
if not os.path.exists(SEMI):
    SEMI = BOLD


def font(path, size):
    return ImageFont.truetype(path, size)


def wrap(draw, text, fnt, max_width):
    words = text.split()
    lines, cur = [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if draw.textlength(trial, font=fnt) <= max_width:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def fit_text(draw, text, path, max_size, min_size, max_width, max_lines):
    size = max_size
    while size >= min_size:
        fnt = font(path, size)
        lines = wrap(draw, text, fnt, max_width)
        if len(lines) <= max_lines:
            return fnt, lines
        size -= 2
    fnt = font(path, min_size)
    lines = wrap(draw, text, fnt, max_width)[:max_lines]
    if len(lines) == max_lines:
        last = lines[-1]
        while draw.textlength(last + "…", font=fnt) > max_width and " " in last:
            last = last.rsplit(" ", 1)[0]
        lines[-1] = last + "…"
    return fnt, lines


def background():
    img = Image.new("RGB", (W, H), BG)
    # soft brand glow, top-right
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    g = ImageDraw.Draw(glow)
    g.ellipse((W - 520, -260, W + 180, 380), fill=BRAND + (70,))
    g.ellipse((W - 300, 120, W + 260, 640), fill=BRAND_2 + (40,))
    glow = glow.filter(ImageFilter.GaussianBlur(120))
    img = Image.alpha_composite(img.convert("RGBA"), glow)
    # left accent bar with vertical gradient
    bar = Image.new("RGBA", (14, H))
    bd = ImageDraw.Draw(bar)
    for y in range(H):
        t = y / (H - 1)
        c = tuple(int(BRAND[i] * (1 - t) + BRAND_2[i] * t) for i in range(3)) + (255,)
        bd.line((0, y, 14, y), fill=c)
    img.paste(bar, (0, 0), bar)
    return img


def draw_chips(draw, chips, x, y, max_x):
    fnt = font(SEMI, 24)
    pad_x, pad_y, gap = 20, 12, 14
    for chip in chips:
        tw = draw.textlength(chip, font=fnt)
        cw = tw + pad_x * 2
        if x + cw > max_x:
            break
        draw.rounded_rectangle((x, y, x + cw, y + 24 + pad_y * 2), radius=14, fill=CHIP_BG, outline=CHIP_BORDER, width=2)
        draw.text((x + pad_x, y + pad_y - 3), chip, font=fnt, fill=TEXT)
        x += cw + gap


def circle_photo(path, size):
    photo = Image.open(path).convert("RGB")
    side = min(photo.size)
    left = (photo.width - side) // 2
    photo = photo.crop((left, 0, left + side, side)).resize((size, size), Image.LANCZOS)
    mask = Image.new("L", (size * 4, size * 4), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size * 4 - 1, size * 4 - 1), fill=255)
    mask = mask.resize((size, size), Image.LANCZOS)
    ring = Image.new("RGBA", (size + 16, size + 16), (0, 0, 0, 0))
    ImageDraw.Draw(ring).ellipse((0, 0, size + 15, size + 15), fill=BRAND + (255,))
    out = Image.new("RGBA", (size + 16, size + 16), (0, 0, 0, 0))
    out.paste(ring, (0, 0), ring)
    out.paste(photo, (8, 8), mask)
    return out


def render(card):
    img = background()
    draw = ImageDraw.Draw(img)
    left = 80
    text_right = W - 80
    if card["kind"] == "default":
        photo = circle_photo(os.path.join(PUBLIC, "photo", "Rohit Jain.jpg"), 300)
        img.paste(photo, (W - 80 - photo.width, 120), photo)
        draw = ImageDraw.Draw(img)
        text_right = W - 80 - photo.width - 60

    draw.text((left, 64), card["eyebrow"].upper(), font=font(SEMI, 24), fill=BRAND_LIGHT)

    title_font, title_lines = fit_text(draw, card["title"], BOLD, 66 if card["kind"] == "default" else 58, 36, text_right - left, 3)
    y = 112
    for line in title_lines:
        draw.text((left, y), line, font=title_font, fill=TEXT)
        y += int(title_font.size * 1.18)

    y += 14
    sub_font, sub_lines = fit_text(draw, card["subtitle"], REGULAR, 30, 24, text_right - left, 3 if card["kind"] == "default" else 2)
    for line in sub_lines:
        draw.text((left, y), line, font=sub_font, fill=TEXT_2)
        y += int(sub_font.size * 1.35)

    draw_chips(draw, card["chips"], left, H - 150, W - 80)

    footer = "Rohit Jain  ·  AI Engineer  ·  www.rohitjain.net"
    if card["kind"] == "default":
        footer = "Production RAG, Agents and LLMOps  ·  17 years enterprise architecture  ·  www.rohitjain.net"
    draw.text((left, H - 64), footer, font=font(REGULAR, 22), fill=TEXT_3)

    out = os.path.join(PUBLIC, card["file"].lstrip("/").replace("/", os.sep))
    os.makedirs(os.path.dirname(out), exist_ok=True)
    img.convert("RGB").save(out, "PNG", optimize=True)
    return out


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    with open(sys.argv[1], encoding="utf-8") as f:
        cards = json.load(f)
    for card in cards:
        print("wrote", os.path.relpath(render(card), ROOT))


if __name__ == "__main__":
    main()
