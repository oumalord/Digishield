"use client"

import AdminAuthWrapper from "@/components/admin-auth-wrapper"
import { exportToCSV } from "@/lib/utils"
import { useEffect, useState } from "react"
import { supabase, hasValidConfig } from "@/lib/supabase"

type OrgApp = {
  id: string
  full_name: string
  email: string
  phone?: string
  location?: string
  role_applied?: string
  linkedin?: string
  portfolio?: string
  resume_url?: string
  status: "submitted" | "interview_scheduled" | "training_scheduled" | "declined" | "accepted"
  stage?: string
  answers?: any
  created_at?: string
}

export default function AdminApplicationsPage() {
  const [items, setItems] = useState<OrgApp[]>([])
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState("")

  const load = async () => {
    if (!hasValidConfig || !supabase) return
    const { data, error } = await supabase
      .from("organisation_applications")
      .select("id, full_name, email, phone, location, role_applied, linkedin, portfolio, resume_url, status, stage, answers, created_at")
      .order("created_at", { ascending: false })
      .limit(500)
    if (error) setError(error.message)
    else setItems((data as any) || [])
  }

  useEffect(() => { load() }, [])

  const updateStatus = async (app: OrgApp, status: OrgApp["status"], stage?: string) => {
    if (!supabase) return
    const { error } = await supabase
      .from("organisation_applications")
      .update({ status, stage: stage || app.stage })
      .eq("id", app.id)
    if (error) setError(error.message)
    else load()
  }

  const openEmail = (to: string, subject: string, body: string) => {
    console.log('Opening email for:', to, 'Subject:', subject)
    
    // For long emails, use clipboard method directly
    if (body.length > 2000) {
      console.log('Email body too long, using clipboard method')
      const fullEmail = `To: ${to}\nSubject: ${subject}\n\n${body}`
      navigator.clipboard.writeText(fullEmail).then(() => {
        alert(`Email content copied to clipboard!\n\nTo: ${to}\nSubject: ${subject}\n\nPlease paste this into your email client.`)
      }).catch(() => {
        alert(`Email content:\n\nTo: ${to}\nSubject: ${subject}\n\n${body}`)
      })
      return
    }
    
    const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    console.log('Mailto URL length:', mailto.length)
    
    // Try multiple methods to open email client
    try {
      // Method 1: Direct window.open
      const emailWindow = window.open(mailto, '_blank')
      console.log('Email window opened:', !!emailWindow)
      
      // Method 2: If window.open fails, try location.href
      if (!emailWindow) {
        console.log('Window.open failed, trying location.href')
        window.location.href = mailto
      }
      
      // Method 3: Fallback - copy to clipboard and show alert
      setTimeout(() => {
        if (!emailWindow || emailWindow.closed) {
          console.log('Email window closed or failed, using clipboard fallback')
          const fullEmail = `To: ${to}\nSubject: ${subject}\n\n${body}`
          navigator.clipboard.writeText(fullEmail).then(() => {
            alert(`Email content copied to clipboard!\n\nTo: ${to}\nSubject: ${subject}\n\nPlease paste this into your email client.`)
          }).catch(() => {
            alert(`Email content:\n\nTo: ${to}\nSubject: ${subject}\n\n${body}`)
          })
        }
      }, 1000)
      
    } catch (error) {
      console.error('Error opening email:', error)
      // Fallback - show email content in alert
      alert(`Email content:\n\nTo: ${to}\nSubject: ${subject}\n\n${body}`)
    }
  }

  const filtered = items.filter((a) => (
    (a.full_name + a.email + (a.role_applied || "")).toLowerCase().includes(filter.toLowerCase())
  ))

  return (
    <AdminAuthWrapper>
      <div className="min-h-screen pt-4">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Organisation Applications</h1>
            <button
              onClick={() => exportToCSV(items, { filename: "applications" })}
              className="px-3 py-2 border rounded hover:bg-gray-50"
            >
              Download CSV
            </button>
          </div>
          {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

          <div className="flex gap-4 mb-4">
            <input className="flex-1 border px-3 py-2 rounded" placeholder="Search by name, email or role" value={filter} onChange={(e) => setFilter(e.target.value)} />
            <button 
              onClick={() => openEmail("test@example.com", "Test Email", "This is a test email to verify the function is working.")}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Test Email Function
            </button>
          </div>

          <div className="space-y-3">
            {filtered.map((a) => (
              <div key={a.id} className="border rounded p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold">{a.full_name} — <span className="text-sm text-gray-600">{a.role_applied || "General"}</span></div>
                    <div className="text-sm text-gray-600">{a.email}{a.phone ? ` • ${a.phone}` : ""}{a.location ? ` • ${a.location}` : ""}</div>
                    {a.linkedin && <div className="text-xs"><a className="text-blue-600 hover:underline" href={a.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></div>}
                    {a.portfolio && <div className="text-xs"><a className="text-blue-600 hover:underline" href={a.portfolio} target="_blank" rel="noreferrer">Portfolio</a></div>}
                    {a.resume_url && (
                      <div className="text-xs">
                                                 <a 
                           className="text-green-600 hover:underline flex items-center gap-1" 
                           href={a.resume_url} 
                           target="_blank" 
                           rel="noreferrer"
                         >
                          📄 Resume/CV
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">{a.created_at ? new Date(a.created_at).toLocaleDateString() : ""}</div>
                </div>
                {a.answers && (
                  <details className="mt-2">
                    <summary className="text-sm text-gray-700 cursor-pointer">View Application Details</summary>
                    <div className="text-xs bg-gray-50 p-3 rounded mt-2 space-y-2">
                      {Object.entries(a.answers).map(([key, value]) => {
                        if (key === 'familiar_areas' && Array.isArray(value)) {
                          return (
                            <div key={key} className="border-b pb-2">
                              <strong className="text-gray-800">{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</strong>
                              <div className="text-gray-600 mt-1">{value.join(', ')}</div>
                            </div>
                          )
                        }
                        if (value && String(value).trim()) {
                          return (
                            <div key={key} className="border-b pb-2">
                              <strong className="text-gray-800">{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</strong>
                              <div className="text-gray-600 mt-1">{String(value)}</div>
                            </div>
                          )
                        }
                        return null
                      })}
                    </div>
                  </details>
                )}
                <div className="mt-3 flex flex-wrap gap-2 items-center">
                  <span className="px-2 py-1 rounded bg-gray-100 text-xs">{a.status}</span>
                  <button 
                    onClick={() => { 
                      console.log('Schedule Interview clicked for:', a.email);
                      updateStatus(a, "interview_scheduled", "interview"); 
                      openEmail(a.email, "Congratulations! You've Been Shortlisted for an Interview at Digishield", `Dear ${a.full_name},\n\nThank you for your interest in joining Digishield, a leading organization in cybersecurity awareness and education.\n\nWe are pleased to inform you that you have been shortlisted for the next stage of our recruitment process for the position of ${a.role_applied || 'the applied role'}. After reviewing your application, we were impressed with your background and qualifications.\n\nWe would like to schedule an interview with you to further discuss your experience and potential fit with our team.\n\nInterview Details:\n\nDate: [Insert Date]\nTime: [Insert Time] [Include time zone if needed]\nMode: [In-person / Virtual – e.g., Zoom, Google Meet]\nDuration: Approximately [XX] minutes\nInterviewer(s): [Name(s) and title(s), if known]\n\nPlease confirm your availability by replying to this email by [Confirmation Deadline – e.g., September 3rd, 5:00 PM].\n\nIf you require any adjustments or have questions prior to the interview, feel free to let us know.\n\nWe look forward to speaking with you soon and learning more about how you can contribute to Digishield's mission of promoting cybersecurity awareness across communities.\n\nWarm regards,\n[Your Full Name]\n[Your Job Title]\nDigishield\n[Phone Number – optional]\n[Email Signature / Company Website – optional]\n\n---\n\nA Message from Our CEO\n\n"Our digital lifestyle is largely visible to others. We share extensive information about ourselves, which can make us somewhat vulnerable. Cybercriminals can exploit the information that is publicly available, much of which we may not even realize we are sharing. Data brokers compile and distribute this information, making it accessible to anyone. Claim your spot in our cybersecurity awareness, as we discuss how cybercriminals can gain access to your accounts and your digital activities, and ways to protect yourself from other cybercrimes like Cyberbullying, Phishing, Identity Theft, Hacking, and Online Fraud."\n\n- Howkins Ndemo, Chief Executive Officer & Founder\n\n---\n\nDigishield Communication Solutions\nPromoting Cybersecurity Awareness Across Kenya\n\n📧 info.digishield@gmail.com\n📱 +254 792 281 590\n💬 WhatsApp: +254 792 281 590\n🌐 www.digishield.co.ke`) 
                    }} 
                    className="px-3 py-2 border rounded hover:bg-blue-50"
                  >
                    Schedule Interview
                  </button>
                  <button onClick={() => { updateStatus(a, "training_scheduled", "training"); openEmail(a.email, "Training Schedule & Next Steps at Digishield", `Dear ${a.full_name},\n\nCongratulations once again on successfully completing the interview process!\n\nWe are pleased to inform you that you have progressed to the training phase as part of your onboarding journey with Digishield. This training is a key step in preparing you for your role and aligning you with our mission of promoting cybersecurity awareness.\n\n🗓️ Training Details:\n\nStart Date: [Insert Date]\nTime: [Insert Time] [Include time zone if applicable]\nMode: [In-person / Virtual – include platform link if online]\nDuration: [e.g., 3 days, 1 week, etc.]\nTrainer(s): [Trainer Name(s), if applicable]\n\nDuring this session, you will:\n\n• Be introduced to Digishield's core values and cybersecurity awareness programs.\n• Receive hands-on guidance and resources relevant to your role.\n• Participate in interactive learning and assessments.\n\nPlease confirm your attendance by replying to this email by [Confirmation Deadline – e.g., September 3rd, 5:00 PM].\n\nIf you have any questions or require further assistance, feel free to reach out.\n\nWe look forward to having you onboard and supporting your growth at Digishield.\n\nBest regards,\n[Your Full Name]\n[Your Job Title]\nDigishield\n[Phone Number – optional]\n[Email Signature / Company Website – optional]\n\n---\n\nA Message from Our CEO\n\n"Our digital lifestyle is largely visible to others. We share extensive information about ourselves, which can make us somewhat vulnerable. Cybercriminals can exploit the information that is publicly available, much of which we may not even realize we are sharing. Data brokers compile and distribute this information, making it accessible to anyone. Claim your spot in our cybersecurity awareness, as we discuss how cybercriminals can gain access to your accounts and your digital activities, and ways to protect yourself from other cybercrimes like Cyberbullying, Phishing, Identity Theft, Hacking, and Online Fraud."\n\n- Howkins Ndemo, Chief Executive Officer & Founder\n\n---\n\nDigishield Communication Solutions\nPromoting Cybersecurity Awareness Across Kenya\n\n📧 info.digishield@gmail.com\n📱 +254 792 281 590\n💬 WhatsApp: +254 792 281 590\n🌐 www.digishield.co.ke`) }} className="px-3 py-2 border rounded">Schedule Training</button>
                  <button onClick={() => { updateStatus(a, "accepted", "onboarding"); openEmail(a.email, "Welcome to Digishield – We're Excited to Have You Onboard!", `Dear ${a.full_name},\n\nCongratulations on successfully completing your training at Digishield! We're thrilled to officially welcome you to the team.\n\nYour dedication and enthusiasm throughout the training process were commendable, and we're confident that you'll make a meaningful contribution to our mission of advancing cybersecurity awareness and education.\n\nWhat's Next:\n\nYou will soon receive:\n\n• Your official onboarding documents and work tools (if not already provided)\n• Access to our internal systems and communication platforms\n• Your assigned supervisor or mentor for the first few weeks\n\nAs you settle into your role, please don't hesitate to reach out with any questions or if you need support. We believe in creating a collaborative and supportive environment where everyone can grow and thrive.\n\nOnce again, welcome aboard! We look forward to achieving great things together.\n\nWarm regards,\n[Your Full Name]\n[Your Job Title]\nDigishield\n[Phone Number – optional]\n[Email Signature / Company Website – optional]\n\n---\n\nA Message from Our CEO\n\n"Our digital lifestyle is largely visible to others. We share extensive information about ourselves, which can make us somewhat vulnerable. Cybercriminals can exploit the information that is publicly available, much of which we may not even realize we are sharing. Data brokers compile and distribute this information, making it accessible to anyone. Claim your spot in our cybersecurity awareness, as we discuss how cybercriminals can gain access to your accounts and your digital activities, and ways to protect yourself from other cybercrimes like Cyberbullying, Phishing, Identity Theft, Hacking, and Online Fraud."\n\n- Howkins Ndemo, Chief Executive Officer & Founder\n\n---\n\nDigishield Communication Solutions\nPromoting Cybersecurity Awareness Across Kenya\n\n📧 info.digishield@gmail.com\n📱 +254 792 281 590\n💬 WhatsApp: +254 792 281 590\n🌐 www.digishield.co.ke`) }} className="px-3 py-2 border rounded">Send Welcome</button>
                  <button onClick={() => { updateStatus(a, "declined", a.stage); openEmail(a.email, "Update on Your Application at Digishield", `Dear ${a.full_name},\n\nThank you for taking the time to apply for the position of ${a.role_applied || 'the applied role'} at Digishield.\n\nAfter careful consideration of all applications, we regret to inform you that you have not been shortlisted for the next stage of the recruitment process. This decision was not easy, as we received a large number of strong applications, including yours.\n\nWe truly appreciate your interest in Digishield and the time you invested in your application. We encourage you to stay connected with us and apply for future opportunities that align with your skills and experience.\n\nWe wish you the very best in your career and future endeavors.\n\nWarm regards,\n[Your Full Name]\n[Your Job Title]\nDigishield\n[Phone Number – optional]\n[Email Signature / Company Website – optional]\n\n---\n\nA Message from Our CEO\n\n"Our digital lifestyle is largely visible to others. We share extensive information about ourselves, which can make us somewhat vulnerable. Cybercriminals can exploit the information that is publicly available, much of which we may not even realize we are sharing. Data brokers compile and distribute this information, making it accessible to anyone. Claim your spot in our cybersecurity awareness, as we discuss how cybercriminals can gain access to your accounts and your digital activities, and ways to protect yourself from other cybercrimes like Cyberbullying, Phishing, Identity Theft, Hacking, and Online Fraud."\n\n- Howkins Ndemo, Chief Executive Officer & Founder\n\n---\n\nDigishield Communication Solutions\nPromoting Cybersecurity Awareness Across Kenya\n\n📧 info.digishield@gmail.com\n📱 +254 792 281 590\n💬 WhatsApp: +254 792 281 590\n🌐 www.digishield.co.ke`) }} className="px-3 py-2 border rounded text-red-600">Decline</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminAuthWrapper>
  )
}

