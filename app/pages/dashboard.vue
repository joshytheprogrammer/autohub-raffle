<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- Navigation -->
    <MainNavigation />

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
      
      <!-- Debug info - only shown when no public key is found -->
      <AlertMessage
        v-if="!paystackPublicKey && process.dev"
        type="error"
        title="Configuration Error"
        message="Paystack public key is not set in environment variables. Please check your .env file."
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
      
      <!-- Featured Win (if any) -->
      <div v-if="featuredWin" class="mb-8">
        <WinningCard :ticket="featuredWin">
          <template #actions>
            <div class="mt-4">
              <button 
                class="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-bold py-3 rounded-xl transition-all hover:shadow-lg"
                @click="buyTicket"
              >
                Try for Another Win!
              </button>
            </div>
          </template>
        </WinningCard>
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
            <div class="p-3 bg-yellow-100 rounded-2xl">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 5z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-neutral-600">Your Wins</p>
              <p class="text-lg font-bold text-neutral-900">{{ totalWins }}</p>
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
          
          <!-- Winning Tickets Section -->
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 mt-6">
            <h3 class="text-lg font-bold text-neutral-900 mb-4">
              Your Wins
              <span class="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full ml-2">
                {{ totalWins }}
              </span>
            </h3>
            
            <div v-if="wins.length === 0" class="text-center py-6">
              <div class="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg class="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h4 class="text-base font-semibold text-neutral-900 mb-1">No wins yet</h4>
              <p class="text-sm text-neutral-600">Keep buying tickets to increase your chances!</p>
            </div>
            
            <div v-else class="space-y-4">
              <div 
                v-for="win in wins" 
                :key="win.win_id" 
                class="border-2 border-yellow-300 rounded-xl p-4 bg-gradient-to-br from-yellow-50 to-amber-50"
              >
                <div class="flex items-center justify-between mb-2">
                  <span class="text-amber-700 font-bold">{{ win.ticket_number }}</span>
                  <div class="flex items-center">
                    <svg class="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-sm font-semibold text-amber-700">Winner!</span>
                  </div>
                </div>
                <div class="text-xs text-neutral-600">
                  <p>Won on: {{ formatDate(win.draw_date) }}</p>
                  <p>Ticket purchased: {{ formatDate(win.ticket_purchase_date) }}</p>
                </div>
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
                :class="[
                  'border-2 rounded-2xl p-5 transition-all hover:shadow-md',
                  ticket.is_winner 
                    ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-amber-50 hover:border-yellow-400' 
                    : 'border-neutral-200 bg-gradient-to-br from-green-50 to-emerald-50 hover:border-green-300'
                ]"
              >
                <!-- Winner badge -->
                <div v-if="ticket.is_winner" class="flex items-center justify-between mb-2">
                  <span class="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clip-rule="evenodd"></path>
                    </svg>
                    WINNER!
                  </span>
                  <span class="text-xs text-amber-700">
                    {{ ticket.win_date ? formatDate(ticket.win_date) : 'Draw date not recorded' }}
                  </span>
                </div>
                
                <div class="flex items-center justify-between mb-3">
                  <h4 
                    :class="[
                      'font-bold text-lg', 
                      ticket.is_winner ? 'text-amber-700' : 'text-green-700'
                    ]"
                  >{{ ticket.ticket_number }}</h4>
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
import WinningCard from '~/components/WinningCard.vue'
import MainNavigation from '~/components/MainNavigation.vue'
import { useAuth } from '~/utils/authState'

// Middleware to protect this route
definePageMeta({
  middleware: 'auth'
})

// Get runtime config for environment variables
const runtimeConfig = useRuntimeConfig()

// Use centralized auth state
const { auth, clearAuth } = useAuth()

const tickets = ref([])
const wins = ref([])
const totalWins = ref(0)
const loading = ref(false)
const error = ref('')
const successMessage = ref('')
const showPaystack = ref(false)
// Make public key available for debugging
const paystackPublicKey = ref(runtimeConfig.public.paystackPublicKey)

// Get user from auth state
const user = computed(() => auth.value.user)

// Fallback to test key if not available in environment and in development mode
if (!paystackPublicKey.value && process.dev) {
  console.warn('No Paystack public key found in environment, using test key for development')
  paystackPublicKey.value = 'pk_test_1234567890abcdef' // Development test key
}

// Computed properties
const featuredWin = computed(() => {
  if (wins.value && wins.value.length > 0) {
    // Map to the format expected by WinningCard
    return {
      ticket_number: wins.value[0].ticket_number,
      draw_date: wins.value[0].draw_date,
      purchase_date: wins.value[0].ticket_purchase_date
    }
  }
  return null
})

// Load user data on mount
onMounted(async () => {
  if (user.value) {
    await Promise.all([
      loadTickets(),
      loadWins()
    ])
  }
})

const loadTickets = async () => {
  try {
    const token = auth.value.token
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

const loadWins = async () => {
  try {
    const token = auth.value.token
    const response = await $fetch(`/api/wins/${user.value.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    
    if (response.success) {
      wins.value = response.wins
      totalWins.value = response.totalWins
    }
  } catch (err) {
    console.error('Failed to load wins:', err)
    // We don't want to show an error if wins API fails
    // This could be a new feature being rolled out
    wins.value = []
    totalWins.value = 0
  }
}

const buyTicket = async () => {
  error.value = ''
  successMessage.value = ''
  loading.value = true

  try {
    // Import utilities only when needed (client-side)
    const { initializePaystackPayment, checkPaystackPublicKey } = await import('~/utils/paystack')
    
    // Make sure we have the Paystack public key before proceeding
    if (!paystackPublicKey.value) {
      const keyAvailable = checkPaystackPublicKey();
      if (!keyAvailable) {
        throw new Error('Paystack is not properly configured. Missing public key.');
      }
    }
    
    await initializePaystackPayment({
      email: user.value.email,
      userId: user.value.id,
      publicKey: paystackPublicKey.value, // Pass the public key explicitly
      onSuccess: async (response) => {
        await handlePaymentSuccess(response)
      },
      onError: (err) => {
        console.error('Payment error:', err)
        error.value = 'Payment failed. Please try again.'
        loading.value = false
      },
      onClose: () => {
        // Only reset loading if it wasn't successful
        if (loading.value) {
          loading.value = false
          // We don't set an error message here as closing might be intentional
        }
      }
    })
  } catch (err) {
    console.error('Payment initialization error:', err)
    
    // More descriptive error message
    if (err.message && err.message.includes('not properly configured')) {
      error.value = 'Payment system not properly configured. Please contact support.'
      console.error('Missing Paystack public key. Check your .env file and make sure PAYSTACK_PUBLIC_KEY is set correctly.')
    } else {
      error.value = 'Failed to initialize payment. Please try again later.'
    }
    
    loading.value = false
  }
}

const handlePaymentSuccess = async (response) => {
  try {
    if (!response || !response.reference) {
      throw new Error('Invalid payment response')
    }
    
    const token = auth.value.token
    if (!token) {
      throw new Error('Authentication token not found')
    }
    
    const result = await $fetch('/api/tickets/create', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        paymentRef: response.reference,
        transactionId: response.transaction || '',
        metadata: response.metadata || {}
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
    console.error('Ticket creation error:', err)
    error.value = 'Failed to process ticket creation. Please contact support.'
  } finally {
    loading.value = false
  }
}

// Paystack script loading is now handled in the utils/paystack.js file

const logout = () => {
  clearAuth()
  navigateTo('/login')
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