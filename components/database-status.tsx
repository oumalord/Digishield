"use client"

import { useState, useEffect } from "react"
import { AlertCircle, CheckCircle, Database } from "lucide-react"
import { getDatabaseStatus } from "@/lib/database-operations"

export default function DatabaseStatus() {
  const [status, setStatus] = useState<any>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const dbStatus = getDatabaseStatus()
    setStatus(dbStatus)

    // Only show in development or if there are issues
    if (process.env.NODE_ENV === "development" || !dbStatus.isConfigured) {
      setIsVisible(true)
    }
  }, [])

  if (!isVisible || !status) return null

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 max-w-sm p-4 rounded-lg shadow-lg border ${
        status.isConfigured
          ? "bg-green-50 border-green-200 text-green-800"
          : "bg-yellow-50 border-yellow-200 text-yellow-800"
      }`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {status.isConfigured ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <AlertCircle className="h-5 w-5 text-yellow-600" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <Database className="h-4 w-4" />
            <span className="text-sm font-medium">Database Status</span>
          </div>
          <p className="text-xs mt-1">{status.message}</p>

          {!status.isConfigured && (
            <div className="mt-2 text-xs">
              <p className="font-medium">To connect to Supabase:</p>
              <ol className="list-decimal list-inside mt-1 space-y-1">
                <li>Create a Supabase project</li>
                <li>Update .env.local with your credentials</li>
                <li>Run the database setup scripts</li>
              </ol>
            </div>
          )}

          <button onClick={() => setIsVisible(false)} className="mt-2 text-xs underline hover:no-underline">
            Dismiss
          </button>
        </div>
      </div>
    </div>
  )
}
