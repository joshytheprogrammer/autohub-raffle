import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getDatabase } from '@/database/setup.js'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  // Validation
  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and password are required'
    })
  }

  try {
    const db = getDatabase()
    
    // Get user by email
    const userResult = await db.execute({
      sql: `SELECT id, name, email, phone, password_hash, created_at 
            FROM users 
            WHERE email = ?`,
      args: [email]
    })

    if (userResult.rows.length === 0) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid email or password'
      })
    }

    const user = userResult.rows[0]

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    
    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid email or password'
      })
    }

    // Remove password hash from user object
    const { password_hash, ...userWithoutPassword } = user

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    )

    return {
      success: true,
      message: 'Login successful',
      user: userWithoutPassword,
      token
    }

  } catch (error) {
    if (error.statusCode) {
      throw error
    }
    
    console.error('Login error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Login failed'
    })
  }
})