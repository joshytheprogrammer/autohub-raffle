import { createClient } from '@libsql/client'

let db = null

export function getDatabase() {
  if (!db) {
    // Initialize Turso database connection
    const url = process.env.TURSO_DATABASE_URL
    const authToken = process.env.TURSO_AUTH_TOKEN

    db = createClient({
      url,
      authToken
    })
    
    // Initialize tables
    initializeTables()
  }
  
  return db
}

async function initializeTables() {
  try {
    // Users table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Tickets table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS tickets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        ticket_number TEXT UNIQUE NOT NULL,
        payment_ref TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `)

    // Winners table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS winners (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ticket_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        draw_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ticket_id) REFERENCES tickets(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `)

    // Create indexes
    try {
      await db.execute(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`)
      await db.execute(`CREATE INDEX IF NOT EXISTS idx_tickets_user_id ON tickets(user_id)`)
      await db.execute(`CREATE INDEX IF NOT EXISTS idx_tickets_number ON tickets(ticket_number)`)
      await db.execute(`CREATE INDEX IF NOT EXISTS idx_winners_ticket_id ON winners(ticket_id)`)
      await db.execute(`CREATE INDEX IF NOT EXISTS idx_winners_user_id ON winners(user_id)`)
    } catch (error) {
      // Indexes might already exist, ignore errors
      console.log('Index creation note:', error.message)
    }

    console.log('Turso database tables initialized successfully')
  } catch (error) {
    console.error('Error initializing database tables:', error)
  }
}

// Graceful shutdown
process.on('exit', () => {
  if (db) {
    db.close()
  }
})

process.on('SIGINT', () => {
  if (db) {
    db.close()
  }
  process.exit(0)
})

process.on('SIGTERM', () => {
  if (db) {
    db.close()
  }
  process.exit(0)
})