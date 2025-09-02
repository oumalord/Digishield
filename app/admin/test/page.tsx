"use client"

import { useState, useEffect } from "react"
import { getContactMessages, createContactMessage } from "@/lib/database-operations"

export default function AdminTestPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [testResult, setTestResult] = useState("")

  useEffect(() => {
    testAdminFunctionality()
  }, [])

  const testAdminFunctionality = async () => {
    try {
      setLoading(true)
      setTestResult("Testing admin functionality...")

      // Test 1: Create a test message
      const testMessage = {
        first_name: "Test",
        last_name: "User",
        email: "test@example.com",
        phone: "+254700000000",
        subject: "general" as const,
        message: "This is a test message from the admin test page.",
      }

      const createResult = await createContactMessage(testMessage)
      setTestResult(prev => prev + "\n✅ Test message created successfully")

      // Test 2: Fetch messages
      const fetchResult = await getContactMessages()
      if (fetchResult.success && fetchResult.data) {
        setMessages(fetchResult.data)
        setTestResult(prev => prev + `\n✅ Fetched ${fetchResult.data?.length || 0} messages`)
      } else {
        setTestResult(prev => prev + `\n❌ Failed to fetch messages: ${fetchResult.error}`)
      }

    } catch (error) {
      console.error("Test error:", error)
      setTestResult(prev => prev + `\n❌ Test failed: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Functionality Test</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p>Running tests...</p>
            </div>
          ) : (
            <pre className="bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap">{testResult}</pre>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Messages in Database</h2>
          {messages.length === 0 ? (
            <p className="text-gray-500">No messages found</p>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className="border rounded p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">
                      {message.first_name} {message.last_name}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs ${
                      message.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      message.status === 'responded' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {message.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{message.email}</p>
                  <p className="text-sm text-gray-600 mb-2">Subject: {message.subject}</p>
                  <p className="text-sm">{message.message}</p>
                  {message.response && (
                    <div className="mt-2 p-2 bg-green-50 rounded">
                      <p className="text-sm text-green-800">
                        <strong>Response:</strong> {message.response}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
