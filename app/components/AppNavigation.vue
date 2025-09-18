<template>
  <nav class="bg-white/10 backdrop-blur-md border-b border-white/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <NuxtLink to="/" class="text-2xl font-bold text-white">AutoHub</NuxtLink>
        </div>
        <div class="flex items-center space-x-4">
          <template v-if="!showAuth">
            <NuxtLink to="/login" class="text-white hover:text-gray-200 transition-colors">Login</NuxtLink>
            <NuxtLink to="/register" class="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">Sign Up</NuxtLink>
          </template>
          <template v-else>
            <span class="text-gray-200">{{ userName }}</span>
            <button @click="logout" class="text-red-300 hover:text-red-100 font-medium">
              Logout
            </button>
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