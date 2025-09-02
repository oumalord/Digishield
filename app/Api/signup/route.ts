import { NextResponse } from 'next/server'
import { createUser } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // Create user
    const { user, error } = await createUser({ name, email, password })

    if (error) {
      return NextResponse.json({ error }, { status: 400 })
    }

    // Redirect to home page after successful signup
    return NextResponse.redirect(new URL('/', request.url))
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
