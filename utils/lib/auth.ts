import { hash } from 'bcryptjs'

interface User {
  id: string
  name: string
  email: string
  // Add other user fields as needed
}

export async function createUser({ name, email, password }: { name: string; email: string; password: string }) {
  try {
    // Check if user exists (you'll need your database logic here)
    // const existingUser = await db.user.findUnique({ where: { email } })
    // if (existingUser) return { error: 'User already exists' }

    // Hash password
    const hashedPassword = await hash(password, 12)

    // Create user in your database
    // const user = await db.user.create({
    //   data: {
    //     name,
    //     email,
    //     password: hashedPassword,
    //     cultureTestCompleted: true // Mark that they completed the test
    //   }
    // })

    // For now, we'll return a mock user
    const user: User = {
      id: 'mock-id',
      name,
      email
    }

    return { user }
  } catch (error) {
    console.error('Error creating user:', error)
    return { error: 'Could not create user' }
  }
}
