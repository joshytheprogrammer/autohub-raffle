/**
 * Authentication state management using Nuxt's useState
 */

// Define types for better type checking

// Create a composable for authentication state
export const useAuth = () => {
  // Create a reactive state using useState to persist across HMR and page refreshes
  const auth = useState('auth', () => ({
    user: null,
    token: null,
    isLoggedIn: false,
    initialized: false,
  }));

  /**
   * Initialize auth state from localStorage
   */
  const initAuth = () => {
    if (process.client && !auth.value.initialized) {
      try {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('user');
        
        if (storedToken && storedUser) {
          // Basic validation of token format
          const tokenParts = storedToken.split('.');
          if (tokenParts.length !== 3) {
            clearAuth();
            return;
          }
          
          // Parse the payload to check expiration
          const payload = JSON.parse(atob(tokenParts[1]));
          const now = Date.now() / 1000;
          
          if (payload.exp && payload.exp < now) {
            // Token expired
            clearAuth();
            return;
          }
          
          // Valid token and user, set auth state
          auth.value.token = storedToken;
          auth.value.user = JSON.parse(storedUser);
          auth.value.isLoggedIn = true;
        }
      } catch (error) {
        console.error('Error initializing auth state:', error);
        clearAuth();
      } finally {
        auth.value.initialized = true;
      }
    }
  };

  /**
   * Set authentication data after successful login/register
   */
  const setAuth = (token, user) => {
    if (process.client) {
      // Update localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Update state
      auth.value.token = token;
      auth.value.user = user;
      auth.value.isLoggedIn = true;
      auth.value.initialized = true;
    }
  };

  /**
   * Clear authentication data on logout or token expiration
   */
  const clearAuth = () => {
    if (process.client) {
      // Clear localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      
      // Update state
      auth.value.token = null;
      auth.value.user = null;
      auth.value.isLoggedIn = false;
    }
  };

  /**
   * Check if the user is authenticated
   */
  const isAuthenticated = () => {
    if (!auth.value.initialized) {
      initAuth();
    }
    return auth.value.isLoggedIn;
  };

  /**
   * Check if the user has a specific role (for future use)
   */
  const hasRole = (role) => {
    if (!auth.value.user) return false;
    return auth.value.user.role === role;
  };

  return {
    auth,
    initAuth,
    setAuth,
    clearAuth,
    isAuthenticated,
    hasRole,
  };
};