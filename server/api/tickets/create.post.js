import jwt from 'jsonwebtoken'
import { getDatabase } from '@/database/setup.js'
import { generateTicketNumber } from '~/utils/ticket.js'

export default defineEventHandler(async (event) => {
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
    const userId = decoded.userId

    const { paymentRef } = await readBody(event)

    if (!paymentRef) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Payment reference is required'
      })
    }

    // Verify payment with Paystack
    const paystackResponse = await $fetch(`https://api.paystack.co/transaction/verify/${paymentRef}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY || 'sk_test_your_secret_key'}`
      }
    })

    if (!paystackResponse.status || paystackResponse.data.status !== 'success') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Payment verification failed'
      })
    }

    // Check if payment amount is correct (₦10,000 = 1,000,000 kobo)
    if (paystackResponse.data.amount !== 1000000) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid payment amount'
      })
    }

    const db = getDatabase()

    // Check if this payment reference has already been used
    const existingTicketResult = await db.execute({
      sql: 'SELECT id FROM tickets WHERE payment_ref = ?',
      args: [paymentRef]
    })
    
    if (existingTicketResult.rows.length > 0) {
      throw createError({
        statusCode: 409,
        statusMessage: 'This payment has already been used to create a ticket'
      })
    }

    // Create new ticket
    const result = await db.execute({
      sql: `INSERT INTO tickets (user_id, ticket_number, payment_ref, created_at)
            VALUES (?, ?, ?, datetime('now'))`,
      args: [userId, '', paymentRef] // Empty ticket_number for now
    })

    const ticketId = result.lastInsertRowid

    // Generate ticket number and update
    const ticketNumber = generateTicketNumber(ticketId)
    
    await db.execute({
      sql: 'UPDATE tickets SET ticket_number = ? WHERE id = ?',
      args: [ticketNumber, ticketId]
    })

    // Get the created ticket with user info
    const ticketResult = await db.execute({
      sql: `SELECT t.*, u.name as user_name, u.email as user_email
            FROM tickets t
            JOIN users u ON t.user_id = u.id
            WHERE t.id = ?`,
      args: [ticketId]
    })

    const ticket = ticketResult.rows[0]

    return {
      success: true,
      message: 'Ticket created successfully',
      ticket
    }

  } catch (error) {
    if (error.statusCode) {
      throw error
    }
    
    console.error('Ticket creation error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create ticket'
    })
  }
})