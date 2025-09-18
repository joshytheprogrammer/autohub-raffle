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
  const { isAuthenticated, clearAuth } = useAuth()
  
  // Check if user is authenticated
  if (process.client) {
    if (!isAuthenticated()) {
      // Not authenticated, redirect to login
      clearAuth() // Clean up any leftover data
      return navigateTo('/login', { 
        query: { redirect: to.fullPath !== '/login' ? to.fullPath : undefined }
      })
    }
  }
})