import jwt from 'jsonwebtoken'
import { getDatabase } from '@/database/setup.js'

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'id')

  // Get authorization header
  const authorization = getHeader(event, 'authorization')
  
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authorization token required'
    })
  }

  const token = authorization.substring(7) // Remove 'Bearer ' prefix
  
  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
    const authenticatedUserId = decoded.userId

    // Users can only access their own tickets
    if (parseInt(userId) !== authenticatedUserId) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Access denied'
      })
    }

    const db = getDatabase()
    
    // Get user's tickets
    const ticketsResult = await db.execute({
      sql: `SELECT id, ticket_number, payment_ref, created_at
            FROM tickets 
            WHERE user_id = ?
            ORDER BY created_at DESC`,
      args: [userId]
    })

    return {
      success: true,
      tickets: ticketsResult.rows
    }

  } catch (error) {
    if (error.statusCode) {
      throw error
    }
    
    console.error('Get tickets error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get tickets'
    })
  }
})