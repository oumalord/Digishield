import { Calendar, Globe, Users, TrendingUp } from "lucide-react"

export default function BackgroundPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="hero-gradient text-white section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Background</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Understanding the journey and context behind the Digishield initiative
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">The Genesis of Digishield</h2>
              <p className="text-lg text-gray-600 mb-6">
                Digishield was born out of a critical need to address the growing cybersecurity challenges facing
                Kenya's rapidly digitalizing society. As more Kenyans embraced digital technologies for banking,
                communication, and business, the risks of cyber threats increased exponentially.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Recognizing this gap, a group of cybersecurity professionals, educators, and community leaders came
                together to create a comprehensive platform that would not only educate but also provide practical
                support to those affected by cyber incidents.
              </p>
              <p className="text-lg text-gray-600">
                The initiative was launched with the vision of creating a digitally resilient Kenya where every citizen
                has the knowledge and tools to navigate the digital world safely.
              </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg">
              <div className="space-y-6">
                <div className="flex items-start">
                  <Calendar className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-bold mb-2">2023</h3>
                    <p className="text-gray-600">Initiative conceptualized and planning began</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-bold mb-2">Early 2024</h3>
                    <p className="text-gray-600">Team formation and partnership with Eveminet</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Globe className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-bold mb-2">Mid 2024</h3>
                    <p className="text-gray-600">Platform launch and first training programs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Context Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The Kenyan Context</h2>
            <p className="text-xl text-gray-600">Understanding the cybersecurity landscape in Kenya</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Rising Cyber Threats</h3>
              <p className="text-gray-600">
                Kenya has experienced a significant increase in cybercrime, with mobile money fraud, phishing attacks,
                and data breaches becoming increasingly common.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Digital Transformation</h3>
              <p className="text-gray-600">
                Rapid digitalization across sectors has created new opportunities but also new vulnerabilities that need
                to be addressed through education and awareness.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Awareness Gap</h3>
              <p className="text-gray-600">
                Many Kenyans lack basic cybersecurity knowledge, making them vulnerable to online threats and scams that
                could be easily prevented with proper education.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Strategic Goals</h2>
            <p className="text-xl text-gray-600">What we aim to achieve through the Digishield initiative</p>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-blue-600">
              <h3 className="text-xl font-bold mb-4">1. Education and Awareness</h3>
              <p className="text-gray-600">
                Provide comprehensive cybersecurity education to individuals, businesses, and organizations across
                Kenya, focusing on practical skills and awareness that can be immediately applied.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-green-600">
              <h3 className="text-xl font-bold mb-4">2. Incident Response and Support</h3>
              <p className="text-gray-600">
                Establish a reliable platform for reporting and responding to cyber incidents, providing immediate
                support and guidance to victims of cybercrime.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-purple-600">
              <h3 className="text-xl font-bold mb-4">3. Community Building</h3>
              <p className="text-gray-600">
                Create a network of cyber ambassadors and volunteers who can provide local support and spread
                cybersecurity awareness in their communities.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-red-600">
              <h3 className="text-xl font-bold mb-4">4. Policy and Advocacy</h3>
              <p className="text-gray-600">
                Work with government agencies, private sector partners, and civil society organizations to advocate for
                better cybersecurity policies and practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="section-padding bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Vision for Impact</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            We envision a Kenya where every citizen is digitally literate, cyber-aware, and equipped with the knowledge
            and tools to protect themselves and their communities from online threats.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div>
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-blue-200">Kenyans to be trained by 2025</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">47</div>
              <div className="text-blue-200">Counties to be covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-blue-200">Community partners</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
