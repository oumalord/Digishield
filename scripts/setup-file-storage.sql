-- Setup Supabase Storage for file uploads
-- This script creates the storage bucket and configures access policies

-- Create storage bucket for application files
INSERT INTO storage.buckets (id, name, public)
VALUES ('applications', 'applications', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for public read access to uploaded files
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'applications');

-- Create storage policy for authenticated users to upload files
CREATE POLICY "Authenticated users can upload files" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'applications' 
  AND auth.role() = 'authenticated'
);

-- Create storage policy for users to update their own files
CREATE POLICY "Users can update own files" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'applications' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Create storage policy for users to delete their own files
CREATE POLICY "Users can delete own files" ON storage.objects
FOR DELETE USING (
  bucket_id = 'applications' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Verify bucket creation
SELECT * FROM storage.buckets WHERE id = 'applications';

-- Show storage policies
SELECT * FROM storage.policies WHERE bucket_id = 'applications';
