-- Supabase Database Setup Script for Digishield
-- Copy and paste this entire script into your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('admin', 'moderator', 'user')) DEFAULT 'user',
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Incidents table
CREATE TABLE IF NOT EXISTS incidents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  urgency TEXT CHECK (urgency IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  location TEXT,
  date_occurred TIMESTAMP WITH TIME ZONE,
  additional_info TEXT,
  status TEXT CHECK (status IN ('pending', 'in_progress', 'resolved', 'closed')) DEFAULT 'pending',
  assigned_to UUID REFERENCES users(id),
  resolution TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Training sessions table
CREATE TABLE IF NOT EXISTS training_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT NOT NULL,
  capacity INTEGER NOT NULL DEFAULT 0,
  registered INTEGER NOT NULL DEFAULT 0,
  trainer TEXT NOT NULL,
  status TEXT CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')) DEFAULT 'upcoming',
  materials TEXT[],
  feedback DECIMAL(3,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resources table
CREATE TABLE IF NOT EXISTS resources (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT CHECK (type IN ('PDF', 'Video', 'Audio', 'Document')) NOT NULL,
  category TEXT CHECK (category IN ('Guides & Toolkits', 'Policy Briefs', 'Child Safety Resources', 'Training Materials')) NOT NULL,
  file_url TEXT NOT NULL,
  file_size TEXT NOT NULL,
  downloads INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT true,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  linkedin TEXT,
  twitter TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  join_date DATE NOT NULL,
  specializations TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Volunteers table
CREATE TABLE IF NOT EXISTS volunteers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  location TEXT NOT NULL,
  skills TEXT[] NOT NULL,
  availability TEXT NOT NULL,
  role TEXT CHECK (role IN ('Cyber Trainer', 'Awareness Ambassador', 'Community Coordinator', 'Incident Response Volunteer')) NOT NULL,
  status TEXT CHECK (status IN ('active', 'inactive', 'pending')) DEFAULT 'pending',
  join_date DATE NOT NULL,
  hours_contributed INTEGER DEFAULT 0,
  certifications TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Partners table
CREATE TABLE IF NOT EXISTS partners (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('Technology Partner', 'Educational Partner', 'Government Partner', 'Corporate Partner', 'NGO Partner')) NOT NULL,
  description TEXT NOT NULL,
  website TEXT,
  contact_person TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  status TEXT CHECK (status IN ('active', 'inactive', 'pending')) DEFAULT 'active',
  partnership_date DATE NOT NULL,
  services TEXT[] NOT NULL,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT NOT NULL,
  type TEXT CHECK (type IN ('Workshop', 'Campaign', 'Training', 'Outreach', 'Meeting', 'Awareness', 'Partnership')) NOT NULL,
  attendees INTEGER,
  images TEXT[],
  videos TEXT[],
  status TEXT CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')) DEFAULT 'upcoming',
  organizer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  subscribe_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  preferences TEXT[] DEFAULT '{}',
  unsubscribe_token TEXT UNIQUE DEFAULT uuid_generate_v4()
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT CHECK (subject IN ('general', 'training', 'partnership', 'volunteer', 'media', 'support')) NOT NULL,
  message TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'responded', 'closed')) DEFAULT 'pending',
  response TEXT,
  responded_by UUID REFERENCES users(id),
  responded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  site_name TEXT NOT NULL DEFAULT 'Digishield Communication Solutions',
  tagline TEXT NOT NULL DEFAULT 'digital spaces for information resilience',
  emergency_phone TEXT NOT NULL DEFAULT '+254792281590',
  emergency_email TEXT NOT NULL DEFAULT 'emergency@digishield.co.ke',
  main_email TEXT NOT NULL DEFAULT 'info.digishield@gmail.com',
  address TEXT NOT NULL DEFAULT 'Moi University, Kesses Eldoret 3900-30100, Kenya',
  business_hours TEXT NOT NULL DEFAULT 'Mon-Fri 10am-6pm, Sat 10am-2pm',
  whatsapp_number TEXT NOT NULL DEFAULT '+254792281590',
  social_media JSONB DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_settings_row CHECK (id = 1)
);

-- Statistics table
CREATE TABLE IF NOT EXISTS statistics (
  id INTEGER PRIMARY KEY DEFAULT 1,
  total_incidents INTEGER DEFAULT 0,
  resolved_incidents INTEGER DEFAULT 0,
  pending_incidents INTEGER DEFAULT 0,
  total_training_sessions INTEGER DEFAULT 0,
  people_trained INTEGER DEFAULT 1000,
  counties_reached INTEGER DEFAULT 47,
  community_partners INTEGER DEFAULT 50,
  volunteers INTEGER DEFAULT 25,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_statistics_row CHECK (id = 1)
);

