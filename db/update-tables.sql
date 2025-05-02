-- Create extension if it doesn't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Update products table
DO $$
BEGIN
    -- Check if products table exists
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'products') THEN
        -- Add columns if they don't exist
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'template_type') THEN
            ALTER TABLE products ADD COLUMN template_type VARCHAR(100);
        END IF;
        
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'features') THEN
            ALTER TABLE products ADD COLUMN features JSONB DEFAULT '{}'::jsonb;
        END IF;
        
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'is_active') THEN
            ALTER TABLE products ADD COLUMN is_active BOOLEAN DEFAULT TRUE;
        END IF;
        
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'slug') THEN
            ALTER TABLE products ADD COLUMN slug VARCHAR(255);
        END IF;
    ELSE
        -- Create products table if it doesn't exist
        CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            price DECIMAL(10, 2) NOT NULL,
            image_url TEXT,
            category VARCHAR(100),
            template_type VARCHAR(100),
            features JSONB DEFAULT '{}'::jsonb,
            is_active BOOLEAN DEFAULT TRUE,
            slug VARCHAR(255),
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

    -- Check if carts table exists
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'carts') THEN
        -- Create carts table
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

    -- Check if cart_items table exists
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'cart_items') THEN
        -- Create cart_items table
        CREATE TABLE cart_items (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            cart_id UUID REFERENCES carts(id) ON DELETE CASCADE,
            product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
            quantity INTEGER NOT NULL DEFAULT 1,
            customizations JSONB DEFAULT '{}'::jsonb,
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

    -- Check if orders table exists
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'orders') THEN
        -- Create orders table
        CREATE TABLE orders (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
            status VARCHAR(50) NOT NULL DEFAULT 'pending',
            total_amount DECIMAL(12, 2) NOT NULL,
            payment_intent_id VARCHAR(255),
            payment_status VARCHAR(50) DEFAULT 'pending',
            shipping_address JSONB,
            billing_address JSONB,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Add RLS policies for orders
        ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Users can view their own orders"
            ON orders FOR SELECT
            USING (auth.uid() = user_id);
            
        CREATE POLICY "Users can insert their own orders"
            ON orders FOR INSERT
            WITH CHECK (auth.uid() = user_id);
            
        CREATE POLICY "Users can update their own orders"
            ON orders FOR UPDATE
            USING (auth.uid() = user_id);
            
        CREATE POLICY "Admins can view all orders"
            ON orders FOR SELECT
            USING (auth.uid() IN (SELECT user_id FROM admin_users));
            
        CREATE POLICY "Admins can update all orders"
            ON orders FOR UPDATE
            USING (auth.uid() IN (SELECT user_id FROM admin_users));
    END IF;

    -- Check if order_items table exists
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'order_items') THEN
        -- Create order_items table
        CREATE TABLE order_items (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
            product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
            product_name VARCHAR(255) NOT NULL,
            product_price DECIMAL(10, 2) NOT NULL,
            quantity INTEGER NOT NULL DEFAULT 1,
            customizations JSONB,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Add RLS policies for order_items
        ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Users can view their own order items"
            ON order_items FOR SELECT
            USING (
                order_id IN (
                    SELECT id FROM orders WHERE user_id = auth.uid()
                )
            );
            
        CREATE POLICY "Admins can view all order items"
            ON order_items FOR SELECT
            USING (auth.uid() IN (SELECT user_id FROM admin_users));
    END IF;
    
    -- Insert sample products if none exist
    IF NOT EXISTS (SELECT 1 FROM products LIMIT 1) THEN
        INSERT INTO products (name, description, price, category, template_type, image_url, features, slug) VALUES
        ('Business Website', 'Professional website for established businesses', 15000, 'website', 'business', '/templates/business-template.png', '{"pages": 5, "responsive": true, "seo": true}', 'business-website'),
        ('E-Commerce Store', 'Complete online store solution', 25000, 'website', 'ecommerce', '/templates/ecommerce-template.png', '{"pages": 10, "responsive": true, "seo": true, "payment": true}', 'ecommerce-store'),
        ('Portfolio Website', 'Showcase for creative professionals', 18000, 'website', 'portfolio', '/templates/portfolio-template.png', '{"pages": 3, "responsive": true, "gallery": true}', 'portfolio-website'),
        ('Blog Website', 'Professional blog with modern features', 16000, 'website', 'blog', '/templates/blog-template.png', '{"pages": 4, "responsive": true, "comments": true}', 'blog-website'),
        ('Startup Landing Page', 'Modern landing page for startups', 12000, 'website', 'startup', '/templates/startup-template.png', '{"pages": 1, "responsive": true, "animations": true}', 'startup-landing'),
        ('Restaurant Website', 'Website for restaurants with menu', 20000, 'website', 'restaurant', '/templates/restaurant-template.png', '{"pages": 5, "responsive": true, "menu": true, "reservation": true}', 'restaurant-website'),
        ('Complete Package', 'All-inclusive website with all features', 35000, 'website', 'complete', '/templates/complete-package.png', '{"pages": 15, "responsive": true, "seo": true, "payment": true, "cms": true}', 'complete-package');
    END IF;
END
$$;

-- Enable real-time for tables
DO $$
BEGIN
    -- Check if the publication exists
    IF EXISTS (
        SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime'
    ) THEN
        -- Add tables to existing publication
        ALTER PUBLICATION supabase_realtime ADD TABLE IF NOT EXISTS carts;
        ALTER PUBLICATION supabase_realtime ADD TABLE IF NOT EXISTS cart_items;
        ALTER PUBLICATION supabase_realtime ADD TABLE IF NOT EXISTS products;
        ALTER PUBLICATION supabase_realtime ADD TABLE IF NOT EXISTS orders;
        ALTER PUBLICATION supabase_realtime ADD TABLE IF NOT EXISTS order_items;
    ELSE
        -- Create new publication with tables
        CREATE PUBLICATION supabase_realtime FOR TABLE carts, cart_items, products, orders, order_items;
    END IF;
END
$$;
