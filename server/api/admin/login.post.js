export default defineEventHandler(async (event) => {
  const { password } = await readBody(event)

  // Check admin password
  const adminPassword = process.env.ADMIN_PASSWORD
  
  if (password !== adminPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid admin password'
    })
  }

  return {
    success: true,
    message: 'Admin authenticated successfully'
  }
})