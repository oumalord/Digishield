-- Check and setup database for organisation applications
-- Run this in your Supabase SQL editor

-- Check if table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'organisation_applications'
) as table_exists;

-- If table doesn't exist, create it
CREATE TABLE IF NOT EXISTS organisation_applications (
  id UUID DEFAULT gen_rand
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  location VARCHAR(255),
  role_applied VARCHAR(255),
  linkedin VARCHAR(512),
  portfolio VARCHAR(512),
  resume_url VARCHAR(512),
  answers JSONB DEFAULT '{}',
  status VARCHAR(20) DEFAULT 'submitted' CHECK (status IN ('submitted','interview_scheduled','training_scheduled','declined','accepted')),
  stage VARCHAR(30) DEFAULT 'application',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE organisation_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY IF NOT EXISTS "Public insert access" ON organisation_applications
FOR INSERT WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Public select access" ON organisation_applications
FOR SELECT USING (true);

-- Verify table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'organisation_applications' 
ORDER BY ordinal_position;

-- Show any existing data
SELECT COUNT(*) as total_applications FROM organisation_applications;
