<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <NuxtLink to="/" class="text-4xl font-bold text-white">AutoHub</NuxtLink>
        <h2 class="mt-6 text-3xl font-extrabold text-white">
          Create your account
        </h2>
        <p class="mt-2 text-sm text-gray-200">
          Already have an account?
          <NuxtLink to="/login" class="font-medium text-yellow-300 hover:text-yellow-200">
            Sign in here
          </NuxtLink>
        </p>
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white/10 backdrop-blur-md py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div v-if="error" class="bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded">
            {{ error }}
          </div>

          <div>
            <label for="name" class="block text-sm font-medium text-gray-200">
              Full Name
            </label>
            <div class="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                v-model="form.name"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 bg-white/90 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-200">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                v-model="form.email"
                autocomplete="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 bg-white/90 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label for="phone" class="block text-sm font-medium text-gray-200">
              Phone Number (Optional)
            </label>
            <div class="mt-1">
              <input
                id="phone"
                name="phone"
                type="tel"
                v-model="form.phone"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 bg-white/90 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-200">
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                v-model="form.password"
                autocomplete="new-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 bg-white/90 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Create a password"
              />
            </div>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-200">
              Confirm Password
            </label>
            <div class="mt-1">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                v-model="form.confirmPassword"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 bg-white/90 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-purple-600 bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg class="animate-spin h-5 w-5 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              {{ loading ? 'Creating Account...' : 'Create Account' }}
            </button>
          </div>
        </form>

        <div class="mt-6">
          <div class="text-center">
            <span class="text-sm text-gray-200">
              By creating an account, you agree to our terms of service and privacy policy.
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const form = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const error = ref('')

const handleSubmit = async () => {
  error.value = ''

  // Basic validation
  if (form.password !== form.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }

  if (form.password.length < 6) {
    error.value = 'Password must be at least 6 characters long'
    return
  }

  loading.value = true

  try {
    const response = await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password
      }
    })

    if (response.success) {
      // Store the JWT token
      if (process.client) {
        localStorage.setItem('authToken', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
      }
      
      // Redirect to dashboard
      await navigateTo('/dashboard')
    } else {
      error.value = response.message || 'Registration failed'
    }
  } catch (err) {
    error.value = err.data?.message || 'An error occurred during registration'
  } finally {
    loading.value = false
  }
}

// SEO
useHead({
  title: 'Register - AutoHub Raffle',
  meta: [
    { name: 'description', content: 'Create your AutoHub account to participate in our car raffle.' }
  ]
})
</script>