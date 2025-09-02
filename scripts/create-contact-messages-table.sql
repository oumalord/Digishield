-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(100) NOT NULL CHECK (subject IN ('general', 'training', 'partnership', 'volunteer', 'media', 'support')),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'responded', 'closed')),
    response TEXT,
    responded_by VARCHAR(255),
    responded_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contact_messages_updated_at 
    BEFORE UPDATE ON contact_messages 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
CREATE POLICY "Enable insert for all users" ON contact_messages
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read for authenticated users" ON contact_messages
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON contact_messages
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Insert sample data for testing
INSERT INTO contact_messages (first_name, last_name, email, phone, subject, message, status) VALUES
('John', 'Smith', 'john.smith@example.com', '+254700000001', 'general', 'I would like to discuss security solutions for my business.', 'pending'),
('Sarah', 'Johnson', 'sarah.j@company.com', '+254700000002', 'partnership', 'Interested in exploring partnership opportunities with Digishield.', 'responded'),
('Mike', 'Wilson', 'mike.wilson@tech.com', '+254700000003', 'support', 'Need assistance with implementing security protocols.', 'pending'),
('Lisa', 'Chen', 'lisa.chen@startup.io', '+254700000004', 'training', 'Can you provide more details about your cybersecurity training services?', 'closed');

-- Grant necessary permissions
GRANT ALL ON contact_messages TO authenticated;
GRANT ALL ON contact_messages TO service_role;

-- Create a view for analytics
CREATE OR REPLACE VIEW contact_messages_analytics AS
SELECT 
    COUNT(*) as total_messages,
    COUNT(*) FILTER (WHERE status = 'pending') as pending_count,
    COUNT(*) FILTER (WHERE status = 'responded') as responded_count,
    COUNT(*) FILTER (WHERE status = 'closed') as closed_count,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as messages_this_week,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as messages_this_month
FROM contact_messages;

-- Grant access to the analytics view
GRANT SELECT ON contact_messages_analytics TO authenticated;
GRANT SELECT ON contact_messages_analytics TO service_role;

COMMENT ON TABLE contact_messages IS 'Stores contact form submissions from the website';
COMMENT ON COLUMN contact_messages.status IS 'Message status: pending, responded, or closed';
COMMENT ON VIEW contact_messages_analytics IS 'Provides analytics data for contact messages';
