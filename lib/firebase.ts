import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:demo",
}

// Check if we have valid Firebase configuration
const hasValidConfig =
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "demo-api-key"

let app: any = null
let db: any = null
let auth: any = null

if (hasValidConfig) {
  try {
    // Initialize Firebase only if it hasn't been initialized
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig)
    } else {
      app = getApps()[0]
    }

    // Initialize Firebase services
    db = getFirestore(app)
    auth = getAuth(app)

    console.log("✅ Firebase initialized successfully")
  } catch (error) {
    console.error("❌ Error initializing Firebase:", error)
    app = null
    db = null
    auth = null
  }
} else {
  console.warn("⚠️ Firebase configuration not found. Running in demo mode.")
  console.log("To enable Firebase:")
  console.log("1. Create a .env.local file in your project root")
  console.log("2. Add your Firebase configuration variables")
  console.log("3. Restart your development server")
}

// Export Firebase services (may be null if not configured)
export { db, auth, app, hasValidConfig }
export default app
