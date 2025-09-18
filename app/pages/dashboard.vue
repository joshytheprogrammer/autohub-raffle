<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center space-x-3">
            <NuxtLink to="/" class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">🚗</span>
              </div>
              <span class="text-2xl font-bold text-neutral-900">AutoHub</span>
            </NuxtLink>
            <span class="hidden sm:block text-neutral-500">Dashboard</span>
          </div>
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span class="text-green-600 font-medium text-sm">{{ user?.name?.charAt(0)?.toUpperCase() }}</span>
              </div>
              <span class="hidden sm:block text-neutral-700 font-medium">{{ user?.name }}</span>
            </div>
            <button @click="logout" class="text-neutral-500 hover:text-red-600 font-medium transition-colors">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <!-- Alerts -->
      <AlertMessage
        v-if="successMessage"
        type="success"
        title="Success!"
        :message="successMessage"
        @dismiss="successMessage = ''"
        class="mb-6"
      />

      <AlertMessage
        v-if="error"
        type="error"
        title="Error"
        :message="error"
        @dismiss="error = ''"
        class="mb-6"
      />

      <!-- Welcome Section -->
      <div class="mb-8">
        <div class="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-6 sm:p-8 text-white">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 class="text-2xl sm:text-3xl font-bold mb-2">
                Welcome back, {{ user?.name?.split(' ')[0] }}! 👋
              </h1>
              <p class="text-green-100 text-lg">
                Ready to try your luck? Purchase another ticket to increase your chances!
              </p>
            </div>
            <div class="mt-4 sm:mt-0">
              <button
                @click="buyTicket"
                :disabled="loading"
                class="bg-white hover:bg-neutral-100 text-green-600 font-bold py-3 px-6 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg disabled:hover:shadow-none"
              >
                <span v-if="loading">Processing...</span>
                <span v-else>Buy Ticket - ₦10,000</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-2xl">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-neutral-600">Account ID</p>
              <p class="text-lg font-bold text-neutral-900">#{{ user?.id }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-2xl">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-neutral-600">Your Tickets</p>
              <p class="text-lg font-bold text-neutral-900">{{ tickets.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">
          <div class="flex items-center">
            <div class="p-3 bg-purple-100 rounded-2xl">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-neutral-600">Total Spent</p>
              <p class="text-lg font-bold text-neutral-900">₦{{ (tickets.length * 10000).toLocaleString() }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">
          <div class="flex items-center">
            <div class="p-3 bg-orange-100 rounded-2xl">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-neutral-600">Next Draw</p>
              <p class="text-lg font-bold text-neutral-900">Coming Soon</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile & Tickets Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Profile Card -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">
            <h3 class="text-lg font-bold text-neutral-900 mb-4">Profile Information</h3>
            <div class="space-y-4">
              <div>
                <p class="text-sm font-medium text-neutral-600">Full Name</p>
                <p class="text-base text-neutral-900">{{ user?.name }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-neutral-600">Email Address</p>
                <p class="text-base text-neutral-900">{{ user?.email }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-neutral-600">Phone Number</p>
                <p class="text-base text-neutral-900">{{ user?.phone || 'Not provided' }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-neutral-600">Member Since</p>
                <p class="text-base text-neutral-900">{{ formatDate(user?.created_at) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Tickets Section -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-bold text-neutral-900">Your Raffle Tickets</h3>
              <div class="flex items-center space-x-2 text-sm text-neutral-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Each ticket costs ₦10,000
              </div>
            </div>
            
            <div v-if="tickets.length === 0" class="text-center py-12">
              <div class="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-10 h-10 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-neutral-900 mb-2">No tickets yet</h4>
              <p class="text-neutral-600 mb-6">Purchase your first raffle ticket to get started on your journey to winning!</p>
              <button
                @click="buyTicket"
                class="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all hover:shadow-lg"
              >
                Buy Your First Ticket
              </button>
            </div>

            <div v-else class="grid gap-4 sm:grid-cols-2">
              <div
                v-for="ticket in tickets"
                :key="ticket.id"
                class="border-2 border-neutral-200 hover:border-green-300 rounded-2xl p-5 bg-gradient-to-br from-green-50 to-emerald-50 transition-all hover:shadow-md"
              >
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-bold text-green-700 text-lg">{{ ticket.ticket_number }}</h4>
                  <span class="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">₦10,000</span>
                </div>
                <p class="text-sm text-neutral-600 mb-3">
                  Purchased on {{ formatDate(ticket.created_at) }}
                </p>
                <div class="flex items-center text-xs text-green-600">
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
// Import components
import AlertMessage from '~/components/AlertMessage.vue'

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
    const response = await $fetch(`/api/tickets/${user.value.id}`, {
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
      key: 'pk_test_f50f9ff6ab406d13651a0dffed2cc9330a9f7c67', // Use the actual key from .env
      email: user.value.email,
      amount: 1000000, // 10,000 NGN in kobo
      currency: 'NGN',
      ref: 'AUTOHUB_' + Math.floor((Math.random() * 1000000000) + 1),
      metadata: {
        user_id: user.value.id,
        user_email: user.value.email
      },
      callback: async function(response) {
        await handlePaymentSuccess(response)
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

const handlePaymentSuccess = async (response) => {
  try {
    const token = localStorage.getItem('authToken')
    const result = await $fetch('/api/tickets/create', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        user_id: user.value.id,
        payment_reference: response.reference,
        amount: 10000
      }
    })

    if (result.success) {
      successMessage.value = `Ticket purchased successfully! Your ticket number is ${result.ticket.ticket_number}`
      await loadTickets() // Reload tickets
      error.value = ''
    } else {
      error.value = result.message || 'Failed to create ticket'
    }
  } catch (err) {
    error.value = 'Failed to process ticket creation'
  } finally {
    loading.value = false
  }
}

const loadPaystackScript = () => {
  return new Promise((resolve, reject) => {
    if (document.getElementById('paystack-js')) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.id = 'paystack-js'
    script.src = 'https://js.paystack.co/v1/inline.js'
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

const logout = () => {
  if (process.client) {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    navigateTo('/login')
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// SEO
useHead({
  title: 'Dashboard - AutoHub Raffle',
  meta: [
    { name: 'description', content: 'Manage your raffle tickets and account on AutoHub' }
  ]
})
</script>