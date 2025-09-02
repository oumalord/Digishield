"use client"

import { useState, useEffect } from "react"
import { supabase, hasValidConfig, config } from "@/lib/supabase"
import { createContactMessage, getContactMessages } from "@/lib/database-operations"

export default function TestSupabaseConnection() {
  const [connectionStatus, setConnectionStatus] = useState<any>(null)
  const [testResult, setTestResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check connection status on load
    setConnectionStatus({
      hasValidConfig,
      config,
      supabaseClient: !!supabase,
    })
  }, [])

  const testConnection = async () => {
    setLoading(true)
    try {
      // Test 1: Check if we can connect to Supabase
      if (!supabase) {
        throw new Error("Supabase client not initialized")
      }

      // Test 2: Try to fetch contact messages
      const messagesResult = await getContactMessages()
      
      // Test 3: Try to create a test contact message
      const testMessage = {
        first_name: "Test",
        last_name: "User",
        email: "test@example.com",
        subject: "general" as const,
        message: "This is a test message to verify database connection",
      }
      
      const createResult = await createContactMessage(testMessage)

      setTestResult({
        messagesResult,
        createResult,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      setTestResult({
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      })
    } finally {
      setLoading(false)
    }
  }

  const clearTestData = async () => {
    if (!supabase) return
    
    try {
      // Delete test messages
      const { error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("email", "test@example.com")
      
      if (error) {
        console.error("Error clearing test data:", error)
      } else {
        alert("Test data cleared successfully!")
      }
    } catch (error) {
      console.error("Error clearing test data:", error)
    }
  }

  return (
    <div className="min-h-screen pt-16 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Supabase Connection Test</h1>
        
        {/* Connection Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="font-medium">Valid Config:</span>
              <span className={`px-2 py-1 rounded text-sm ${hasValidConfig ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {hasValidConfig ? '✅ Yes' : '❌ No'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium">Supabase Client:</span>
              <span className={`px-2 py-1 rounded text-sm ${supabase ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {supabase ? '✅ Initialized' : '❌ Not Initialized'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium">URL:</span>
              <span className="text-sm text-gray-600">{config.url || 'Not set'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium">Key Length:</span>
              <span className="text-sm text-gray-600">{config.keyLength} characters</span>
            </div>
          </div>
        </div>

        {/* Test Buttons */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Database Tests</h2>
          <div className="space-x-4">
            <button
              onClick={testConnection}
              disabled={loading || !hasValidConfig}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Testing...' : 'Test Database Connection'}
            </button>
            <button
              onClick={clearTestData}
              disabled={!hasValidConfig}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear Test Data
            </button>
          </div>
        </div>

        {/* Test Results */}
        {testResult && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Test Results</h2>
            <div className="bg-gray-50 rounded p-4">
              <pre className="text-sm overflow-auto">
                {JSON.stringify(testResult, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* Configuration Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Configuration Details</h2>
          <div className="bg-gray-50 rounded p-4">
            <pre className="text-sm overflow-auto">
              {JSON.stringify(connectionStatus, null, 2)}
            </pre>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-lg p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Troubleshooting</h2>
          <div className="space-y-2 text-sm">
            <p><strong>If connection fails:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Check your Supabase project URL and API key in .env.local</li>
              <li>Make sure the database tables are created in your Supabase project</li>
              <li>Verify that Row Level Security (RLS) policies are set up correctly</li>
              <li>Check the browser console for detailed error messages</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
