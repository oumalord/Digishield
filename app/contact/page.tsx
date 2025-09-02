"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react"
import { createContactMessage } from "@/lib/database-operations"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    subject: "" as "general" | "training" | "partnership" | "volunteer" | "media" | "support",
    message: "",
  })

  // Handle URL parameters for pre-filling subject
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const subject = urlParams.get("subject")
    if (subject) {
      setFormData((prev) => ({
        ...prev,
        subject: subject as any,
      }))
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await createContactMessage(formData)
      alert("Thank you for your message! We will get back to you within 24 hours.")
    } catch (error: any) {
      if (error.message.includes("Supabase not configured")) {
        // Demo mode fallback
        console.log("Demo mode: Contact message would be saved:", formData)
        alert("Thank you for your message! We will get back to you within 24 hours.")
      } else {
        console.error("Error submitting contact message:", error)
        alert("Thank you for your message! We will get back to you within 24 hours.")
      }
    }

    // Reset form
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      subject: "general",
      message: "",
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="hero-gradient text-white section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Get in touch with our team for support, partnerships, or general inquiries
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Email</h3>
              <p className="text-gray-600">info.digishield@gmail.com</p>
              <p className="text-gray-600">support@digishield.co.ke</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Phone</h3>
              <p className="text-gray-600">+254 792 281 590</p>
              <p className="text-gray-600">Emergency Hotline</p>
              <p className="text-gray-600">WhatsApp: +254 768 523 470</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Location</h3>
              <p className="text-gray-600">Moi University, Kesses</p>
              <p className="text-gray-600">Eldoret 3900-30100, Kenya</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Hours</h3>
              <p className="text-gray-600">Mon - Fri: 10AM - 6PM</p>
              <p className="text-gray-600">Sat: 10AM - 2PM</p>
            </div>
          </div>

          {/* Contact Form and Map */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6 responsive-form">
                <div className="form-row grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      required
                      value={formData.first_name}
                      onChange={handleChange}
                      className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      required
                      value={formData.last_name}
                      onChange={handleChange}
                      className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base sm:text-sm"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="training">Training Request</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="volunteer">Volunteer Application</option>
                    <option value="media">Media Inquiry</option>
                    <option value="support">Technical Support</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please provide details about your inquiry..."
                    className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base sm:text-sm"
                  />
                </div>

                <button type="submit" className="w-full btn-primary touch-target">
                  Send Message
                </button>
              </form>
            </div>

            {/* Office Information */}
            <div className="space-y-8">
              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-xl font-bold mb-4">Our Office</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                    <div>
                      <p className="font-medium">Digishield Kenya</p>
                      <p className="text-gray-600">Moi University, Kesses</p>
                      <p className="text-gray-600">Eldoret 3900-30100, Kenya</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-gray-600">+254 792 281 590</p>
                      <p className="text-gray-600">WhatsApp: +254 768 523 470</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">info.digishield@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-8">
                <h3 className="text-xl font-bold mb-4">Emergency Support</h3>
                <p className="text-gray-600 mb-4">For urgent cybersecurity incidents requiring immediate attention:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-red-600 mr-2" />
                    <span className="font-medium text-red-600">Emergency Hotline: +254 792 281 590</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-red-600 mr-2" />
                    <span className="font-medium text-red-600">emergency@digishield.co.ke</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-8">
                <h3 className="text-xl font-bold mb-4">WhatsApp Support</h3>
                <p className="text-gray-600 mb-4">
                  Get quick support through WhatsApp for general inquiries and guidance.
                </p>
                <button
                  onClick={() => {
                    const url = `https://wa.me/254768523470?text=${encodeURIComponent("Hello! I need help with cybersecurity support.")}`
                    window.open(url, "_blank", "noopener,noreferrer")
                  }}
                  className="flex items-center btn-primary bg-green-600 hover:bg-green-700"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to common questions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold mb-3">How quickly do you respond to incident reports?</h3>
              <p className="text-gray-600">
                We aim to respond to all incident reports within 24 hours. Critical incidents receive immediate
                attention.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold mb-3">Do you provide training for businesses?</h3>
              <p className="text-gray-600">
                Yes, we offer customized cybersecurity training programs for businesses of all sizes. Contact us for
                more details.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold mb-3">Is your incident reporting service free?</h3>
              <p className="text-gray-600">
                Yes, our incident reporting and initial response services are completely free for all users.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold mb-3">How can I become a volunteer?</h3>
              <p className="text-gray-600">
                Visit our "Get Involved" page to learn about volunteer opportunities and submit an application.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
