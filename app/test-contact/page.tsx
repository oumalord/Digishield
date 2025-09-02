"use client"

import { useState, useEffect } from "react"
import { createContactMessage, getContactMessages } from "@/lib/database-operations"

export default function TestContactPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [testResult, setTestResult] = useState("")
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    subject: "general" as const,
    message: "",
  })

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    try {
      const result = await getContactMessages()
      if (result.success && result.data) {
        setMessages(result.data)
      } else {
        console.error("Failed to load messages:", result.error)
      }
    } catch (error) {
      console.error("Error loading messages:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const result = await createContactMessage(formData)
      if (result.success) {
        setTestResult("✅ Contact message created successfully!")
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          subject: "general",
          message: "",
        })
        // Reload messages
        await loadMessages()
      } else {
        setTestResult(`❌ Failed to create message: ${result.error}`)
      }
    } catch (error) {
      setTestResult(`❌ Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Contact Form Test</h1>
        
        {/* Test Result */}
        {testResult && (
          <div className={`p-4 rounded-lg mb-6 ${
            testResult.includes("✅") ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
          }`}>
            {testResult}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Test Contact Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    required
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    required
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <select
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="general">General Inquiry</option>
                  <option value="training">Training</option>
                  <option value="partnership">Partnership</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="media">Media</option>
                  <option value="support">Support</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Test Message"}
              </button>
            </form>
          </div>

          {/* Messages List */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Messages in Database ({messages.length})</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {messages.length === 0 ? (
                <p className="text-gray-500">No messages found</p>
              ) : (
                messages.map((message, index) => (
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
                    {message.phone && (
                      <p className="text-sm text-gray-600 mb-2">{message.phone}</p>
                    )}
                    <p className="text-sm text-gray-600 mb-2">Subject: {message.subject}</p>
                    <p className="text-sm">{message.message}</p>
                    {message.response && (
                      <div className="mt-2 p-2 bg-green-50 rounded">
                        <p className="text-sm text-green-800">
                          <strong>Response:</strong> {message.response}
                        </p>
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      Created: {new Date(message.created_at).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
            <button
              onClick={loadMessages}
              className="mt-4 w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Refresh Messages
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

