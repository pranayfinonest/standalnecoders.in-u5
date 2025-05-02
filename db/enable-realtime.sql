-- Enable real-time for cart-related tables
ALTER PUBLICATION supabase_realtime ADD TABLE carts;
ALTER PUBLICATION supabase_realtime ADD TABLE cart_items;
ALTER PUBLICATION supabase_realtime ADD TABLE products;

-- If the publication doesn't exist yet, create it
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime'
    ) THEN
        CREATE PUBLICATION supabase_realtime FOR TABLE carts, cart_items, products;
    END IF;
END
$$;

-- Make sure the tables have primary keys (required for real-time)
DO $$
BEGIN
    -- Check if primary keys exist
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conrelid = 'carts'::regclass AND contype = 'p'
    ) THEN
        ALTER TABLE carts ADD PRIMARY KEY (id);
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conrelid = 'cart_items'::regclass AND contype = 'p'
    ) THEN
        ALTER TABLE cart_items ADD PRIMARY KEY (id);
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conrelid = 'products'::regclass AND contype = 'p'
    ) THEN
        ALTER TABLE products ADD PRIMARY KEY (id);
    END IF;
END
$$;
