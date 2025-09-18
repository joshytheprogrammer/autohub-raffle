<template>
  <div class="bg-white/10 backdrop-blur-md py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div v-if="error" class="bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded">
        {{ error }}
      </div>

      <slot name="fields"></slot>

      <div>
        <button
          type="submit"
          :disabled="loading"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-purple-600 bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg class="animate-spin h-5 w-5 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
          {{ loading ? loadingText : submitText }}
        </button>
      </div>
    </form>

    <slot name="footer"></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  submitText: {
    type: String,
    required: true
  },
  loadingText: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['submit'])

const handleSubmit = () => {
  emit('submit')
}
</script>