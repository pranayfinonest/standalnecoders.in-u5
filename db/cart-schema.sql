-- Create extension if it doesn't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Check if tables already exist and create them if they don't
DO $$
BEGIN
    -- Create products table if it doesn't exist
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'products') THEN
        CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            price DECIMAL(10, 2) NOT NULL,
            image_url TEXT,
            category VARCHAR(100),
            template_type VARCHAR(100),
            features JSONB,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        -- Add RLS policies for products
        ALTER TABLE products ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Products are viewable by everyone"
            ON products FOR SELECT
            TO PUBLIC;
            
        CREATE POLICY "Only admins can insert products"
            ON products FOR INSERT
            USING (auth.uid() IN (SELECT user_id FROM admin_users));
            
        CREATE POLICY "Only admins can update products"
            ON products FOR UPDATE
            USING (auth.uid() IN (SELECT user_id FROM admin_users));
            
        CREATE POLICY "Only admins can delete products"
            ON products FOR DELETE
            USING (auth.uid() IN (SELECT user_id FROM admin_users));
    END IF;

    -- Create carts table if it doesn't exist
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'carts') THEN
        CREATE TABLE carts (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        -- Add RLS policies for carts
        ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Users can view their own carts"
            ON carts FOR SELECT
            USING (auth.uid() = user_id);
            
        CREATE POLICY "Users can insert their own carts"
            ON carts FOR INSERT
            WITH CHECK (auth.uid() = user_id);
            
        CREATE POLICY "Users can update their own carts"
            ON carts FOR UPDATE
            USING (auth.uid() = user_id);
            
        CREATE POLICY "Users can delete their own carts"
            ON carts FOR DELETE
            USING (auth.uid() = user_id);
    END IF;

    -- Create cart_items table if it doesn't exist
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'cart_items') THEN
        CREATE TABLE cart_items (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            cart_id UUID REFERENCES carts(id) ON DELETE CASCADE,
            product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
            quantity INTEGER NOT NULL DEFAULT 1,
            customizations JSONB,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        -- Add RLS policies for cart_items
        ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Users can view their own cart items"
            ON cart_items FOR SELECT
            USING (
                cart_id IN (
                    SELECT id FROM carts WHERE user_id = auth.uid()
                )
            );
            
        CREATE POLICY "Users can insert their own cart items"
            ON cart_items FOR INSERT
            WITH CHECK (
                cart_id IN (
                    SELECT id FROM carts WHERE user_id = auth.uid()
                )
            );
            
        CREATE POLICY "Users can update their own cart items"
            ON cart_items FOR UPDATE
            USING (
                cart_id IN (
                    SELECT id FROM carts WHERE user_id = auth.uid()
                )
            );
            
        CREATE POLICY "Users can delete their own cart items"
            ON cart_items FOR DELETE
            USING (
                cart_id IN (
                    SELECT id FROM carts WHERE user_id = auth.uid()
                )
            );
    END IF;
    
    -- Insert sample products if none exist
    IF NOT EXISTS (SELECT 1 FROM products LIMIT 1) THEN
        INSERT INTO products (name, description, price, category, template_type, image_url, features) VALUES
        ('Business Website', 'Professional website for established businesses', 15000, 'website', 'business', '/templates/business-template.png', '{"pages": 5, "responsive": true, "seo": true}'),
        ('E-Commerce Store', 'Complete online store solution', 25000, 'website', 'ecommerce', '/templates/ecommerce-template.png', '{"pages": 10, "responsive": true, "seo": true, "payment": true}'),
        ('Portfolio Website', 'Showcase for creative professionals', 18000, 'website', 'portfolio', '/templates/portfolio-template.png', '{"pages": 3, "responsive": true, "gallery": true}'),
        ('Blog Website', 'Professional blog with modern features', 16000, 'website', 'blog', '/templates/blog-template.png', '{"pages": 4, "responsive": true, "comments": true}'),
        ('Startup Landing Page', 'Modern landing page for startups', 12000, 'website', 'startup', '/templates/startup-template.png', '{"pages": 1, "responsive": true, "animations": true}'),
        ('Restaurant Website', 'Website for restaurants with menu', 20000, 'website', 'restaurant', '/templates/restaurant-template.png', '{"pages": 5, "responsive": true, "menu": true, "reservation": true}'),
        ('Complete Package', 'All-inclusive website with all features', 35000, 'website', 'complete', '/templates/complete-package.png', '{"pages": 15, "responsive": true, "seo": true, "payment": true, "cms": true}');
    END IF;
END
$$;
