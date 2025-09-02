"use client"

import Link from "next/link"
import { Users, BookOpen, AlertTriangle, Shield, Phone, Mail, MapPin, Clock } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-blue text-white section-padding curved-bottom relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Building Digital Resilience in Kenya
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Empowering communities through cybersecurity education, training, and incident reporting. Creating
                digital spaces for information resilience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 btn-group">
                <Link href="/report-incident" className="btn-secondary text-lg px-8 py-4 inline-block text-center">
                  Report Incident Now
                </Link>
                <Link
                  href="/"
                  className="btn-primary bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 inline-block text-center"
                >
                  View Dashboard
                </Link>
              </div>
            </div>
            <div className="animate-float">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-0 border border-white/20 overflow-hidden">
                <div className="relative w-full h-64 bg-gradient-to-br from-red-900 to-red-600 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-red-500 rounded-full flex items-center justify-center shadow-2xl">
                      <AlertTriangle className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">SECURITY ALERT</h2>
                    <p className="text-red-100 text-sm">Critical System Monitoring</p>
                  </div>
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">24/7 Cyber Support</h3>
                  <p className="text-lg opacity-90 mb-6">
                    Immediate response to cyber threats and incidents across Kenya
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>+254 792 281 590</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <Mail className="h-4 w-4 mr-2" />
                      <span>info.digishield@gmail.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-white curved-top">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Digishield</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Digishield Communication Solutions is dedicated to building digital resilience across Kenya through
              comprehensive cybersecurity education, training, and community engagement programs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Education & Training</h3>
              <p className="text-gray-600">
                Comprehensive cybersecurity education programs designed for individuals, businesses, and communities to
                build digital literacy and security awareness.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Incident Response</h3>
              <p className="text-gray-600">
                24/7 incident reporting and response system providing immediate support for cyber threats, scams, and
                digital security breaches.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Community Engagement</h3>
              <p className="text-gray-600">
                Building networks of cyber ambassadors and volunteers to spread awareness and provide local support
                across all 47 counties in Kenya.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-gray-50 curved-top curved-bottom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive cybersecurity solutions for the digital age</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg card-hover">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Cybersecurity Training</h3>
              <p className="text-gray-600 mb-6">
                Professional training programs covering digital literacy, threat awareness, and security best practices.
              </p>
              <Link href="/services" className="text-blue-600 font-medium hover:underline inline-flex items-center">
                Learn More →
              </Link>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg card-hover">
              <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Incident Reporting</h3>
              <p className="text-gray-600 mb-6">
                Secure platform for reporting cyber incidents with immediate response and professional support.
              </p>
              <Link
                href="/report-incident"
                className="text-blue-600 font-medium hover:underline inline-flex items-center"
              >
                Report Now →
              </Link>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg card-hover">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Community Outreach</h3>
              <p className="text-gray-600 mb-6">
                Grassroots programs building cyber awareness and resilience in communities across Kenya.
              </p>
              <Link href="/get-involved" className="text-blue-600 font-medium hover:underline inline-flex items-center">
                Get Involved →
              </Link>
            </div>
          </div>
        </div>
      </section>


      
      {/* Stats Section */}
      <section className="section-padding bg-white curved-top">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600">Building digital resilience across Kenya</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">People Trained</div>
            </div>
            <div className="bg-green-50 p-6 rounded-xl">
              <div className="text-4xl font-bold text-green-600 mb-2">150+</div>
              <div className="text-gray-600">Incidents Resolved</div>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl">
              <div className="text-4xl font-bold text-purple-600 mb-2">47</div>
              <div className="text-gray-600">Counties Reached</div>
            </div>
            <div className="bg-red-50 p-6 rounded-xl">
              <div className="text-4xl font-bold text-red-600 mb-2">50+</div>
              <div className="text-gray-600">Community Partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding gradient-blue text-white curved-top">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Stay Informed</h2>
              <p className="text-xl mb-8 opacity-90">
                Join our community and receive valuable insights directly to your inbox.
              </p>

              <form
                onSubmit={async (e) => {
                  e.preventDefault()
                  const formData = new FormData(e.target as HTMLFormElement)
                  const name = String(formData.get("name") || "")
                  const email = String(formData.get("email") || "")
                  
                  if (!email) {
                    alert("Please enter a valid email address")
                    return
                  }
                  
                  try {
                    console.log("Submitting newsletter subscription:", { name, email })
                    
                    const res = await fetch("/api/newsletter/subscribe", {
                      method: "POST",
                      headers: { 
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                      },
                      body: JSON.stringify({ name, email }),
                    })
                    
                    console.log("Response status:", res.status)
                    console.log("Response headers:", Object.fromEntries(res.headers.entries()))
                    
                    if (!res.ok) {
                      const errorText = await res.text()
                      console.error("Response error text:", errorText)
                      
                      try {
                        const errorData = JSON.parse(errorText)
                        throw new Error(errorData?.error || "Subscription failed")
                      } catch (parseError) {
                        throw new Error(`Server error: ${res.status} - ${errorText}`)
                      }
                    }
                    
                    const data = await res.json()
                    console.log("Success response:", data)
                    alert("Thank you for subscribing to our newsletter!")
                    ;(e.target as HTMLFormElement).reset()
                  } catch (err: any) {
                    console.error("Newsletter subscription error:", err)
                    alert(err?.message || "Subscription failed. Please try again.")
                  }
                }}
                className="flex flex-col sm:flex-row gap-4 mb-8"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button type="submit" className="btn-secondary px-8 py-3 whitespace-nowrap">
                  Submit
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Visit Us</h2>
              <p className="text-xl mb-8 opacity-90">
                We welcome you to our office during business hours for any inquiries.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Moi University, Kesses Eldoret</p>
                    <p className="opacity-90">3900 - 30100, Kenya</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Mon-Fri 10am-6pm, Sat 10pm-2pm</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">0792281590</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">info.digishield@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
