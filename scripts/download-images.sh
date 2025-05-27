#!/bin/bash

echo "Downloading placeholder images..."

# Create images directory if it doesn't exist
mkdir -p public/images

cd public/images

# Download placeholder images from a different source
curl -o placeholder-token.png https://via.placeholder.com/300x200/4CAF50/ffffff?text=Token
sleep 1
curl -o placeholder-launchpad.png https://via.placeholder.com/300x200/2196F3/ffffff?text=Launchpad
sleep 1
curl -o placeholder-portfolio.png https://via.placeholder.com/300x200/FF9800/ffffff?text=Portfolio
sleep 1
curl -o placeholder-leaderboard.png https://via.placeholder.com/300x200/9C27B0/ffffff?text=Leaderboard

# Download favicon
curl -o ../favicon.ico https://via.placeholder.com/32x32/4CAF50/ffffff?text=T

echo "Images downloaded successfully!"
