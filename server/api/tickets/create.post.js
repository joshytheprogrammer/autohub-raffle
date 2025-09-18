import jwt from 'jsonwebtoken'
import { getDatabase } from '@/database/setup.js'
import { generateTicketNumber } from '~/utils/ticket.js'

// Define ticket price constant (must match the frontend)
const TICKET_PRICE_NGN = 10000; // ₦10,000
const TICKET_PRICE_KOBO = TICKET_PRICE_NGN * 100;

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

    // Get Paystack secret key from environment variable
    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecretKey) {
      console.error('Paystack secret key not configured');
      throw createError({
        statusCode: 500,
        statusMessage: 'Payment provider not properly configured'
      });
    }

    // Verify payment with Paystack
    let paystackResponse;
    try {
      paystackResponse = await $fetch(`https://api.paystack.co/transaction/verify/${paymentRef}`, {
        headers: {
          Authorization: `Bearer ${paystackSecretKey}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (paystackError) {
      console.error('Paystack verification error:', paystackError);
      throw createError({
        statusCode: 502,
        statusMessage: 'Failed to verify payment with provider'
      });
    }

    // Check if the Paystack verification was successful
    if (!paystackResponse || !paystackResponse.status || paystackResponse.data?.status !== 'success') {
      console.error('Payment verification failed:', paystackResponse);
      throw createError({
        statusCode: 400,
        statusMessage: 'Payment verification failed or payment was not successful'
      });
    }

    // Check if payment amount is correct (₦10,000 = 1,000,000 kobo)
    if (paystackResponse.data.amount !== TICKET_PRICE_KOBO) {
      throw createError({
        statusCode: 400,
        statusMessage: `Invalid payment amount. Expected ₦${TICKET_PRICE_NGN}`
      });
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

    // Extract customer info from payment data for ticket record
    let customerName = '';
    let customerEmail = '';
    try {
      customerName = paystackResponse.data.customer?.name || '';
      customerEmail = paystackResponse.data.customer?.email || '';
    } catch (e) {
      console.warn('Could not extract customer info from payment data');
    }

    // Create new ticket with transaction details
    const result = await db.execute({
      sql: `INSERT INTO tickets (
              user_id, 
              ticket_number, 
              payment_ref,
              payment_amount,
              created_at
            )
            VALUES (?, ?, ?, ?, datetime('now'))`,
      args: [
        userId, 
        '', // Empty ticket_number initially
        paymentRef,
        TICKET_PRICE_NGN
      ]
    });
    
    const ticketId = result.lastInsertRowid;

    // Generate ticket number and update
    const ticketNumber = generateTicketNumber(ticketId)
    
    await db.execute({
      sql: 'UPDATE tickets SET ticket_number = ? WHERE id = ?',
      args: [ticketNumber, ticketId]
    });

    // Get the created ticket with user info
    const ticketResult = await db.execute({
      sql: `SELECT t.*, u.name as user_name, u.email as user_email
            FROM tickets t
            JOIN users u ON t.user_id = u.id
            WHERE t.id = ?`,
      args: [ticketId]
    });

    const ticket = ticketResult.rows[0];

    return {
      success: true,
      message: 'Ticket created successfully',
      ticket,
      paymentDetails: {
        reference: paymentRef,
        amount: TICKET_PRICE_NGN
      }
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