-- Create function to increment resource downloads
CREATE OR REPLACE FUNCTION increment_downloads(resource_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE resources 
  SET downloads = downloads + 1, updated_at = NOW()
  WHERE id = resource_id;
END;
$$ LANGUAGE plpgsql;

-- Create function to update incident statistics
CREATE OR REPLACE FUNCTION update_incident_statistics()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE statistics SET
    total_incidents = (SELECT COUNT(*) FROM incidents),
    resolved_incidents = (SELECT COUNT(*) FROM incidents WHERE status = 'resolved'),
    pending_incidents = (SELECT COUNT(*) FROM incidents WHERE status = 'pending'),
    updated_at = NOW()
  WHERE id = 1;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_incident_stats_trigger
  AFTER INSERT OR UPDATE OR DELETE ON incidents
  FOR EACH ROW EXECUTE FUNCTION update_incident_statistics();

CREATE TRIGGER update_team_members_updated_at
    BEFORE UPDATE ON team_members
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert initial data
INSERT INTO settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
INSERT INTO statistics (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Insert real Digishield leadership team
INSERT INTO team_members (name, role, bio, email, image_url, is_active, join_date, specializations) VALUES
('Howkins Ndemo', 'Founder and CEO', 'Visionary leader and founder of Digishield Communication Solutions, dedicated to building digital resilience across Kenya through innovative cybersecurity education and community engagement programs.', 'howkins@digishield.co.ke', '/team/howkins-ndemo.jpg', true, '2022-01-01', ARRAY['Leadership', 'Strategic Planning', 'Cybersecurity Policy', 'Community Development']),
('Nelly Thuku', 'Co-founder', 'Co-founder and strategic partner in establishing Digishield as a leading cybersecurity awareness platform, bringing extensive experience in technology and community outreach.', 'nelly@digishield.co.ke', '/team/nelly-thuku.jpg', true, '2022-01-01', ARRAY['Strategic Development', 'Technology Innovation', 'Partnership Building', 'Program Development']),
('Benedict Ochieng', 'Secretary General', 'Secretary General responsible for organizational governance, administrative oversight, and ensuring effective coordination of all Digishield programs and initiatives.', 'benedict@digishield.co.ke', '/team/benedict-ochieng.jpg', true, '2022-02-01', ARRAY['Administration', 'Governance', 'Project Management', 'Policy Development']),
('Seline Akinyi', 'Finance Officer / Treasurer', 'Finance Officer and Treasurer managing financial operations, budgeting, and ensuring fiscal responsibility for all Digishield programs and sustainability initiatives.', 'seline@digishield.co.ke', '/team/seline-akinyi.jpg', true, '2022-02-15', ARRAY['Financial Management', 'Budget Planning', 'Grant Writing', 'Sustainability Planning']),
('Keith Wanjala', 'Mentorship and Volunteer Program Manager', 'Manager of mentorship and volunteer programs, developing and coordinating volunteer training, community engagement, and capacity building initiatives across Kenya.', 'keith@digishield.co.ke', '/team/keith-wanjala.jpg', true, '2022-03-01', ARRAY['Volunteer Management', 'Mentorship Programs', 'Training Development', 'Community Engagement']),
('Lennah Leshore', 'Director of Partnership and Outreach', 'Director responsible for building strategic partnerships, managing stakeholder relationships, and expanding Digishield''s reach through collaborative initiatives.', 'lennah@digishield.co.ke', '/team/lennah-leshore.jpg', true, '2022-03-15', ARRAY['Partnership Development', 'Stakeholder Management', 'Outreach Programs', 'Relationship Building']),
('Hawkins Jones', 'Public Relations Manager', 'Public Relations Manager handling media relations, public communications, and brand management to enhance Digishield''s visibility and impact in cybersecurity awareness.', 'hawkins.jones@digishield.co.ke', '/team/hawkins-jones.jpg', true, '2022-04-01', ARRAY['Public Relations', 'Media Management', 'Brand Development', 'Communications Strategy']),
('Faith Mwikali', 'Social Media Manager', 'Social Media Manager responsible for digital marketing, online community engagement, and leveraging social platforms to spread cybersecurity awareness and education.', 'faith@digishield.co.ke', '/team/faith-mwikali.jpg', true, '2022-04-15', ARRAY['Social Media Marketing', 'Digital Engagement', 'Content Creation', 'Online Community Management']),
('Wayne Muchika', 'Information Manager', 'Information Manager overseeing data management, information systems, and ensuring effective knowledge sharing and documentation across all Digishield programs.', 'wayne@digishield.co.ke', '/team/wayne-muchika.jpg', true, '2022-05-01', ARRAY['Information Management', 'Data Systems', 'Knowledge Management', 'Documentation']),
('Dennis Onyuro', 'Program Coordinator', 'Program Coordinator managing day-to-day operations, coordinating training sessions, and ensuring effective implementation of cybersecurity awareness programs.', 'dennis@digishield.co.ke', '/team/dennis-onyuro.jpg', true, '2022-05-15', ARRAY['Program Management', 'Operations Coordination', 'Training Coordination', 'Implementation']),
('Brian Simiyu', 'Chief Editor', 'Chief Editor responsible for content development, editorial oversight, and ensuring high-quality educational materials and publications for cybersecurity awareness.', 'brian.simiyu@digishield.co.ke', '/team/brian-simiyu.jpg', true, '2022-06-01', ARRAY['Content Development', 'Editorial Management', 'Educational Materials', 'Publication Management']),
('Brian Mosoti', 'Content Specialist', 'Content Specialist focused on creating engaging and educational cybersecurity content, developing training materials, and supporting content strategy initiatives.', 'brian.mosoti@digishield.co.ke', '/team/brian-mosoti.jpg', true, '2022-06-15', ARRAY['Content Creation', 'Educational Design', 'Training Materials', 'Content Strategy'])
ON CONFLICT (email) DO NOTHING;

-- Insert sample resources
INSERT INTO resources (title, description, type, category, file_url, file_size) VALUES
('Personal Cybersecurity Toolkit', 'Complete guide to protecting yourself online', 'PDF', 'Guides & Toolkits', '/resources/personal-cybersecurity-toolkit.pdf', '2.5 MB'),
('Mobile Money Security Guide', 'Protecting yourself from mobile money fraud and scams', 'PDF', 'Guides & Toolkits', '/resources/mobile-money-security.pdf', '1.8 MB'),
('Kenya Cybersecurity Landscape 2024', 'Analysis of current threats and trends', 'PDF', 'Policy Briefs', '/resources/kenya-cybersecurity-landscape-2024.pdf', '4.2 MB'),
('Internet Safety for Children', 'Parent''s guide to keeping kids safe online', 'PDF', 'Child Safety Resources', '/resources/internet-safety-children.pdf', '2.2 MB')
ON CONFLICT DO NOTHING;

-- Insert sample partners
INSERT INTO partners (name, type, description, contact_person, contact_email, partnership_date, services) VALUES
('Eveminet', 'Technology Partner', 'Strategic technology and platform development partner', 'Partnership Manager', 'partnerships@eveminet.co.ke', '2023-01-01', ARRAY['Platform Development', 'Technical Support', 'Infrastructure']),
('Moi University', 'Educational Partner', 'Host institution and educational partner', 'Dr. Academic Affairs', 'partnerships@mu.ac.ke', '2022-09-01', ARRAY['Venue', 'Student Programs', 'Research Collaboration'])
ON CONFLICT DO NOTHING;

-- Row Level Security (RLS) Policies
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Allow public to insert incidents and contact messages
CREATE POLICY "Anyone can submit incidents" ON incidents FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can submit contact messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscribers FOR INSERT WITH CHECK (true);

-- Allow authenticated users to read incidents and messages
CREATE POLICY "Authenticated users can read incidents" ON incidents FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can read contact messages" ON contact_messages FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage team members" ON team_members FOR ALL USING (auth.role() = 'authenticated');

-- Allow public read access to public resources, team members, events, etc.
CREATE POLICY "Public can read public resources" ON resources FOR SELECT USING (is_public = true);
CREATE POLICY "Public can read active team members" ON team_members FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read events" ON events FOR SELECT USING (true);
CREATE POLICY "Public can read active partners" ON partners FOR SELECT USING (status = 'active');
CREATE POLICY "Public can read training sessions" ON training_sessions FOR SELECT USING (true);
CREATE POLICY "Public can read statistics" ON statistics FOR SELECT USING (true);
CREATE POLICY "Public can read settings" ON settings FOR SELECT USING (true);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_incidents_status ON incidents(status);
CREATE INDEX IF NOT EXISTS idx_incidents_urgency ON incidents(urgency);
CREATE INDEX IF NOT EXISTS idx_incidents_created_at ON incidents(created_at);
CREATE INDEX IF NOT EXISTS idx_team_members_active ON team_members(is_active);
CREATE INDEX IF NOT EXISTS idx_team_members_join_date ON team_members(join_date);
CREATE INDEX IF NOT EXISTS idx_team_members_email ON team_members(email);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_resources_public ON resources(is_public);
