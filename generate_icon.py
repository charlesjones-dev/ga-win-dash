#!/usr/bin/env python3
"""
Generate Windows .ico app icon with GA text on blue background.
Matches the GA Mac Dashboard icon style.
"""
from PIL import Image, ImageDraw, ImageFont
import os

# Windows .ico requires these sizes
SIZES = [16, 24, 32, 48, 64, 128, 256]

# Colors matching the Mac version
BLUE = (0, 122, 255)
WHITE = (255, 255, 255)


def create_icon(size: int) -> Image.Image:
    """Create a single icon image at the given size."""
    img = Image.new('RGBA', (size, size), BLUE)
    draw = ImageDraw.Draw(img)

    font_size = int(size * 0.5)

    # Try Windows system fonts, then fallback
    font = None
    font_paths = [
        'C:/Windows/Fonts/arialbd.ttf',
        'C:/Windows/Fonts/arial.ttf',
        'C:/Windows/Fonts/segoeui.ttf',
    ]

    for font_path in font_paths:
        try:
            font = ImageFont.truetype(font_path, font_size)
            break
        except (OSError, IOError):
            continue

    if font is None:
        font = ImageFont.load_default()

    text = "GA"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    x = (size - text_width) // 2 - bbox[0]
    y = (size - text_height) // 2 - bbox[1]

    draw.text((x, y), text, fill=WHITE, font=font)

    return img


def main():
    output_dir = "resources"
    os.makedirs(output_dir, exist_ok=True)

    print("Generating Windows app icon...")

    # Create images at all required sizes
    images = []
    for size in SIZES:
        img = create_icon(size)
        images.append(img)
        print(f"  Created {size}x{size}")

    # Save as .ico with all sizes embedded
    ico_path = os.path.join(output_dir, "icon.ico")
    images[0].save(
        ico_path,
        format='ICO',
        sizes=[(s, s) for s in SIZES],
        append_images=images[1:]
    )

    print(f"\nIcon saved to {ico_path}")
    print("Done!")


if __name__ == "__main__":
    main()
