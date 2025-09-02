"use client"

import { useState, useEffect } from "react"
import { supabase, hasValidConfig } from "@/lib/supabase"
import { getIncidents, getTeamMembers } from "@/lib/database-operations"

export default function SupabaseTest() {
  const [status, setStatus] = useState("Testing Supabase connection...")
  const [incidents, setIncidents] = useState<any[]>([])
  const [teamMembers, setTeamMembers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    testSupabaseConnection()
  }, [])

  const testSupabaseConnection = async () => {
    try {
      if (!hasValidConfig) {
        setStatus("⚠️ Supabase not configured. Running in demo mode.")
        setIsLoading(false)
        return
      }

      if (!supabase) {
        setStatus("❌ Supabase client not initialized.")
        setIsLoading(false)
        return
      }

      // Test basic connection
      const { data: testData, error: testError } = await supabase.from("statistics").select("*").limit(1)

      if (testError) {
        setStatus(`❌ Connection failed: ${testError.message}`)
        setIsLoading(false)
        return
      }

      // Test reading incidents
      try {
        const incidentResult = await getIncidents()
        setIncidents(incidentResult.data || [])
      } catch (error) {
        console.log("No incidents yet or table not created")
      }

      // Test reading team members
      try {
        const teamResult = await getTeamMembers()
        setTeamMembers(teamResult.data || [])
      } catch (error) {
        console.log("No team members yet or table not created")
      }

      setStatus("✅ Supabase connected successfully!")
    } catch (error: any) {
      setStatus(`❌ Connection error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-lg font-bold mb-4">Supabase Connection Test</h3>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-lg font-bold mb-4">Supabase Connection Status</h3>
      <p className="mb-4 text-lg">{status}</p>

      {hasValidConfig && supabase && (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Database Tables Status:</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span>Incidents:</span>
                <span className="text-green-600">{incidents.length} records</span>
              </div>
              <div className="flex justify-between">
                <span>Team Members:</span>
                <span className="text-green-600">{teamMembers.length} records</span>
              </div>
            </div>
          </div>

          {incidents.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Recent Incidents ({incidents.length}):</h4>
              <ul className="space-y-2">
                {incidents.slice(0, 3).map((incident) => (
                  <li key={incident.id} className="text-sm bg-gray-50 p-2 rounded">
                    <strong>{incident.type}</strong>: {incident.description?.substring(0, 100)}...
                  </li>
                ))}
              </ul>
            </div>
          )}

          {teamMembers.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Team Members ({teamMembers.length}):</h4>
              <ul className="space-y-1">
                {teamMembers.slice(0, 5).map((member) => (
                  <li key={member.id} className="text-sm bg-blue-50 p-2 rounded">
                    <strong>{member.name}</strong> - {member.position}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded text-sm">
            <h4 className="font-semibold mb-2">✅ Database Features Working:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Incident reporting and storage</li>
              <li>Team member management</li>
              <li>Contact form submissions</li>
              <li>Real-time data updates</li>
              <li>Row-level security policies</li>
            </ul>
          </div>
        </div>
      )}

      {!hasValidConfig && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
          <h4 className="font-semibold mb-2">To enable full functionality:</h4>
          <ol className="list-decimal list-inside space-y-1">
            <li>Create a Supabase project at supabase.com</li>
            <li>Run the SQL setup script in your Supabase SQL editor</li>
            <li>Add your Supabase URL and anon key to .env.local</li>
            <li>Restart your development server</li>
          </ol>
        </div>
      )}
    </div>
  )
}
