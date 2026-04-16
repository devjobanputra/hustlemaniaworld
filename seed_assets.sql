-- ============================================================================
-- Hustle Mania — Asset Update Script
-- Run this in your Supabase SQL Editor to map the new t-shirt graphics.
-- ============================================================================

-- Update T-Shirt images to use the new local asset
UPDATE products 
SET images = ARRAY['/image_1.png']
WHERE category = 'tees';

-- Optionally update specific featured hoodies if you have graphics for them
-- UPDATE products SET images = ARRAY['/hoodie_1.png'] WHERE category = 'hoodies' AND featured = true;

-- Update variant thumbnails for the 3D viewer products
UPDATE product_variants
SET thumbnail_url = '/image_1.png'
WHERE product_id IN (SELECT id FROM products WHERE category = 'tees');

-- Verification query
SELECT name, images FROM products WHERE category = 'tees';
