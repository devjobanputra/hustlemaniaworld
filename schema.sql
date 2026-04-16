CREATE TYPE product_category AS ENUM ('tees', 'hoodies', 'accessories');

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL NOT NULL,
  compare_at_price DECIMAL,
  category product_category NOT NULL,
  badge TEXT,
  is_new BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  material TEXT NOT NULL,
  fit TEXT NOT NULL,
  details TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  sizes TEXT[] DEFAULT '{}',
  out_of_stock_sizes TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Variant mapping (Color mapping to specific GLB models)
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  color_name TEXT NOT NULL, -- e.g., 'Obsidian Black'
  color_hex TEXT NOT NULL, -- e.g., '#1A1919'
  glb_url TEXT, -- Path to 3D model for this variant
  thumbnail_url TEXT
);

-- Note: In this iteration, we combine sizes/images into the products table to match the existing Data Types of 'Product'.
-- Run the following exact inserts to seed the mock data:

INSERT INTO products (slug, name, description, price, compare_at_price, category, badge, featured, is_new, material, fit, details, images, sizes, out_of_stock_sizes) VALUES
('obsidian-box-tee', 'Obsidian Box Tee', 'The signature oversized box-fit tee. Washed black heavy cotton with centered Hustle Mania emblem. A staple of controlled rebellion.', 2499, 3499, 'tees', 'BEST SELLER', true, false, '100% Organic Cotton, 240 GSM', 'Oversized Box Fit', ARRAY['Oversized box fit', '240 GSM heavy cotton', 'Enzyme washed', 'Screen-printed emblem', 'Ribbed collar'], ARRAY['/image_1.png'], ARRAY['S', 'M', 'L', 'XL', 'XXL'], ARRAY[]::TEXT[]),
('precision-hoodie', 'Precision Hoodie', 'Engineered for the streets. Heavyweight French terry with a structured hood and bold back print. Warmth meets statement.', 4999, NULL, 'hoodies', 'NEW DROP', true, true, '80% Cotton, 20% Polyester, 380 GSM', 'Oversized', ARRAY['Oversized fit', '380 GSM French terry', 'Structured double-layer hood', 'Kangaroo pocket', 'Puff print back graphic'], ARRAY['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop&q=80'], ARRAY['S', 'M', 'L', 'XL', 'XXL'], ARRAY['XXL']),
('strike-graphic-tee', 'Strike Graphic Tee', 'The red strike motif meets oversized comfort. A visual disruption on pitch-black cotton.', 1999, NULL, 'tees', NULL, true, true, '100% Combed Cotton, 200 GSM', 'Relaxed Oversized', ARRAY['Relaxed oversized fit', '200 GSM combed cotton', 'DTG printed graphic', 'Double-stitched hems', 'Pre-shrunk'], ARRAY['/image_1.png'], ARRAY['S', 'M', 'L', 'XL', 'XXL'], ARRAY[]::TEXT[]),
('noir-essentials-tee', 'Noir Essentials Tee', 'Pure minimalism. No logos, no noise — just premium weight and perfect drape.', 1799, NULL, 'tees', NULL, false, false, '100% Ring-spun Cotton, 220 GSM', 'Drop Shoulder Oversized', ARRAY['Drop shoulder oversized', '220 GSM ring-spun cotton', 'Garment dyed', 'Tagless neck label', 'Side-seam construction'], ARRAY['/image_1.png'], ARRAY['S', 'M', 'L', 'XL', 'XXL'], ARRAY['S']),
('syndicate-zip-hoodie', 'Syndicate Zip Hoodie', 'Full zip, full attitude. Heavy fleece with embroidered details and matte metal hardware.', 5499, 6999, 'hoodies', 'LIMITED', true, true, '75% Cotton, 25% Polyester, 400 GSM', 'Relaxed', ARRAY['Relaxed fit', '400 GSM fleece', 'YKK matte zipper', 'Embroidered chest logo', 'Ribbed cuffs and hem'], ARRAY['https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?w=800&h=1000&fit=crop', 'https://images.unsplash.com/photo-1542406775-ade58c52d2e4?w=800&h=1000&fit=crop'], ARRAY['M', 'L', 'XL', 'XXL'], ARRAY[]::TEXT[]),
('hustle-bucket-hat', 'Hustle Bucket Hat', 'Washed cotton canvas with tonal embroidery. Street-ready headwear for the committed.', 1299, NULL, 'accessories', NULL, false, false, '100% Cotton Canvas', 'Unisex', ARRAY['Unisex fit', 'Washed canvas', 'Tonal logo embroidery', 'Grommeted ventilation', 'Packable design'], ARRAY['https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=800&h=1000&fit=crop', 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=800&h=1000&fit=crop&q=80'], ARRAY['M', 'L'], ARRAY[]::TEXT[]),
('voltage-oversized-tee', 'Voltage Oversized Tee', 'High-voltage back print on acid-washed black. For those who want to be seen from every angle.', 2299, NULL, 'tees', 'NEW DROP', false, true, '100% Cotton, 240 GSM, Acid Washed', 'Extreme Oversized', ARRAY['Extreme oversized fit', '240 GSM cotton', 'Acid wash finish', 'Large back print', 'Raw-cut sleeves'], ARRAY['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1000&fit=crop', 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd0?w=800&h=1000&fit=crop'], ARRAY['S', 'M', 'L', 'XL', 'XXL'], ARRAY[]::TEXT[]),
('mania-crossbody-bag', 'Mania Crossbody Bag', 'Tactical silhouette in matte black nylon. Multiple compartments for essentials only.', 1999, NULL, 'accessories', NULL, false, false, '1000D Cordura Nylon', 'One Size', ARRAY['Adjustable strap', '1000D Cordura nylon', 'YKK zippers', '3 compartments', 'Reflective logo tab'], ARRAY['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=1000&fit=crop'], ARRAY['M'], ARRAY[]::TEXT[]);

-- Insert variants for the 3D viewer (Assuming products are generated with UUIDs, we will use a subquery to insert variants associated with 'obsidian-box-tee' for demonstration.)

INSERT INTO product_variants (product_id, color_name, color_hex, glb_url, thumbnail_url) 
SELECT id, 'Obsidian Black', '#1A1919', '/models/tee.glb', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=100&h=100&fit=crop'
FROM products WHERE slug = 'obsidian-box-tee';

INSERT INTO product_variants (product_id, color_name, color_hex, glb_url, thumbnail_url) 
SELECT id, 'Blood Red', '#FF3B30', '/models/tee.glb', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=100&h=100&fit=crop'
FROM products WHERE slug = 'obsidian-box-tee';
