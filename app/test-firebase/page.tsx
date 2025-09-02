import FirebaseTest from "@/components/firebase-test"

export default function TestFirebasePage() {
  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Firebase Connection Test</h1>
        <FirebaseTest />

        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Setup Checklist</h2>
          <ul className="space-y-2">
            <li>✅ Create Firebase project</li>
            <li>✅ Enable Authentication (Email/Password)</li>
            <li>✅ Enable Firestore Database</li>
            <li>✅ Copy Firebase config to .env.local</li>
            <li>✅ Run initialization script</li>
            <li>🔄 Test connection (this page)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
