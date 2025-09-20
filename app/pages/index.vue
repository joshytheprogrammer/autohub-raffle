<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- Navigation -->
    <MainNavigation />

    <!-- Hero Section -->
    <section class="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center">
          <!-- Trust Badge -->
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-6">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            100% Fair & Transparent Grand Giveaway
          </div>
          
          <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-tight">
            Win Your 
            <span class="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">Dream Car</span>
          </h1>
          <p class="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands in Nigeria's most trusted AutoHub Grand Giveaway. For just <span class="font-bold text-neutral-900">₦10,000</span> per ticket, 
            you could drive away with a brand new car worth millions.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <NuxtLink to="/register" class="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all hover:shadow-xl hover:-translate-y-1">
              Buy Ticket Now - ₦10,000
            </NuxtLink>
            <button @click="scrollToDetails" class="border-2 border-neutral-300 hover:border-neutral-400 text-neutral-700 px-8 py-4 rounded-2xl font-semibold text-lg transition-all hover:shadow-lg">
              How It Works
            </button>
          </div>
          
          <!-- Car Slider -->
          <div class="max-w-6xl mx-auto mb-8">
            <CarSlider :car-info="carInfo" :car-images="carImages" />
          </div>
          
          <!-- Countdown Timer -->
          <div class="max-w-3xl mx-auto mb-16">
            <CountdownTimer />
          </div>
        </div>
      </div>
    </section>

    <!-- Trust Signals & Stats -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">Trusted by Thousands</h2>
          <p class="text-xl text-neutral-600">Join Nigeria's most transparent car Grand Giveaway</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="bg-green-100 rounded-2xl p-6 mb-4">
              <div class="text-4xl font-bold text-green-600">₦10K</div>
            </div>
            <h3 class="font-semibold text-neutral-900">Ticket Price</h3>
            <p class="text-neutral-600">Affordable for everyone</p>
          </div>
          <div class="text-center">
            <div class="bg-blue-100 rounded-2xl p-6 mb-4">
              <div class="text-4xl font-bold text-blue-600">100%</div>
            </div>
            <h3 class="font-semibold text-neutral-900">Fair Giveaway</h3>
            <p class="text-neutral-600">Transparent & secure</p>
          </div>
          <div class="text-center">
            <div class="bg-purple-100 rounded-2xl p-6 mb-4">
              <div class="text-4xl font-bold text-purple-600">24/7</div>
            </div>
            <h3 class="font-semibold text-neutral-900">Support</h3>
            <p class="text-neutral-600">Always here to help</p>
          </div>
          <div class="text-center">
            <div class="bg-orange-100 rounded-2xl p-6 mb-4">
              <div class="text-4xl font-bold text-orange-600">New</div>
            </div>
            <h3 class="font-semibold text-neutral-900">Brand New Car</h3>
            <p class="text-neutral-600">Latest models only</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section ref="detailsSection" class="py-20 bg-neutral-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2 class="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">How It Works</h2>
          <p class="text-xl text-neutral-600 max-w-3xl mx-auto">
            Get your ticket in three simple steps and join the excitement
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <div class="text-center">
            <div class="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span class="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 class="text-xl font-bold text-neutral-900 mb-4">Register Account</h3>
              <p class="text-neutral-600 leading-relaxed">
                Create your secure account with basic information. Quick, easy, and completely free to join.
              </p>
            </div>
          </div>

          <div class="text-center">
            <div class="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span class="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 class="text-xl font-bold text-neutral-900 mb-4">Buy Your Ticket</h3>
              <p class="text-neutral-600 leading-relaxed">
                Purchase your raffle ticket for just ₦10,000. Secure payment with Paystack integration.
              </p>
            </div>
          </div>

          <div class="text-center">
            <div class="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span class="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 class="text-xl font-bold text-neutral-900 mb-4">Win the Car!</h3>
              <p class="text-neutral-600 leading-relaxed">
                Wait for the fair, transparent draw. Every ticket has an equal chance to win big!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-br from-green-600 to-emerald-700">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Win Your Dream Car?
        </h2>
        <p class="text-xl text-green-100 mb-8 leading-relaxed">
          Don't miss your chance! Join thousands of Nigerians who trust AutoHub for fair, transparent car raffles.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/register" class="bg-white hover:bg-neutral-100 text-green-600 px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:shadow-2xl hover:-translate-y-1">
            Buy Ticket Now - ₦10,000
          </NuxtLink>
          <NuxtLink to="/login" class="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-2xl font-semibold text-lg transition-all">
            Already a Member?
          </NuxtLink>
        </div>
        
        <!-- Trust Indicators -->
        <div class="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-80">
          <div class="flex items-center space-x-2 text-green-100">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
            </svg>
            <span class="font-medium">Secure Payments</span>
          </div>
          <div class="flex items-center space-x-2 text-green-100">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span class="font-medium">Fair Draws</span>
          </div>
          <div class="flex items-center space-x-2 text-green-100">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
            </svg>
            <span class="font-medium">24/7 Support</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-neutral-900 text-neutral-300">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <p class="text-base mb-2">
            &copy; 2025 AutoHub Raffle. All rights reserved.
          </p>
          <p class="text-sm text-neutral-500">
            Licensed and regulated. Fair draws guaranteed.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import MainNavigation from '~/components/MainNavigation.vue'
