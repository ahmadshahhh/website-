"""Derives the header logo assets from the master brand file.

The supplied logo (public/logo.jpeg) is a square, stacked lockup on a flat
light-grey background:

    [ WB monogram ]
    [   WEBZIVO   ]
    [ WEB DESIGN AGENCY ]
    [  ESTD. 2026  ]

A site header is ~40px tall, at which the bottom two lines render around 2px
and become unreadable, and the grey backdrop shows as a box against the white
header. So the header instead uses a horizontal lockup built from the same
artwork: the monogram and the WEBZIVO wordmark, cropped out individually with
the grey turned into transparency.

Run after replacing public/logo.jpeg:

    pip install pillow
    python3 scripts/generate-logo-assets.py

If you swap in a differently-laid-out logo, the block bounds are detected
automatically and printed, so check the output before committing.
"""

from PIL import Image

SOURCE = "public/logo.jpeg"
INK_THRESHOLD = 140  # anything clearly darker than the background counts as ink
BLOCK_GAP = 12  # vertical blank rows that separate one lockup element from the next


def find_blocks(gray: Image.Image):
    """Locate each horizontal band of artwork, top to bottom."""
    width, height = gray.size
    px = gray.load()

    rows = [
        y
        for y in range(height)
        if any(px[x, y] < INK_THRESHOLD for x in range(0, width, 2))
    ]
    if not rows:
        raise SystemExit("No artwork found - is the logo on a light background?")

    blocks, start, previous = [], rows[0], rows[0]
    for y in rows[1:]:
        if y - previous > BLOCK_GAP:
            blocks.append((start, previous))
            start = y
        previous = y
    blocks.append((start, previous))

    # Add horizontal bounds for each band.
    bounded = []
    for top, bottom in blocks:
        cols = [
            x
            for x in range(width)
            if any(px[x, y] < INK_THRESHOLD for y in range(top, bottom + 1))
        ]
        bounded.append((cols[0], top, cols[-1], bottom))
    return bounded


def export(gray: Image.Image, background: int, box, out_path: str, label: str):
    """Crop a block and convert the flat grey background into alpha, leaving
    black artwork with smooth anti-aliased edges."""
    # 2px of margin so anti-aliased edges are not clipped.
    left, top, right, bottom = box
    crop = gray.crop((left - 2, top - 2, right + 2, bottom + 2))
    width, height = crop.size
    cpx = crop.load()

    out = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    opx = out.load()
    for y in range(height):
        for x in range(width):
            alpha = round((background - cpx[x, y]) / background * 255)
            alpha = max(0, min(255, alpha))
            if alpha:
                opx[x, y] = (0, 0, 0, alpha)

    out.save(out_path, "PNG", optimize=True)
    print(f"  {label}: {width}x{height} -> {out_path}")


def main():
    gray = Image.open(SOURCE).convert("L")
    width, height = gray.size
    px = gray.load()

    background = round(
        sum(px[x, y] for x, y in [(5, 5), (width - 6, 5), (5, height - 6), (width - 6, height - 6)])
        / 4
    )
    print(f"source: {width}x{height}, background level {background}")

    blocks = find_blocks(gray)
    print(f"detected {len(blocks)} stacked elements:")
    for index, (x0, y0, x1, y1) in enumerate(blocks):
        print(f"  [{index}] x {x0}-{x1}  y {y0}-{y1}")

    if len(blocks) < 2:
        raise SystemExit("Expected at least a monogram and a wordmark.")

    print("exporting:")
    export(gray, background, blocks[0], "public/logo-mark.png", "monogram")
    export(gray, background, blocks[1], "public/logo-wordmark.png", "wordmark")


if __name__ == "__main__":
    main()
