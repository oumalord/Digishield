-- Separate tables for each Get Involved application opportunity

-- 1) Cyber Trainers
CREATE TABLE IF NOT EXISTS volunteer_cyber_trainers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  skills TEXT[],
  availability VARCHAR(255),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','active','inactive','rejected')),
  applied_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2) Awareness Ambassadors
CREATE TABLE IF NOT EXISTS volunteer_awareness_ambassadors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  skills TEXT[],
  availability VARCHAR(255),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','active','inactive','rejected')),
  applied_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3) Community Coordinators
CREATE TABLE IF NOT EXISTS volunteer_community_coordinators (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  skills TEXT[],
  availability VARCHAR(255),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','active','inactive','rejected')),
  applied_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4) Incident Response Volunteers
CREATE TABLE IF NOT EXISTS volunteer_incident_responders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  skills TEXT[],
  availability VARCHAR(255),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','active','inactive','rejected')),
  applied_at TIMESTAMPTZ DEFAULT NOW()
);

-- Optional: basic indexes
CREATE INDEX IF NOT EXISTS idx_trainer_email ON volunteer_cyber_trainers (email);
CREATE INDEX IF NOT EXISTS idx_ambassador_email ON volunteer_awareness_ambassadors (email);
CREATE INDEX IF NOT EXISTS idx_coordinator_email ON volunteer_community_coordinators (email);
CREATE INDEX IF NOT EXISTS idx_responder_email ON volunteer_incident_responders (email);

-- Enable Row Level Security and permissive basic policies for authenticated users (adjust as needed)
ALTER TABLE volunteer_cyber_trainers ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_awareness_ambassadors ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_community_coordinators ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_incident_responders ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY trainers_insert ON volunteer_cyber_trainers FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY ambassadors_insert ON volunteer_awareness_ambassadors FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY coordinators_insert ON volunteer_community_coordinators FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY responders_insert ON volunteer_incident_responders FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;



