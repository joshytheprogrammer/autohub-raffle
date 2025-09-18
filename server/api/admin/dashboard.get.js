import { getDatabase } from '@/database/setup.js'

export default defineEventHandler(async (event) => {
  try {
    const db = getDatabase()

    // Get statistics
    const totalUsersResult = await db.execute({
      sql: 'SELECT COUNT(*) as count FROM users',
      args: []
    })
    const totalTicketsResult = await db.execute({
      sql: 'SELECT COUNT(*) as count FROM tickets',
      args: []
    })
    const totalWinnersResult = await db.execute({
      sql: 'SELECT COUNT(*) as count FROM winners',
      args: []
    })

    const totalUsers = totalUsersResult.rows[0].count
    const totalTickets = totalTicketsResult.rows[0].count
    const totalWinners = totalWinnersResult.rows[0].count

    // Get all users with ticket counts
    const usersResult = await db.execute({
      sql: `SELECT 
              u.id, u.name, u.email, u.phone, u.created_at,
              COUNT(t.id) as ticket_count
            FROM users u
            LEFT JOIN tickets t ON u.id = t.user_id
            GROUP BY u.id, u.name, u.email, u.phone, u.created_at
            ORDER BY u.created_at DESC`,
      args: []
    })

    // Get all tickets with user info
    const ticketsResult = await db.execute({
      sql: `SELECT 
              t.id, t.ticket_number, t.payment_ref, t.created_at,
              u.name as user_name,
              u.email as user_email
            FROM tickets t
            JOIN users u ON t.user_id = u.id
            ORDER BY t.created_at DESC`,
      args: []
    })

    // Get last winner if exists
    const lastWinnerResult = await db.execute({
      sql: `SELECT 
              w.id, w.draw_date,
              t.ticket_number,
              u.name as user_name,
              u.email as user_email,
              u.phone as user_phone
            FROM winners w
            JOIN tickets t ON w.ticket_id = t.id
            JOIN users u ON w.user_id = u.id
            ORDER BY w.draw_date DESC
            LIMIT 1`,
      args: []
    })

    const lastWinner = lastWinnerResult.rows.length > 0 ? lastWinnerResult.rows[0] : null

    return {
      success: true,
      stats: {
        totalUsers,
        totalTickets,
        totalWinners
      },
      users: usersResult.rows,
      tickets: ticketsResult.rows,
      lastWinner
    }

  } catch (error) {
    console.error('Admin dashboard error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to load admin dashboard data'
    })
  }
})