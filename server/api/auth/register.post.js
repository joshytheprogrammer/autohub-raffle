import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getDatabase } from '@/database/setup.js'

export default defineEventHandler(async (event) => {
  const { name, email, phone, password } = await readBody(event)

  // Validation
  if (!name || !email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name, email, and password are required'
    })
  }

  if (password.length < 6) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Password must be at least 6 characters long'
    })
  }

  try {
    const db = getDatabase()
    
    // Check if user already exists
    const existingUser = await db.execute({
      sql: 'SELECT id FROM users WHERE email = ?',
      args: [email]
    })
    
    if (existingUser.rows.length > 0) {
      throw createError({
        statusCode: 409,
        statusMessage: 'User with this email already exists'
      })
    }

    // Hash password
    const saltRounds = 12
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Insert new user
    const result = await db.execute({
      sql: `INSERT INTO users (name, email, phone, password_hash, created_at)
            VALUES (?, ?, ?, ?, datetime('now'))`,
      args: [name, email, phone || null, passwordHash]
    })
    
    const userId = result.lastInsertRowid

    // Get the created user
    const userResult = await db.execute({
      sql: `SELECT id, name, email, phone, created_at 
            FROM users 
            WHERE id = ?`,
      args: [userId]
    })

    const user = userResult.rows[0]

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    )

    return {
      success: true,
      message: 'User registered successfully',
      user,
      token
    }

  } catch (error) {
    if (error.statusCode) {
      throw error
    }
    
    console.error('Registration error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to register user'
    })
  }
})