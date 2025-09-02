"use client"

import { Users, BookOpen, Megaphone, Award, Heart, HeartHandshake, CheckCircle, ChevronLeft, ChevronRight, MessageSquare, Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function GetInvolvedPage() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)

  const opportunities = [
    {
      icon: BookOpen,
      title: "Cyber Trainer",
      description: "Lead cybersecurity training sessions in your community",
      requirements: [
        "Basic cybersecurity knowledge",
        "Good communication skills",
        "Commitment to community service",
        "Available for weekend sessions",
      ],
      commitment: "4-8 hours/month",
      impact: "Train 20-50 people per session",
    },
    {
      icon: Megaphone,
      title: "Awareness Ambassador",
      description: "Spread cybersecurity awareness through social media and community networks",
      requirements: [
        "Active on social media",
        "Passion for digital safety",
        "Basic content creation skills",
        "Local community connections",
      ],
      commitment: "2-4 hours/week",
      impact: "Reach 100+ people monthly",
    },
    {
      icon: Users,
      title: "Community Coordinator",
      description: "Organize and coordinate cybersecurity events in your area",
      requirements: [
        "Event planning experience",
        "Strong organizational skills",
        "Local network connections",
        "Leadership abilities",
      ],
      commitment: "6-10 hours/month",
      impact: "Organize 2-4 events monthly",
    },
    {
      icon: HeartHandshake,
      title: "Incident Response Volunteer",
      description: "Provide first-line support to cybercrime victims",
      requirements: [
        "Empathy and patience",
        "Basic tech troubleshooting",
        "Good listening skills",
        "Availability for emergency calls",
      ],
      commitment: "On-call basis",
      impact: "Help 5-10 victims monthly",
    },
  ]

  const handleApplyNow = (opportunityTitle: string) => {
    const slug = opportunityTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
    router.push(`/get-involved/apply/${slug}`)
  }

  const handlePartnershipClick = (partnershipType: string) => {
    const subject = encodeURIComponent(`Partnership Inquiry - ${partnershipType}`)
    router.push(`/contact?subject=partnership&type=${subject}`)
  }

  const handleStartApplication = () => {
    router.push("/organisation/apply")
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="hero-gradient text-white section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get Involved</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Join our mission to build digital resilience across Kenya. Every contribution makes a difference.
            </p>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Volunteer Opportunities</h2>
            <p className="text-xl text-gray-600">
              Choose how you'd like to contribute to cybersecurity awareness in Kenya
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {opportunities.map((opportunity, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <opportunity.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{opportunity.title}</h3>
                    <p className="text-gray-600">{opportunity.description}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold mb-2">Requirements:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {opportunity.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold">Time Commitment:</span>
                      <p className="text-gray-600">{opportunity.commitment}</p>
                    </div>
                    <div>
                      <span className="font-semibold">Expected Impact:</span>
                      <p className="text-gray-600">{opportunity.impact}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleApplyNow(opportunity.title)}
                  className="w-full btn-primary hover:bg-blue-700 transition-colors"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Volunteer With Us?</h2>
            <p className="text-xl text-gray-600">The benefits of joining the Digishield volunteer community</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Skill Development</h3>
              <p className="text-gray-600">
                Enhance your cybersecurity knowledge and develop new skills through our comprehensive training programs.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Community Impact</h3>
              <p className="text-gray-600">
                Make a real difference in your community by helping others stay safe in the digital world.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Personal Fulfillment</h3>
              <p className="text-gray-600">
                Experience the satisfaction of contributing to a safer digital environment for all Kenyans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Opportunities */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Partnership Opportunities</h2>
            <p className="text-xl text-gray-600">Organizations and institutions can partner with us in various ways</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg border-l-4 border-blue-600">
              <h3 className="text-xl font-bold mb-4">Educational Institutions</h3>
              <p className="text-gray-600 mb-6">
                Partner with us to integrate cybersecurity education into your curriculum and provide training for
                students and staff.
              </p>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>• Student cybersecurity programs</li>
                <li>• Faculty training workshops</li>
                <li>• Research collaboration opportunities</li>
                <li>• Campus security assessments</li>
              </ul>
              <button onClick={() => handlePartnershipClick("Educational Partnership")} className="btn-primary">
                Learn More
              </button>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg border-l-4 border-green-600">
              <h3 className="text-xl font-bold mb-4">Corporate Partners</h3>
              <p className="text-gray-600 mb-6">
                Join us as a corporate partner to support cybersecurity awareness initiatives and protect your
                employees.
              </p>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>• Employee security training</li>
                <li>• Sponsorship opportunities</li>
                <li>• CSR program integration</li>
                <li>• Industry expertise sharing</li>
              </ul>
              <button onClick={() => handlePartnershipClick("Corporate Partnership")} className="btn-primary">
                Contact Us
              </button>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg border-l-4 border-purple-600">
              <h3 className="text-xl font-bold mb-4">Government Agencies</h3>
              <p className="text-gray-600 mb-6">
                Collaborate with us to strengthen national cybersecurity capabilities and public awareness.
              </p>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>• Policy development support</li>
                <li>• Public awareness campaigns</li>
                <li>• Capacity building programs</li>
                <li>• Incident response coordination</li>
              </ul>
              <button onClick={() => handlePartnershipClick("Government Partnership")} className="btn-primary">
                Partner With Us
              </button>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg border-l-4 border-red-600">
              <h3 className="text-xl font-bold mb-4">Community Organizations</h3>
              <p className="text-gray-600 mb-6">
                Work with us to bring cybersecurity awareness to your community members and beneficiaries.
              </p>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>• Community workshop hosting</li>
                <li>• Local outreach programs</li>
                <li>• Resource sharing</li>
                <li>• Joint awareness campaigns</li>
              </ul>
              <button onClick={() => handlePartnershipClick("Community Partnership")} className="btn-primary">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="section-padding bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How to Get Started</h2>
            <p className="text-xl">Simple steps to join our cybersecurity awareness mission</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Apply</h3>
              <p className="text-blue-100">
                Fill out our volunteer application form with your interests and availability.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Interview</h3>
              <p className="text-blue-100">Participate in a brief interview to discuss your role and expectations.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Training</h3>
              <p className="text-blue-100">Complete our volunteer training program to prepare for your role.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Start</h3>
              <p className="text-blue-100">Begin making a difference in your community's digital safety.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={handleStartApplication}
              className="btn-secondary text-lg px-8 py-4 hover:bg-white hover:text-blue-600 transition-colors"
            >
              Start Your Application
            </button>
          </div>
        </div>
      </section>

      {/* Removed modal; using direct form navigation */}
    </div>
  )
}
