<template>
  <div class="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <NuxtLink to="/" class="inline-flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">🚗</span>
          </div>
          <span class="text-2xl font-bold text-neutral-900">AutoHub</span>
        </NuxtLink>
        <h2 class="mt-6 text-3xl font-bold text-neutral-900">
          Welcome back
        </h2>
        <p class="mt-2 text-sm text-neutral-600">
          Don't have an account?
          <NuxtLink to="/register" class="font-medium text-green-600 hover:text-green-500 transition-colors">
            Create one here
          </NuxtLink>
        </p>
      </div>
    </div>

    <!-- Form -->
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow-xl sm:rounded-3xl sm:px-10 border border-neutral-200">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Error Alert -->
          <div v-if="error" class="bg-red-50 border border-red-200 rounded-2xl p-4">
            <div class="flex">
              <svg class="h-5 w-5 text-red-400 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
              <p class="ml-3 text-sm text-red-800">{{ error }}</p>
            </div>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-neutral-700 mb-2">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              v-model="form.email"
              autocomplete="email"
              required
              class="block w-full px-4 py-3 rounded-2xl border border-neutral-300 placeholder-neutral-400 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="Enter your email"
            />
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-neutral-700 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              v-model="form.password"
              autocomplete="current-password"
              required
              class="block w-full px-4 py-3 rounded-2xl border border-neutral-300 placeholder-neutral-400 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="Enter your password"
            />
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center items-center py-3 px-4 text-base font-semibold rounded-2xl text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg disabled:hover:shadow-none"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? 'Signing in...' : 'Sign In' }}
            </button>
          </div>
        </form>

        <!-- Additional Options -->
        <div class="mt-6 text-center">
          <p class="text-xs text-neutral-500">
            Forgot your password? Contact support for assistance.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Use centralized auth state
import { useAuth } from '~/utils/authState'

// Define page metadata with guest middleware
definePageMeta({
  middleware: 'guest'
})

const { setAuth } = useAuth()

const form = reactive({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

const handleSubmit = async () => {
  error.value = ''
  loading.value = true

  try {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: form.email,
        password: form.password
      }
    })

    if (response.success) {
      // Use centralized auth state management
      setAuth(response.token, response.user)
      
      // Redirect to dashboard
      await navigateTo('/dashboard')
    } else {
      error.value = response.message || 'Login failed'
    }
  } catch (err) {
    error.value = err.data?.message || 'Invalid email or password'
  } finally {
    loading.value = false
  }
}

// SEO
useHead({
  title: 'Login - AutoHub Raffle',
  meta: [
    { name: 'description', content: 'Sign in to your AutoHub account to manage your raffle tickets.' }
  ]
})
</script>