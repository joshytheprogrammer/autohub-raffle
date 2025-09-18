<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
// Global app configuration
useHead({
  titleTemplate: '%s - AutoHub Raffle',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'Join AutoHub car raffle for just ₦10,000 per ticket. Win a brand new car with fair and transparent draws!' }
  ]
})

// Handle client-side navigation
if (process.client) {
  // Initialize auth state on app load
  const checkAuth = () => {
    const token = localStorage.getItem('authToken')
    const user = localStorage.getItem('user')
    
    if (token && user) {
      // Optional: Validate token with server
      console.log('User authenticated:', JSON.parse(user).name)
    }
  }
  
  onMounted(() => {
    checkAuth()
  })
}
</script>

<style>
/* Import Tailwind CSS */
@import '~/assets/css/main.css';
</style>
