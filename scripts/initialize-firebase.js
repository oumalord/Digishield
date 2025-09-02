// Run this script to set up your Firebase database with initial data
import { initializeApp } from "firebase/app"
import { getFirestore, collection, doc, setDoc, addDoc, serverTimestamp } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

// Your Firebase config (replace with actual values)
const firebaseConfig = {
  apiKey: "your_api_key_here",
  authDomain: "your_project_id.firebaseapp.com",
  projectId: "your_project_id",
  storageBucket: "your_project_id.appspot.com",
  messagingSenderId: "your_messaging_sender_id",
  appId: "your_app_id",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

async function initializeDatabase() {
  try {
    console.log("🚀 Initializing Digishield Firebase database...")

    // 1. Create admin user
    console.log("👤 Creating admin user...")
    const adminUser = await createUserWithEmailAndPassword(auth, "admin@digishield.co.ke", "admin123")

    await setDoc(doc(db, "users", adminUser.user.uid), {
      email: "admin@digishield.co.ke",
      role: "admin",
      name: "Digishield Administrator",
      createdAt: serverTimestamp(),
      isActive: true,
    })
    console.log("✅ Admin user created successfully")

    // 2. Initialize settings
    console.log("⚙️ Setting up site configuration...")
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
      },
      lastUpdated: serverTimestamp(),
    })
    console.log("✅ Site configuration set up")

    // 3. Initialize statistics
    console.log("📊 Setting up statistics...")
    await setDoc(doc(db, "statistics", "current"), {
      totalIncidents: 0,
      resolvedIncidents: 0,
      pendingIncidents: 0,
      totalTrainingSessions: 0,
      peopleTrained: 1000,
      countiesReached: 47,
      communityPartners: 50,
      volunteers: 25,
      lastUpdated: serverTimestamp(),
    })
    console.log("✅ Statistics initialized")

    // 4. Add sample team members
    console.log("👥 Adding team members...")
    const teamMembers = [
      {
        name: "Dr. Sarah Kimani",
        role: "Executive Director",
        bio: "Cybersecurity expert with 15+ years experience in digital forensics and incident response.",
        email: "sarah@digishield.co.ke",
        isActive: true,
        joinDate: "2023-01-15",
        createdAt: serverTimestamp(),
      },
      {
        name: "James Mwangi",
        role: "Technical Lead",
        bio: "Software engineer and cybersecurity specialist with extensive experience in financial security.",
        email: "james@digishield.co.ke",
        isActive: true,
        joinDate: "2023-02-01",
        createdAt: serverTimestamp(),
      },
    ]

    for (const member of teamMembers) {
      await addDoc(collection(db, "team_members"), member)
    }
    console.log("✅ Team members added")

    // 5. Add sample resources
    console.log("📚 Adding resources...")
    const resources = [
      {
        title: "Personal Cybersecurity Toolkit",
        description: "Complete guide to protecting yourself online",
        type: "PDF",
        category: "Guides & Toolkits",
        fileUrl: "/resources/personal-cybersecurity-toolkit.pdf",
        fileSize: "2.5 MB",
        downloads: 0,
        isPublic: true,
        createdAt: serverTimestamp(),
      },
      {
        title: "Mobile Money Security Guide",
        description: "Protecting yourself from mobile money fraud and scams",
        type: "PDF",
        category: "Guides & Toolkits",
        fileUrl: "/resources/mobile-money-security.pdf",
        fileSize: "1.8 MB",
        downloads: 0,
        isPublic: true,
        createdAt: serverTimestamp(),
      },
    ]

    for (const resource of resources) {
      await addDoc(collection(db, "resources"), resource)
    }
    console.log("✅ Resources added")

    // 6. Add sample training sessions
    console.log("🎓 Adding training sessions...")
    const trainingSessions = [
      {
        title: "Basic Cybersecurity Awareness",
        description: "Introduction to cybersecurity for individuals and small businesses",
        date: "2024-02-15T09:00:00Z",
        location: "Moi University, Eldoret",
        capacity: 50,
        registered: 0,
        trainer: "Dr. Sarah Kimani",
        status: "upcoming",
        createdAt: serverTimestamp(),
      },
    ]

    for (const session of trainingSessions) {
      await addDoc(collection(db, "training_sessions"), session)
    }
    console.log("✅ Training sessions added")

    console.log("🎉 Database initialization completed successfully!")
    console.log("\n📋 Summary:")
    console.log("- Admin user: admin@digishield.co.ke (password: admin123)")
    console.log("- Collections created: users, settings, statistics, team_members, resources, training_sessions")
    console.log("- Ready to accept incident reports and contact messages")
    console.log("\n🔗 Next steps:")
    console.log("1. Update your .env.local file with Firebase credentials")
    console.log("2. Test the admin panel at /admin")
    console.log("3. Test incident reporting at /report-incident")
  } catch (error) {
    console.error("❌ Error initializing database:", error)
    if (error.code === "auth/email-already-in-use") {
      console.log("ℹ️ Admin user already exists, continuing with other setup...")
    }
  }
}

// Run the initialization
initializeDatabase()
