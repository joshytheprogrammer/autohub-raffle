<template>
  <nav class="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">🚗</span>
            </div>
            <span class="text-2xl font-bold text-neutral-900">AutoHub</span>
          </NuxtLink>
        </div>
        <div class="flex items-center space-x-4">
          <template v-if="!showAuth">
            <NuxtLink 
              to="/login" 
              class="text-neutral-600 hover:text-neutral-900 font-medium transition-colors px-3 py-2"
            >
              Login
            </NuxtLink>
            <NuxtLink 
              to="/register" 
              class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-2xl font-medium transition-all hover:shadow-lg"
            >
              Sign Up
            </NuxtLink>
          </template>
          <template v-else>
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span class="text-green-600 font-medium text-sm">{{ userName?.charAt(0)?.toUpperCase() }}</span>
              </div>
              <span class="text-neutral-700 font-medium hidden sm:block">{{ userName }}</span>
              <button 
                @click="logout" 
                class="text-neutral-500 hover:text-red-600 font-medium transition-colors px-3 py-2"
              >
                Logout
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const props = defineProps({
  showAuth: {
    type: Boolean,
    default: false
  },
  userName: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['logout'])

const logout = () => {
  emit('logout')
}
</script>