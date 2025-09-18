import jwt from 'jsonwebtoken'

/**
 * Generate JWT token for user
 * @param {Object} user - User object with id and email
 * @param {string} expiresIn - Token expiration time (default: 7d)
 * @returns {string} - JWT token
 */
export function generateToken(user, expiresIn = '7d') {
  return jwt.sign(
    { 
      userId: user.id, 
      email: user.email 
    },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn }
  )
}

/**
 * Verify and decode JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object} - Decoded token payload
 */
export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
}

/**
 * Extract token from authorization header
 * @param {string} authHeader - Authorization header value
 * @returns {string|null} - Extracted token or null
 */
export function extractBearerToken(authHeader) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  
  return authHeader.substring(7)
}

/**
 * Middleware helper to verify JWT token from request
 * @param {Object} event - Nuxt event object
 * @returns {Object} - Decoded user info
 */
export function verifyAuthToken(event) {
  const authorization = getHeader(event, 'authorization')
  const token = extractBearerToken(authorization)
  
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authorization token required'
    })
  }
  
  try {
    return verifyToken(token)
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid or expired token'
    })
  }
}