export default defineNuxtRouteMiddleware((to, from) => {
  // Check if user is authenticated (client-side only)
  if (process.client) {
    const token = localStorage.getItem('authToken')
    
    if (!token) {
      return navigateTo('/login')
    }

    // Basic token validation (you can add more sophisticated checks)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const now = Date.now() / 1000
      
      if (payload.exp && payload.exp < now) {
        // Token expired
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
        return navigateTo('/login')
      }
    } catch (error) {
      // Invalid token format
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      return navigateTo('/login')
    }
  }
})