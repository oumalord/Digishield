// TypeScript interfaces for Supabase database tables

export interface User {
  id?: string
  email: string
  role: "admin" | "moderator" | "user"
  name: string
  created_at?: string
  is_active: boolean
}

export interface Incident {
  id?: string
  type: string
  description: string
  urgency: "low" | "medium" | "high" | "critical"
  contact_name: string
  contact_email: string
  contact_phone?: string
  location?: string
  date_occurred?: string
  additional_info?: string
  status: "pending" | "in_progress" | "resolved" | "closed"
  assigned_to?: string
  resolution?: string
  created_at?: string
  updated_at?: string
}

export interface TrainingSession {
  id?: string
  title: string
  description: string
  date: string
  location: string
  capacity: number
  registered: number
  trainer: string
  status: "upcoming" | "ongoing" | "completed" | "cancelled"
  materials?: string[]
  feedback?: number
  created_at?: string
}

export interface Resource {
  id?: string
  title: string
  description: string
  type: "PDF" | "Video" | "Audio" | "Document"
  category: "Guides & Toolkits" | "Policy Briefs" | "Child Safety Resources" | "Training Materials"
  file_url: string
  file_size: string
  downloads: number
  is_public: boolean
  tags?: string[]
  created_at?: string
  updated_at?: string
}

export interface TeamMember {
  id?: string
  name: string
  role: string
  bio: string
  email: string
  phone?: string
  linkedin?: string
  twitter?: string
  image_url?: string
  is_active: boolean
  join_date: string
  specializations?: string[]
  created_at?: string
}

export interface Volunteer {
  id?: string
  name: string
  email: string
  phone: string
  location: string
  skills: string[]
  availability: string
  role: "Cyber Trainer" | "Awareness Ambassador" | "Community Coordinator" | "Incident Response Volunteer"
  status: "active" | "inactive" | "pending"
  join_date: string
  hours_contributed: number
  certifications?: string[]
  created_at?: string
}

export interface Partner {
  id?: string
  name: string
  type: "Technology Partner" | "Educational Partner" | "Government Partner" | "Corporate Partner" | "NGO Partner"
  description: string
  website?: string
  contact_person: string
  contact_email: string
  status: "active" | "inactive" | "pending"
  partnership_date: string
  services: string[]
  logo_url?: string
  created_at?: string
}

export interface Event {
  id?: string
  title: string
  description: string
  date: string
  location: string
  type: "Workshop" | "Campaign" | "Training" | "Outreach" | "Meeting" | "Awareness" | "Partnership"
  attendees?: number
  images?: string[]
  videos?: string[]
  status: "upcoming" | "ongoing" | "completed" | "cancelled"
  organizer?: string
  created_at?: string
}

export interface NewsletterSubscriber {
  id?: string
  email: string
  name?: string
  subscribe_date?: string
  is_active: boolean
  preferences: string[]
  unsubscribe_token?: string
}

export interface ContactMessage {
  id?: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  subject: "general" | "training" | "partnership" | "volunteer" | "media" | "support"
  message: string
  status: "pending" | "responded" | "closed"
  response?: string
  responded_by?: string
  responded_at?: string
  created_at?: string
}

export interface Settings {
  id?: string
  site_name: string
  tagline: string
  emergency_phone: string
  emergency_email: string
  main_email: string
  address: string
  business_hours: string
  whatsapp_number: string
  social_media: {
    facebook?: string
    twitter?: string
    linkedin?: string
    instagram?: string
    youtube?: string
  }
  updated_at?: string
}

export interface Statistics {
  id?: string
  total_incidents: number
  resolved_incidents: number
  pending_incidents: number
  total_training_sessions: number
  people_trained: number
  counties_reached: number
  community_partners: number
  volunteers: number
  updated_at?: string
}
