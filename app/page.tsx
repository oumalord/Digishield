import DashboardHero from "@/components/dashboard-hero"
import CEOMessage from "@/components/ceo-message"
import WhatsAppButton from "@/components/whatsapp-button"
import Link from "next/link"
import { Shield, AlertTriangle, Users, BookOpen } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Auto-scrolling Images */}
      <DashboardHero />

      {/* CEO Message Section */}
      <CEOMessage />

     

      {/* Statistics Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact Across Kenya</h2>
            <p className="text-lg text-gray-600">Building a digitally secure nation, one community at a time</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">47</div>
              <div className="text-gray-600">Counties Reached</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">10,000+</div>
              <div className="text-gray-600">People Trained</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Incidents Resolved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppButton />
    </div>
  )
}
