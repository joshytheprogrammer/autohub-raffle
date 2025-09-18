<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-2xl font-bold text-purple-600">AutoHub</NuxtLink>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-gray-700">{{ user?.name }}</span>
            <button @click="logout" class="text-red-600 hover:text-red-700 font-medium">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Welcome Section -->
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
              Welcome to your Dashboard, {{ user?.name }}!
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div class="bg-purple-50 p-4 rounded-lg">
                <h4 class="text-sm font-medium text-purple-600">Your Account ID</h4>
                <p class="text-lg font-semibold text-gray-900">{{ user?.id }}</p>
              </div>
              <div class="bg-green-50 p-4 rounded-lg">
                <h4 class="text-sm font-medium text-green-600">Total Tickets</h4>
                <p class="text-lg font-semibold text-gray-900">{{ tickets.length }}</p>
              </div>
              <div class="bg-blue-50 p-4 rounded-lg">
                <h4 class="text-sm font-medium text-blue-600">Total Spent</h4>
                <p class="text-lg font-semibold text-gray-900">₦{{ (tickets.length * 10000).toLocaleString() }}</p>
              </div>
            </div>

            <!-- Buy Ticket Button -->
            <div class="mb-6">
              <button
                @click="buyTicket"
                :disabled="loading"
                class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span v-if="loading">Processing...</span>
                <span v-else>Buy New Ticket (₦10,000)</span>
              </button>
            </div>

            <!-- Success Message -->
            <div v-if="successMessage" class="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {{ successMessage }}
            </div>

            <!-- Error Message -->
            <div v-if="error" class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {{ error }}
            </div>
          </div>
        </div>
      </div>

      <!-- User Profile -->
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Profile Information</h3>
            <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt class="text-sm font-medium text-gray-500">Full name</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ user?.name }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Email address</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ user?.email }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Phone number</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ user?.phone || 'Not provided' }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Member since</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ formatDate(user?.created_at) }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <!-- Tickets Section -->
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Your Raffle Tickets</h3>
            
            <div v-if="tickets.length === 0" class="text-center py-8">
              <div class="text-gray-400 text-6xl mb-4">🎫</div>
              <h4 class="text-lg font-medium text-gray-900 mb-2">No tickets yet</h4>
              <p class="text-gray-500 mb-4">Purchase your first raffle ticket to get started!</p>
              <button
                @click="buyTicket"
                class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                Buy Your First Ticket
              </button>
            </div>

            <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div
                v-for="ticket in tickets"
                :key="ticket.id"
                class="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-purple-50 to-pink-50"
              >
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-bold text-purple-600 text-lg">{{ ticket.ticket_number }}</h4>
                  <span class="text-green-600 font-semibold">₦10,000</span>
                </div>
                <p class="text-sm text-gray-600">
                  Purchased on {{ formatDate(ticket.created_at) }}
                </p>
                <div class="mt-2 flex items-center text-xs text-gray-500">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  Verified Payment
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Paystack Payment Script -->
    <div v-if="showPaystack" id="paystack-container"></div>
  </div>
</template>

<script setup>
// Middleware to protect this route
definePageMeta({
  middleware: 'auth'
})

const user = ref(null)
const tickets = ref([])
const loading = ref(false)
const error = ref('')
const successMessage = ref('')
const showPaystack = ref(false)

// Load user data on mount
onMounted(async () => {
  if (process.client) {
    const userData = localStorage.getItem('user')
    if (userData) {
      user.value = JSON.parse(userData)
      await loadTickets()
    }
  }
})

const loadTickets = async () => {
  try {
    const token = localStorage.getItem('authToken')
    const response = await $fetch(`/api/tickets/user/${user.value.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    
    if (response.success) {
      tickets.value = response.tickets
    }
  } catch (err) {
    console.error('Failed to load tickets:', err)
  }
}

const buyTicket = async () => {
  error.value = ''
  loading.value = true

  try {
    // Initialize Paystack payment
    if (typeof PaystackPop === 'undefined') {
      await loadPaystackScript()
    }

    const handler = PaystackPop.setup({
      key: 'pk_test_your_paystack_public_key', // Replace with actual key
      email: user.value.email,
      amount: 1000000, // 10,000 NGN in kobo
      currency: 'NGN',
      ref: 'AUTOHUB_' + Math.floor((Math.random() * 1000000000) + 1),
      callback: async function(response) {
        await verifyPayment(response.reference)
      },
      onClose: function() {
        loading.value = false
      }
    })

    handler.openIframe()
  } catch (err) {
    error.value = 'Failed to initialize payment'
    loading.value = false
  }
}

const loadPaystackScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://js.paystack.co/v1/inline.js'
    script.onload = resolve
    document.head.appendChild(script)
  })
}

const verifyPayment = async (reference) => {
  try {
    const token = localStorage.getItem('authToken')
    const response = await $fetch('/api/tickets/create', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        paymentRef: reference
      }
    })

    if (response.success) {
      successMessage.value = `Congratulations! Your ticket ${response.ticket.ticket_number} has been created successfully!`
      await loadTickets() // Reload tickets
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        successMessage.value = ''
      }, 5000)
    } else {
      error.value = response.message || 'Failed to create ticket'
    }
  } catch (err) {
    error.value = 'Payment verification failed'
  } finally {
    loading.value = false
  }
}

const logout = () => {
  if (process.client) {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    navigateTo('/login')
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// SEO
useHead({
  title: 'Dashboard - AutoHub Raffle',
  meta: [
    { name: 'description', content: 'Manage your AutoHub raffle tickets and view your profile.' }
  ]
})
</script>