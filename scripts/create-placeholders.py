from PIL import Image, ImageDraw, ImageFont
import os

def create_placeholder(text, color, size=(300, 200)):
    # Create a new image with the specified color
    img = Image.new('RGB', size, color)
    
    # Get a drawing context
    draw = ImageDraw.Draw(img)
    
    # Load a font (you might need to adjust the path based on your system)
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 40)
    except:
        font = ImageFont.load_default()
    
    # Calculate text position
    if font:
        bbox = font.getbbox(text)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
    else:
        bbox = draw.getbbox(text)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
    x = (size[0] - text_width) // 2
    y = (size[1] - text_height) // 2
    
    # Draw the text
    draw.text((x, y), text, font=font, fill="white")
    
    return img

# Create images directory if it doesn't exist
os.makedirs('public/images', exist_ok=True)

# Create placeholder images
images = {
    'placeholder-token.png': ('Token', '#4CAF50'),
    'placeholder-launchpad.png': ('Launchpad', '#2196F3'),
    'placeholder-portfolio.png': ('Portfolio', '#FF9800'),
    'placeholder-leaderboard.png': ('Leaderboard', '#9C27B0'),
}

# Generate each image
for filename, (text, color) in images.items():
    img = create_placeholder(text, color)
    img.save(f'public/images/{filename}')

# Create favicon
favicon = Image.new('RGB', (32, 32), '#4CAF50')
favicon.save('public/favicon.ico')

print("Placeholder images created successfully!")
