/**
 * Generate unique raffle ticket number
 * Format: AUTOHUB-000001
 * @param {number} id - Ticket ID from database
 * @returns {string} - Formatted ticket number
 */
export function generateTicketNumber(id) {
  return `AUTOHUB-${String(id).padStart(6, '0')}`
}

/**
 * Validate ticket number format
 * @param {string} ticketNumber - Ticket number to validate
 * @returns {boolean} - True if valid format
 */
export function isValidTicketNumber(ticketNumber) {
  const pattern = /^AUTOHUB-\d{6}$/
  return pattern.test(ticketNumber)
}

/**
 * Extract ID from ticket number
 * @param {string} ticketNumber - Formatted ticket number
 * @returns {number} - Extracted ID
 */
export function getIdFromTicketNumber(ticketNumber) {
  if (!isValidTicketNumber(ticketNumber)) {
    throw new Error('Invalid ticket number format')
  }
  
  return parseInt(ticketNumber.substring(8))
}