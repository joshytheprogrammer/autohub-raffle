<template><template>

  <div class="min-h-screen bg-gray-50">  <div class="min-h-screen bg-neutral-50">

    <!-- Authentication Form -->    <!-- Navigation -->

    <div v-if="!isAuthenticated" class="flex items-center justify-center min-h-screen p-4">    <nav class="bg-red-600 shadow-lg sticky top-0 z-50">

      <div class="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-8">      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="text-center mb-8">        <div class="flex justify-between h-16">

          <div class="mx-auto h-16 w-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4">          <div class="flex items-center space-x-3">

            <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">            <div class="w-8 h-8 bg-white rounded-lg flex items-center justify-center">

              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />              <span class="text-red-600 font-bold text-sm">🔒</span>

            </svg>            </div>

          </div>            <h1 class="text-2xl font-bold text-white">AutoHub Admin</h1>

          <h1 class="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>          </div>

          <p class="text-gray-600">Enter your credentials to access the admin dashboard</p>          <div class="flex items-center space-x-4">

        </div>            <span class="text-red-100">Admin Panel</span>

            <button @click="logout" class="text-white hover:text-red-200 font-medium transition-colors">

        <form @submit.prevent="adminLogin" class="space-y-6">              Logout

          <div>            </button>

            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">          </div>

              Admin Password        </div>

            </label>      </div>

            <input    </nav>

              id="password"

              v-model="adminPassword"    <!-- Login Form (if not authenticated) -->

              type="password"    <div v-if="!isAuthenticated" class="flex flex-col justify-center py-12 sm:px-6 lg:px-8">

              required      <div class="sm:mx-auto sm:w-full sm:max-w-md">

              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"        <div class="text-center mb-8">

              placeholder="Enter admin password"          <div class="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">

            />            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">

          </div>              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>

            </svg>

          <button          </div>

            type="submit"          <h2 class="text-3xl font-bold text-neutral-900">Admin Access</h2>

            :disabled="loginLoading"          <p class="mt-2 text-sm text-neutral-600">Enter admin password to continue</p>

            class="w-full bg-green-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"        </div>

          >      </div>

            <span v-if="loginLoading" class="inline-flex items-center">

              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">      <div class="sm:mx-auto sm:w-full sm:max-w-md">

                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>        <div class="bg-white py-8 px-4 shadow-xl sm:rounded-3xl sm:px-10 border border-neutral-200">

                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>          <form @submit.prevent="adminLogin" class="space-y-6">

              </svg>            <div v-if="loginError" class="bg-red-50 border border-red-200 rounded-2xl p-4">

              Signing In...              <div class="flex">

            </span>                <svg class="h-5 w-5 text-red-400 mt-0.5" viewBox="0 0 20 20" fill="currentColor">

            <span v-else>Sign In</span>                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />

          </button>                </svg>

                <p class="ml-3 text-sm text-red-800">{{ loginError }}</p>

          <AlertMessage              </div>

            v-if="loginError"            </div>

            type="error"

            title="Login Failed"            <div>

            :message="loginError"              <label for="password" class="block text-sm font-medium text-neutral-700 mb-2">

            :dismissible="false"                Admin Password

          />              </label>

        </form>              <input

      </div>                id="password"

    </div>                name="password"

                type="password"

    <!-- Admin Dashboard -->                v-model="adminPassword"

    <div v-else>                required

      <!-- Header -->                class="block w-full px-4 py-3 rounded-2xl border border-neutral-300 placeholder-neutral-400 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"

      <header class="bg-white border-b border-gray-200">                placeholder="Enter admin password"

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">              />

          <div class="flex items-center justify-between h-16">            </div>

            <div class="flex items-center">

              <div class="h-8 w-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">            <div>

                <span class="text-white font-bold text-sm">A</span>              <button

              </div>                type="submit"

              <div>                :disabled="loginLoading"

                <h1 class="text-xl font-semibold text-gray-900">Admin Dashboard</h1>                class="w-full flex justify-center items-center py-3 px-4 text-base font-semibold rounded-2xl text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg disabled:hover:shadow-none"

                <p class="text-sm text-gray-500">AutoHub Raffle System</p>              >

              </div>                <svg v-if="loginLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">

            </div>                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>

            <button                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>

              @click="logout"                </svg>

              class="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors flex items-center space-x-2"                {{ loginLoading ? 'Logging in...' : 'Access Admin Panel' }}

            >              </button>

              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">            </div>

                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />          </form>

              </svg>        </div>

              <span>Logout</span>      </div>

            </button>    </div>

          </div>

        </div>    <!-- Admin Dashboard (if authenticated) -->

      </header>    <div v-else class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">

      <!-- Stats Overview -->

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">      <div class="mb-8">

        <!-- Quick Stats -->        <h2 class="text-2xl font-bold text-neutral-900 mb-6">System Overview</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">

          <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">          <div class="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">

            <div class="flex items-center">            <div class="flex items-center">

              <div class="flex-shrink-0">              <div class="p-3 bg-blue-100 rounded-2xl">

                <div class="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                  <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>

                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />                </svg>

                  </svg>              </div>

                </div>              <div class="ml-4">

              </div>                <p class="text-sm font-medium text-neutral-600">Total Users</p>

              <div class="ml-5 w-0 flex-1">                <p class="text-2xl font-bold text-neutral-900">{{ stats.totalUsers }}</p>

                <dl>              </div>

                  <dt class="text-sm font-medium text-gray-500 truncate">Total Tickets</dt>            </div>

                  <dd class="text-2xl font-semibold text-gray-900">{{ stats.totalTickets }}</dd>          </div>

                </dl>

              </div>          <div class="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">

            </div>            <div class="flex items-center">

          </div>              <div class="p-3 bg-green-100 rounded-2xl">

                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">

          <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>

            <div class="flex items-center">                </svg>

              <div class="flex-shrink-0">              </div>

                <div class="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">              <div class="ml-4">

                  <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">                <p class="text-sm font-medium text-neutral-600">Total Tickets</p>

                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />                <p class="text-2xl font-bold text-neutral-900">{{ stats.totalTickets }}</p>

                  </svg>              </div>

                </div>            </div>

              </div>          </div>

              <div class="ml-5 w-0 flex-1">

                <dl>          <div class="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">

                  <dt class="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>            <div class="flex items-center">

                  <dd class="text-2xl font-semibold text-gray-900">{{ formatCurrency(stats.totalRevenue) }}</dd>              <div class="p-3 bg-purple-100 rounded-2xl">

                </dl>                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">

              </div>                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>

            </div>                </svg>

          </div>              </div>

              <div class="ml-4">

          <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">                <p class="text-sm font-medium text-neutral-600">Total Revenue</p>

            <div class="flex items-center">                <p class="text-2xl font-bold text-neutral-900">₦{{ (stats.totalTickets * 10000).toLocaleString() }}</p>

              <div class="flex-shrink-0">              </div>

                <div class="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center">            </div>

                  <svg class="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">          </div>

                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />

                  </svg>          <div class="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">

                </div>            <div class="flex items-center">

              </div>              <div class="p-3 bg-orange-100 rounded-2xl">

              <div class="ml-5 w-0 flex-1">                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                <dl>                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>

                  <dt class="text-sm font-medium text-gray-500 truncate">Active Users</dt>                </svg>

                  <dd class="text-2xl font-semibold text-gray-900">{{ stats.activeUsers }}</dd>              </div>

                </dl>              <div class="ml-4">

              </div>                <p class="text-sm font-medium text-neutral-600">Total Winners</p>

            </div>                <p class="text-2xl font-bold text-neutral-900">{{ stats.totalWinners }}</p>

          </div>              </div>

            </div>

          <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">          </div>

            <div class="flex items-center">        </div>

              <div class="flex-shrink-0">      </div>

                <div class="h-12 w-12 bg-orange-100 rounded-xl flex items-center justify-center">

                  <svg class="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">      <!-- Action Buttons -->

                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />      <div class="mb-8">

                  </svg>        <div class="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">

                </div>          <h3 class="text-lg font-bold text-neutral-900 mb-4">Admin Actions</h3>

              </div>          <div class="flex flex-wrap gap-4">

              <div class="ml-5 w-0 flex-1">            <button

                <dl>              @click="exportTickets"

                  <dt class="text-sm font-medium text-gray-500 truncate">Total Winners</dt>              class="inline-flex items-center px-6 py-3 text-base font-semibold rounded-2xl text-white bg-green-600 hover:bg-green-700 transition-all hover:shadow-lg"

                  <dd class="text-2xl font-semibold text-gray-900">{{ stats.totalWinners }}</dd>            >

                </dl>              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">

              </div>                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>

            </div>              </svg>

          </div>              Export All Tickets (CSV)

        </div>            </button>

            <button

        <!-- Action Cards -->              @click="conductRaffleDraw"

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">              :disabled="drawLoading || stats.totalTickets === 0"

          <BaseCard title="Draw Management" subtitle="Conduct raffle draws and manage winners">              class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"

            <button            >

              @click="conductDraw"              {{ drawLoading ? 'Drawing...' : 'Conduct Raffle Draw' }}

              :disabled="drawLoading || stats.totalTickets === 0"            </button>

              class="w-full bg-green-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-green-700 disabled:opacity-50 transition-all duration-200 flex items-center justify-center space-x-2"          </div>

            >        </div>

              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />        <!-- Winner Announcement -->

              </svg>        <div v-if="winner" class="bg-green-50 border border-green-200 p-6 rounded-lg shadow mb-8">

              <span>{{ drawLoading ? 'Drawing...' : 'Conduct Draw' }}</span>          <h3 class="text-lg font-bold text-green-900 mb-4">🎉 We have a Winner! 🎉</h3>

            </button>          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

          </BaseCard>            <div>

              <h4 class="font-medium text-green-800">Winning Ticket</h4>

          <BaseCard title="Export Data" subtitle="Download ticket data for analysis">              <p class="text-2xl font-bold text-green-900">{{ winner.ticket_number }}</p>

            <button            </div>

              @click="exportTickets"            <div>

              :disabled="loading"              <h4 class="font-medium text-green-800">Winner Details</h4>

              class="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 transition-all duration-200 flex items-center justify-center space-x-2"              <p class="text-lg text-green-900">{{ winner.user_name }}</p>

            >              <p class="text-sm text-green-700">{{ winner.user_email }}</p>

              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">              <p class="text-sm text-green-700">{{ winner.user_phone || 'No phone provided' }}</p>

                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />            </div>

              </svg>          </div>

              <span>Export CSV</span>          <p class="text-sm text-green-600 mt-2">

            </button>            Draw conducted on {{ formatDate(winner.draw_date) }}

          </BaseCard>          </p>

        </div>

          <BaseCard title="System Status" subtitle="View system health and statistics">

            <div class="space-y-3">        <!-- Error/Success Messages -->

              <div class="flex items-center justify-between text-sm">        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">

                <span class="text-gray-600">Database</span>          {{ error }}

                <div class="flex items-center space-x-1">        </div>

                  <div class="h-2 w-2 bg-green-500 rounded-full"></div>        <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">

                  <span class="text-green-600 font-medium">Connected</span>          {{ successMessage }}

                </div>        </div>

              </div>

              <div class="flex items-center justify-between text-sm">        <!-- Users Table -->

                <span class="text-gray-600">Payments</span>        <div class="bg-white shadow rounded-lg mb-8">

                <div class="flex items-center space-x-1">          <div class="px-4 py-5 sm:p-6">

                  <div class="h-2 w-2 bg-green-500 rounded-full"></div>            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">All Users</h3>

                  <span class="text-green-600 font-medium">Active</span>            <div class="overflow-x-auto">

                </div>              <table class="min-w-full divide-y divide-gray-200">

              </div>                <thead class="bg-gray-50">

              <div class="flex items-center justify-between text-sm">                  <tr>

                <span class="text-gray-600">Last Backup</span>                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>

                <span class="text-gray-900 font-medium">2 hours ago</span>                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>

              </div>                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>

            </div>                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>

          </BaseCard>                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tickets</th>

        </div>                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>

                  </tr>

        <!-- Winner Announcement -->                </thead>

        <div v-if="winner" class="mb-8">                <tbody class="bg-white divide-y divide-gray-200">

          <AlertMessage                  <tr v-for="user in users" :key="user.id">

            type="success"                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.id }}</td>

            title="🎉 We have a Winner! 🎉"                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ user.name }}</td>

            :message="`Winner: ${winner.user_name} (${winner.user_email}) - Ticket: ${winner.ticket_number}`"                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.email }}</td>

            :dismissible="false"                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.phone || '-' }}</td>

          />                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.ticket_count || 0 }}</td>

        </div>                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(user.created_at) }}</td>

                  </tr>

        <!-- Recent Tickets Table -->                </tbody>

        <DataTable              </table>

          title="Recent Tickets"            </div>

          :data="tickets"          </div>

          :columns="ticketColumns"        </div>

          :searchable="true"

          :paginated="true"        <!-- Tickets Table -->

          :items-per-page="10"        <div class="bg-white shadow rounded-lg">

          :actions="true"          <div class="px-4 py-5 sm:p-6">

          empty-message="No tickets found."            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">All Tickets</h3>

        >            <div class="overflow-x-auto">

          <template #actions>              <table class="min-w-full divide-y divide-gray-200">

            <button                <thead class="bg-gray-50">

              @click="loadDashboardData"                  <tr>

              class="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket #</th>

            >                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>

              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>

                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Ref</th>

              </svg>                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>

              <span>Refresh</span>                  </tr>

            </button>                </thead>

          </template>                <tbody class="bg-white divide-y divide-gray-200">

                  <tr v-for="ticket in tickets" :key="ticket.id">

          <template #cell-status="{ value }">                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-600">{{ ticket.ticket_number }}</td>

            <span :class="getStatusClass(value)" class="px-3 py-1 text-xs font-medium rounded-full">                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ ticket.user_name }}</td>

              {{ value }}                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ ticket.user_email }}</td>

            </span>                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ ticket.payment_ref }}</td>

          </template>                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(ticket.created_at) }}</td>

                  </tr>

          <template #cell-amount="{ value }">                </tbody>

            <span class="font-medium text-gray-900">{{ formatCurrency(value) }}</span>              </table>

          </template>            </div>

          </div>

          <template #cell-created_at="{ value }">        </div>

            <span class="text-gray-600">{{ formatDate(value) }}</span>      </div>

          </template>    </div>

  </div>

          <template #actions="{ row }"></template>

            <div class="flex items-center space-x-2">

              <button<script setup>

                @click="viewTicket(row)"const isAuthenticated = ref(false)

                class="text-blue-600 hover:text-blue-900 text-sm font-medium transition-colors"const adminPassword = ref('')

              >const loginLoading = ref(false)

                Viewconst loginError = ref('')

              </button>const drawLoading = ref(false)

              <span class="text-gray-300">|</span>const error = ref('')

              <buttonconst successMessage = ref('')

                @click="refundTicket(row)"

                class="text-red-600 hover:text-red-900 text-sm font-medium transition-colors"const stats = ref({

              >  totalUsers: 0,

                Refund  totalTickets: 0,

              </button>  totalWinners: 0

            </div>})

          </template>

        </DataTable>const users = ref([])

      </main>const tickets = ref([])

    </div>const winner = ref(null)



    <!-- Loading Modal -->onMounted(() => {

    <LoadingModal :show="loading" :title="loadingTitle" :message="loadingMessage" />  // Check if admin is already authenticated

  if (process.client && sessionStorage.getItem('adminAuth') === 'true') {

    <!-- Success Modal -->    isAuthenticated.value = true

    <SuccessModal    loadAdminData()

      :show="showSuccessModal"  }

      :title="successTitle"})

      :message="successMessage"

      @close="showSuccessModal = false"const adminLogin = async () => {

    />  loginError.value = ''

  </div>  loginLoading.value = true

</template>

  try {

<script setup>    const response = await $fetch('/api/admin/login', {

// Import all components      method: 'POST',

import DataTable from '~/components/DataTable.vue'      body: {

import LoadingModal from '~/components/LoadingModal.vue'        password: adminPassword.value

import SuccessModal from '~/components/SuccessModal.vue'      }

import AlertMessage from '~/components/AlertMessage.vue'    })

import BaseCard from '~/components/BaseCard.vue'

    if (response.success) {

// Reactive data      isAuthenticated.value = true

const isAuthenticated = ref(false)      if (process.client) {

const adminPassword = ref('')        sessionStorage.setItem('adminAuth', 'true')

const loginError = ref('')      }

const loginLoading = ref(false)      await loadAdminData()

const loading = ref(false)    } else {

const drawLoading = ref(false)      loginError.value = response.message || 'Invalid password'

const loadingTitle = ref('Processing...')    }

const loadingMessage = ref('Please wait while we process your request.')  } catch (err) {

    loginError.value = 'Login failed'

// Success modal  } finally {

const showSuccessModal = ref(false)    loginLoading.value = false

const successTitle = ref('')  }

const successMessage = ref('')}



