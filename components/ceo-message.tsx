"use client"

import { useState, useEffect } from "react"
import { Mail, Phone, Linkedin, Quote } from "lucide-react"
import { supabase, hasValidConfig } from "@/lib/supabase"

interface CEOData {
  id: string
  name: string
  position: string
  email: string
  phone: string
  linkedin: string
  image_url: string
}

export default function CEOMessage() {
  const [ceoData, setCeoData] = useState<CEOData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCEOData = async () => {
      try {
        // Check if Supabase is properly configured
        if (!hasValidConfig || !supabase) {
          console.warn("Supabase not configured, using fallback data")
          setCeoData({
            id: "1",
            name: "Howkins Ndemo",
            position: "Chief Executive Officer & Founder",
            email: "howkins@digishield.co.ke",
            phone: "+254792281590",
            linkedin: "https://linkedin.com/in/howkins-ndemo-digishield",
            image_url: "/images/ceo.png",
          })
          setLoading(false)
          return
        }

        // Try to fetch CEO data from team_members table
        const { data, error } = await supabase
          .from("team_members")
          .select("*")
          .or("position.ilike.%CEO%,position.ilike.%Chief Executive%")
          .single()

        if (error) {
          console.warn("Could not fetch CEO data from database, using fallback:", error.message)
          setCeoData({
            id: "1",
            name: "Howkins Ndemo",
            position: "Chief Executive Officer & Founder",
            email: "howkins@digishield.co.ke",
            phone: "+254792281590",
            linkedin: "https://linkedin.com/in/howkins-ndemo-digishield",
            image_url: "/images/ceo.png",
          })
        } else {
          setCeoData({
            ...data,
            image_url: data.image_url || "/images/ceo.png",
          })
        }
      } catch (error) {
        console.warn("Error fetching CEO data, using fallback:", error)
        setCeoData({
          id: "1",
          name: "Howkins Ndemo",
          position: "Chief Executive Officer & Founder",
          email: "howkins@digishield.co.ke",
          phone: "+254792281590",
          linkedin: "https://linkedin.com/in/howkins-ndemo-digishield",
          image_url: "/images/ceo.png",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCEOData()
  }, [])

  if (loading) {
    return (
      <section className="section-padding bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="text-center mb-16">
              <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 rounded w-4/5"></div>
              </div>
              <div className="aspect-square bg-gray-300 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!ceoData) {
    return null
  }

  const ceoMessage = `Our digital lifestyle is largely visible to others. We share extensive information about ourselves, which can make us somewhat vulnerable. Cybercriminals can exploit the information that is publicly available, much of which we may not even realize we are sharing. Data brokers compile and distribute this information, making it accessible to anyone. Claim your spot in our cybersecurity awareness, as we discuss how cybercriminals can gain access to your accounts and your digital activities, and ways to protect yourself from other cybercrimes like Cyberbullying, Phishing, Identity Theft, Hacking, and Online Fraud.`

  return (
    <section className="section-padding bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-600/10 text-blue-600 rounded-full text-sm font-medium mb-4">
            Message from Leadership
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">A Message from Our CEO</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* CEO Photo */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-indigo-200">
              <img
                src={ceoData.image_url || "/images/ceo.png"}
                alt={`${ceoData.name}, ${ceoData.position}`}
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/images/ceo.png"
                }}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-xl">
              <Quote className="h-12 w-12 text-white" />
            </div>
          </div>

          {/* Message Content */}
          <div className="space-y-6 order-1 lg:order-2">
            <div className="prose prose-lg text-gray-700 space-y-4">
              <blockquote className="text-lg leading-relaxed italic border-l-4 border-blue-600 pl-6">
                "{ceoMessage}"
              </blockquote>
            </div>

            {/* CEO Details */}
            <div className="border-t border-gray-200 pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{ceoData.name}</h3>
                  <p className="text-blue-600 font-medium">{ceoData.position}</p>
                  <p className="text-gray-600">Digishield Communication Solutions</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={`mailto:${ceoData.email}`}
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="text-sm">{ceoData.email}</span>
                  </a>
                  <a
                    href={`tel:${ceoData.phone}`}
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    <span className="text-sm">{ceoData.phone}</span>
                  </a>
                  <a
                    href={ceoData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Linkedin className="h-4 w-4 mr-2" />
                    <span className="text-sm">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
