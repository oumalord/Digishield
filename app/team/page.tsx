"use client"

import Image from "next/image"
import { Linkedin, Twitter, Mail } from "lucide-react"

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Howkins Ndemo",
      role: "Founder and CEO",
      bio: "Visionary leader and founder of Digishield Communication Solutions, dedicated to building digital resilience across Kenya through innovative cybersecurity education and community engagement programs.",
      image: "https://lgbcvwlrqkvrmbvlbxnn.supabase.co/storage/v1/object/sign/leadersphotos/CEO-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85M2IzZTk2OS1kYzQ5LTQwYTMtYWU1ZC0wZmM1ODFmZTAzOTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsZWFkZXJzcGhvdG9zL0NFTy1yZW1vdmViZy1wcmV2aWV3LnBuZyIsImlhdCI6MTc1NTAwNDE1MCwiZXhwIjo5MTAyODkyMTUwfQ.EXz4vT-Tt3PZJoL124t2dZbjdffhGZW1CVCXlrkT3qk",
      email: "howkinsndemo5@gmail.com",
      linkedin: "https://www.linkedin.com/in/hawkins-ndemo/",
      twitter: "#",
    },
    {
      name: "Nelly Thuku",
      role: "Co-founder",
      bio: "Co-founder and strategic partner in establishing Digishield as a leading cybersecurity awareness platform, bringing extensive experience in technology and community outreach.",
      image: "https://lgbcvwlrqkvrmbvlbxnn.supabase.co/storage/v1/object/sign/leadersphotos/Thukumuthoni.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85M2IzZTk2OS1kYzQ5LTQwYTMtYWU1ZC0wZmM1ODFmZTAzOTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsZWFkZXJzcGhvdG9zL1RodWt1bXV0aG9uaS5wbmciLCJpYXQiOjE3NTUwOTEwMTgsImV4cCI6MjA3MDQ1MTAxOH0.avj1lqfIw8XFcu9iSG35Z_5IIMiFREQbtwtXg7JyTww",
      email: "thukumuthoni2@gmail.com",
      linkedin: "https://www.linkedin.com/in/muthoni-thuku-41179a2a8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      twitter: "",
    },
    {
      name: "Benedict Ochieng",
      role: "Secretary General",
      bio: "Secretary General responsible for organizational governance, administrative oversight, and ensuring effective coordination of all Digishield programs and initiatives.",
      image: "https://lgbcvwlrqkvrmbvlbxnn.supabase.co/storage/v1/object/sign/leadersphotos/Benedict-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85M2IzZTk2OS1kYzQ5LTQwYTMtYWU1ZC0wZmM1ODFmZTAzOTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsZWFkZXJzcGhvdG9zL0JlbmVkaWN0LXJlbW92ZWJnLXByZXZpZXcucG5nIiwiaWF0IjoxNzU1MDkxMzAxLCJleHAiOjMxNDI2NzUzMDF9.4cwr1cngIc8FT8G8RPuvcbY2F5-V-LULeuMPGRSzUx0",
      email: "benedict@digishield.co.ke",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Seline Akinyi",
      role: "Finance Officer / Treasurer",
      bio: "Finance Officer and Treasurer managing financial operations, budgeting, and ensuring fiscal responsibility for all Digishield programs and sustainability initiatives.",
      image: "https://lgbcvwlrqkvrmbvlbxnn.supabase.co/storage/v1/object/sign/leadersphotos/Seline-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85M2IzZTk2OS1kYzQ5LTQwYTMtYWU1ZC0wZmM1ODFmZTAzOTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsZWFkZXJzcGhvdG9zL1NlbGluZS1yZW1vdmViZy1wcmV2aWV3LnBuZyIsImlhdCI6MTc1NTA5MTk5MiwiZXhwIjoyODU4ODUxOTkyfQ.Sn_-P8T0_SERi44N5HG3JYwmpCQrP2DTlMuUjV3HHyw",
      email: "Obieroseline181@gmail.com",
      linkedin: "https://x.com/obiero_seline?t=HlxzJQ42GNWxpFaUQj0k_w&s=08",
      twitter: "",
    },
    {
      name: "Keith Wanjala",
      role: "Mentorship and Volunteer Program Manager",
      bio: "Manager of mentorship and volunteer programs, developing and coordinating volunteer training, community engagement, and capacity building initiatives across Kenya.",
      image: "https://lgbcvwlrqkvrmbvlbxnn.supabase.co/storage/v1/object/sign/leadersphotos/keithwanjala.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85M2IzZTk2OS1kYzQ5LTQwYTMtYWU1ZC0wZmM1ODFmZTAzOTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsZWFkZXJzcGhvdG9zL2tlaXRod2FuamFsYS5wbmciLCJpYXQiOjE3NTUwOTE2ODcsImV4cCI6MjU3NTAyNzY4N30.6nWzNmB0wjg1AkNSlc2rr_Cg6Lbgliz7ZBFcO038lII",
      email: "keithwanjala1@gmail.com",
      linkedin: "http://www.linkedin.com/in/keith-wanjala",
      twitter: "#",
    },
    {
      name: "Lennah Leshore",
      role: "Director of Partnership and Outreach",
      bio: "Director responsible for building strategic partnerships, managing stakeholder relationships, and expanding Digishield's reach through collaborative initiatives.",
      image: "https://lgbcvwlrqkvrmbvlbxnn.supabase.co/storage/v1/object/sign/leadersphotos/lennahmain.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85M2IzZTk2OS1kYzQ5LTQwYTMtYWU1ZC0wZmM1ODFmZTAzOTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsZWFkZXJzcGhvdG9zL2xlbm5haG1haW4ucG5nIiwiaWF0IjoxNzU2NDUwNjQyLCJleHAiOjI0NTAyNDI2NDJ9.PXCUicKJX3RiDsFuojtP0gwy58r9tL0au1d_jjdkTDk",
      email: "",
      linkedin: "https://www.linkedin.com/in/leshore-ln-481657296?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      twitter: "https://x.com/IMlennah?s=08",
      instagram: "https://www.instagram.com/imlennah?igsh=MTRpa3Z4bXhxeWFndA=="
    },
    {
      name: "Hawkins Jones",
      role: "Public Relations Manager",
      bio: "Public Relations Manager handling media relations, public communications, and brand management to enhance Digishield's visibility and impact in cybersecurity awareness.",
      image: "https://lgbcvwlrqkvrmbvlbxnn.supabase.co/storage/v1/object/sign/leadersphotos/Hawkins-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85M2IzZTk2OS1kYzQ5LTQwYTMtYWU1ZC0wZmM1ODFmZTAzOTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsZWFkZXJzcGhvdG9zL0hhd2tpbnMtcmVtb3ZlYmctcHJldmlldy5wbmciLCJpYXQiOjE3NTUwOTE4NTcsImV4cCI6MjQ4MDQxOTg1N30.9_zN8W_qzbixmAIaysadzEHPaKWbqWaK_9caBa140vA",
      email: "hawkinsjones38@gmail.com",
      linkedin: "https://www.linkedin.com/in/hawkins-jones-801161353?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      twitter: "https://x.com/JonesHawki1348?t=IS08qUD_TYIXvBphfsr0UA&s=08",
    },
    {
      name: "Faith Mwikali",
      role: "Social Media Manager",
      bio: "Social Media Manager responsible for digital marketing, online community engagement, and leveraging social platforms to spread cybersecurity awareness and education.",
      image: "https://lgbcvwlrqkvrmbvlbxnn.supabase.co/storage/v1/object/sign/leadersphotos/faith.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85M2IzZTk2OS1kYzQ5LTQwYTMtYWU1ZC0wZmM1ODFmZTAzOTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsZWFkZXJzcGhvdG9zL2ZhaXRoLnBuZyIsImlhdCI6MTc1NjQ1MTU5NiwiZXhwIjoyNDUwMjQzNTk2fQ.QYAT3IkJwTye277azbXahHyql80Qppm-XDSh40pN-qY",
      email: "faith4kyalo@gmail.com",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Wayne Muchika",
      role: "Information Manager",
      bio: "Information Manager overseeing data management, information systems, and ensuring effective knowledge sharing and documentation across all Digishield programs.",
      image: "https://lgbcvwlrqkvrmbvlbxnn.supabase.co/storage/v1/object/sign/leadersphotos/Wayne-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85M2IzZTk2OS1kYzQ5LTQwYTMtYWU1ZC0wZmM1ODFmZTAzOTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsZWFkZXJzcGhvdG9zL1dheW5lLXJlbW92ZWJnLXByZXZpZXcucG5nIiwiaWF0IjoxNzU1MDkyMDg1LCJleHAiOjI0ODA0MjAwODV9.aXoIU3wgyKOesdml4DLe5rE1nBChI4RLdX6imVhfE7U",
      email: "wayneshirandula@gmail.com",
      linkedin: "https://www.linkedin.com/in/wayne-muchika-3a6aa2326?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      twitter: "https://x.com/ShirandulaWayne?t=GuqXyVBq6imiZtTldThUNg&s=09",
    },
    {
      name: "Dennis Onyuro",
      role: "Program Coordinator",
      bio: "Program Coordinator managing day-to-day operations, coordinating training sessions, and ensuring effective implementation of cybersecurity awareness programs.",
      image: "https://lgbcvwlrqkvrmbvlbxnn.supabase.co/storage/v1/object/sign/leadersphotos/Dennish.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85M2IzZTk2OS1kYzQ5LTQwYTMtYWU1ZC0wZmM1ODFmZTAzOTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsZWFkZXJzcGhvdG9zL0Rlbm5pc2guanBnIiwiaWF0IjoxNzU1MDkxNDkyLCJleHAiOjIzODU4MTE0OTJ9.oL6VsohNkaAwsgS16PQIE1M-9g1_FidiDnVgXjwaPgs",
      email: "burodennis@gmail.com",
      linkedin: "https://www.linkedin.com/in/dennis-onyuro-4b64572a8?utm_",
      twitter: "https://x.com/BuroDennis?t=LIuFoIfJRG2tC1KmZo7gjw&s=09",
    },
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="hero-gradient text-white section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Meet Our Leadership Team</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Dedicated professionals working to build digital resilience across Kenya
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team Grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600">The visionary leaders driving our cybersecurity mission</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden card-hover">
                <div className="aspect-square relative bg-gray-200 rounded-full overflow-hidden">
                  <Image
                    src={member.image || "/images/team-placeholder.svg"}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover"
                    priority={index < 3}
                    onError={(e: any) => {
                      e.currentTarget.src = "/images/team-placeholder.svg"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end rounded-full">
                    <div className="p-4 text-white">
                      <p className="text-sm font-medium">{member.role}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-4">{member.bio}</p>

                  <div className="flex space-x-4">
                    <a
                      href={member.linkedin}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href={member.twitter}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                      aria-label={`${member.name} Twitter`}
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organizational Structure */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Organizational Structure</h2>
            <p className="text-xl text-gray-600">How our team is organized to serve Kenya's cybersecurity needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Executive Leadership</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Founder and CEO</li>
                <li>• Co-founder</li>
                <li>• Secretary General</li>
                <li>• Finance Officer / Treasurer</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-green-600">Program Management</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Mentorship and Volunteer Program Manager</li>
                <li>• Director of Partnership and Outreach</li>
                <li>• Program Coordinator</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-purple-600">Communications & Content</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Public Relations Manager</li>
                <li>• Social Media Manager</li>
                <li>• Information Manager</li>
                <li>• Chief Editor</li>
                <li>• Content Specialist</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Advisory Board */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Advisory Board</h2>
            <p className="text-xl text-gray-600">Experienced leaders guiding our strategic direction</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">Prof. John Walubengo</h3>
              <p className="text-blue-600 font-medium mb-4">ICT Policy Expert</p>
              <p className="text-gray-600">
                Leading ICT policy expert and lecturer at Multimedia University. Provides strategic guidance on policy
                and regulatory matters affecting cybersecurity in Kenya.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">Mary Mwangi</h3>
              <p className="text-blue-600 font-medium mb-4">Former Banking Executive</p>
              <p className="text-gray-600">
                Former Chief Information Security Officer at a major Kenyan bank. Brings extensive experience in
                financial cybersecurity and risk management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="section-padding bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We're always looking for passionate individuals who want to make a difference in cybersecurity education and
            community safety across Kenya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/get-involved" className="btn-secondary">
              Volunteer Opportunities
            </a>
            <a href="mailto:careers@digishield.co.ke" className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
              Career Opportunities
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