// Dashboard dataconst loadAdminData = async () => {

const stats = ref({  try {

  totalTickets: 0,    const response = await $fetch('/api/admin/dashboard')

  totalRevenue: 0,    

  activeUsers: 0,    if (response.success) {

  totalWinners: 0      stats.value = response.stats

})      users.value = response.users

      tickets.value = response.tickets

const tickets = ref([])      winner.value = response.lastWinner

const winner = ref(null)    }

  } catch (err) {

// Table columns configuration    error.value = 'Failed to load admin data'

const ticketColumns = ref([  }

  { key: 'ticket_number', label: 'Ticket Number', class: 'font-mono text-sm' },}

  { key: 'user_email', label: 'Email' },

  { key: 'amount', label: 'Amount' },const conductRaffleDraw = async () => {

  { key: 'status', label: 'Status' },  if (!confirm('Are you sure you want to conduct the raffle draw? This action cannot be undone.')) {

  { key: 'created_at', label: 'Date' }    return

])  }



// Methods  drawLoading.value = true

const adminLogin = async () => {  error.value = ''

  if (!adminPassword.value) {

    loginError.value = 'Please enter admin password'  try {

    return    const response = await $fetch('/api/admin/draw', {

  }      method: 'POST'

    })

  loginLoading.value = true

  loginError.value = ''    if (response.success) {

      winner.value = response.winner

  try {      successMessage.value = 'Raffle draw completed successfully!'

    const response = await $fetch('/api/admin/login', {      await loadAdminData() // Refresh data

      method: 'POST',    } else {

      body: { password: adminPassword.value }      error.value = response.message || 'Failed to conduct draw'

    })    }

  } catch (err) {

    if (response.success) {    error.value = 'Draw failed'

      isAuthenticated.value = true  } finally {

      adminPassword.value = ''    drawLoading.value = false

      await loadDashboardData()  }

    } else {}

      loginError.value = response.error || 'Invalid password'

    }const exportTickets = async () => {

  } catch (error) {  try {

    console.error('Admin login error:', error)    const response = await $fetch('/api/admin/export', {

    loginError.value = 'Login failed. Please try again.'      method: 'GET'

  } finally {    })

    loginLoading.value = false

  }    if (response.success) {

}      // Create and download CSV

      const csvContent = response.csvData

const loadDashboardData = async () => {      const blob = new Blob([csvContent], { type: 'text/csv' })

  loading.value = true      const url = window.URL.createObjectURL(blob)

  loadingTitle.value = 'Loading Dashboard'      const link = document.createElement('a')

  loadingMessage.value = 'Fetching latest data...'      link.href = url

      link.download = `autohub-tickets-${new Date().toISOString().split('T')[0]}.csv`

  try {      document.body.appendChild(link)

    const data = await $fetch('/api/admin/dashboard')      link.click()

    if (data.success) {      document.body.removeChild(link)

      stats.value = {      window.URL.revokeObjectURL(url)

        totalTickets: data.stats.totalTickets || 0,      

        totalRevenue: data.stats.totalRevenue || 0,      successMessage.value = 'Tickets exported successfully!'

        activeUsers: data.stats.activeUsers || 0,    }

        totalWinners: data.stats.totalWinners || 0  } catch (err) {

      }    error.value = 'Export failed'

      tickets.value = data.tickets || []  }

      winner.value = data.winner || null}

    }

  } catch (error) {const logout = () => {

    console.error('Error loading dashboard:', error)  isAuthenticated.value = false

    loginError.value = 'Failed to load dashboard data'  adminPassword.value = ''

  } finally {  if (process.client) {

    loading.value = false    sessionStorage.removeItem('adminAuth')

  }  }

}}



