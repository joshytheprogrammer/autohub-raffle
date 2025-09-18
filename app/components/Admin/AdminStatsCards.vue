<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
    <div class="bg-white p-6 rounded-lg shadow">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <div class="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
            <svg class="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
        <div class="ml-5 w-full">
          <h3 class="text-sm font-medium text-gray-500">Total Users</h3>
          <p class="text-3xl font-bold text-gray-900">{{ stats.totalUsers }}</p>
        </div>
      </div>
    </div>
    
    <div class="bg-white p-6 rounded-lg shadow">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <div class="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <svg class="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
          </div>
        </div>
        <div class="ml-5 w-full">
          <h3 class="text-sm font-medium text-gray-500">Total Tickets</h3>
          <p class="text-3xl font-bold text-gray-900">{{ stats.totalTickets }}</p>
        </div>
      </div>
    </div>
    
    <div class="bg-white p-6 rounded-lg shadow">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <div class="h-12 w-12 bg-amber-100 rounded-xl flex items-center justify-center">
            <svg class="h-6 w-6 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div class="ml-5 w-full">
          <h3 class="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p class="text-3xl font-bold text-gray-900">₦{{ (stats.totalTickets * 10000).toLocaleString() }}</p>
        </div>
      </div>
    </div>
    
    <div class="bg-white p-6 rounded-lg shadow">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <div class="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <svg class="h-6 w-6 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
          </div>
        </div>
        <div class="ml-5 w-full">
          <h3 class="text-sm font-medium text-gray-500">Total Winners</h3>
          <p class="text-3xl font-bold text-gray-900">{{ stats.totalWinners }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  stats: {
    type: Object,
    required: true,
    default: () => ({
      totalUsers: 0,
      totalTickets: 0,
      totalWinners: 0
    })
  }
})
</script>