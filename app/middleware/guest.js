import { useAuth } from '~/utils/authState'

/**
 * Guest middleware to protect routes that should only be accessible to non-authenticated users
 * For example: login and register pages
 * 
 * Usage: 
 * definePageMeta({
 *   middleware: 'guest'
 * })
 */
export default defineNuxtRouteMiddleware((to, from) => {
  // Access auth state
  const { auth, initAuth } = useAuth()
  
  // Initialize auth if not already initialized
  if (!auth.value.initialized) {
    initAuth()
  }
  
  // Check if user is authenticated
  if (process.client) {
    if (auth.value.isLoggedIn) {
      // Already authenticated, redirect to dashboard
      return navigateTo('/dashboard')
    }
  }
})