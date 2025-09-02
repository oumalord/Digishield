-- Update organisation_applications table to include resume_url field
-- This script adds the new resume_url field and updates existing records

-- Add resume_url column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'organisation_applications' 
        AND column_name = 'resume_url'
    ) THEN
        ALTER TABLE organisation_applications ADD COLUMN resume_url VARCHAR(512);
    END IF;
END $$;

-- Update existing records to have empty resume_url if null
UPDATE organisation_applications 
SET resume_url = NULL 
WHERE resume_url IS NULL;

-- Add comment to the column
COMMENT ON COLUMN organisation_applications.resume_url IS 'URL to applicant''s resume/CV document';

-- Verify the structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'organisation_applications' 
ORDER BY ordinal_position;

-- Show sample data structure
SELECT 
    full_name,
    email,
    role_applied,
    resume_url,
    answers
FROM organisation_applications 
LIMIT 3;
