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

    // Users can only access their own wins
    if (parseInt(userId) !== authenticatedUserId) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Access denied'
      })
    }

    const db = getDatabase()
    
    // Get user's winning tickets with all relevant information
    const winsResult = await db.execute({
      sql: `SELECT 
              w.id as win_id,
              w.draw_date,
              t.id as ticket_id,
              t.ticket_number,
              t.created_at as ticket_purchase_date
            FROM winners w
            JOIN tickets t ON w.ticket_id = t.id
            WHERE w.user_id = ?
            ORDER BY w.draw_date DESC`,
      args: [userId]
    })

    // Get total wins count
    const winsCountResult = await db.execute({
      sql: `SELECT COUNT(*) as total_wins
            FROM winners
            WHERE user_id = ?`,
      args: [userId]
    })

    // Format the response
    const totalWins = winsCountResult.rows[0]?.total_wins || 0

    return {
      success: true,
      wins: winsResult.rows || [],
      totalWins: totalWins
    }

  } catch (error) {
    if (error.statusCode) {
      throw error
    }
    
    console.error('Get wins error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get winning information'
    })
  }
})