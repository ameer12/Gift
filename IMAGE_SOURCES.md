# Image Sources

## Real Product Images

All product images are now sourced from **Unsplash**, a high-quality, royalty-free image platform.

### Image Categories

**Electronics:**
- Wireless Headphones
- Smart Watches
- Bluetooth Speakers
- Fitness Trackers
- Laptops & Phones

**Fashion:**
- Designer Handbags
- Silk Scarves
- Leather Wallets
- Sunglasses
- Watches & Accessories

**Home & Living:**
- Candles & Diffusers
- Throw Blankets
- Coffee Makers
- Home Decor

**Books:**
- Book Collections
- Cookbooks
- Art Books
- Journals

**Toys:**
- Gaming Consoles
- Board Games
- LEGO Sets
- Educational Toys

**Food & Beverages:**
- Gourmet Chocolates
- Premium Tea Sets
- Coffee Collections
- Gift Baskets

## Image Quality

- **Resolution:** 800px width, optimized for web
- **Quality:** 80% compression for fast loading
- **Format:** WebP/JPEG with fallbacks
- **Responsive:** Multiple crop variations for different views

## Benefits

✅ **Professional Quality:** High-resolution product photography
✅ **Fast Loading:** Optimized file sizes
✅ **Consistent Style:** Curated aesthetic across all products
✅ **Royalty-Free:** No licensing concerns
✅ **CDN Delivery:** Fast global access via Unsplash CDN

## Usage

Images are automatically assigned based on product category. The system includes:
- Primary product image
- 4 alternative views (different crops)
- Fallback to category-appropriate images
- Automatic error handling with placeholder generation

## Updating Images

To update product images:
1. Edit `backend/scripts/seedData.js` or `seedDataLarge.js`
2. Add `imageUrl` field to gift templates
3. Run seed script: `node backend/scripts/seedData.js`

Example:
```javascript
{
  name: 'Product Name',
  category: 'Electronics',
  price: 99.99,
  description: 'Product description',
  imageUrl: 'https://images.unsplash.com/photo-xxxxx?w=800&q=80'
}
```

## Image Credits

All images are from [Unsplash](https://unsplash.com) - Beautiful, free images and photos.
