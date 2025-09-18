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

// Import auth state utility
import { useAuth } from '~/utils/authState'

// Initialize auth state
const { initAuth } = useAuth()

// Handle client-side authentication
if (process.client) {
  onMounted(() => {
    initAuth()
  })
}
</script>

<style>
/* Import Tailwind CSS */
@import '~/assets/css/main.css';
</style>
