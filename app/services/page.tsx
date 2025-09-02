"use client"

import { BookOpen, Shield, Users, Award, Clock, CheckCircle } from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      icon: BookOpen,
      title: "Cybersecurity Training",
      description: "Comprehensive training programs for individuals and organizations",
      features: [
        "Basic digital literacy and safety",
        "Advanced threat detection",
        "Incident response training",
        "Mobile security best practices",
        "Social engineering awareness",
      ],
      duration: "2-5 days",
      audience: "All levels",
    },
    {
      icon: Shield,
      title: "Incident Response",
      description: "24/7 support for cybersecurity incidents and threats",
      features: [
        "Immediate incident assessment",
        "Threat containment guidance",
        "Recovery assistance",
        "Evidence preservation",
        "Follow-up support",
      ],
      duration: "Immediate",
      audience: "Incident victims",
    },
    {
      icon: Users,
      title: "Community Outreach",
      description: "Grassroots cybersecurity awareness programs",
      features: [
        "Community workshops",
        "School programs",
        "Business seminars",
        "Public awareness campaigns",
        "Local language materials",
      ],
      duration: "Ongoing",
      audience: "Communities",
    },
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="hero-gradient text-white section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Comprehensive cybersecurity solutions tailored for the Kenyan context
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center ${
                  index % 2 === 1 ? "md:grid-flow-col-dense" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "md:col-start-2" : ""}>
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                    <service.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{service.title}</h2>
                  <p className="text-lg text-gray-600 mb-6">{service.description}</p>

                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{service.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{service.audience}</span>
                    </div>
                  </div>

                  {/* Add responsive action buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="btn-primary">Get Started</button>
                    <button className="btn-secondary bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50">
                      Learn More
                    </button>
                  </div>
                </div>

                <div
                  className={`bg-gray-50 p-6 md:p-8 rounded-lg ${index % 2 === 1 ? "md:col-start-1 md:row-start-1" : ""}`}
                >
                  <h3 className="text-xl font-bold mb-6">What's Included:</h3>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Training Programs</h2>
            <p className="text-xl text-gray-600">Specialized programs designed for different audiences</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Individual Training</h3>
              <p className="text-gray-600 mb-6">
                Personal cybersecurity training for individuals looking to protect themselves and their families online.
              </p>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>• Password management</li>
                <li>• Safe browsing practices</li>
                <li>• Mobile security</li>
                <li>• Social media safety</li>
              </ul>
              <button
                onClick={() => (window.location.href = "/contact?subject=individual-training")}
                className="btn-primary w-full"
              >
                Enroll Now
              </button>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Business Training</h3>
              <p className="text-gray-600 mb-6">
                Comprehensive cybersecurity training for businesses and organizations of all sizes.
              </p>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>• Employee security awareness</li>
                <li>• Data protection policies</li>
                <li>• Incident response planning</li>
                <li>• Compliance requirements</li>
              </ul>
              <button
                onClick={() => (window.location.href = "/contact?subject=business-training")}
                className="btn-primary w-full"
              >
                Contact Sales
              </button>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Educational Institutions</h3>
              <p className="text-gray-600 mb-6">
                Specialized programs for schools, colleges, and universities to build digital literacy.
              </p>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>• Student safety programs</li>
                <li>• Teacher training</li>
                <li>• Curriculum integration</li>
                <li>• Parent workshops</li>
              </ul>
              <button
                onClick={() => (window.location.href = "/contact?subject=educational-training")}
                className="btn-primary w-full"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today to discuss how our cybersecurity services can help protect you, your business, or your
            community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-secondary">
              Contact Us
            </a>
            <a href="/report-incident" className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
              Report Incident
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
