"use client"

import { useState } from "react"

export default function OrganisationApplicationPage() {
  const [form, setForm] = useState<any>({
    full_name: "",
    email: "",
    phone: "",
    location: "",
    role_applied: "",
    linkedin: "",
    portfolio: "",
    resume_file: null,
    answers: {
      education_level: "",
      cybersecurity_certifications: "",
      work_experience: "",
      cybersecurity_knowledge: "",
      familiar_areas: [],
      comfortable_training: "",
      tools_software: "",
      why_join: "",
      safety_example: "",
      stay_updated: "",
      availability: "",
      willing_travel: "",
      internet_access: "",
      additional_info: "",
    },
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const setField = (name: string, value: any) => setForm((f: any) => ({ ...f, [name]: value }))
  const setAnswer = (name: string, value: any) => setForm((f: any) => ({ ...f, answers: { ...f.answers, [name]: value } }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    // Basic validation
    if (!form.full_name.trim()) {
      setError("Full name is required")
      setLoading(false)
      return
    }
    
    if (!form.email.trim()) {
      setError("Email is required")
      setLoading(false)
      return
    }
    
    try {
      console.log("Submitting form with data:", {
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        location: form.location,
        role_applied: form.role_applied,
        answers: form.answers,
        resume_file: form.resume_file ? form.resume_file.name : "No file"
      })
      
      // Create FormData for file upload
      const formData = new FormData()
      
      // Add basic fields
      formData.append('full_name', form.full_name.trim())
      formData.append('email', form.email.trim())
      formData.append('phone', form.phone || '')
      formData.append('location', form.location || '')
      formData.append('role_applied', form.role_applied || '')
      formData.append('linkedin', form.linkedin || '')
      formData.append('portfolio', form.portfolio || '')
      formData.append('answers', JSON.stringify(form.answers))
      
      // Add resume file if selected
      if (form.resume_file) {
        formData.append('resume_file', form.resume_file)
      }
      
      console.log("Sending request to /Api/organisation/apply")
      const res = await fetch("/Api/organisation/apply", {
        method: "POST",
        body: formData, // Use FormData instead of JSON
      })
      
      console.log("Response status:", res.status)
      const json = await res.json()
      console.log("Response data:", json)
      
      if (!res.ok) {
        throw new Error(json?.error || `Server error: ${res.status}`)
      }
      
      setSuccess(true)
      console.log("Application submitted successfully")
    } catch (e: any) {
      console.error("Submission error:", e)
      setError(e.message || "Failed to submit application")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Apply to Join Digishield</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tell us more about you. This is for organisational roles, not volunteers.
          </p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-800 font-medium">{error}</span>
            </div>
          </div>
        )}
        
        {success ? (
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-green-200">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Application Received!</h2>
            <p className="text-green-700">We'll contact you soon. Thank you for your interest in joining Digishield.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 space-y-8">
            {/* Personal Information */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Personal Information
              </h3>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input 
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                    placeholder="Enter your full name" 
                    value={form.full_name} 
                    onChange={(e) => setField("full_name", e.target.value)} 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input 
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                    type="email" 
                    placeholder="Enter your email" 
                    value={form.email} 
                    onChange={(e) => setField("email", e.target.value)} 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input 
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                    placeholder="Enter your phone number" 
                    value={form.phone} 
                    onChange={(e) => setField("phone", e.target.value)} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input 
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                    placeholder="City, Country" 
                    value={form.location} 
                    onChange={(e) => setField("location", e.target.value)} 
                  />
                </div>
              </div>
            </div>

            {/* Professional Details & Resume */}
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-xl font-semibold text-green-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Professional Details & Resume
              </h3>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role Applied For</label>
                  <input 
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
                    placeholder="e.g., Cybersecurity Trainer" 
                    value={form.role_applied} 
                    onChange={(e) => setField("role_applied", e.target.value)} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
                  <input 
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
                    placeholder="Your LinkedIn URL" 
                    value={form.linkedin} 
                    onChange={(e) => setField("linkedin", e.target.value)} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio/Website</label>
                  <input 
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
                    placeholder="Your portfolio or website" 
                    value={form.portfolio} 
                    onChange={(e) => setField("portfolio", e.target.value)} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Resume/CV Upload</label>
                  <div className="relative">
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx,.txt"
                      className="w-full border border-gray-300 px-4 py-3 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200 transition-colors focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      onChange={(e) => setField("resume_file", e.target.files?.[0] || null)} 
                    />
                    <p className="text-xs text-gray-500 mt-2">Accepted formats: PDF, DOC, DOCX, TXT (Max 5MB)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Background */}
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200 space-y-6">
              <h3 className="text-xl font-semibold text-purple-900 flex items-center border-b border-purple-300 pb-3">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 5.477 5.754 5 7.5 5s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.523 18.246 19 16.5 19c-1.746 0-3.332-.477-4.5-1.253" />
                </svg>
                Professional Background
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">What is your highest level of education?</label>
                <select className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors" value={form.answers.education_level} onChange={(e) => setAnswer("education_level", e.target.value)}>
                  <option value="">Select education level</option>
                  <option value="high_school">High School</option>
                  <option value="diploma">Diploma/Certificate</option>
                  <option value="bachelors">Bachelor's Degree</option>
                  <option value="masters">Master's Degree or higher</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Do you have any formal training or certifications in cybersecurity?</label>
                <select className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors" value={form.answers.cybersecurity_certifications} onChange={(e) => setAnswer("cybersecurity_certifications", e.target.value)}>
                  <option value="">Select option</option>
                  <option value="yes">Yes (please specify)</option>
                  <option value="no">No</option>
                </select>
                {form.answers.cybersecurity_certifications === "yes" && (
                  <textarea 
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg mt-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none" 
                    rows={2} 
                    placeholder="Please specify your certifications..." 
                  />
                )}
              </div>

                              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Briefly describe your previous work experience related to cybersecurity, IT, or awareness programs:</label>
                  <textarea 
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none" 
                    rows={3} 
                    placeholder="Describe your relevant experience..."
                    value={form.answers.work_experience} 
                    onChange={(e) => setAnswer("work_experience", e.target.value)} 
                  />
                </div>
            </div>

            {/* Skills and Knowledge */}
            <div className="bg-orange-50 rounded-xl p-6 border border-orange-200 space-y-6">
              <h3 className="text-xl font-semibold text-orange-900 flex items-center border-b border-orange-300 pb-3">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Skills and Knowledge
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">How would you rate your knowledge of cybersecurity concepts?</label>
                <select className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors" value={form.answers.cybersecurity_knowledge} onChange={(e) => setAnswer("cybersecurity_knowledge", e.target.value)}>
                  <option value="">Select level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

                              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Which of the following cybersecurity areas are you familiar with? (Select all that apply)</label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      "Phishing and Social Engineering",
                      "Identity Theft Prevention", 
                      "Network Security",
                      "Data Privacy and Protection",
                      "Cyberbullying Awareness",
                      "Online Fraud Detection",
                      "Other"
                    ].map((area) => (
                      <label key={area} className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                          checked={form.answers.familiar_areas.includes(area)}
                          onChange={(e) => {
                            const currentAreas = form.answers.familiar_areas || []
                            if (e.target.checked) {
                              setAnswer("familiar_areas", [...currentAreas, area])
                            } else {
                              setAnswer("familiar_areas", currentAreas.filter(a => a !== area))
                            }
                          }}
                        />
                        <span className="ml-3 text-sm font-medium text-gray-700">{area}</span>
                      </label>
                    ))}
                  </div>
                </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Are you comfortable conducting training sessions or workshops for diverse audiences?</label>
                <select className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors" value={form.answers.comfortable_training} onChange={(e) => setAnswer("comfortable_training", e.target.value)}>
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">What tools or software are you proficient in that are relevant to cybersecurity awareness or IT?</label>
                <textarea 
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none" 
                  rows={2} 
                  placeholder="List relevant tools and software..."
                  value={form.answers.tools_software} 
                  onChange={(e) => setAnswer("tools_software", e.target.value)} 
                />
              </div>
            </div>

            {/* Motivation and Fit */}
            <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200 space-y-6">
              <h3 className="text-xl font-semibold text-indigo-900 flex items-center border-b border-indigo-300 pb-3">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Motivation and Fit
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Why do you want to join Digishield and work in cybersecurity awareness?</label>
                <textarea 
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none" 
                  rows={3} 
                  placeholder="Tell us about your motivation..."
                  value={form.answers.why_join} 
                  onChange={(e) => setAnswer("why_join", e.target.value)} 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Describe a situation where you helped someone stay safe online or resolved a cybersecurity-related issue:</label>
                <textarea 
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none" 
                  rows={3} 
                  placeholder="Share a specific example..."
                  value={form.answers.safety_example} 
                  onChange={(e) => setAnswer("safety_example", e.target.value)} 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">How do you keep yourself updated on the latest cybersecurity trends and threats?</label>
                <textarea 
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none" 
                  rows={2} 
                  placeholder="Describe your learning methods..."
                  value={form.answers.stay_updated} 
                  onChange={(e) => setAnswer("stay_updated", e.target.value)} 
                />
              </div>
            </div>

            {/* Availability and Logistics */}
            <div className="bg-teal-50 rounded-xl p-6 border border-teal-200 space-y-6">
              <h3 className="text-xl font-semibold text-teal-900 flex items-center border-b border-teal-300 pb-3">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Availability and Logistics
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Are you available to commit to this role? (Please specify expected hours/week or duration)</label>
                <textarea 
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors resize-none" 
                  rows={2} 
                  placeholder="Specify your availability..."
                  value={form.answers.availability} 
                  onChange={(e) => setAnswer("availability", e.target.value)} 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Are you willing to travel or conduct in-person sessions if required?</label>
                <select className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors" value={form.answers.willing_travel} onChange={(e) => setAnswer("willing_travel", e.target.value)}>
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Do you have access to a reliable internet connection and a computer for virtual training and communication?</label>
                <select className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors" value={form.answers.internet_access} onChange={(e) => setAnswer("internet_access", e.target.value)}>
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-pink-50 rounded-xl p-6 border border-pink-200 space-y-6">
              <h3 className="text-xl font-semibold text-pink-900 flex items-center border-b border-pink-300 pb-3">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Additional Information
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Please provide any additional information or comments you believe are relevant to your application:</label>
                <textarea 
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors resize-none" 
                  rows={3} 
                  placeholder="Any additional information..."
                  value={form.answers.additional_info} 
                  onChange={(e) => setAnswer("additional_info", e.target.value)} 
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button 
                disabled={loading} 
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Submit Application
                  </>
                )}
              </button>
              <button 
                type="reset" 
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-8 rounded-xl border border-gray-300 transition-colors duration-200 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset Form
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}



