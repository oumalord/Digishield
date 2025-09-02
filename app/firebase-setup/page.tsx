import FirebaseStatus from "@/components/firebase-status"

export default function FirebaseSetupPage() {
  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Firebase Setup & Status</h1>

        <FirebaseStatus />

        <div className="mt-8 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Quick Setup Guide</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-sm font-bold text-blue-600">1</span>
                </div>
                <div>
                  <h3 className="font-semibold">Create Firebase Project</h3>
                  <p className="text-gray-600">
                    Go to{" "}
                    <a
                      href="https://console.firebase.google.com"
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Firebase Console
                    </a>{" "}
                    and create a new project
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-sm font-bold text-blue-600">2</span>
                </div>
                <div>
                  <h3 className="font-semibold">Enable Services</h3>
                  <p className="text-gray-600">
                    Enable Firestore Database (test mode) and Authentication (Email/Password)
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-sm font-bold text-blue-600">3</span>
                </div>
                <div>
                  <h3 className="font-semibold">Get Configuration</h3>
                  <p className="text-gray-600">Add a web app and copy the configuration values</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-sm font-bold text-blue-600">4</span>
                </div>
                <div>
                  <h3 className="font-semibold">Configure Environment</h3>
                  <p className="text-gray-600">Create .env.local file with your Firebase configuration</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Environment Variables Template</h2>
            <p className="text-gray-600 mb-4">
              Create a <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code> file in your project root:
            </p>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
              {`NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id`}
            </pre>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Demo Mode Features</h2>
            <p className="text-gray-700 mb-4">While Firebase is not configured, you can still test these features:</p>
            <div className="space-y-2">
              <a href="/report-incident" className="block text-blue-600 hover:underline">
                → Test Incident Reporting (Demo Mode)
              </a>
              <a href="/contact" className="block text-blue-600 hover:underline">
                → Test Contact Form (Demo Mode)
              </a>
              <a href="/resources" className="block text-blue-600 hover:underline">
                → Browse Resources
              </a>
              <a href="/services" className="block text-blue-600 hover:underline">
                → Explore Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
