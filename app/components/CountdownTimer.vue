<template>
  <div class="countdown-container">
    <div class="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6 shadow-lg">
      <h3 class="text-center text-xl md:text-2xl font-bold text-red-600 mb-3">
        Grand Giveaway Countdown
      </h3>
      
      <div class="flex flex-col items-center">
        <div class="text-center mb-3">
          <p class="text-neutral-700 font-medium">Mark your calendar for the big day!</p>
          <p class="text-lg font-semibold text-neutral-800">December 24, 2025</p>
        </div>
        
        <div class="grid grid-cols-4 gap-3 md:gap-6 w-full max-w-md mx-auto">
          <!-- Days -->
          <div class="flex flex-col items-center">
            <div class="bg-red-600 rounded-xl w-full aspect-square flex items-center justify-center text-white text-2xl md:text-4xl font-bold shadow-md">
              {{ timeLeft.days }}
            </div>
            <span class="text-xs md:text-sm font-medium text-neutral-600 mt-2">DAYS</span>
          </div>
          
          <!-- Hours -->
          <div class="flex flex-col items-center">
            <div class="bg-red-600 rounded-xl w-full aspect-square flex items-center justify-center text-white text-2xl md:text-4xl font-bold shadow-md">
              {{ timeLeft.hours }}
            </div>
            <span class="text-xs md:text-sm font-medium text-neutral-600 mt-2">HOURS</span>
          </div>
          
          <!-- Minutes -->
          <div class="flex flex-col items-center">
            <div class="bg-red-600 rounded-xl w-full aspect-square flex items-center justify-center text-white text-2xl md:text-4xl font-bold shadow-md">
              {{ timeLeft.minutes }}
            </div>
            <span class="text-xs md:text-sm font-medium text-neutral-600 mt-2">MINUTES</span>
          </div>
          
          <!-- Seconds -->
          <div class="flex flex-col items-center">
            <div class="bg-red-600 rounded-xl w-full aspect-square flex items-center justify-center text-white text-2xl md:text-4xl font-bold shadow-md">
              {{ timeLeft.seconds }}
            </div>
            <span class="text-xs md:text-sm font-medium text-neutral-600 mt-2">SECONDS</span>
          </div>
        </div>
        
        <!-- CTA -->
        <div class="mt-6 text-center">
          <p class="text-red-800 font-medium text-sm md:text-base mb-3">
            Don't miss your chance to win! Limited tickets available.
          </p>
          <NuxtLink to="/register" class="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold transition-all hover:shadow-lg hover:-translate-y-1 inline-flex items-center">
            Get Your Ticket Now
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const timeLeft = reactive({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
})

// Target date: December 24, 2025
const targetDate = new Date('December 24, 2025 00:00:00').getTime()

// Update countdown every second
const updateCountdown = () => {
  const now = new Date().getTime()
  const distance = targetDate - now
  
  // Calculate time units
  timeLeft.days = Math.floor(distance / (1000 * 60 * 60 * 24))
  timeLeft.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  timeLeft.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  timeLeft.seconds = Math.floor((distance % (1000 * 60)) / 1000)
  
  // Handle expired countdown
  if (distance < 0) {
    timeLeft.days = 0
    timeLeft.hours = 0
    timeLeft.minutes = 0
    timeLeft.seconds = 0
  }
}

// Ensure time formatting always has 2 digits
const padTime = (time) => {
  return time.toString().padStart(2, '0')
}

// Timer interval
let timer = null

onMounted(() => {
  updateCountdown()
  timer = setInterval(updateCountdown, 1000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.countdown-container {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}
</style>