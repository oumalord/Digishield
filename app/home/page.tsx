"use client"

import { Shield, Users, BookOpen, AlertTriangle, Globe, Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-blue-600 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Securing Kenya's Digital Future</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Comprehensive cybersecurity awareness, training, and incident response services across all 47 counties of
            Kenya
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/report-incident">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">
                Report Incident
              </Button>
            </Link>
            <Link href="/get-involved">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 bg-transparent"
              >
                Get Involved
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Digishield</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We are Kenya's leading cybersecurity awareness organization, dedicated to building a digitally resilient
              nation through education, community engagement, and rapid incident response.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Protection</h3>
              <p className="text-gray-600">
                Comprehensive cybersecurity solutions tailored for Kenyan individuals, businesses, and communities.
              </p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">
                Building strong networks of cyber-aware citizens across all 47 counties through grassroots engagement.
              </p>
            </div>
            <div className="text-center">
              <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Education</h3>
              <p className="text-gray-600">
                Practical training programs that make cybersecurity accessible and actionable for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600">
              Comprehensive cybersecurity solutions for individuals, businesses, and communities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <AlertTriangle className="h-8 w-8 text-red-600 mb-2" />
                <CardTitle>Incident Response</CardTitle>
                <CardDescription>24/7 emergency response for cybersecurity incidents</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Rapid response team available around the clock to handle cybersecurity emergencies and minimize
                  damage.
                </p>
                <Link href="/report-incident">
                  <Button className="w-full">Report Incident</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Training Programs</CardTitle>
                <CardDescription>Comprehensive cybersecurity education for all levels</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Interactive workshops, seminars, and online courses designed for different audiences and skill levels.
                </p>
                <Link href="/services">
                  <Button variant="outline" className="w-full bg-transparent">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Community Outreach</CardTitle>
                <CardDescription>Grassroots cybersecurity awareness programs</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Building cyber-resilient communities through local partnerships and targeted awareness campaigns.
                </p>
                <Link href="/get-involved">
                  <Button variant="outline" className="w-full bg-transparent">
                    Get Involved
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

          {/* Quick Actions Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Take Action Today</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Protect yourself and your community from cyber threats. Get involved in Kenya's cybersecurity movement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/report-incident" className="group">
              <div className="bg-red-50 hover:bg-red-100 p-6 rounded-lg transition-colors border border-red-200">
                <AlertTriangle className="h-8 w-8 text-red-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Report Incident</h3>
                <p className="text-sm text-gray-600">Report cybersecurity incidents and get immediate assistance</p>
              </div>
            </Link>

            <Link href="/home" className="group">
              <div className="bg-blue-50 hover:bg-blue-100 p-6 rounded-lg transition-colors border border-blue-200">
                <BookOpen className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Learn More</h3>
                <p className="text-sm text-gray-600">Discover our services, mission, and impact in Kenya</p>
              </div>
            </Link>

            <Link href="/get-involved" className="group">
              <div className="bg-green-50 hover:bg-green-100 p-6 rounded-lg transition-colors border border-green-200">
                <Users className="h-8 w-8 text-green-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Get Involved</h3>
                <p className="text-sm text-gray-600">Join our volunteer network and make a difference</p>
              </div>
            </Link>

            <Link href="/resources" className="group">
              <div className="bg-purple-50 hover:bg-purple-100 p-6 rounded-lg transition-colors border border-purple-200">
                <Shield className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Resources</h3>
                <p className="text-sm text-gray-600">Access cybersecurity guides and educational materials</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600">Making a difference across Kenya's digital landscape</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">47</div>
              <div className="text-gray-600">Counties Reached</div>
              <div className="text-sm text-gray-500 mt-1">Complete national coverage</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">10,000+</div>
              <div className="text-gray-600">People Trained</div>
              <div className="text-sm text-gray-500 mt-1">Across all demographics</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Incidents Resolved</div>
              <div className="text-sm text-gray-500 mt-1">Fast response times</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
              <div className="text-sm text-gray-500 mt-1">Always here to help</div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Tutorial */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Video Tutorial</h2>
          <div className="aspect-video w-full max-w-3xl">
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/fUUbGULpSGk"
              title="Digishield Tutorial"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="mt-4">
            <a href="https://youtu.be/fUUbGULpSGk" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Open on YouTube</a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Stay Informed</h2>
            <p className="text-lg text-gray-600">Get the latest cybersecurity updates and alerts</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-blue-600 mr-3" />
                  <span>+254 700 123 456</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-blue-600 mr-3" />
                  <span>info@digishield.co.ke</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                  <span>Nairobi, Kenya</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-blue-600 mr-3" />
                  <span>Serving all 47 counties</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Newsletter Signup</h3>
              <p className="text-gray-600 mb-4">
                Subscribe to receive cybersecurity alerts, tips, and updates from Digishield.
              </p>
              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault()
                  const form = e.target as HTMLFormElement
                  const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement | null
                  const email = emailInput?.value?.trim() || ""
                  if (!email) {
                    alert("Please enter a valid email address")
                    return
                  }
                  try {
                    const res = await fetch("/api/newsletter/subscribe", {
                      method: "POST",
                      headers: { "Content-Type": "application/json", Accept: "application/json" },
                      body: JSON.stringify({ email }),
                    })
                    if (!res.ok) {
                      const text = await res.text()
                      throw new Error(text || "Subscription failed")
                    }
                    alert("Thank you for subscribing to our newsletter!")
                    form.reset()
                  } catch (err: any) {
                    alert(err?.message || "Subscription failed. Please try again.")
                  }
                }}
              >
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button type="submit" className="w-full">Subscribe to Newsletter</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
