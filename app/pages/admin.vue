<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-red-600 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-white">AutoHub Admin</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-red-100">Admin Panel</span>
            <button @click="logout" class="text-white hover:text-red-200 font-medium">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Login Form (if not authenticated) -->
    <div v-if="!isAuthenticated" class="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Admin Login
        </h2>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form @submit.prevent="adminLogin" class="space-y-6">
            <div v-if="loginError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {{ loginError }}
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">
                Admin Password
              </label>
              <div class="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  v-model="adminPassword"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  placeholder="Enter admin password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                :disabled="loginLoading"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                {{ loginLoading ? 'Logging in...' : 'Login as Admin' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Admin Dashboard (if authenticated) -->
    <div v-else class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Stats Overview -->
      <div class="px-4 py-6 sm:px-0">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-sm font-medium text-gray-500">Total Users</h3>
            <p class="text-3xl font-bold text-gray-900">{{ stats.totalUsers }}</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-sm font-medium text-gray-500">Total Tickets</h3>
            <p class="text-3xl font-bold text-gray-900">{{ stats.totalTickets }}</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-sm font-medium text-gray-500">Total Revenue</h3>
            <p class="text-3xl font-bold text-gray-900">₦{{ (stats.totalTickets * 10000).toLocaleString() }}</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-sm font-medium text-gray-500">Total Winners</h3>
            <p class="text-3xl font-bold text-gray-900">{{ stats.totalWinners }}</p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="bg-white p-6 rounded-lg shadow mb-8">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Admin Actions</h3>
          <div class="flex flex-wrap gap-4">
            <button
              @click="exportTickets"
              class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Export All Tickets (CSV)
            </button>
            <button
              @click="conductRaffleDraw"
              :disabled="drawLoading || stats.totalTickets === 0"
              class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {{ drawLoading ? 'Drawing...' : 'Conduct Raffle Draw' }}
            </button>
          </div>
        </div>

        <!-- Winner Announcement -->
        <div v-if="winner" class="bg-green-50 border border-green-200 p-6 rounded-lg shadow mb-8">
          <h3 class="text-lg font-bold text-green-900 mb-4">🎉 We have a Winner! 🎉</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 class="font-medium text-green-800">Winning Ticket</h4>
              <p class="text-2xl font-bold text-green-900">{{ winner.ticket_number }}</p>
            </div>
            <div>
              <h4 class="font-medium text-green-800">Winner Details</h4>
              <p class="text-lg text-green-900">{{ winner.user_name }}</p>
              <p class="text-sm text-green-700">{{ winner.user_email }}</p>
              <p class="text-sm text-green-700">{{ winner.user_phone || 'No phone provided' }}</p>
            </div>
          </div>
          <p class="text-sm text-green-600 mt-2">
            Draw conducted on {{ formatDate(winner.draw_date) }}
          </p>
        </div>

        <!-- Error/Success Messages -->
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {{ error }}
        </div>
        <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {{ successMessage }}
        </div>

        <!-- Users Table -->
        <div class="bg-white shadow rounded-lg mb-8">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">All Users</h3>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tickets</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="user in users" :key="user.id">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.id }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ user.name }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.email }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.phone || '-' }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.ticket_count || 0 }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(user.created_at) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Tickets Table -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">All Tickets</h3>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket #</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Ref</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="ticket in tickets" :key="ticket.id">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-600">{{ ticket.ticket_number }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ ticket.user_name }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ ticket.user_email }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ ticket.payment_ref }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(ticket.created_at) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const isAuthenticated = ref(false)
const adminPassword = ref('')
const loginLoading = ref(false)
const loginError = ref('')
const drawLoading = ref(false)
const error = ref('')
const successMessage = ref('')

const stats = ref({
  totalUsers: 0,
  totalTickets: 0,
  totalWinners: 0
})

const users = ref([])
const tickets = ref([])
const winner = ref(null)

onMounted(() => {
  // Check if admin is already authenticated
  if (process.client && sessionStorage.getItem('adminAuth') === 'true') {
    isAuthenticated.value = true
    loadAdminData()
  }
})

const adminLogin = async () => {
  loginError.value = ''
  loginLoading.value = true

  try {
    const response = await $fetch('/api/admin/login', {
      method: 'POST',
      body: {
        password: adminPassword.value
      }
    })

    if (response.success) {
      isAuthenticated.value = true
      if (process.client) {
        sessionStorage.setItem('adminAuth', 'true')
      }
      await loadAdminData()
    } else {
      loginError.value = response.message || 'Invalid password'
    }
  } catch (err) {
    loginError.value = 'Login failed'
  } finally {
    loginLoading.value = false
  }
}

const loadAdminData = async () => {
  try {
    const response = await $fetch('/api/admin/dashboard')
    
    if (response.success) {
      stats.value = response.stats
      users.value = response.users
      tickets.value = response.tickets
      winner.value = response.lastWinner
    }
  } catch (err) {
    error.value = 'Failed to load admin data'
  }
}

const conductRaffleDraw = async () => {
  if (!confirm('Are you sure you want to conduct the raffle draw? This action cannot be undone.')) {
    return
  }

  drawLoading.value = true
  error.value = ''

  try {
    const response = await $fetch('/api/admin/draw', {
      method: 'POST'
    })

    if (response.success) {
      winner.value = response.winner
      successMessage.value = 'Raffle draw completed successfully!'
      await loadAdminData() // Refresh data
    } else {
      error.value = response.message || 'Failed to conduct draw'
    }
  } catch (err) {
    error.value = 'Draw failed'
  } finally {
    drawLoading.value = false
  }
}

const exportTickets = async () => {
  try {
    const response = await $fetch('/api/admin/export', {
      method: 'GET'
    })

    if (response.success) {
      // Create and download CSV
      const csvContent = response.csvData
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `autohub-tickets-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      
      successMessage.value = 'Tickets exported successfully!'
    }
  } catch (err) {
    error.value = 'Export failed'
  }
}

const logout = () => {
  isAuthenticated.value = false
  adminPassword.value = ''
  if (process.client) {
    sessionStorage.removeItem('adminAuth')
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// SEO
useHead({
  title: 'Admin Panel - AutoHub Raffle',
  meta: [
    { name: 'description', content: 'AutoHub admin panel for managing users, tickets, and raffle draws.' },
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>