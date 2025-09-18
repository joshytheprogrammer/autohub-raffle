<template>
  <div v-if="isVisible" class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
      <!-- Success Icon -->
      <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
        <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>

      <!-- Title -->
      <h3 class="text-2xl font-bold text-gray-900 mb-4">{{ title }}</h3>

      <!-- Message -->
      <p class="text-gray-600 mb-6">{{ message }}</p>

      <!-- Ticket Number Display -->
      <div v-if="ticketNumber" class="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
        <p class="text-sm font-medium text-green-800 mb-1">Your Ticket Number</p>
        <p class="text-2xl font-bold text-green-600 font-mono">{{ ticketNumber }}</p>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-3">
        <button
          v-if="showDownload"
          @click="downloadTicket"
          class="flex-1 bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors"
        >
          Download Ticket
        </button>
        <button
          @click="close"
          :class="[
            'flex-1 px-6 py-3 rounded-xl font-medium transition-colors',
            showDownload ? 'bg-gray-100 text-gray-900 hover:bg-gray-200' : 'bg-green-600 text-white hover:bg-green-700'
          ]"
        >
          {{ closeText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Success!'
  },
  message: {
    type: String,
    default: 'Your action was completed successfully.'
  },
  ticketNumber: {
    type: String,
    default: ''
  },
  showDownload: {
    type: Boolean,
    default: false
  },
  closeText: {
    type: String,
    default: 'Close'
  }
})

const emit = defineEmits(['close', 'download'])

const isVisible = ref(props.show)

watch(() => props.show, (newValue) => {
  isVisible.value = newValue
})

const close = () => {
  isVisible.value = false
  emit('close')
}

const downloadTicket = () => {
  emit('download')
}

// Close on escape key
const handleKeydown = (event) => {
  if (event.key === 'Escape' && isVisible.value) {
    close()
  }
}

// Add/remove event listener
watch(isVisible, (newValue) => {
  if (newValue) {
    document.addEventListener('keydown', handleKeydown)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
  }
})
</script>