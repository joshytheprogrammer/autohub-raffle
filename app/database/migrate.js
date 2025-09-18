/**
 * This script manually runs all database migrations
 * Run with: `bun run migrate`
 */

// Load environment variables
import { config } from 'dotenv';
config();

import { getDatabase } from './setup.js'
import addPaymentAmountColumn from './migrations/add-payment-amount.js'

async function runAllMigrations() {
  console.log('Starting database migrations...')

  try {
    // Initialize database connection
    getDatabase()
    
    // Run payment amount column migration
    const result = await addPaymentAmountColumn()
    console.log('Migration result:', result)
    
    console.log('All migrations completed successfully')
    process.exit(0)
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

// Run migrations
runAllMigrations()