import { getDatabase } from '@/database/setup.js'

export default defineEventHandler(async (event) => {
  try {
    const db = getDatabase()

    // Get all tickets for random selection
    const ticketsResult = await db.execute({
      sql: `SELECT 
              t.id, t.ticket_number, t.user_id,
              u.name as user_name,
              u.email as user_email,
              u.phone as user_phone
            FROM tickets t
            JOIN users u ON t.user_id = u.id`,
      args: []
    })

    const tickets = ticketsResult.rows

    if (tickets.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No tickets available for draw'
      })
    }

    // Use crypto for secure random selection
    const crypto = await import('crypto')
    const randomBytes = crypto.randomBytes(4)
    const randomIndex = Math.floor((randomBytes.readUInt32BE(0) / 0x100000000) * tickets.length)
    
    const winningTicket = tickets[randomIndex]

    // Insert winner into database
    await db.execute({
      sql: `INSERT INTO winners (ticket_id, user_id, draw_date)
            VALUES (?, ?, datetime('now'))`,
      args: [winningTicket.id, winningTicket.user_id]
    })

    // Return winner details
    const winner = {
      ticket_id: winningTicket.id,
      ticket_number: winningTicket.ticket_number,
      user_id: winningTicket.user_id,
      user_name: winningTicket.user_name,
      user_email: winningTicket.user_email,
      user_phone: winningTicket.user_phone,
      draw_date: new Date().toISOString()
    }

    return {
      success: true,
      message: 'Raffle draw completed successfully',
      winner
    }

  } catch (error) {
    if (error.statusCode) {
      throw error
    }
    
    console.error('Raffle draw error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to conduct raffle draw'
    })
  }
})