const conductDraw = async () => {const formatDate = (dateString) => {

  drawLoading.value = true  if (!dateString) return ''

  loadingTitle.value = 'Conducting Draw'  return new Date(dateString).toLocaleDateString('en-US', {

  loadingMessage.value = 'Selecting winner...'    year: 'numeric',

  loading.value = true    month: 'short',

    day: 'numeric',

  try {    hour: '2-digit',

    const response = await $fetch('/api/admin/draw', {    minute: '2-digit'

      method: 'POST'  })

    })}



    if (response.success) {// SEO

      winner.value = response.winneruseHead({

      successTitle.value = 'Draw Completed!'  title: 'Admin Panel - AutoHub Raffle',

      successMessage.value = `Winner selected: ${response.winner.user_email} (${response.winner.ticket_number})`  meta: [

      showSuccessModal.value = true    { name: 'description', content: 'AutoHub admin panel for managing users, tickets, and raffle draws.' },

      await loadDashboardData()    { name: 'robots', content: 'noindex, nofollow' }

    } else {  ]

      loginError.value = response.error || 'Unable to conduct draw'})

    }</script>
  } catch (error) {
    console.error('Draw error:', error)
    loginError.value = 'An error occurred while conducting the draw'
  } finally {
    drawLoading.value = false
    loading.value = false
  }
}

