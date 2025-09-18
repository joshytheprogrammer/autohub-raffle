<template>
  <nav class="bg-green-600 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <h1 class="text-2xl font-bold text-white">AutoHub Admin</h1>
        </div>
        <div class="flex items-center space-x-4">
          <span class="text-red-100">Admin Panel</span>
          <button 
            @click="handleLogout" 
            class="text-white hover:text-red-200 font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const emit = defineEmits(['logout'])

const handleLogout = () => {
  emit('logout')
}
</script>