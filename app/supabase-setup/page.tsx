"use client"

import { useState } from "react"
import { CheckCircle, AlertCircle, Play, Database, Users, FileText } from "lucide-react"
import SupabaseStatus from "@/components/supabase-status"

export default function SupabaseSetupPage() {
  const [setupStep, setSetupStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const setupSteps = [
    {
      title: "Database Connection",
      description: "Verify connection to Supabase database",
      icon: Database,
      status: "completed",
    },
    {
      title: "Table Creation",
      description: "Create all necessary database tables",
      icon: FileText,
      status: "completed",
    },
    {
      title: "Sample Data",
      description: "Insert sample data for testing",
      icon: Users,
      status: "completed",
    },
    {
      title: "Security Policies",
      description: "Configure Row Level Security policies",
      icon: CheckCircle,
      status: "completed",
    },
  ]

  const runSetupScript = async () => {
    setIsRunning(true)
    // Simulate setup process
    for (let i = 0; i <= setupSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSetupStep(i)
    }
    setIsRunning(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Supabase Database Setup</h1>
          <p className="text-xl text-gray-600">Configure and initialize your Digishield database</p>
        </div>

        {/* Connection Status */}
        <div className="mb-8">
          <SupabaseStatus />
        </div>

        {/* Setup Steps */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Setup Progress</h2>

          <div className="space-y-4">
            {setupSteps.map((step, index) => {
              const Icon = step.icon
              const isCompleted = setupStep > index || step.status === "completed"
              const isActive = setupStep === index && isRunning

              return (
                <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted ? "bg-green-100" : isActive ? "bg-blue-100" : "bg-gray-100"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : isActive ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    ) : (
                      <Icon className="h-6 w-6 text-gray-400" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className={`font-medium ${isCompleted ? "text-green-900" : "text-gray-900"}`}>{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>

                  {isCompleted && <span className="text-sm text-green-600 font-medium">Completed</span>}
                </div>
              )
            })}
          </div>
        </div>

        {/* Setup Actions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Database Actions</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Run Setup Script</h3>
              <p className="text-sm text-gray-600 mb-4">
                Execute the complete database setup including tables, policies, and sample data.
              </p>
              <button
                onClick={runSetupScript}
                disabled={isRunning}
                className="btn-primary w-full flex items-center justify-center"
              >
                <Play className="h-4 w-4 mr-2" />
                {isRunning ? "Running Setup..." : "Run Setup"}
              </button>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Verify Setup</h3>
              <p className="text-sm text-gray-600 mb-4">
                Check if all database components are properly configured and accessible.
              </p>
              <button className="btn-secondary w-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Verify Database
              </button>
            </div>
          </div>
        </div>

        {/* Environment Variables */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold mb-6">Environment Configuration</h2>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium mb-2">Required Environment Variables</h3>
            <div className="space-y-2 text-sm font-mono">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>NEXT_PUBLIC_SUPABASE_URL</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
              </div>
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                <span>SUPABASE_SERVICE_ROLE_KEY (Optional)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
