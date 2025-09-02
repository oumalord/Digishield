-- Add CEO message and update team member with CEO role
-- Run this script in your Supabase SQL editor

-- Update existing team member to be CEO or insert new CEO
INSERT INTO team_members (
  name,
  role,
  bio,
  email,
  phone,
  linkedin,
  twitter,
  image_url,
  is_active,
  join_date,
  specializations
) VALUES (
  'Hawkins Ndemo',
  'Chief Executive Officer',
  'Visionary leader with over 15 years of experience in cybersecurity and digital transformation. John founded Digishield with the mission to build digital resilience across Kenya through comprehensive education and community engagement.',
  'ceo@digishield.co.ke',
  '+254 792 281 590',
  'https://linkedin.com/in/johndoe',
  'https://twitter.com/johndoe',
  'https://lgbcvwlrqkvrmbvlbxnn.supabase.co/storage/v1/object/sign/leadersphotos/CEO-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jMjU4NWUxMS04Y2Y5LTRiMmEtODlhYy0yNjU0MTVjNjQxZTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsZWFkZXJzcGhvdG9zL0NFTy1yZW1vdmViZy1wcmV2aWV3LnBuZyIsImlhdCI6MTc1Mjc2NDA2MCwiZXhwIjoyNzkzNDUyMDYwfQ.4w_SsK8LBJIsu2nv_OG9tIW5bWy5UtU-XAX5mkmzl4M',
  true,
  '2025-01-15',
  ARRAY['Cybersecurity Leadership', 'Digital Transformation', 'Community Engagement', 'Strategic Planning']
) ON CONFLICT (email) DO UPDATE SET
  role = EXCLUDED.role,
  bio = EXCLUDED.bio,
  specializations = EXCLUDED.specializations;

-- Add events table entries for the conference images
INSERT INTO events (
  title,
  description,
  date,
  location,
  type,
  attendees,
  images,
  status,
  organizer
) VALUES 
(
  'Eldoret Innovation Week 2025',
  'Digishield team participated in Eldoret Innovation Week 2025, showcasing our cybersecurity education programs and connecting with technology leaders across Kenya.',
  '2025-01-15',
  'Eldoret, Kenya',
  'Partnership',
  500,
  ARRAY['/images/team-event-1.jpg', '/images/team-event-2.jpg', '/images/team-event-3.jpg'],
  'completed',
  'Digishield Communication Solutions'
),
(
  'Cybersecurity Awareness Campaign',
  'Community outreach program focused on educating citizens about digital safety and cybersecurity best practices.',
  '2025-01-20',
  'Various Counties, Kenya',
  'Outreach',
  1000,
  ARRAY['/images/team-event-1.jpg'],
  'completed',
  'Digishield Communication Solutions'
);

-- Update statistics to reflect recent activities
UPDATE statistics SET
  total_training_sessions = total_training_sessions + 5,
  people_trained = people_trained + 200,
  community_partners = community_partners + 10,
  updated_at = NOW()
WHERE id = 1;

-- Add some sample resources related to the events
INSERT INTO resources (
  title,
  description,
  type,
  category,
  file_url,
  file_size,
  downloads,
  is_public,
  tags
) VALUES 
(
  'Innovation Week 2025 Presentation',
  'Comprehensive presentation on building digital resilience in Kenya, delivered at Eldoret Innovation Week 2025.',
  'PDF',
  'Training Materials',
  '/resources/innovation-week-2025-presentation.pdf',
  '2.5 MB',
  0,
  true,
  ARRAY['innovation', 'cybersecurity', 'digital resilience', 'kenya']
),
(
  'Community Cybersecurity Handbook',
  'Essential guide for community leaders on implementing cybersecurity awareness programs.',
  'PDF',
  'Guides & Toolkits',
  '/resources/community-cybersecurity-handbook.pdf',
  '1.8 MB',
  0,
  true,
  ARRAY['community', 'handbook', 'cybersecurity', 'awareness']
);

-- Commit the changes
COMMIT;
