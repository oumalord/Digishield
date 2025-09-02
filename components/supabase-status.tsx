"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react"
import { supabase, hasValidConfig } from "@/lib/supabase"

interface ConnectionStatus {
  status: "connected" | "disconnected" | "error" | "loading"
  message: string
  details?: string
}

export default function SupabaseStatus() {
  const [status, setStatus] = useState<ConnectionStatus>({
    status: "loading",
    message: "Checking connection...",
  })

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    try {
      setStatus({ status: "loading", message: "Testing connection..." })

      if (!hasValidConfig || !supabase) {
        setStatus({
          status: "disconnected",
          message: "Supabase not configured",
          details: "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local",
        })
        return
      }

      // Test basic connection
      const { data, error } = await supabase.from("company_info").select("name").limit(1)

      if (error) {
        setStatus({
          status: "error",
          message: "Connection failed",
          details: error.message,
        })
        return
      }

      // Test if we can read data
      if (data) {
        setStatus({
          status: "connected",
          message: "Successfully connected to Supabase",
          details: `Database accessible with ${data.length} record(s)`,
        })
      } else {
        setStatus({
          status: "disconnected",
          message: "Connected but no data found",
          details: "Database may need initialization",
        })
      }
    } catch (error) {
      setStatus({
        status: "error",
        message: "Connection error",
        details: error instanceof Error ? error.message : "Unknown error",
      })
    }
  }

  const getStatusIcon = () => {
    switch (status.status) {
      case "connected":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "disconnected":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "loading":
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
    }
  }

  const getStatusColor = () => {
    switch (status.status) {
      case "connected":
        return "border-green-200 bg-green-50"
      case "disconnected":
        return "border-yellow-200 bg-yellow-50"
      case "error":
        return "border-red-200 bg-red-50"
      case "loading":
        return "border-blue-200 bg-blue-50"
    }
  }

  return (
    <div className={`border rounded-lg p-4 ${getStatusColor()}`}>
      <div className="flex items-center space-x-3">
        {getStatusIcon()}
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">Supabase Connection</h3>
          <p className="text-sm text-gray-600">{status.message}</p>
          {status.details && <p className="text-xs text-gray-500 mt-1">{status.details}</p>}
        </div>
        <button
          onClick={checkConnection}
          disabled={status.status === "loading"}
          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
        >
          Refresh
        </button>
      </div>
    </div>
  )
}
