<template>
  <div class="bg-white p-6 rounded-lg shadow mb-8">
    <h3 class="text-lg font-medium text-gray-900 mb-4">Admin Actions</h3>
    <div class="flex flex-wrap gap-4">
      <button
        @click="handleExport"
        class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors hover:shadow-md flex items-center space-x-2"
      >
        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span>Export All Tickets (CSV)</span>
      </button>
      
      <button
        @click="handleDraw"
        :disabled="drawLoading || totalTickets === 0"
        class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:shadow-md flex items-center space-x-2"
      >
        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
        <span>{{ drawLoading ? 'Drawing...' : 'Conduct Raffle Draw' }}</span>
      </button>
    </div>
    
    <!-- Error/Success Messages -->
    <div v-if="errorMsg" class="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {{ errorMsg }}
    </div>
    <div v-if="successMsg" class="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
      {{ successMsg }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  totalTickets: {
    type: Number,
    default: 0
  },
  drawLoading: {
    type: Boolean,
    default: false
  },
  errorMsg: {
    type: String,
    default: ''
  },
  successMsg: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['export', 'draw'])

const handleExport = () => {
  emit('export')
}

const handleDraw = () => {
  if (props.totalTickets === 0) return
  
  if (confirm('Are you sure you want to conduct the raffle draw? This action cannot be undone.')) {
    emit('draw')
  }
}
</script>