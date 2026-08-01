import cv2
import numpy as np
from pathlib import Path
from PIL import Image

root = Path.cwd()
src = Path(
    r"C:\Users\Black Lotus\.cursor\projects\c-Site-historia-S-o-Leopoldo-Historia-S-o-Leopoldo\assets\c__Users_Black_Lotus_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-10dd34c0-30dc-48f0-8e60-baf023b21fc8.png"
)

pil = Image.open(src).convert("RGB")
img = cv2.cvtColor(np.array(pil), cv2.COLOR_RGB2BGR)
h, w = img.shape[:2]
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

# Strong red of BICKEL wordmark only, bottom-right
red = cv2.bitwise_or(
    cv2.inRange(hsv, (0, 140, 100), (8, 255, 255)),
    cv2.inRange(hsv, (172, 140, 100), (179, 255, 255)),
)
# Strong brand blue bars
blue = cv2.inRange(hsv, (105, 140, 60), (125, 255, 200))

brand = cv2.bitwise_or(red, blue)
# Restrict search to bottom-right 30%x35%
roi = np.zeros((h, w), np.uint8)
roi[int(h * 0.65) :, int(w * 0.70) :] = 255
brand = cv2.bitwise_and(brand, roi)
brand = cv2.morphologyEx(brand, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8), iterations=3)

ys, xs = np.where(brand > 0)
print("brand pixels", len(xs))
print("raw bbox", xs.min(), ys.min(), xs.max(), ys.max())

# Expand to full card: include white panel between blue bars
x0 = max(0, int(xs.min()) - 10)
y0 = max(0, int(ys.min()) - 8)
x1 = w - 1
y1 = h - 1
print("card box", x0, y0, x1, y1)

mask = np.zeros((h, w), np.uint8)
mask[y0 : y1 + 1, x0 : x1 + 1] = 255

# Sample fill from a clean sidewalk strip left of the card (avoid dirt pile if needed)
sample_x1 = x0 - 5
sample_x0 = max(0, sample_x1 - (x1 - x0 + 1))
sample = img[y0 : y1 + 1, sample_x0:sample_x1]
# If sample width is shorter, tile it
need_w = x1 - x0 + 1
need_h = y1 - y0 + 1
if sample.size == 0 or sample.shape[1] < 10:
    cleaned = cv2.inpaint(img, mask, 6, cv2.INPAINT_TELEA)
else:
    # Resize/tile sample horizontally to cover card width
    tile = np.zeros((need_h, need_w, 3), np.uint8)
    sx = 0
    while sx < need_w:
        chunk = sample[:, : min(sample.shape[1], need_w - sx)]
        # mirror alternate tiles to reduce seam repetition
        if ((sx // max(sample.shape[1], 1)) % 2) == 1:
            chunk = cv2.flip(chunk, 1)
        tile[:, sx : sx + chunk.shape[1]] = chunk
        sx += chunk.shape[1]
    result = img.copy()
    result[y0 : y1 + 1, x0 : x1 + 1] = tile
    # Soft blend at left seam
    feather = min(24, need_w // 4)
    for i in range(feather):
        a = i / feather
        result[y0 : y1 + 1, x0 + i] = (
            (1 - a) * img[y0 : y1 + 1, x0 + i] + a * tile[:, i]
        ).astype(np.uint8)
    # Light blur on the patched region to match photo grain
    blur = cv2.GaussianBlur(result[y0 : y1 + 1, x0 : x1 + 1], (5, 5), 0)
    result[y0 : y1 + 1, x0 : x1 + 1] = blur
    cleaned = result

# Nuke any leftover saturated brand colors in the box
hsv2 = cv2.cvtColor(cleaned, cv2.COLOR_BGR2HSV)
leftover = cv2.bitwise_and(
    cv2.bitwise_or(
        cv2.inRange(hsv2, (0, 120, 90), (10, 255, 255)),
        cv2.bitwise_or(
            cv2.inRange(hsv2, (170, 120, 90), (179, 255, 255)),
            cv2.inRange(hsv2, (105, 120, 50), (125, 255, 210)),
        ),
    ),
    mask,
)
leftover = cv2.dilate(leftover, np.ones((7, 7), np.uint8), iterations=2)
if leftover.any():
    cleaned = cv2.inpaint(cleaned, leftover, 4, cv2.INPAINT_TELEA)

out_dir = root / "public" / "places" / "av-sao-borja-21"
cleaned_rgb = cv2.cvtColor(cleaned, cv2.COLOR_BGR2RGB)
Image.fromarray(cleaned_rgb).save(out_dir / "atual.jpg", quality=93, optimize=True)

# Verify
check = np.array(Image.open(out_dir / "atual.jpg"))
corner = check[y0 : y1 + 1, x0 : x1 + 1]
r, g, b = corner[:, :, 0], corner[:, :, 1], corner[:, :, 2]
print(
    "after reddish",
    ((r > 140) & (g < 90) & (b < 90)).sum(),
    "blueish",
    ((b > 110) & (b > r + 20) & (b > g + 20) & (r < 90)).sum(),
)
Image.fromarray(check[int(h * 0.7) :, int(w * 0.75) :]).save(
    out_dir / "_corner-check.jpg", quality=90
)
print("done")
