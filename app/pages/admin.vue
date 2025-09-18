<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <AdminNavbar @logout="logout" />

    <!-- Login Form (if not authenticated) -->
    <AdminLogin 
      v-if="!isAuthenticated" 
      :error="loginError" 
      :loading="loginLoading" 
      @login="adminLogin" 
    />

    <!-- Admin Dashboard (if authenticated) -->
    <div v-else class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Stats Overview -->
      <div class="px-4 py-6 sm:px-0">
        <!-- Stats Cards -->
        <AdminStatsCards :stats="stats" />

        <!-- Action Buttons -->
        <AdminActions 
          :total-tickets="stats.totalTickets"
          :draw-loading="drawLoading"
          :error-msg="error"
          :success-msg="successMessage"
          @export="exportTickets"
          @draw="conductRaffleDraw"
        />

        <!-- Winner Announcement -->
        <AdminWinner :winner="winner" />

        <!-- Users Table -->
        <AdminDataTable
          title="All Users"
          :columns="userColumns"
          :data="users"
        />

        <!-- Tickets Table -->
        <AdminDataTable
          title="All Tickets"
          :columns="ticketColumns"
          :data="tickets"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Components
import AdminNavbar from '~/components/Admin/AdminNavbar.vue'
import AdminLogin from '~/components/Admin/AdminLogin.vue'
import AdminStatsCards from '~/components/Admin/AdminStatsCards.vue'
import AdminActions from '~/components/Admin/AdminActions.vue'
import AdminWinner from '~/components/Admin/AdminWinner.vue'
import AdminDataTable from '~/components/Admin/AdminDataTable.vue'

const isAuthenticated = ref(false)
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

// Table column definitions
const userColumns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'ticket_count', label: 'Tickets' },
  { key: 'created_at', label: 'Joined', format: 'date' }
]

const ticketColumns = [
  { key: 'ticket_number', label: 'Ticket #' },
  { key: 'user_name', label: 'Name' },
  { key: 'user_email', label: 'Email' },
  { key: 'payment_ref', label: 'Payment Ref' },
  { key: 'created_at', label: 'Purchased', format: 'datetime' }
]

onMounted(() => {
  // Check if admin is already authenticated
  if (process.client && sessionStorage.getItem('adminAuth') === 'true') {
    isAuthenticated.value = true
    loadAdminData()
  }
})

const adminLogin = async (password) => {
  loginError.value = ''
  loginLoading.value = true

  try {
    const response = await $fetch('/api/admin/login', {
      method: 'POST',
      body: {
        password
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
  drawLoading.value = true
  error.value = ''
  successMessage.value = ''

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
  error.value = ''
  successMessage.value = ''
  
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
  if (process.client) {
    sessionStorage.removeItem('adminAuth')
  }
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