-- Enable RLS on admin_users table
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admin users can read their own record" ON admin_users;
DROP POLICY IF EXISTS "Service role can access all admin users" ON admin_users;

-- Create policy to allow authenticated users to read admin_users table
-- This allows the admin check to work while keeping the table secure
CREATE POLICY "Authenticated users can read admin_users" ON admin_users
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create policy to allow service role full access (for admin operations)
CREATE POLICY "Service role can access all admin users" ON admin_users
  FOR ALL USING (auth.role() = 'service_role');

-- Optional: Create policy to allow admins to manage admin users
CREATE POLICY "Admins can manage admin users" ON admin_users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE email = auth.jwt() ->> 'email'
    )
  );
