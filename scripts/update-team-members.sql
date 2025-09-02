-- Update team members with real Digishield leadership
-- Run this script after the initial setup to add the actual team

-- Clear existing sample team members
DELETE FROM team_members;

-- Insert real Digishield leadership team
INSERT INTO team_members (name, role, bio, email, image_url, is_active, join_date, specializations) VALUES
(
  'Howkins Ndemo', 
  'Founder and CEO', 
  'Visionary leader and founder of Digishield Communication Solutions, dedicated to building digital resilience across Kenya through innovative cybersecurity education and community engagement programs.',
  'howkins@digishield.co.ke',
  '/team/howkins-ndemo.jpg',
  true,
  '2022-01-01',
  ARRAY['Leadership', 'Strategic Planning', 'Cybersecurity Policy', 'Community Development']
),
(
  'Nelly Thuku', 
  'Co-founder', 
  'Co-founder and strategic partner in establishing Digishield as a leading cybersecurity awareness platform, bringing extensive experience in technology and community outreach.',
  'nelly@digishield.co.ke',
  '/team/nelly-thuku.jpg',
  true,
  '2022-01-01',
  ARRAY['Strategic Development', 'Technology Innovation', 'Partnership Building', 'Program Development']
),
(
  'Benedict Ochieng', 
  'Secretary General', 
  'Secretary General responsible for organizational governance, administrative oversight, and ensuring effective coordination of all Digishield programs and initiatives.',
  'benedict@digishield.co.ke',
  '/team/benedict-ochieng.jpg',
  true,
  '2022-02-01',
  ARRAY['Administration', 'Governance', 'Project Management', 'Policy Development']
),
(
  'Seline Akinyi', 
  'Finance Officer / Treasurer', 
  'Finance Officer and Treasurer managing financial operations, budgeting, and ensuring fiscal responsibility for all Digishield programs and sustainability initiatives.',
  'seline@digishield.co.ke',
  '/team/seline-akinyi.jpg',
  true,
  '2022-02-15',
  ARRAY['Financial Management', 'Budget Planning', 'Grant Writing', 'Sustainability Planning']
),
(
  'Keith Wanjala', 
  'Mentorship and Volunteer Program Manager', 
  'Manager of mentorship and volunteer programs, developing and coordinating volunteer training, community engagement, and capacity building initiatives across Kenya.',
  'keith@digishield.co.ke',
  '/team/keith-wanjala.jpg',
  true,
  '2022-03-01',
  ARRAY['Volunteer Management', 'Mentorship Programs', 'Training Development', 'Community Engagement']
),
(
  'Lennah Leshore', 
  'Director of Partnership and Outreach', 
  'Director responsible for building strategic partnerships, managing stakeholder relationships, and expanding Digishield''s reach through collaborative initiatives.',
  'lennah@digishield.co.ke',
  '/team/lennah-leshore.jpg',
  true,
  '2022-03-15',
  ARRAY['Partnership Development', 'Stakeholder Management', 'Outreach Programs', 'Relationship Building']
),
(
  'Hawkins Jones', 
  'Public Relations Manager', 
  'Public Relations Manager handling media relations, public communications, and brand management to enhance Digishield''s visibility and impact in cybersecurity awareness.',
  'hawkins.jones@digishield.co.ke',
  '/team/hawkins-jones.jpg',
  true,
  '2022-04-01',
  ARRAY['Public Relations', 'Media Management', 'Brand Development', 'Communications Strategy']
),
(
  'Faith Mwikali', 
  'Social Media Manager', 
  'Social Media Manager responsible for digital marketing, online community engagement, and leveraging social platforms to spread cybersecurity awareness and education.',
  'faith@digishield.co.ke',
  '/team/faith-mwikali.jpg',
  true,
  '2022-04-15',
  ARRAY['Social Media Marketing', 'Digital Engagement', 'Content Creation', 'Online Community Management']
),
(
  'Wayne Muchika', 
  'Information Manager', 
  'Information Manager overseeing data management, information systems, and ensuring effective knowledge sharing and documentation across all Digishield programs.',
  'wayne@digishield.co.ke',
  '/team/wayne-muchika.jpg',
  true,
  '2022-05-01',
  ARRAY['Information Management', 'Data Systems', 'Knowledge Management', 'Documentation']
),
(
  'Dennis Onyuro', 
  'Program Coordinator', 
  'Program Coordinator managing day-to-day operations, coordinating training sessions, and ensuring effective implementation of cybersecurity awareness programs.',
  'dennis@digishield.co.ke',
  '/team/dennis-onyuro.jpg',
  true,
  '2022-05-15',
  ARRAY['Program Management', 'Operations Coordination', 'Training Coordination', 'Implementation']
),
(
  'Brian Simiyu', 
  'Chief Editor', 
  'Chief Editor responsible for content development, editorial oversight, and ensuring high-quality educational materials and publications for cybersecurity awareness.',
  'brian.simiyu@digishield.co.ke',
  '/team/brian-simiyu.jpg',
  true,
  '2022-06-01',
  ARRAY['Content Development', 'Editorial Management', 'Educational Materials', 'Publication Management']
),
(
  'Brian Mosoti', 
  'Content Specialist', 
  'Content Specialist focused on creating engaging and educational cybersecurity content, developing training materials, and supporting content strategy initiatives.',
  'brian.mosoti@digishield.co.ke',
  '/team/brian-mosoti.jpg',
  true,
  '2022-06-15',
  ARRAY['Content Creation', 'Educational Design', 'Training Materials', 'Content Strategy']
);

-- Update statistics to reflect real team size
UPDATE statistics SET 
  volunteers = 12,
  updated_at = NOW()
WHERE id = 1;
