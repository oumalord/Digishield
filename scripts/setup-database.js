// Firebase Database Setup Script
// Run this script to initialize the Digishield database structure

import { initializeApp } from "firebase/app"
import { getFirestore, collection, doc, setDoc, addDoc } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

const firebaseConfig = {
  // Your Firebase config here
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

async function setupDatabase() {
  try {
    console.log("Setting up Digishield database...")

    // 1. Create admin user
    const adminUser = await createUserWithEmailAndPassword(auth, "admin@digishield.co.ke", "admin123")
    console.log("Admin user created:", adminUser.user.uid)

    // 2. Setup collections with sample data

    // Users collection
    await setDoc(doc(db, "users", adminUser.user.uid), {
      email: "admin@digishield.co.ke",
      role: "admin",
      name: "System Administrator",
      createdAt: new Date(),
      isActive: true,
    })

    // Incidents collection (sample data)
    const sampleIncidents = [
      {
        type: "Phishing/Email Scam",
        description: "Received suspicious email claiming to be from bank requesting login details",
        urgency: "high",
        contactName: "John Doe",
        contactEmail: "john.doe@example.com",
        contactPhone: "+254700123456",
        location: "Nairobi",
        dateOccurred: "2024-01-15T10:30:00Z",
        additionalInfo: "Email had suspicious links and poor grammar",
        status: "pending",
        createdAt: new Date("2024-01-15T10:35:00Z"),
      },
      {
        type: "Mobile Money Fraud",
        description: "Received fake M-Pesa message asking for PIN verification",
        urgency: "critical",
        contactName: "Jane Smith",
        contactEmail: "jane.smith@example.com",
        contactPhone: "+254711234567",
        location: "Mombasa",
        dateOccurred: "2024-01-14T14:20:00Z",
        additionalInfo: "Almost shared PIN before realizing it was fake",
        status: "resolved",
        createdAt: new Date("2024-01-14T14:25:00Z"),
      },
    ]

    for (const incident of sampleIncidents) {
      await addDoc(collection(db, "incidents"), incident)
    }

    // Training sessions collection
    const trainingSessions = [
      {
        title: "Basic Cybersecurity Awareness",
        description: "Introduction to cybersecurity for individuals and small businesses",
        date: "2024-02-15T09:00:00Z",
        location: "Moi University, Eldoret",
        capacity: 50,
        registered: 35,
        trainer: "Dr. Sarah Kimani",
        status: "upcoming",
        createdAt: new Date(),
      },
      {
        title: "Mobile Money Security",
        description: "Protecting yourself from mobile money fraud and scams",
        date: "2024-02-20T14:00:00Z",
        location: "Nairobi Community Center",
        capacity: 100,
        registered: 78,
        trainer: "James Mwangi",
        status: "upcoming",
        createdAt: new Date(),
      },
    ]

    for (const session of trainingSessions) {
      await addDoc(collection(db, "training_sessions"), session)
    }

    // Resources collection
    const resources = [
      {
        title: "Personal Cybersecurity Toolkit",
        description: "Complete guide to protecting yourself online",
        type: "PDF",
        category: "Guides & Toolkits",
        fileUrl: "/resources/personal-cybersecurity-toolkit.pdf",
        fileSize: "2.5 MB",
        downloads: 1250,
        isPublic: true,
        createdAt: new Date(),
      },
      {
        title: "Small Business Security Guide",
        description: "Essential cybersecurity practices for SMEs",
        type: "PDF",
        category: "Guides & Toolkits",
        fileUrl: "/resources/small-business-security-guide.pdf",
        fileSize: "3.1 MB",
        downloads: 890,
        isPublic: true,
        createdAt: new Date(),
      },
      {
        title: "Kenya Cybersecurity Landscape 2024",
        description: "Analysis of current threats and trends",
        type: "PDF",
        category: "Policy Briefs",
        fileUrl: "/resources/kenya-cybersecurity-landscape-2024.pdf",
        fileSize: "4.2 MB",
        downloads: 650,
        isPublic: true,
        createdAt: new Date(),
      },
    ]

    for (const resource of resources) {
      await addDoc(collection(db, "resources"), resource)
    }

    // Team members collection
    const teamMembers = [
      {
        name: "Dr. Sarah Kimani",
        role: "Executive Director",
        bio: "Cybersecurity expert with 15+ years experience in digital forensics and incident response. PhD in Computer Science from University of Nairobi.",
        email: "sarah@digishield.co.ke",
        phone: "+254700111111",
        linkedin: "https://linkedin.com/in/sarah-kimani",
        twitter: "https://twitter.com/sarahkimani",
        imageUrl: "/team/sarah-kimani.jpg",
        isActive: true,
        joinDate: "2023-01-15",
        createdAt: new Date(),
      },
      {
        name: "James Mwangi",
        role: "Technical Lead",
        bio: "Software engineer and cybersecurity specialist. Former security consultant for major financial institutions in Kenya.",
        email: "james@digishield.co.ke",
        phone: "+254700222222",
        linkedin: "https://linkedin.com/in/james-mwangi",
        twitter: "https://twitter.com/jamesmwangi",
        imageUrl: "/team/james-mwangi.jpg",
        isActive: true,
        joinDate: "2023-02-01",
        createdAt: new Date(),
      },
    ]

    for (const member of teamMembers) {
      await addDoc(collection(db, "team_members"), member)
    }

    // Volunteers collection
    const volunteers = [
      {
        name: "Grace Wanjiku",
        email: "grace.wanjiku@example.com",
        phone: "+254700333333",
        location: "Nairobi",
        skills: ["Community Outreach", "Public Speaking", "Event Planning"],
        availability: "weekends",
        role: "Community Coordinator",
        status: "active",
        joinDate: "2023-06-15",
        hoursContributed: 120,
        createdAt: new Date(),
      },
      {
        name: "Michael Ochieng",
        email: "michael.ochieng@example.com",
        phone: "+254700444444",
        location: "Kisumu",
        skills: ["Training", "Technical Support", "Content Creation"],
        availability: "flexible",
        role: "Cyber Trainer",
        status: "active",
        joinDate: "2023-07-01",
        hoursContributed: 85,
        createdAt: new Date(),
      },
    ]

    for (const volunteer of volunteers) {
      await addDoc(collection(db, "volunteers"), volunteer)
    }

    // Partners collection
    const partners = [
      {
        name: "Eveminet",
        type: "Technology Partner",
        description: "Strategic technology and platform development partner",
        website: "https://eveminet.co.ke",
        contactPerson: "Partnership Manager",
        contactEmail: "partnerships@eveminet.co.ke",
        status: "active",
        partnershipDate: "2023-01-01",
        services: ["Platform Development", "Technical Support", "Infrastructure"],
        createdAt: new Date(),
      },
      {
        name: "Moi University",
        type: "Educational Partner",
        description: "Host institution and educational partner",
        website: "https://mu.ac.ke",
        contactPerson: "Dr. Academic Affairs",
        contactEmail: "partnerships@mu.ac.ke",
        status: "active",
        partnershipDate: "2022-09-01",
        services: ["Venue", "Student Programs", "Research Collaboration"],
        createdAt: new Date(),
      },
    ]

    for (const partner of partners) {
      await addDoc(collection(db, "partners"), partner)
    }

    // Events/Media collection
    const events = [
      {
        title: "Cybersecurity Awareness Workshop - Nairobi",
        description: "Community workshop on digital safety held at Kenyatta University",
        date: "2024-03-15T09:00:00Z",
        location: "Kenyatta University, Nairobi",
        type: "Workshop",
        attendees: 85,
        images: ["/media/workshop-nairobi-1.jpg", "/media/workshop-nairobi-2.jpg"],
        status: "completed",
        createdAt: new Date("2024-03-15T12:00:00Z"),
      },
      {
        title: "Youth Digital Safety Campaign",
        description: "Engaging young people in cybersecurity awareness activities",
        date: "2024-03-10T10:00:00Z",
        location: "Various Schools, Eldoret",
        type: "Campaign",
        attendees: 200,
        images: ["/media/youth-campaign-1.jpg", "/media/youth-campaign-2.jpg"],
        status: "completed",
        createdAt: new Date("2024-03-10T15:00:00Z"),
      },
    ]

    for (const event of events) {
      await addDoc(collection(db, "events"), event)
    }

    // Newsletter subscribers collection
    const subscribers = [
      {
        email: "subscriber1@example.com",
        name: "John Subscriber",
        subscribeDate: new Date(),
        isActive: true,
        preferences: ["security_tips", "event_updates", "training_announcements"],
      },
      {
        email: "subscriber2@example.com",
        name: "Jane Newsletter",
        subscribeDate: new Date(),
        isActive: true,
        preferences: ["security_tips", "policy_updates"],
      },
    ]

    for (const subscriber of subscribers) {
      await addDoc(collection(db, "newsletter_subscribers"), subscriber)
    }

    // Contact messages collection (sample)
    const contactMessages = [
      {
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@example.com",
        phone: "+254700555555",
        subject: "training",
        message: "I would like to inquire about cybersecurity training for our small business.",
        status: "pending",
        createdAt: new Date(),
      },
    ]

    for (const message of contactMessages) {
      await addDoc(collection(db, "contact_messages"), message)
    }

    // Settings/Configuration collection
    await setDoc(doc(db, "settings", "general"), {
      siteName: "Digishield Communication Solutions",
      tagline: "digital spaces for information resilience",
      emergencyPhone: "+254792281590",
      emergencyEmail: "emergency@digishield.co.ke",
      mainEmail: "info.digishield@gmail.com",
      address: "Moi University, Kesses Eldoret 3900-30100, Kenya",
      businessHours: "Mon-Fri 10am-6pm, Sat 10am-2pm",
      whatsappNumber: "+254792281590",
      socialMedia: {
        facebook: "https://facebook.com/digishieldke",
        twitter: "https://twitter.com/digishieldke",
        linkedin: "https://linkedin.com/company/digishield-ke",
        instagram: "https://instagram.com/digishieldke",
      },
      lastUpdated: new Date(),
    })

    // Statistics collection
    await setDoc(doc(db, "statistics", "current"), {
      totalIncidents: 150,
      resolvedIncidents: 135,
      pendingIncidents: 15,
      totalTrainingSessions: 45,
      peopleTrained: 1000,
      countiesReached: 47,
      communityPartners: 50,
      volunteers: 25,
      lastUpdated: new Date(),
    })

    console.log("Database setup completed successfully!")
    console.log("Collections created:")
    console.log("- users")
    console.log("- incidents")
    console.log("- training_sessions")
    console.log("- resources")
    console.log("- team_members")
    console.log("- volunteers")
    console.log("- partners")
    console.log("- events")
    console.log("- newsletter_subscribers")
    console.log("- contact_messages")
    console.log("- settings")
    console.log("- statistics")
  } catch (error) {
    console.error("Error setting up database:", error)
  }
}

// Run the setup
setupDatabase()
