-- Create admin_users table if it doesn't exist
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies for admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Only admins can view admin users
CREATE POLICY "Admins can view admin users" 
  ON admin_users 
  FOR SELECT 
  USING (
    auth.uid() IN (SELECT id FROM admin_users)
  );

-- Only authenticated users can check if they are an admin
CREATE POLICY "Users can check their own admin status" 
  ON admin_users 
  FOR SELECT 
  USING (
    auth.uid() = id
  );

-- Create website_settings table if it doesn't exist
CREATE TABLE IF NOT EXISTS website_settings (
  id SERIAL PRIMARY KEY,
  section TEXT NOT NULL UNIQUE,
  settings JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS policies for website_settings
ALTER TABLE website_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read website settings
CREATE POLICY "Anyone can read website settings" 
  ON website_settings 
  FOR SELECT 
  TO PUBLIC;

-- Only admins can modify website settings
CREATE POLICY "Only admins can modify website settings" 
  ON website_settings 
  FOR ALL 
  USING (
    auth.uid() IN (SELECT id FROM admin_users)
  );