import CarSlider from '~/components/CarSlider.vue'
import CountdownTimer from '~/components/CountdownTimer.vue'

const detailsSection = ref(null)

// Car information (static data)
const carInfo = {
  name: "2025 Toyota Camry SE",
  price: 32500000,
  description: "Experience luxury and performance with the all-new Toyota Camry SE. This sleek sedan offers outstanding fuel economy and cutting-edge technology paired with premium comfort.",
  features: ["Leather Interior", "Touch Screen", "Backup Camera", "Automatic", "Bluetooth", "Climate Control", "Sunroof", "Alloy Wheels"],
  drawDate: "December 24, 2025"
}

// Multiple car images (12 different angles)
const carImages = [
      { url: "https://delivery.via.assetscs.toyota.com/adobe/assets/urn:aaid:aem:96f2ef49-9528-4f86-bbaf-95a36881e66a/as/image.png?fmt=png-alpha,rgb,none" },
      { url: "https://delivery.via.assetscs.toyota.com/adobe/assets/urn:aaid:aem:22be9b54-fbd1-4301-bcfc-627ad89e0179/as/image.png?fmt=png-alpha,rgb,none"},
      { url: "https://delivery.via.assetscs.toyota.com/adobe/assets/urn:aaid:aem:19e530e3-47cf-41e3-a6f4-a8b5676bb04c/as/image.png?fmt=png-alpha,rgb,none"},
      { url: "https://delivery.via.assetscs.toyota.com/adobe/assets/urn:aaid:aem:1e63c1e5-dcf4-42b2-8d3b-1dcc91623d8a/as/image.png?fmt=png-alpha,rgb,none"},
      { url: "https://delivery.via.assetscs.toyota.com/adobe/assets/urn:aaid:aem:db667403-77ac-4a58-ab27-e56a3735de8a/as/image.png?fmt=png-alpha,rgb,none"},
      { url: "https://delivery.via.assetscs.toyota.com/adobe/assets/urn:aaid:aem:3810df62-34ad-4d15-993e-e6e2fd65746e/as/image.png?fmt=png-alpha,rgb,none"},
      { url: "https://delivery.via.assetscs.toyota.com/adobe/assets/urn:aaid:aem:4efaa595-5f8c-4d54-8bb4-92e6aa87dd32/as/image.png?fmt=png-alpha,rgb,none"},
      { url: "https://delivery.via.assetscs.toyota.com/adobe/assets/urn:aaid:aem:47e75272-3059-4116-a71a-15dc1d8edf0c/as/image.png?fmt=png-alpha,rgb,none"},
      { url: "https://delivery.via.assetscs.toyota.com/adobe/assets/urn:aaid:aem:1b484548-2e57-47ea-ace7-6943ed18046d/as/image.png?fmt=png-alpha,rgb,none"},
      { url: "https://delivery.via.assetscs.toyota.com/adobe/assets/urn:aaid:aem:31382c9e-101e-4289-bb56-fcbaf4316001/as/image.png?fmt=png-alpha,rgb,none"},
      { url: "https://delivery.via.assetscs.toyota.com/adobe/assets/urn:aaid:aem:57868d67-4b9d-4bff-bd56-adb7e1f2c559/as/image.png?fmt=png-alpha,rgb,none"},
      { url: "https://delivery.via.assetscs.toyota.com/adobe/assets/urn:aaid:aem:f23847ce-f837-48d7-9375-637a0ae2b817/as/image.png?fmt=png-alpha,rgb,none"},
      { url: "https://delivery.via.assetscs.toyota.com/adobe/assets/urn:aaid:aem:d97bc7a9-de00-433d-b266-89f5ff891997/as/image.png?fmt=png-alpha,rgb,none"},
      { url: "https://delivery.via.assetscs.toyota.com/adobe/assets/urn:aaid:aem:4e7e7969-58ef-4986-ab74-bac501265d11/as/image.png?fmt=png-alpha,rgb,none"}
    ]

const scrollToDetails = () => {
  if (detailsSection.value) {
    detailsSection.value.scrollIntoView({ behavior: 'smooth' })
  }
}

// SEO
useHead({
  title: 'AutoHub - Win a Brand New Car!',
  meta: [
    { name: 'description', content: 'Join AutoHub Grand Giveaway for just ₦10,000 per ticket. Win a brand new car with our fair and transparent Grand Giveaway!' }
  ]
})
</script>