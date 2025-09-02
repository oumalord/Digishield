"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

const roleLabels: Record<string, string> = {
  "cyber-trainer": "Cyber Trainer",
  "awareness-ambassador": "Awareness Ambassador",
  "community-coordinator": "Community Coordinator",
  "incident-response-volunteer": "Incident Response Volunteer",
}

export default function ApplyRolePage() {
  const params = useParams<{ role: string }>()
  const router = useRouter()
  const roleSlug = params.role
  const role = roleLabels[roleSlug] || roleSlug

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    age: "",
    gender: "",
    experience: "",
    education: "",
    skills: "",
    certifications: "",
    availability: "",
    preferred_interview_time: "",
    motivation: "",
    emergency_contact: "",
    notes: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/Api/volunteers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          location: form.location,
          role,
          skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
          availability: form.availability,
          notes: {
            age: form.age,
            gender: form.gender,
            experience: form.experience,
            education: form.education,
            certifications: form.certifications,
            preferred_interview_time: form.preferred_interview_time,
            motivation: form.motivation,
            emergency_contact: form.emergency_contact,
            additional_notes: form.notes,
          },
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Failed to submit application")
      setSuccess(true)
      setTimeout(() => router.push("/"), 1500)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-2">Apply: {role}</h1>
        <p className="text-gray-600 mb-6">Fill the form below and we will get back to you. Role: <span className="font-medium">{role}</span></p>
        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
        {success && <p className="text-sm text-green-600 mb-4">Application submitted successfully.</p>}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input name="name" value={form.name} onChange={onChange} className="w-full border px-3 py-2 rounded" required />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input type="email" name="email" value={form.email} onChange={onChange} className="w-full border px-3 py-2 rounded" required />
            </div>
            <div>
              <label className="block text-sm mb-1">Phone</label>
              <input name="phone" value={form.phone} onChange={onChange} className="w-full border px-3 py-2 rounded" required />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Location</label>
            <input name="location" value={form.location} onChange={onChange} className="w-full border px-3 py-2 rounded" required />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-1">Age</label>
              <input name="age" value={form.age} onChange={onChange} className="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label className="block text-sm mb-1">Gender</label>
              <select name="gender" value={form.gender} onChange={onChange} className="w-full border px-3 py-2 rounded">
                <option value="">Select</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Education</label>
              <input name="education" value={form.education} onChange={onChange} className="w-full border px-3 py-2 rounded" />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Skills (comma separated)</label>
            <input name="skills" value={form.skills} onChange={onChange} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block text-sm mb-1">Certifications</label>
            <input name="certifications" value={form.certifications} onChange={onChange} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block text-sm mb-1">Availability</label>
            <textarea name="availability" value={form.availability} onChange={onChange} className="w-full border px-3 py-2 rounded" rows={3} />
          </div>
          <div>
            <label className="block text-sm mb-1">Preferred Interview Time</label>
            <input name="preferred_interview_time" value={form.preferred_interview_time} onChange={onChange} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block text-sm mb-1">Motivation (why do you want to join?)</label>
            <textarea name="motivation" value={form.motivation} onChange={onChange} className="w-full border px-3 py-2 rounded" rows={3} />
          </div>
          <div>
            <label className="block text-sm mb-1">Emergency Contact</label>
            <input name="emergency_contact" value={form.emergency_contact} onChange={onChange} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block text-sm mb-1">Additional Notes</label>
            <textarea name="notes" value={form.notes} onChange={onChange} className="w-full border px-3 py-2 rounded" rows={3} />
          </div>
          <div className="flex gap-3">
            <button disabled={loading} className="btn-primary">{loading ? "Submitting..." : "Submit Application"}</button>
            <button type="button" onClick={() => router.back()} className="btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}