const exportTickets = async () => {
  loading.value = true
  loadingTitle.value = 'Exporting Data'
  loadingMessage.value = 'Generating CSV file...'

  try {
    const response = await $fetch('/api/admin/export')
    
    if (response.success) {
      // Create and download CSV
      const blob = new Blob([response.csv], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `tickets_${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
      
      successTitle.value = 'Export Complete'
      successMessage.value = 'Tickets data downloaded successfully'
      showSuccessModal.value = true
    } else {
      loginError.value = response.error || 'Unable to export data'
    }
  } catch (error) {
    console.error('Export error:', error)
    loginError.value = 'An error occurred while exporting data'
  } finally {
    loading.value = false
  }
}

const logout = () => {
  isAuthenticated.value = false
  adminPassword.value = ''
  loginError.value = ''
  stats.value = { totalTickets: 0, totalRevenue: 0, activeUsers: 0, totalWinners: 0 }
  tickets.value = []
  winner.value = null
}

const viewTicket = (ticket) => {
  successTitle.value = 'Ticket Details'
  successMessage.value = `Ticket: ${ticket.ticket_number} | Email: ${ticket.user_email} | Amount: ${formatCurrency(ticket.amount)}`
  showSuccessModal.value = true
}

const refundTicket = (ticket) => {
  // Implement refund logic
  loginError.value = 'Refund functionality coming soon'
}

// Utility functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(amount)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusClass = (status) => {
  const classes = {
    'paid': 'bg-green-100 text-green-800',
    'pending': 'bg-yellow-100 text-yellow-800',
    'failed': 'bg-red-100 text-red-800',
    'refunded': 'bg-gray-100 text-gray-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

// SEO
useHead({
  title: 'Admin Panel - AutoHub Raffle',
  meta: [
    { name: 'description', content: 'Admin dashboard for managing the AutoHub raffle system' }
  ]
})
</script>