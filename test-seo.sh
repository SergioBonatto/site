#!/bin/bash

echo "🔍 Testing SEO Meta Tags for Sergio Bonatto's Portfolio"
echo "=================================================="

URL="https://bonatto.vercel.app"

echo ""
echo "📊 Open Graph Meta Tags:"
echo "------------------------"
curl -s "$URL" | grep -i "og:" | head -10

echo ""
echo "🐦 Twitter Card Meta Tags:"
echo "---------------------------"
curl -s "$URL" | grep -i "twitter:" | head -5

echo ""
echo "🔍 Standard Meta Tags:"
echo "----------------------"
curl -s "$URL" | grep -i "<title>" | head -1
curl -s "$URL" | grep -i 'name="description"' | head -1
curl -s "$URL" | grep -i 'name="keywords"' | head -1

echo ""
echo "📱 Mobile & Theme Tags:"
echo "-----------------------"
curl -s "$URL" | grep -i 'name="viewport"' | head -1
curl -s "$URL" | grep -i 'name="theme-color"' | head -1

echo ""
echo "🔗 Canonical & Robots:"
echo "----------------------"
curl -s "$URL" | grep -i 'rel="canonical"' | head -1
curl -s "$URL/robots.txt" | head -3

echo ""
echo "✅ Test completed! If you see meta tags above, your SEO is properly configured."
