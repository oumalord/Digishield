"use client"

import { Download, FileText, Video, BookOpen, Shield } from "lucide-react"

export default function ResourcesPage() {
  const resources = [
    {
      category: "Guides & Toolkits",
      icon: BookOpen,
      items: [
        {
          title: "Personal Cybersecurity Toolkit",
          description: "Complete guide to protecting yourself online",
          type: "PDF",
          size: "2.5 MB",
          downloads: 1250,
        },
        {
          title: "Small Business Security Guide",
          description: "Essential cybersecurity practices for SMEs",
          type: "PDF",
          size: "3.1 MB",
          downloads: 890,
        },
        {
          title: "Mobile Security Checklist",
          description: "Step-by-step mobile device protection",
          type: "PDF",
          size: "1.8 MB",
          downloads: 2100,
        },
      ],
    },
    {
      category: "Policy Briefs",
      icon: FileText,
      items: [
        {
          title: "Kenya Cybersecurity Landscape 2024",
          description: "Analysis of current threats and trends",
          type: "PDF",
          size: "4.2 MB",
          downloads: 650,
        },
        {
          title: "Digital Rights and Privacy",
          description: "Understanding your digital rights in Kenya",
          type: "PDF",
          size: "2.8 MB",
          downloads: 780,
        },
        {
          title: "Cybercrime Prevention Strategies",
          description: "Community-based prevention approaches",
          type: "PDF",
          size: "3.5 MB",
          downloads: 520,
        },
      ],
    },
    {
      category: "Child Safety Resources",
      icon: Shield,
      items: [
        {
          title: "Internet Safety for Children",
          description: "Parent's guide to keeping kids safe online",
          type: "PDF",
          size: "2.2 MB",
          downloads: 1800,
        },
        {
          title: "Digital Parenting Toolkit",
          description: "Tools and tips for digital age parenting",
          type: "PDF",
          size: "3.8 MB",
          downloads: 1200,
        },
        {
          title: "School Internet Safety Program",
          description: "Curriculum for educators",
          type: "PDF",
          size: "5.1 MB",
          downloads: 450,
        },
      ],
    },
  ]

  const videos = [
    {
      title: "Digishield Tutorial",
      duration: "10:05",
      views: "",
      thumbnail: "https://img.youtube.com/vi/fUUbGULpSGk/hqdefault.jpg",
      url: "https://youtu.be/fUUbGULpSGk",
    },
  ]

  const getEmbedUrl = (url: string) => {
    try {
      if (url.includes("youtube.com/watch")) {
        const u = new URL(url)
        const id = u.searchParams.get("v") || ""
        return id ? `https://www.youtube.com/embed/${id}` : url
      }
      if (url.includes("youtu.be/")) {
        const id = url.split("youtu.be/")[1]
        return id ? `https://www.youtube.com/embed/${id}` : url
      }
      return url
    } catch {
      return url
    }
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="hero-gradient text-white section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Resources</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Free cybersecurity resources, guides, and tools to help you stay safe online
            </p>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {resources.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <category.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold">{category.category}</h2>
              </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                      </div>
                      <div className="ml-4">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {item.type}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{item.size}</span>
                      <span>{item.downloads.toLocaleString()} downloads</span>
                    </div>
                    <button
                      onClick={async () => {
                        const file = `${item.title.toLowerCase().replace(/\s+/g, '-')}.pdf`
                        const url = `/api/resources/download?id=${encodeURIComponent(item.title)}&file=${encodeURIComponent(file)}`
                        try {
                          const res = await fetch(url)
                          if (!res.ok) {
                            throw new Error("File not available yet. Please check back later.")
                          }
                          const blob = await res.blob()
                          const dl = document.createElement("a")
                          dl.href = URL.createObjectURL(blob)
                          dl.download = file
                          document.body.appendChild(dl)
                          dl.click()
                          document.body.removeChild(dl)
                          URL.revokeObjectURL(dl.href)
                        } catch (err: any) {
                          const toast = (window as any).sonner || null
                          const msg = err?.message || "Download failed"
                          if (toast && toast.toast) toast.toast("Download", { description: msg })
                          else console.error("Download error:", msg)
                        }
                      }}
                      className="w-full btn-primary flex items-center justify-center"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Resources */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
              <Video className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold">Video Tutorials</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video bg-gray-200 relative">
                  <iframe
                    className="w-full h-full"
                    src={getEmbedUrl(video.url)}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                  {video.duration ? (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  ) : null}
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-2">{video.title}</h3>
                  {video.views ? <p className="text-sm text-gray-600">{video.views} views</p> : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section-padding bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest cybersecurity resources and updates
            </p>
            <div className="max-w-md mx-auto">
              <form
                onSubmit={async (e) => {
                  e.preventDefault()
                  const formData = new FormData(e.target as HTMLFormElement)
                  const email = String(formData.get("email") || "")
                  
                  if (!email) {
                    alert("Please enter a valid email address")
                    return
                  }
                  
                  try {
                    const res = await fetch("/api/newsletter/subscribe", {
                      method: "POST",
                      headers: { 
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                      },
                      body: JSON.stringify({ email }),
                    })
                    
                    if (!res.ok) {
                      const errorText = await res.text()
                      let message = "Subscription failed"
                      try { message = (JSON.parse(errorText)?.error) || message } catch {}
                      throw new Error(message)
                    }
                    
                    ;(e.target as HTMLFormElement).reset()
                    const toast = (window as any).sonner || null
                    if (toast && toast.toast) {
                      toast.toast("Subscribed!", { description: "Thank you for subscribing to our newsletter." })
                    } else {
                      console.log("Subscribed to newsletter")
                    }
                  } catch (err: any) {
                    const toast = (window as any).sonner || null
                    const msg = err?.message || "Subscription failed. Please try again."
                    if (toast && toast.toast) {
                      toast.toast("Subscription failed", { description: msg })
                    } else {
                      console.error("Newsletter subscription error:", msg)
                    }
                  }
                }}
                className="flex flex-col sm:flex-row"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 rounded-l-lg sm:rounded-r-none rounded-r-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button type="submit" className="btn-secondary rounded-l-none mt-2 sm:mt-0">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
