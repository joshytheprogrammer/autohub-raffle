<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
    <!-- Navigation -->
    <nav class="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-white">AutoHub</h1>
          </div>
          <div class="flex items-center space-x-4">
            <NuxtLink to="/login" class="text-white hover:text-gray-200 transition-colors">Login</NuxtLink>
            <NuxtLink to="/register" class="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">Sign Up</NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div class="sm:text-center lg:text-left">
              <h1 class="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span class="block">Win a</span>
                <span class="block text-yellow-300">Brand New Car!</span>
              </h1>
              <p class="mt-3 text-base text-gray-200 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Join our exciting car raffle! For just ₦10,000 per ticket, you could drive away with a brand new car. 
                Every ticket has an equal chance to win!
              </p>
              <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div class="rounded-md shadow">
                  <NuxtLink to="/register" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-colors">
                    Get Your Ticket Now
                  </NuxtLink>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-3">
                  <button @click="scrollToDetails" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600/50 hover:bg-purple-600/70 md:py-4 md:text-lg md:px-10 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div class="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
          <div class="text-white text-center">
            <div class="text-8xl mb-4">🚗</div>
            <p class="text-xl font-semibold">Your Dream Car Awaits!</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div ref="detailsSection" class="py-12 bg-white/10 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-yellow-300 font-semibold tracking-wide uppercase">How It Works</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Simple. Fair. Transparent.
          </p>
        </div>

        <div class="mt-10">
          <div class="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            <div class="relative text-center">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-yellow-300 text-purple-600 mx-auto text-xl font-bold">
                1
              </div>
              <h3 class="mt-5 text-lg leading-6 font-medium text-white">Register & Login</h3>
              <p class="mt-2 text-base text-gray-200">
                Create your account with your basic information. It's quick and secure.
              </p>
            </div>

            <div class="relative text-center">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-yellow-300 text-purple-600 mx-auto text-xl font-bold">
                2
              </div>
              <h3 class="mt-5 text-lg leading-6 font-medium text-white">Buy Your Ticket</h3>
              <p class="mt-2 text-base text-gray-200">
                Purchase your raffle ticket for ₦10,000. Pay securely with Paystack.
              </p>
            </div>

            <div class="relative text-center">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-yellow-300 text-purple-600 mx-auto text-xl font-bold">
                3
              </div>
              <h3 class="mt-5 text-lg leading-6 font-medium text-white">Win the Car!</h3>
              <p class="mt-2 text-base text-gray-200">
                Wait for the draw and you could be our lucky winner!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="bg-purple-800/30 backdrop-blur-md">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
            Trusted by Thousands
          </h2>
          <p class="mt-3 text-xl text-gray-200 sm:mt-4">
            Join the excitement with these amazing statistics
          </p>
        </div>
        <dl class="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
          <div class="flex flex-col">
            <dt class="order-2 mt-2 text-lg leading-6 font-medium text-gray-200">Ticket Price</dt>
            <dd class="order-1 text-5xl font-extrabold text-yellow-300">₦10,000</dd>
          </div>
          <div class="flex flex-col mt-10 sm:mt-0">
            <dt class="order-2 mt-2 text-lg leading-6 font-medium text-gray-200">Prize Value</dt>
            <dd class="order-1 text-5xl font-extrabold text-yellow-300">Brand New Car</dd>
          </div>
          <div class="flex flex-col mt-10 sm:mt-0">
            <dt class="order-2 mt-2 text-lg leading-6 font-medium text-gray-200">Draw Method</dt>
            <dd class="order-1 text-5xl font-extrabold text-yellow-300">100% Fair</dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-white/10 backdrop-blur-md">
      <div class="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
          <span class="block">Ready to win?</span>
          <span class="block text-yellow-300">Get your ticket today.</span>
        </h2>
        <p class="mt-4 text-lg leading-6 text-gray-200">
          Don't miss your chance to win a brand new car. Every ticket has an equal opportunity to win!
        </p>
        <NuxtLink to="/register" class="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-gray-50 sm:w-auto transition-colors">
          Register Now
        </NuxtLink>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-black/20">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <p class="text-base text-gray-300">
            &copy; 2025 AutoHub Raffle. All rights reserved.
          </p>
          <p class="text-sm text-gray-400 mt-2">
            Raffle conducted fairly and transparently. Good luck!
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const detailsSection = ref(null)

const scrollToDetails = () => {
  if (detailsSection.value) {
    detailsSection.value.scrollIntoView({ behavior: 'smooth' })
  }
}

// SEO
useHead({
  title: 'AutoHub - Win a Brand New Car!',
  meta: [
    { name: 'description', content: 'Join AutoHub car raffle for just ₦10,000 per ticket. Win a brand new car with fair and transparent draws!' }
  ]
})
</script>