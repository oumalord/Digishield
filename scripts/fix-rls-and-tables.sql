-- Fix volunteer application tables and contact_messages RLS in one go
-- Safe to run multiple times (guards against duplicates)

-- Ensure UUID extensions are available (handles environments missing pgcrypto/uuid-ossp)
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1) Ensure volunteer tables exist (mirrors structure used by the app)
CREATE TABLE IF NOT EXISTS volunteer_cyber_trainers (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  skills TEXT[],
  availability VARCHAR(255),
  notes JSONB,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','active','inactive','rejected')),
  applied_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS volunteer_awareness_ambassadors (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  skills TEXT[],
  availability VARCHAR(255),
  notes JSONB,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','active','inactive','rejected')),
  applied_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS volunteer_community_coordinators (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  skills TEXT[],
  availability VARCHAR(255),
  notes JSONB,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','active','inactive','rejected')),
  applied_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS volunteer_incident_responders (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  skills TEXT[],
  availability VARCHAR(255),
  notes JSONB,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','active','inactive','rejected')),
  applied_at TIMESTAMPTZ DEFAULT NOW()
);

-- Set DEFAULT UUID generators with fallbacks (works whether tables pre-exist or not)
DO $$ BEGIN
  BEGIN
    ALTER TABLE volunteer_cyber_trainers ALTER COLUMN id SET DEFAULT gen_random_uuid();
  EXCEPTION WHEN undefined_function THEN
    BEGIN
      ALTER TABLE volunteer_cyber_trainers ALTER COLUMN id SET DEFAULT uuid_generate_v4();
    EXCEPTION WHEN undefined_function THEN NULL; END;
  END;
END $$;

DO $$ BEGIN
  BEGIN
    ALTER TABLE volunteer_awareness_ambassadors ALTER COLUMN id SET DEFAULT gen_random_uuid();
  EXCEPTION WHEN undefined_function THEN
    BEGIN
      ALTER TABLE volunteer_awareness_ambassadors ALTER COLUMN id SET DEFAULT uuid_generate_v4();
    EXCEPTION WHEN undefined_function THEN NULL; END;
  END;
END $$;

DO $$ BEGIN
  BEGIN
    ALTER TABLE volunteer_community_coordinators ALTER COLUMN id SET DEFAULT gen_random_uuid();
  EXCEPTION WHEN undefined_function THEN
    BEGIN
      ALTER TABLE volunteer_community_coordinators ALTER COLUMN id SET DEFAULT uuid_generate_v4();
    EXCEPTION WHEN undefined_function THEN NULL; END;
  END;
END $$;

DO $$ BEGIN
  BEGIN
    ALTER TABLE volunteer_incident_responders ALTER COLUMN id SET DEFAULT gen_random_uuid();
  EXCEPTION WHEN undefined_function THEN
    BEGIN
      ALTER TABLE volunteer_incident_responders ALTER COLUMN id SET DEFAULT uuid_generate_v4();
    EXCEPTION WHEN undefined_function THEN NULL; END;
  END;
END $$;

-- Basic indexes
CREATE INDEX IF NOT EXISTS idx_trainer_email ON volunteer_cyber_trainers (email);
CREATE INDEX IF NOT EXISTS idx_ambassador_email ON volunteer_awareness_ambassadors (email);
CREATE INDEX IF NOT EXISTS idx_coordinator_email ON volunteer_community_coordinators (email);
CREATE INDEX IF NOT EXISTS idx_responder_email ON volunteer_incident_responders (email);

-- 2) Enable RLS on all volunteer tables
ALTER TABLE volunteer_cyber_trainers ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_awareness_ambassadors ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_community_coordinators ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_incident_responders ENABLE ROW LEVEL SECURITY;

-- 3) RLS policies: allow public (anon) inserts from the website, and public reads (adjust later if needed)
DO $$ BEGIN
  CREATE POLICY trainers_insert ON volunteer_cyber_trainers FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY trainers_select ON volunteer_cyber_trainers FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY ambassadors_insert ON volunteer_awareness_ambassadors FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY ambassadors_select ON volunteer_awareness_ambassadors FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY coordinators_insert ON volunteer_community_coordinators FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY coordinators_select ON volunteer_community_coordinators FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY responders_insert ON volunteer_incident_responders FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY responders_select ON volunteer_incident_responders FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 4) Contact messages: ensure table exists (minimal) and RLS permits public inserts
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  response TEXT,
  responded_by VARCHAR(255),
  responded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY contact_insert_all ON contact_messages FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY contact_select_public ON contact_messages FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 5) Newsletter subscriptions table and policies (for Stay Informed)
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY newsletter_insert_all ON newsletter_subscriptions FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY newsletter_select_public ON newsletter_subscriptions FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 6) Organisation applications (joining the organisation, not volunteers)
CREATE TABLE IF NOT EXISTS organisation_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  location VARCHAR(255),
  role_applied VARCHAR(255),
  linkedin VARCHAR(512),
  portfolio VARCHAR(512),
  answers JSONB, -- structured answers to culture/fit questions
  status VARCHAR(20) DEFAULT 'submitted' CHECK (status IN ('submitted','interview_scheduled','training_scheduled','declined','accepted')),
  stage VARCHAR(30) DEFAULT 'application', -- application, interview, training, onboarding
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE organisation_applications ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY org_app_insert_public ON organisation_applications FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY org_app_select_public ON organisation_applications FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- keep updated_at current
-- ensure helper trigger function exists (safe to re-create)
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END; $$ LANGUAGE plpgsql;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_organisation_applications_updated_at'
  ) THEN
    CREATE TRIGGER trg_organisation_applications_updated_at
      BEFORE UPDATE ON organisation_applications
      FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;
END $$;

-- Optional: simple trigger to keep updated_at fresh
DO $$
BEGIN
  CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_contact_messages_updated_at'
  ) THEN
    CREATE TRIGGER trg_contact_messages_updated_at
      BEFORE UPDATE ON contact_messages
      FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;
END $$;


