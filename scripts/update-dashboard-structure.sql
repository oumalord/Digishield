-- Update dashboard structure to make it the main entry point
-- This script updates the database to reflect the new page structure

-- Create or update dashboard_content table for managing the main dashboard
CREATE TABLE IF NOT EXISTS dashboard_content (
    id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL,
    image_alt TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert default dashboard images
INSERT INTO dashboard_content (image_url, image_alt, title, description, display_order) VALUES
('/images/team-event-1.jpg', 'Digishield team at innovation conference with educational materials', 'Community Engagement', 'Spreading cybersecurity awareness through educational outreach programs', 1),
('/images/team-event-2.jpg', 'Team members celebrating achievements at tech event', 'Recognition & Achievement', 'Celebrating milestones in our mission to build digital resilience', 2),
('/images/team-event-3.jpg', 'Digishield representatives at Eldoret Innovation Week 2025', 'Innovation Partnership', 'Collaborating with industry leaders at Eldoret Innovation Week 2025', 3)
ON CONFLICT DO NOTHING;

-- Update CEO information in team_members table
UPDATE team_members 
SET 
    name = 'John Doe',
    position = 'Chief Executive Officer',
    bio = 'Visionary leader driving digital resilience across Kenya through innovative cybersecurity solutions and community engagement.',
    email = 'ceo@digishield.co.ke',
    linkedin = 'https://linkedin.com/in/johndoe',
    updated_at = CURRENT_TIMESTAMP
WHERE position LIKE '%CEO%' OR position LIKE '%Chief Executive%';

-- If no CEO exists, insert one
INSERT INTO team_members (name, position, bio, email, linkedin, is_leadership, display_order)
SELECT 'John Doe', 'Chief Executive Officer', 
       'Visionary leader driving digital resilience across Kenya through innovative cybersecurity solutions and community engagement.',
       'ceo@digishield.co.ke', 'https://linkedin.com/in/johndoe', true, 1
WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE position LIKE '%CEO%' OR position LIKE '%Chief Executive%');

-- Create page_analytics table to track page visits
CREATE TABLE IF NOT EXISTS page_analytics (
    id SERIAL PRIMARY KEY,
    page_path VARCHAR(255) NOT NULL,
    page_title VARCHAR(255),
    visit_count INTEGER DEFAULT 0,
    unique_visitors INTEGER DEFAULT 0,
    last_visited TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert analytics tracking for main pages
INSERT INTO page_analytics (page_path, page_title, visit_count) VALUES
('/', 'Dashboard - Digishield Communication Solutions', 0),
('/about', 'About Us - Digishield Communication Solutions', 0),
('/services', 'Services - Digishield Communication Solutions', 0),
('/resources', 'Resources - Digishield Communication Solutions', 0),
('/team', 'Team - Digishield Communication Solutions', 0),
('/contact', 'Contact - Digishield Communication Solutions', 0),
('/report-incident', 'Report Incident - Digishield Communication Solutions', 0)
ON CONFLICT DO NOTHING;

-- Update events table with more detailed information
UPDATE events 
SET 
    title = 'Eldoret Innovation Week 2025',
    description = 'Digishield participated in Eldoret Innovation Week 2025, showcasing our cybersecurity solutions and building partnerships with industry leaders.',
    location = 'Eldoret, Kenya',
    event_date = '2025-01-15',
    updated_at = CURRENT_TIMESTAMP
WHERE title LIKE '%Innovation%' OR title LIKE '%Conference%';

-- Insert additional events if none exist
INSERT INTO events (title, description, location, event_date, event_type, is_featured)
SELECT 'Community Cybersecurity Workshop', 
       'Educational workshop focusing on digital literacy and cybersecurity awareness for local communities.',
       'Moi University, Eldoret', '2025-01-20', 'workshop', true
WHERE NOT EXISTS (SELECT 1 FROM events WHERE event_type = 'workshop');

INSERT INTO events (title, description, location, event_date, event_type, is_featured)
SELECT 'Cyber Incident Response Training', 
       'Professional training session for incident response teams and cybersecurity professionals.',
       'Digishield Training Center', '2025-02-01', 'training', true
WHERE NOT EXISTS (SELECT 1 FROM events WHERE event_type = 'training');

-- Create function to track page visits
CREATE OR REPLACE FUNCTION track_page_visit(page_path TEXT, page_title TEXT DEFAULT NULL)
RETURNS VOID AS $$
BEGIN
    INSERT INTO page_analytics (page_path, page_title, visit_count, last_visited)
    VALUES (page_path, page_title, 1, CURRENT_TIMESTAMP)
    ON CONFLICT (page_path) 
    DO UPDATE SET 
        visit_count = page_analytics.visit_count + 1,
        last_visited = CURRENT_TIMESTAMP,
        page_title = COALESCE(EXCLUDED.page_title, page_analytics.page_title);
END;
$$ LANGUAGE plpgsql;

-- Update company information
UPDATE company_info 
SET 
    mission = 'Building digital resilience across Kenya through comprehensive cybersecurity education, training, and community engagement programs.',
    vision = 'A digitally secure Kenya where every individual and organization can thrive safely in the digital space.',
    values = 'Innovation, Community, Security, Education, Resilience',
    updated_at = CURRENT_TIMESTAMP
WHERE id = 1;

-- Insert company info if it doesn't exist
INSERT INTO company_info (name, mission, vision, values, address, phone, email, website)
SELECT 'Digishield Communication Solutions',
       'Building digital resilience across Kenya through comprehensive cybersecurity education, training, and community engagement programs.',
       'A digitally secure Kenya where every individual and organization can thrive safely in the digital space.',
       'Innovation, Community, Security, Education, Resilience',
       'Moi University, Kesses Eldoret, 3900 - 30100, Kenya',
       '+254 792 281 590',
       'info.digishield@gmail.com',
       'https://digishield.co.ke'
WHERE NOT EXISTS (SELECT 1 FROM company_info);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_dashboard_content_active ON dashboard_content(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_page_analytics_path ON page_analytics(page_path);
CREATE INDEX IF NOT EXISTS idx_events_featured ON events(is_featured, event_date);

COMMIT;
