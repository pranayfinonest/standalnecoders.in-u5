-- Drop existing policies that might be causing the recursion
DROP POLICY IF EXISTS "Admins can view admin users" ON admin_users;
DROP POLICY IF EXISTS "Users can check their own admin status" ON admin_users;

-- For initial setup, temporarily disable RLS on admin_users
ALTER TABLE IF EXISTS admin_users DISABLE ROW LEVEL SECURITY;

-- After setup is complete, you can re-enable RLS with safer policies
-- ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create safer policies that don't cause recursion
-- CREATE POLICY "Anyone can read admin_users during setup" 
--   ON admin_users 
--   FOR SELECT 
--   TO PUBLIC;

-- CREATE POLICY "Authenticated users can insert first admin" 
--   ON admin_users 
--   FOR INSERT 
--   TO authenticated
--   WITH CHECK (
--     NOT EXISTS (SELECT 1 FROM admin_users)
--   );
