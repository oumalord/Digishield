"use client"

import { useState, useEffect } from "react"
import { db, auth, hasValidConfig } from "@/lib/firebase"
import { AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react"

export default function FirebaseStatus() {
  const [status, setStatus] = useState<{
    configured: boolean
    firestore: boolean
    auth: boolean
    message: string
    isDemo: boolean
  }>({
    configured: false,
    firestore: false,
    auth: false,
    message: "Checking Firebase connection...",
    isDemo: false,
  })

  useEffect(() => {
    checkFirebaseStatus()
  }, [])

  const checkFirebaseStatus = async () => {
    try {
      if (!hasValidConfig) {
        setStatus({
          configured: false,
          firestore: false,
          auth: false,
          message: "Firebase not configured. Running in demo mode.",
          isDemo: true,
        })
        return
      }

      // Check if Firebase services are available
      const firestoreOk = !!db
      const authOk = !!auth

      if (firestoreOk && authOk) {
        setStatus({
          configured: true,
          firestore: true,
          auth: true,
          message: "All Firebase services are connected and ready!",
          isDemo: false,
        })
      } else {
        setStatus({
          configured: hasValidConfig,
          firestore: firestoreOk,
          auth: authOk,
          message: "Firebase services are not properly initialized. Check your configuration.",
          isDemo: false,
        })
      }
    } catch (error) {
      setStatus({
        configured: false,
        firestore: false,
        auth: false,
        message: `Firebase connection error: ${error.message}`,
        isDemo: false,
      })
    }
  }

  const getStatusIcon = (isOk: boolean) => {
    return isOk ? <CheckCircle className="h-5 w-5 text-green-600" /> : <XCircle className="h-5 w-5 text-red-600" />
  }

  const allOk = status.configured && status.firestore && status.auth

  if (status.isDemo) {
    return (
      <div className="p-4 rounded-lg border bg-blue-50 border-blue-200">
        <div className="flex items-center mb-3">
          <Info className="h-6 w-6 text-blue-600 mr-2" />
          <h3 className="font-semibold">Demo Mode Active</h3>
        </div>
        <p className="mb-3 text-sm text-blue-800">
          Firebase is not configured. The platform is running in demo mode with simulated functionality.
        </p>
        <div className="mt-4 p-3 bg-blue-100 border border-blue-300 rounded text-sm">
          <h4 className="font-semibold mb-2">To enable full functionality:</h4>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              Create a Firebase project at{" "}
              <a
                href="https://console.firebase.google.com"
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Firebase Console
              </a>
            </li>
            <li>Enable Firestore Database and Authentication</li>
            <li>
              Create a <code className="bg-blue-200 px-1 rounded">.env.local</code> file with your Firebase config
            </li>
            <li>Restart your development server</li>
          </ol>
        </div>
      </div>
    )
  }

  return (
    <div className={`p-4 rounded-lg border ${allOk ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
      <div className="flex items-center mb-3">
        {allOk ? (
          <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
        ) : (
          <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
        )}
        <h3 className="font-semibold">Firebase Connection Status</h3>
      </div>

      <p className="mb-3 text-sm">{status.message}</p>

      <div className="space-y-2 text-sm">
        <div className="flex items-center">
          {getStatusIcon(status.configured)}
          <span className="ml-2">Configuration: {status.configured ? "Valid" : "Missing/Invalid"}</span>
        </div>
        <div className="flex items-center">
          {getStatusIcon(status.firestore)}
          <span className="ml-2">Firestore Database: {status.firestore ? "Connected" : "Failed"}</span>
        </div>
        <div className="flex items-center">
          {getStatusIcon(status.auth)}
          <span className="ml-2">Authentication: {status.auth ? "Connected" : "Failed"}</span>
        </div>
      </div>

      {!allOk && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm">
          <h4 className="font-semibold mb-2">Troubleshooting Steps:</h4>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              Check that your <code className="bg-gray-100 px-1 rounded">.env.local</code> file exists in the project
              root
            </li>
            <li>Verify all Firebase environment variables are set correctly</li>
            <li>Ensure your Firebase project has Firestore and Authentication enabled</li>
            <li>Restart your development server after adding environment variables</li>
          </ol>
        </div>
      )}
    </div>
  )
}
