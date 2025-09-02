"use client"

import { useState, useEffect } from "react"
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"

export default function FirebaseTest() {
  const [status, setStatus] = useState("Testing Firebase connection...")
  const [incidents, setIncidents] = useState<any[]>([])

  useEffect(() => {
    testFirebaseConnection()
  }, [])

  const testFirebaseConnection = async () => {
    try {
      // Test writing to Firestore
      await addDoc(collection(db, "test"), {
        message: "Firebase connection successful!",
        timestamp: serverTimestamp(),
      })

      // Test reading from Firestore
      const querySnapshot = await getDocs(collection(db, "incidents"))
      const incidentList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      setIncidents(incidentList)
      setStatus("✅ Firebase connected successfully!")
    } catch (error) {
      console.error("Firebase connection error:", error)
      setStatus(`❌ Firebase connection failed: ${error}`)
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-lg font-bold mb-4">Firebase Connection Status</h3>
      <p className="mb-4">{status}</p>

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
    </div>
  )
}
