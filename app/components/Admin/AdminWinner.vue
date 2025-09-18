<template>
  <div v-if="winner" class="bg-green-50 border border-green-200 p-6 rounded-lg shadow mb-8">
    <h3 class="text-lg font-bold text-green-900 mb-4 flex items-center">
      <span class="text-2xl mr-2">🎉</span> 
      We have a Winner! 
      <span class="text-2xl ml-2">🎉</span>
    </h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-white p-4 rounded-lg shadow-sm">
        <h4 class="font-medium text-green-800">Winning Ticket</h4>
        <p class="text-2xl font-bold text-green-900">{{ winner.ticket_number }}</p>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow-sm">
        <h4 class="font-medium text-green-800">Winner Details</h4>
        <p class="text-lg text-green-900">{{ winner.user_name }}</p>
        <p class="text-sm text-green-700">{{ winner.user_email }}</p>
        <p class="text-sm text-green-700">{{ winner.user_phone || 'No phone provided' }}</p>
      </div>
    </div>
    
    <p class="text-sm text-green-600 mt-4 italic">
      Draw conducted on {{ formatDate(winner.draw_date) }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  winner: {
    type: Object,
    default: null
  }
})

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
</script>