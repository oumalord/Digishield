"use client"
import Image from "next/image"
import { Calendar, Eye, Camera } from "lucide-react"
import { supabase, hasValidConfig } from "@/lib/supabase"
import { useEffect, useState } from "react"

export default function MediaPage() {
  const [mediaItems, setMediaItems] = useState<Array<{ id: number; title: string; description?: string; image?: string; date?: string; category?: string; views?: number }>>([
    {
      id: 0,
      title: "Lennah Leshore",
      description: "Leadership profile image",
      image: "https://lgbcvwlrqkvrmbvlbxnn.supabase.co/storage/v1/object/sign/leadersphotos/lennahmain.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85M2IzZTk2OS1kYzQ5LTQwYTMtYWU1ZC0wZmM1ODFmZTAzOTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsZWFkZXJzcGhvdG9zL2xlbm5haG1haW4ucG5nIiwiaWF0IjoxNzU2NDUwNjQyLCJleHAiOjI0NTAyNDI2NDJ9.PXCUicKJX3RiDsFuojtP0gwy58r9tL0au1d_jjdkTDk",
      date: new Date().toISOString(),
      category: "Leadership",
      views: 0,
    },
    {
      id: -1,
      title: "Faith Mwikali",
      description: "Leadership profile image",
      image: "https://lgbcvwlrqkvrmbvlbxnn.supabase.co/storage/v1/object/sign/leadersphotos/faith.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85M2IzZTk2OS1kYzQ5LTQwYTMtYWU1ZC0wZmM1ODFmZTAzOTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsZWFkZXJzcGhvdG9zL2ZhaXRoLnBuZyIsImlhdCI6MTc1NjQ1MTU5NiwiZXhwIjoyNDUwMjQzNTk2fQ.QYAT3IkJwTye277azbXahHyql80Qppm-XDSh40pN-qY",
      date: new Date().toISOString(),
      category: "Leadership",
      views: 0,
    },
    {
      id: 1,
      title: "Cybersecurity Awareness Workshop - Nairobi",
      description: "Community workshop on digital safety held at Kenyatta University",
      image: "/placeholder.svg?height=400&width=600",
      date: "2024-03-15",
      category: "Workshop",
      views: 245,
    },
    {
      id: 2,
      title: "Youth Digital Safety Campaign",
      description: "Engaging young people in cybersecurity awareness activities",
      image: "/placeholder.svg?height=400&width=600",
      date: "2024-03-10",
      category: "Campaign",
      views: 189,
    },
    {
      id: 3,
      title: "Business Security Training Session",
      description: "Training session for SMEs on protecting their digital assets",
      image: "/placeholder.svg?height=400&width=600",
      date: "2024-03-08",
      category: "Training",
      views: 156,
    },
    {
      id: 4,
      title: "School Outreach Program",
      description: "Teaching students about online safety and digital citizenship",
      image: "/placeholder.svg?height=400&width=600",
      date: "2024-03-05",
      category: "Outreach",
      views: 298,
    },
    {
      id: 5,
      title: "Community Leaders Meeting",
      description: "Engaging community leaders in cybersecurity advocacy",
      image: "/placeholder.svg?height=400&width=600",
      date: "2024-03-01",
      category: "Meeting",
      views: 134,
    },
    {
      id: 6,
      title: "Mobile Money Security Awareness",
      description: "Educating users about mobile money fraud prevention",
      image: "/placeholder.svg?height=400&width=600",
      date: "2024-02-28",
      category: "Awareness",
      views: 267,
    },
    {
      id: 7,
      title: "Women in Cybersecurity Event",
      description: "Empowering women through cybersecurity education and networking",
      image: "/placeholder.svg?height=400&width=600",
      date: "2024-02-25",
      category: "Event",
      views: 201,
    },
    {
      id: 8,
      title: "Rural Community Digital Literacy",
      description: "Bringing cybersecurity awareness to rural communities",
      image: "/placeholder.svg?height=400&width=600",
      date: "2024-02-20",
      category: "Outreach",
      views: 178,
    },
    {
      id: 9,
      title: "Partnership Launch with Eveminet",
      description: "Official launch of our strategic partnership",
      image: "/placeholder.svg?height=400&width=600",
      date: "2024-02-15",
      category: "Partnership",
      views: 312,
    },
  ])

  useEffect(() => {
    const load = async () => {
      if (!hasValidConfig || !supabase) return
      const { data, error } = await supabase
        .from("media_items")
        .select("id, title, description, image_url, created_at, category, views")
        .order("created_at", { ascending: false })
        .limit(50)
      if (!error && data) {
        setMediaItems(
          data.map((d) => ({
            id: d.id,
            title: d.title,
            description: d.description,
            image: d.image_url,
            date: d.created_at,
            category: d.category,
            views: d.views,
          })) as any,
        )
      }
    }
    load()
  }, [])

  const categories = [
    "All",
    "Workshop",
    "Campaign",
    "Training",
    "Outreach",
    "Meeting",
    "Awareness",
    "Event",
    "Partnership",
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="hero-gradient text-white section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Media Gallery</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Showcasing our cybersecurity awareness campaigns, training sessions, and community events
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full border border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Media Grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mediaItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden card-hover">
                <div className="aspect-video relative">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">{item.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-2" />
                      <span>{item.views} views</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact in Numbers</h2>
            <p className="text-xl text-gray-600">Visual documentation of our cybersecurity awareness efforts</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-gray-600">Events Documented</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">25K+</div>
              <div className="text-gray-600">Total Views</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">12</div>
              <div className="text-gray-600">Months Active</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-red-600" />
              </div>
              <div className="text-3xl font-bold text-red-600 mb-2">47</div>
              <div className="text-gray-600">Counties Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Want to Feature Your Event?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            If you're organizing a cybersecurity awareness event or would like us to document your activities, get in
            touch with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-secondary">
              Contact Us
            </a>
            <a href="/get-involved" className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
              Partner With Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
