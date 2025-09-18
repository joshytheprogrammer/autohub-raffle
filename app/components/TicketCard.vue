<template>
  <div class="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-purple-50 to-pink-50">
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
</template>

<script setup>
const props = defineProps({
  ticket: {
    type: Object,
    required: true
  }
})

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>