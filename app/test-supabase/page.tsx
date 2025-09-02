import SupabaseTest from "@/components/supabase-test"

export default function TestSupabasePage() {
  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Supabase Database Test</h1>
        <SupabaseTest />

        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Database Setup Checklist</h2>
          <ul className="space-y-2">
            <li>✅ Create Supabase project</li>
            <li>✅ Run SQL setup script (scripts/setup-database.sql)</li>
            <li>✅ Add team members (scripts/update-team-members.sql)</li>
            <li>✅ Configure environment variables (.env.local)</li>
            <li>✅ Test connection (this page)</li>
            <li>🔄 Test incident reporting</li>
            <li>🔄 Test admin panel</li>
          </ul>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="/report-incident"
              className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold mb-2">Test Incident Reporting</h3>
              <p className="text-sm text-gray-600">Submit a test incident report to verify database functionality</p>
            </a>
            <a href="/admin" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <h3 className="font-semibold mb-2">Test Admin Panel</h3>
              <p className="text-sm text-gray-600">Access the admin dashboard to view submitted incidents</p>
            </a>
            <a
              href="/contact"
              className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold mb-2">Test Contact Form</h3>
              <p className="text-sm text-gray-600">Submit a contact message to test form functionality</p>
            </a>
            <a href="/team" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <h3 className="font-semibold mb-2">View Team Page</h3>
              <p className="text-sm text-gray-600">See the updated team page with real leadership members</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
