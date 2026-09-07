#!/usr/bin/env python3
"""Quita el fondo blanco conectado al borde y amplía los envases sin reemplazarlos."""

import json
from pathlib import Path
import sys
from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[3]
SOURCE_DIR = ROOT / "infoproductos" / "productosimg"
OUTPUT_DIR = Path(__file__).resolve().parent / "assets" / "cutouts-exactos"
FOREGROUND_DISTANCE = 34
TARGET_LONG_SIDE = 1500
MANUAL_MASK_POINTS = {
    "op-pn-kitten": [
        (0.145, 0.045), (0.855, 0.015), (0.915, 0.095),
        (0.99, 0.955), (0.93, 0.99), (0.05, 0.975),
        (0.035, 0.40), (0.09, 0.13),
    ],
    "company-gatitos": [
        (0.14, 0.04), (0.84, 0.01), (0.92, 0.12),
        (0.97, 0.97), (0.91, 0.995), (0.035, 0.97),
        (0.025, 0.60), (0.06, 0.39), (0.12, 0.09),
    ],
    "kongo-gold-cachorros-todas-razas": [
        # La cara frontal superior es blanca y el detector automático la
        # confundía con el fondo, eliminando el vértice superior izquierdo.
        (0.14, 0.05), (0.86, 0.025), (0.91, 0.14),
        (0.995, 0.95), (0.975, 0.985), (0.94, 0.995),
        (0.045, 0.995), (0.015, 0.97), (0.01, 0.45),
        (0.04, 0.24), (0.09, 0.10),
    ],
}


def is_foreground(pixel):
    red, green, blue, _ = pixel
    return max(255 - red, 255 - green, 255 - blue) >= FOREGROUND_DISTANCE


def convex_hull(points):
    points = sorted(set(points))
    if len(points) <= 1:
        return points

    def cross(origin, first, second):
        return (first[0] - origin[0]) * (second[1] - origin[1]) - (first[1] - origin[1]) * (second[0] - origin[0])

    lower = []
    for point in points:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], point) <= 0:
            lower.pop()
        lower.append(point)

    upper = []
    for point in reversed(points):
        while len(upper) >= 2 and cross(upper[-2], upper[-1], point) <= 0:
            upper.pop()
        upper.append(point)
    return lower[:-1] + upper[:-1]


def product_mask(image):
    pixels = image.load()
    points = [
        (x, y)
        for y in range(0, image.height, 2)
        for x in range(0, image.width, 2)
        if is_foreground(pixels[x, y])
    ]
    hull = convex_hull(points)
    if len(hull) < 3:
        raise ValueError("No se pudo calcular la silueta del producto")
    mask = Image.new("L", image.size, 0)
    ImageDraw.Draw(mask).polygon(hull, fill=255)
    return mask.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(0.4))


def natural_meat_mask(image):
    width, height = image.size
    relative_points = [
        (0.12, 0.04), (0.86, 0.01), (0.90, 0.04),
        (0.995, 0.93), (0.97, 0.98), (0.94, 0.995),
        (0.05, 0.995), (0.015, 0.96), (0.01, 0.42),
        (0.035, 0.22), (0.08, 0.09),
    ]
    points = [(round(x * width), round(y * height)) for x, y in relative_points]
    mask = Image.new("L", image.size, 0)
    ImageDraw.Draw(mask).polygon(points, fill=255)
    return mask.filter(ImageFilter.GaussianBlur(0.45))


def manual_product_mask(image, relative_points):
    width, height = image.size
    points = [(round(x * width), round(y * height)) for x, y in relative_points]
    mask = Image.new("L", image.size, 0)
    ImageDraw.Draw(mask).polygon(points, fill=255)
    return mask.filter(ImageFilter.GaussianBlur(0.45))


def mask_for_product(image, product_id):
    if product_id.startswith("natural-meat-"):
        return natural_meat_mask(image)
    if product_id in MANUAL_MASK_POINTS:
        return manual_product_mask(image, MANUAL_MASK_POINTS[product_id])
    return product_mask(image)


def resize_to_target(image):
    scale = TARGET_LONG_SIDE / max(image.size)
    size = tuple(max(1, round(dimension * scale)) for dimension in image.size)
    return image.resize(size, Image.Resampling.LANCZOS)


def prepare(source, destination):
    image = Image.open(source).convert("RGBA")
    image.putalpha(mask_for_product(image, source.stem))
    bounding_box = image.getbbox()
    if not bounding_box:
        raise ValueError(f"No se detectó producto en {source.name}")
    cropped = image.crop(bounding_box)
    resize_to_target(cropped).save(destination, optimize=True)


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    product_file = ROOT / "infoproductos" / "productos.json"
    available_ids = [product["id"] for product in json.loads(product_file.read_text())["productos"]]
    product_ids = sys.argv[1:] or available_ids
    unknown_ids = set(product_ids) - set(available_ids)
    if unknown_ids:
        raise ValueError(f"IDs inexistentes: {', '.join(sorted(unknown_ids))}")
    for product_id in product_ids:
        source = SOURCE_DIR / f"{product_id}.png"
        destination = OUTPUT_DIR / source.name
        prepare(source, destination)
        print(f"Preparado: {source.stem}")


if __name__ == "__main__":
    main()
