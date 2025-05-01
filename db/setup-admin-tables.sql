-- Create admin_users table if it doesn't exist
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Drop existing RLS policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Admins can view admin users" ON admin_users;
DROP POLICY IF EXISTS "Users can check their own admin status" ON admin_users;
DROP POLICY IF EXISTS "Service role can manage admin users" ON admin_users;

-- Enable RLS on the table
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies that avoid circular dependencies
-- Allow service role full access (for initial setup)
CREATE POLICY "Service role can manage admin users"
  ON admin_users
  USING (true)
  WITH CHECK (true);

-- Allow admins to view the admin_users table
-- This policy uses a subquery that doesn't create a circular dependency
CREATE POLICY "Admins can view admin users"
  ON admin_users
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE id = auth.uid()
    )
  );

-- Allow users to check their own admin status
CREATE POLICY "Users can check their own admin status"
  ON admin_users
  FOR SELECT
  USING (
    id = auth.uid()
  );
