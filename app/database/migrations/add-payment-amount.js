/**
 * Migration script to add payment_amount column to tickets table
 */
import { getDatabase } from '../../database/setup.js'

export default async function addPaymentAmountColumn() {
  console.log('Starting migration: Adding payment_amount column to tickets table...')
  
  const db = getDatabase()
  
  try {
    // Check if the column already exists
    const tableInfo = await db.execute({
      sql: "PRAGMA table_info(tickets)"
    })
    
    const hasPaymentAmount = tableInfo.rows.some(row => row.name === 'payment_amount')
    
    if (!hasPaymentAmount) {
      console.log('Adding payment_amount column...')
      
      // Add the payment_amount column
      await db.execute({
        sql: "ALTER TABLE tickets ADD COLUMN payment_amount INTEGER DEFAULT 10000"
      })
      
      console.log('Successfully added payment_amount column to tickets table')
    } else {
      console.log('payment_amount column already exists, skipping migration')
    }
    
    return { success: true, message: 'Migration completed successfully' }
  } catch (error) {
    console.error('Migration failed:', error)
    return { success: false, error: error.message }
  }
}