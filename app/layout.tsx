import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import WhatsAppButton from "@/components/whatsapp-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DigiShield - Cybersecurity Solutions for Kenya",
  description:
    "Protecting Kenya's digital future through cybersecurity education, incident response, and community engagement.",
  keywords: "cybersecurity, Kenya, digital security, incident response, training, awareness",
  authors: [{ name: "DigiShield Team" }],
  openGraph: {
    title: "DigiShield - Cybersecurity Solutions for Kenya",
    description:
      "Protecting Kenya's digital future through cybersecurity education, incident response, and community engagement.",
    url: "https://digishield.co.ke",
    siteName: "DigiShield",
    images: [
      {
        url: "https://lgbcvwlrqkvrmbvlbxnn.supabase.co/storage/v1/object/sign/leadersphotos/logomain-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85M2IzZTk2OS1kYzQ5LTQwYTMtYWU1ZC0wZmM1ODFmZTAzOTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsZWFkZXJzcGhvdG9zL2xvZ29tYWluLXJlbW92ZWJnLXByZXZpZXcucG5nIiwiaWF0IjoxNzU1MTY1OTk0LCJleHAiOjI3OTU4NTM5OTR9.UzLw4j0GMGzfJeRIosVyf6WAYBZGBlvfOKLkSQmxITY",
        width: 1200,
        height: 630,
        alt: "DigiShield Logo",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DigiShield - Cybersecurity Solutions for Kenya",
    description:
      "Protecting Kenya's digital future through cybersecurity education, incident response, and community engagement.",
    images: [
      "https://lgbcvwlrqkvrmbvlbxnn.supabase.co/storage/v1/object/sign/leadersphotos/logomain-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85M2IzZTk2OS1kYzQ5LTQwYTMtYWU1ZC0wZmM1ODFmZTAzOTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsZWFkZXJzcGhvdG9zL2xvZ29tYWluLXJlbW92ZWJnLXByZXZpZXcucG5nIiwiaWF0IjoxNzU1MTY1OTk0LCJleHAiOjI3OTU4NTM5OTR9.UzLw4j0GMGzfJeRIosVyf6WAYBZGBlvfOKLkSQmxITY",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <WhatsAppButton />

        {/* Footer */}
        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center mb-4">
                  <img src="https://lgbcvwlrqkvrmbvlbxnn.supabase.co/storage/v1/object/sign/leadersphotos/logomain-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85M2IzZTk2OS1kYzQ5LTQwYTMtYWU1ZC0wZmM1ODFmZTAzOTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsZWFkZXJzcGhvdG9zL2xvZ29tYWluLXJlbW92ZWJnLXByZXZpZXcucG5nIiwiaWF0IjoxNzU1MTY1OTk0LCJleHAiOjI3OTU4NTM5OTR9.UzLw4j0GMGzfJeRIosVyf6WAYBZGBlvfOKLkSQmxITY" alt="DigiShield" className="h-8 w-auto mr-3" />
                  <span className="text-xl font-bold">DigiShield</span>
                </div>
                <p className="text-gray-300 mb-4 max-w-md">
                  Protecting Kenya's digital future through cybersecurity education, incident response, and community
                  engagement.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/about" className="text-gray-300 hover:text-white transition-colors">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="/services" className="text-gray-300 hover:text-white transition-colors">
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="/resources" className="text-gray-300 hover:text-white transition-colors">
                      Resources
                    </a>
                  </li>
                  <li>
                    <a href="/team" className="text-gray-300 hover:text-white transition-colors">
                      Our Team
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="text-gray-300 hover:text-white transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>📧 info@digishield.co.ke</li>
                  <li>📞 +254 792 281 590</li>
                  <li>🚨 Emergency: +254 792 281 590</li>
                  <li>📍 Eldoret, Kenya</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
              <p>&copy; 2024 DigiShield. All rights reserved. | Privacy Policy | Terms of Service</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
