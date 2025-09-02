"use client"

import AdminAuthWrapper from "@/components/admin-auth-wrapper"
import { exportToCSV } from "@/lib/utils"
import { useEffect, useState } from "react"
import { supabase, hasValidConfig } from "@/lib/supabase"

type ContactMessage = {
  id: number
  first_name: string
  last_name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: "pending" | "responded" | "closed"
  response?: string
  responded_by?: string
  responded_at?: string
  created_at: string
}

export default function AdminContactPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [error, setError] = useState<string | null>(null)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [response, setResponse] = useState("")

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    if (!hasValidConfig || !supabase) {
      setError("Supabase not configured")
      return
    }

    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200)

      if (error) {
        setError(error.message)
      } else {
        setMessages(data || [])
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  const updateStatus = async (id: number, status: string, responseText?: string) => {
    if (!supabase) return

    try {
      const updateData: any = {
        status,
        responded_at: new Date().toISOString(),
      }

      if (responseText) {
        updateData.response = responseText
        updateData.responded_by = "Admin" // You could get this from auth context
      }

      const { error } = await supabase
        .from("contact_messages")
        .update(updateData)
        .eq("id", id)

      if (error) {
        setError(error.message)
      } else {
        setSelectedMessage(null)
        setResponse("")
        loadMessages()
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  const deleteMessage = async (id: number) => {
    if (!supabase) return

    if (!confirm("Are you sure you want to delete this message?")) return

    try {
      const { error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("id", id)

      if (error) {
        setError(error.message)
      } else {
        loadMessages()
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "responded":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AdminAuthWrapper>
      <div className="min-h-screen pt-4">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Contact Messages</h1>
            <button
              onClick={() => exportToCSV(messages, { filename: "contact-messages" })}
              className="px-3 py-2 border rounded hover:bg-gray-50"
            >
              Download CSV
            </button>
          </div>
          {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Messages List */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">All Messages ({messages.length})</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                      selectedMessage?.id === message.id ? "bg-blue-50 border-blue-300" : ""
                    }`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">
                          {message.first_name} {message.last_name}
                        </h3>
                        <p className="text-sm text-gray-600">{message.email}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(message.status)}`}>
                        {message.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Subject:</strong> {message.subject}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">{message.message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(message.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Detail */}
            {selectedMessage && (
              <div className="bg-white p-6 border rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg font-semibold">Message Details</h2>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">From</h3>
                    <p>{selectedMessage.first_name} {selectedMessage.last_name}</p>
                    <p className="text-gray-600">{selectedMessage.email}</p>
                    {selectedMessage.phone && <p className="text-gray-600">{selectedMessage.phone}</p>}
                  </div>

                  <div>
                    <h3 className="font-medium">Subject</h3>
                    <p>{selectedMessage.subject}</p>
                  </div>

                  <div>
                    <h3 className="font-medium">Message</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>

                  <div>
                    <h3 className="font-medium">Status</h3>
                    <span className={`px-2 py-1 text-sm rounded-full ${getStatusColor(selectedMessage.status)}`}>
                      {selectedMessage.status}
                    </span>
                  </div>

                  {selectedMessage.response && (
                    <div>
                      <h3 className="font-medium">Response</h3>
                      <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.response}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Responded: {new Date(selectedMessage.responded_at!).toLocaleString()}
                      </p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <h3 className="font-medium">Actions</h3>
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re:%20${encodeURIComponent(selectedMessage.subject)}&body=${encodeURIComponent(`Hello ${selectedMessage.first_name},\n\n`)}${response ? encodeURIComponent(response) : ""}`}
                      className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Reply via Email
                    </a>

                    {selectedMessage.status === "pending" && (
                      <div className="space-y-3">
                        <textarea
                          value={response}
                          onChange={(e) => setResponse(e.target.value)}
                          placeholder="Enter your response..."
                          className="w-full p-3 border rounded-lg"
                          rows={4}
                        />
                        <div className="flex space-x-2">
                          <button
                            onClick={() => updateStatus(selectedMessage.id, "responded", response)}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            disabled={!response.trim()}
                          >
                            Respond
                          </button>
                          <button
                            onClick={() => updateStatus(selectedMessage.id, "closed")}
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}

                    {selectedMessage.status === "responded" && (
                      <button
                        onClick={() => updateStatus(selectedMessage.id, "closed")}
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                      >
                        Close
                      </button>
                    )}

                    <button
                      onClick={() => deleteMessage(selectedMessage.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminAuthWrapper>
  )
}
