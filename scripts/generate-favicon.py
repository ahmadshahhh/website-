"""Generates public/favicon.ico from the Webzivo logo mark.

Pure stdlib: rasterises the mark at 8x, box-downsamples for anti-aliasing and
writes a 32x32 32-bit ICO. Run with `python3 .make-favicon.py`.
"""
import math
import struct
import pathlib

SIZE = 32
SS = 8               # supersample factor
HI = SIZE * SS       # 256

INK = (0x0a, 0x0a, 0x0b)
WHITE = (0xff, 0xff, 0xff)

SCALE = HI / 32.0    # source artwork uses a 32-unit grid (matches icon.svg)
RADIUS = 8 * SCALE   # rounded-square corner radius

# The "W" polyline from the logo, in 32-unit coordinates.
STROKE_PTS = [(6, 10.5), (10.4, 22), (16, 14.2), (21.6, 22), (26, 10.5)]
STROKE_W = 2.8 * SCALE


def dist_to_segment(px, py, ax, ay, bx, by):
    dx, dy = bx - ax, by - ay
    length_sq = dx * dx + dy * dy
    if length_sq == 0:
        return math.hypot(px - ax, py - ay)
    t = max(0.0, min(1.0, ((px - ax) * dx + (py - ay) * dy) / length_sq))
    return math.hypot(px - (ax + t * dx), py - (ay + t * dy))


def inside_rounded_square(x, y):
    """Signed-distance test for a rounded square covering the full canvas."""
    half = HI / 2.0
    qx = abs(x - half) - (half - RADIUS)
    qy = abs(y - half) - (half - RADIUS)
    outside = math.hypot(max(qx, 0.0), max(qy, 0.0))
    return outside - RADIUS <= 0


segments = [
    (STROKE_PTS[i][0] * SCALE, STROKE_PTS[i][1] * SCALE,
     STROKE_PTS[i + 1][0] * SCALE, STROKE_PTS[i + 1][1] * SCALE)
    for i in range(len(STROKE_PTS) - 1)
]
half_stroke = STROKE_W / 2.0

# --- Rasterise at high resolution -------------------------------------------
hi = [[(0, 0, 0, 0)] * HI for _ in range(HI)]
for y in range(HI):
    cy = y + 0.5
    row = hi[y]
    for x in range(HI):
        cx = x + 0.5
        if not inside_rounded_square(cx, cy):
            continue
        on_stroke = any(
            dist_to_segment(cx, cy, *seg) <= half_stroke for seg in segments
        )
        row[x] = (*WHITE, 255) if on_stroke else (*INK, 255)

# --- Box-downsample to 32x32 ------------------------------------------------
pixels = []
for y in range(SIZE):
    for x in range(SIZE):
        r = g = b = a = 0
        for sy in range(SS):
            for sx in range(SS):
                pr, pg, pb, pa = hi[y * SS + sy][x * SS + sx]
                # Premultiply so transparent edges do not darken the result.
                r += pr * pa
                g += pg * pa
                b += pb * pa
                a += pa
        if a == 0:
            pixels.append((0, 0, 0, 0))
        else:
            pixels.append((round(r / a), round(g / a), round(b / a),
                           round(a / (SS * SS))))

# --- Encode as ICO ----------------------------------------------------------
# Pixel rows are stored bottom-up, as BGRA.
xor_data = bytearray()
for y in range(SIZE - 1, -1, -1):
    for x in range(SIZE):
        r, g, b, a = pixels[y * SIZE + x]
        xor_data += bytes((b, g, r, a))

# 1bpp AND mask, 4-byte aligned rows. All zero: alpha channel carries opacity.
and_data = bytes(4 * SIZE)

header = struct.pack("<HHHHHHH", 40, SIZE, SIZE * 2, 1, 32, 0, 0)
header += struct.pack("<IIIII", len(xor_data) + len(and_data), 0, 0, 0, 0)
image = header + bytes(xor_data) + and_data

ico = struct.pack("<HHH", 0, 1, 1)
ico += struct.pack("<BBBBHHII", SIZE, SIZE, 0, 0, 1, 32, len(image), 22)
ico += image

out = pathlib.Path("public/favicon.ico")
out.parent.mkdir(parents=True, exist_ok=True)
out.write_bytes(ico)
print(f"wrote {out} ({len(ico)} bytes)")
