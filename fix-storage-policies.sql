-- Fix storage policies for blog-images bucket
-- Run this in your production Supabase SQL Editor

-- Drop existing storage policies
DROP POLICY IF EXISTS "Admin users can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Admin users can update blog images" ON storage.objects;
DROP POLICY IF EXISTS "Admin users can delete blog images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view blog images" ON storage.objects;
DROP POLICY IF EXISTS "Public can view blog images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update blog images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete blog images" ON storage.objects;

-- Create new storage policies for blog-images bucket

-- Allow public to view blog images
CREATE POLICY "Public can view blog images" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');

-- Allow authenticated users to upload blog images
CREATE POLICY "Authenticated users can upload blog images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'blog-images' AND
    auth.role() = 'authenticated'
  );

-- Allow authenticated users to update blog images
CREATE POLICY "Authenticated users can update blog images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'blog-images' AND
    auth.role() = 'authenticated'
  );

-- Allow authenticated users to delete blog images
CREATE POLICY "Authenticated users can delete blog images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'blog-images' AND
    auth.role() = 'authenticated'
  );

-- Allow service role to do everything
CREATE POLICY "Service role can manage blog images" ON storage.objects
  FOR ALL USING (
    bucket_id = 'blog-images' AND
    auth.role() = 'service_role'
  );

-- Allow admins to manage blog images
CREATE POLICY "Admins can manage blog images" ON storage.objects
  FOR ALL USING (
    bucket_id = 'blog-images' AND
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE email = auth.jwt() ->> 'email'
    )
  );
