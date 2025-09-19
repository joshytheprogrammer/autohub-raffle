import { useAuth } from '~/utils/authState'

/**
 * Authentication middleware to protect routes
 * 
 * Usage: 
 * definePageMeta({
 *   middleware: 'auth'
 * })
 */
export default defineNuxtRouteMiddleware((to, from) => {
  // Access auth state
  const { auth, clearAuth, initAuth } = useAuth()
  
  // Initialize auth if not already initialized
  if (!auth.value.initialized) {
    initAuth()
  }
  
  // Check if user is authenticated
  if (process.client) {
    if (!auth.value.isLoggedIn) {
      // Not authenticated, redirect to login
      clearAuth() // Clean up any leftover data
      return navigateTo('/login', { 
        query: { redirect: to.fullPath !== '/login' ? to.fullPath : undefined }
      })
    }
  }
})