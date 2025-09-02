"use client"

import type React from "react"

import { useState } from "react"
import { AlertTriangle, Shield, Phone, Mail, Clock } from "lucide-react"
import { createIncident } from "@/lib/database-operations"

export default function ReportIncidentPage() {
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    urgency: "medium" as "low" | "medium" | "high" | "critical",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    location: "",
    date_occurred: "",
    additional_info: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const incidentTypes = [
    "Phishing/Email Scam",
    "Mobile Money Fraud",
    "Identity Theft",
    "Social Media Hack",
    "Online Shopping Scam",
    "Ransomware Attack",
    "Data Breach",
    "Cyberbullying",
    "Other",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (!formData.type || !formData.description || !formData.contact_name || !formData.contact_email) {
        throw new Error("Please fill in all required fields.")
      }

      // Prepare data for Supabase (shape matches DB)
      const incidentData = {
        type: formData.type,
        description: formData.description,
        urgency: formData.urgency,
        contact_name: formData.contact_name,
        contact_email: formData.contact_email,
        contact_phone: formData.contact_phone || undefined,
        location: formData.location || undefined,
        date_occurred: formData.date_occurred ? new Date(formData.date_occurred).toISOString() : null,
        additional_info: formData.additional_info || undefined,
      }

      const result = await createIncident(incidentData)
      if (!result.success) {
        throw new Error(result.error || "Failed to create incident")
      }
      setSubmitted(true)
    } catch (error: any) {
      console.error("Error submitting incident:", error)
      const message = error?.message || "Failed to submit incident. Please try again."
      alert(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (submitted) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Report Submitted Successfully</h2>
          <p className="text-gray-600 mb-6">
            Thank you for reporting this incident. Our team will review your report and contact you within 24 hours.
          </p>
          <p className="text-sm text-gray-500 mb-6">Reference ID: #{Date.now().toString().slice(-6)}</p>
          <button
            onClick={() => {
              setSubmitted(false)
              setFormData({
                type: "",
                description: "",
                urgency: "medium",
                contact_name: "",
                contact_email: "",
                contact_phone: "",
                location: "",
                date_occurred: "",
                additional_info: "",
              })
            }}
            className="btn-primary"
          >
            Report Another Incident
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-red-600 text-white section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AlertTriangle className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Report Incident</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Report cybersecurity incidents, threats, or suspicious activities. We're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-8 bg-yellow-50 border-b border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
            <div className="flex items-center">
              <Phone className="h-6 w-6 text-red-600 mr-3" />
              <div>
                <div className="font-bold">Emergency Hotline</div>
                <div className="text-red-600">+254 792 281 590</div>
              </div>
            </div>
            <div className="flex items-center">
              <Mail className="h-6 w-6 text-red-600 mr-3" />
              <div>
                <div className="font-bold">Emergency Email</div>
                <div className="text-red-600">emergency@digishield.co.ke</div>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="h-6 w-6 text-red-600 mr-3" />
              <div>
                <div className="font-bold">Response Time</div>
                <div className="text-red-600">Within 24 hours</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Report Form */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Incident Report Form</h2>
            <p className="text-gray-600 mb-8">
              Please provide as much detail as possible to help us respond effectively to your incident.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Incident Type */}
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  Incident Type *
                </label>
                <select
                  id="type"
                  name="type"
                  required
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select incident type</option>
                  {incidentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Incident Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Please describe what happened in detail..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Urgency */}
              <div>
                <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-2">
                  Urgency Level
                </label>
                <select
                  id="urgency"
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low - No immediate threat</option>
                  <option value="medium">Medium - Moderate concern</option>
                  <option value="high">High - Urgent attention needed</option>
                  <option value="critical">Critical - Immediate response required</option>
                </select>
              </div>

              {/* Contact Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact_name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="contact_name"
                    name="contact_name"
                    required
                    value={formData.contact_name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="contact_email"
                    name="contact_email"
                    required
                    value={formData.contact_email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="contact_phone"
                    name="contact_phone"
                    value={formData.contact_phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location (City/County)
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Date Occurred */}
              <div>
                <label htmlFor="date_occurred" className="block text-sm font-medium text-gray-700 mb-2">
                  When did this incident occur?
                </label>
                <input
                  type="datetime-local"
                  id="date_occurred"
                  name="date_occurred"
                  value={formData.date_occurred}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Additional Information */}
              <div>
                <label htmlFor="additional_info" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  id="additional_info"
                  name="additional_info"
                  rows={3}
                  value={formData.additional_info}
                  onChange={handleChange}
                  placeholder="Any additional details that might be helpful..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Privacy Notice */}
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-600">
                  <strong>Privacy Notice:</strong> The information you provide will be used solely for incident response
                  purposes. We will not share your personal information with third parties without your consent, except
                  as required by law or necessary for incident resolution.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-secondary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Happens Next?</h2>
            <p className="text-xl text-gray-600">Our incident response process</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Acknowledgment</h3>
              <p className="text-gray-600">
                You'll receive an immediate confirmation email with your reference number.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Assessment</h3>
              <p className="text-gray-600">Our team will assess the incident and determine the appropriate response.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Response</h3>
              <p className="text-gray-600">We'll contact you within 24 hours with guidance and support.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Follow-up</h3>
              <p className="text-gray-600">We'll provide ongoing support until the incident is resolved.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
