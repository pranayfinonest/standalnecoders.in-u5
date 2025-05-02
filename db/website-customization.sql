-- Create the website customization table
CREATE TABLE IF NOT EXISTS website_customization (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_name VARCHAR(255) NOT NULL,
  tagline VARCHAR(255) NOT NULL,
  primary_color VARCHAR(20) NOT NULL,
  secondary_color VARCHAR(20) NOT NULL,
  accent_color VARCHAR(20) NOT NULL,
  logo_url TEXT NOT NULL,
  show_hero BOOLEAN NOT NULL DEFAULT true,
  hero_title VARCHAR(255) NOT NULL,
  hero_subtitle TEXT NOT NULL,
  hero_image_url TEXT NOT NULL,
  footer_text TEXT NOT NULL,
  google_analytics_id VARCHAR(50) NOT NULL,
  contact_email VARCHAR(255) NOT NULL,
  contact_phone VARCHAR(50) NOT NULL,
  contact_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a storage policy for website assets
-- First, enable the Storage extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Insert default customization if table is empty
INSERT INTO website_customization (
  site_name, tagline, primary_color, secondary_color, accent_color,
  logo_url, show_hero, hero_title, hero_subtitle, hero_image_url,
  footer_text, google_analytics_id, contact_email, contact_phone, contact_address
)
SELECT
  'StandaloneCoders', 'Cybersecurity, AI & Digital Solutions',
  '#3B82F6', '#1E40AF', '#EF4444',
  '/standalone-coders-logo.png', true,
  'Professional Web & Tech Solutions',
  'We build secure, scalable, and innovative digital experiences',
  '/hero-image.jpg',
  '© 2023 StandaloneCoders.in. All rights reserved.',
  'G-MEASUREMENT_ID',
  'standalonecoders@gmail.com',
  '+91 6378110608',
  'Jaipur, Rajasthan, India 302001'
WHERE NOT EXISTS (SELECT 1 FROM website_customization);
