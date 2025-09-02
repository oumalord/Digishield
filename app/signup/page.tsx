import Link from "next/link"
import { createUser } from "@/lib/auth" // You'll need to create this

export default function SignupPage({ searchParams }: { searchParams: { culture_test_completed?: string } }) {
  // Check if user completed culture test
  const testCompleted = searchParams.culture_test_completed === 'true'

  if (!testCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Complete Culture Test First</h1>
          <p className="text-gray-600 mb-6">
            Before signing up, please complete our culture test to ensure we're a good fit for each other.
          </p>
          <a
            href="https://digishield-culture-test.lovable.app/"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            Take Culture Test
          </a>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Already completed the test? <Link href="/signup?culture_test_completed=true" className="text-blue-600">Continue to signup</Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Create Your Account</h1>
        <form action="/api/signup" method="POST" className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              minLength={8}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </form>
        
        <p className="text-sm text-gray-500 mt-4 text-center">
          Already have an account? <Link href="/login" className="text-blue-600">Log in</Link>
        </p>
      </div>
    </div>
  )
}
