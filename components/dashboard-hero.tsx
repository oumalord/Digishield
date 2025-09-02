"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const heroImages = [
  {
    id: 1,
    url: "/images/team-event-1.jpg",
    title: "Cybersecurity Training Workshop",
    description: "Empowering communities with digital security knowledge across Kenya",
  },
  {
    id: 2,
    url: "/images/team-event-2.jpg",
    title: "Community Outreach Program",
    description: "Building partnerships with local organizations for cyber awareness",
  },
  {
    id: 3,
    url: "/images/team-event-3.jpg",
    title: "Digital Safety Conference",
    description: "Leading discussions on Kenya's cybersecurity landscape",
  },
]

export default function DashboardHero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + heroImages.length) % heroImages.length)
  }

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  const currentImage = heroImages[currentImageIndex]

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentImage.url || "/placeholder.svg"}
          alt={currentImage.title}
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">Protecting Kenya's Digital Future</h1>
        <p className="text-xl md:text-2xl mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          {currentImage.description}
        </p>
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <Link href="/report-incident">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">
              Report Incident
            </Button>
          </Link>
          <Link href="/home">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 bg-transparent"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-4 bg-black/30 backdrop-blur-sm rounded-full px-6 py-3">
          <button
            onClick={goToPrevious}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>

          <div className="flex space-x-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={toggleAutoPlay}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isAutoPlaying ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white" />}
          </button>

          <button
            onClick={goToNext}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      {/* Image Title Overlay */}
      <div className="absolute bottom-24 left-8 z-20 bg-black/50 backdrop-blur-sm rounded-lg p-4 max-w-md">
        <h3 className="text-white font-semibold text-lg mb-1">{currentImage.title}</h3>
        <p className="text-white/80 text-sm">{currentImage.description}</p>
      </div>
    </section>
  )
}
