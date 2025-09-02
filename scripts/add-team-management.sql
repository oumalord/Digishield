-- Add additional team member management features
-- Run this script to enhance team member functionality

-- Add updated_at column to team_members if it doesn't exist
ALTER TABLE team_members 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for team_members table
DROP TRIGGER IF EXISTS update_team_members_updated_at ON team_members;
CREATE TRIGGER update_team_members_updated_at
    BEFORE UPDATE ON team_members
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add RLS policies for team member management
CREATE POLICY "Authenticated users can manage team members" ON team_members
    FOR ALL USING (auth.role() = 'authenticated');

-- Create function to update team statistics
CREATE OR REPLACE FUNCTION update_team_statistics()
RETURNS TRIGGER AS $$
BEGIN
  -- Update statistics when team members are added/removed/updated
  UPDATE statistics SET
    volunteers = (SELECT COUNT(*) FROM team_members WHERE is_active = true),
    updated_at = NOW()
  WHERE id = 1;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger for team statistics
DROP TRIGGER IF EXISTS update_team_stats_trigger ON team_members;
CREATE TRIGGER update_team_stats_trigger
  AFTER INSERT OR UPDATE OR DELETE ON team_members
  FOR EACH ROW EXECUTE FUNCTION update_team_statistics();

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_team_members_active ON team_members(is_active);
CREATE INDEX IF NOT EXISTS idx_team_members_join_date ON team_members(join_date);
CREATE INDEX IF NOT EXISTS idx_team_members_email ON team_members(email);

-- Update existing team members with current timestamp
UPDATE team_members SET updated_at = NOW() WHERE updated_at IS NULL;
