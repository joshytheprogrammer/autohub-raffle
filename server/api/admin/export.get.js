import { getDatabase } from '@/database/setup.js'

export default defineEventHandler(async (event) => {
  try {
    const db = getDatabase()

    // Get all tickets with user info for CSV export
    const ticketsResult = await db.execute({
      sql: `SELECT 
              t.id,
              t.ticket_number,
              t.payment_ref,
              t.created_at,
              u.name as user_name,
              u.email as user_email,
              u.phone as user_phone
            FROM tickets t
            JOIN users u ON t.user_id = u.id
            ORDER BY t.created_at DESC`,
      args: []
    })

    const tickets = ticketsResult.rows

    // Create CSV content
    const csvHeader = 'Ticket ID,Ticket Number,User Name,User Email,User Phone,Payment Reference,Purchase Date\n'
    
    const csvRows = tickets.map(ticket => {
      return [
        ticket.id,
        ticket.ticket_number,
        `"${ticket.user_name}"`,
        ticket.user_email,
        ticket.user_phone || '',
        ticket.payment_ref,
        new Date(ticket.created_at).toLocaleString()
      ].join(',')
    }).join('\n')

    const csvData = csvHeader + csvRows

    return {
      success: true,
      csvData,
      totalTickets: tickets.length
    }

  } catch (error) {
    console.error('Export error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to export tickets'
    })
  }
})