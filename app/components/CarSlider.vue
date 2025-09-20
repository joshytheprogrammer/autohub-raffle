<template>
  <div class="car-showcase bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl overflow-hidden shadow-lg">
    <!-- Image Gallery Section -->
    <div class="relative">
      <!-- Main Image Display -->
      <div class="overflow-hidden bg-white">
        <div 
          class="flex transition-transform duration-700 ease-in-out"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div 
            v-for="(image, index) in carImages" 
            :key="index" 
            class="w-full flex-shrink-0"
          >
            <div class="relative">
              <!-- Image Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              
              <!-- Car Image -->
              <div class="w-full h-[350px] sm:h-[400px] flex justify-center items-center bg-gradient-to-r from-emerald-50 to-green-50 p-6">
                <img 
                  :src="image.url" 
                  :alt="`Angle ${index + 1}`" 
                  class="max-h-full max-w-full object-fill transition-transform duration-500"
                />
              </div>
              
              <!-- View Label Overlay -->
              <div class="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                <span class="text-sm font-medium text-emerald-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  </svg>
                  {{ image.title }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Navigation Arrows -->
        <div class="absolute inset-y-0 left-0 flex items-center">
          <button 
            @click="prevImage" 
            class="bg-white/60 hover:bg-white/90 backdrop-blur-sm rounded-r-xl p-3 text-neutral-700 hover:text-green-600 transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 -ml-2"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center">
          <button 
            @click="nextImage" 
            class="bg-white/60 hover:bg-white/90 backdrop-blur-sm rounded-l-xl p-3 text-neutral-700 hover:text-green-600 transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 -mr-2"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Image Thumbnails -->
      <div class="bg-white border-t border-gray-100 px-4 py-3">
        <div class="flex justify-center space-x-2 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <button 
            v-for="(image, index) in carImages" 
            :key="index"
            @click="goToImage(index)"
            class="relative flex-shrink-0 h-14 w-20 border-2 rounded-lg overflow-hidden focus:outline-none transition-all duration-200"
            :class="index === currentIndex ? 'border-green-500 shadow-md' : 'border-transparent hover:border-gray-300'"
            :aria-label="`View ${image.title}`"
          >
            <img :src="image.url" :alt="image.title" class="h-full w-full object-cover object-center" />
            <div 
              class="absolute inset-0 bg-black transition-opacity" 
              :class="index === currentIndex ? 'opacity-0' : 'opacity-30 hover:opacity-10'"
            ></div>
          </button>
        </div>
        
        <!-- Page indicators for thumbnails if there are many -->
        <div v-if="carImages.length > 8" class="flex justify-center mt-2">
          <span class="text-xs text-neutral-500">{{ currentIndex + 1 }} / {{ carImages.length }}</span>
        </div>
      </div>
    </div>

    <!-- Car Info Section (Static) -->
    <div class="p-6 sm:p-8 bg-white">
      <div class="flex flex-wrap items-start justify-between mb-4">
        <div>
          <div class="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium mb-2">
            Grand Giveaway Prize
          </div>
          <h3 class="text-2xl sm:text-3xl font-bold text-neutral-900">{{ carInfo.name }}</h3>
        </div>
        <div class="mt-2 sm:mt-0">
          <span class="inline-block bg-yellow-50 border border-yellow-200 text-yellow-800 px-3 py-2 rounded-lg font-semibold text-base">
            Worth ₦{{ carInfo.price.toLocaleString() }}
          </span>
        </div>
      </div>
      
      <div class="mb-6 text-left">
        <p class="text-neutral-600">{{ carInfo.description }}</p>
      </div>
      
      <!-- Features Grid -->
      <div class="mb-6">
        <h4 class="font-semibold text-neutral-800 mb-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Key Features
        </h4>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4">
          <div v-for="(feature, i) in carInfo.features" :key="i" class="flex items-center">
            <svg class="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span class="text-sm text-neutral-600">{{ feature }}</span>
          </div>
        </div>
      </div>
      
      <!-- Giveaway Info & CTA -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-100">
        <div class="mb-4 sm:mb-0">
          <p class="text-sm text-left font-medium text-neutral-500 mb-1">Giveaway Date</p>
          <p class="flex items-center text-neutral-700 font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ carInfo.drawDate }}
          </p>
        </div>
        
        <NuxtLink 
          to="/register" 
          class="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-lg hover:-translate-y-1"
        >
          Get Your Ticket Now
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  carInfo: {
    type: Object,
    required: true,
    default: () => ({
      name: "2025 Toyota Camry SE",
      price: 32500000,
      description: "Experience luxury and performance with the all-new Toyota Camry SE. This sleek sedan offers outstanding fuel economy and cutting-edge technology.",
      features: ["Leather Interior", "Touch Screen", "Backup Camera", "Automatic", "Bluetooth", "Climate Control"],
      drawDate: "December 24, 2025"
    })
  },
  carImages: {
    type: Array,
    required: true,
    default: () => [
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
  }
})

const currentIndex = ref(0)

const nextImage = () => {
  if (currentIndex.value < props.carImages.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0 // Loop back to first image
  }
}

const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = props.carImages.length - 1 // Loop to last image
  }
}

const goToImage = (index) => {
  // Stop the current animation if any
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
    // Restart after user interaction
    autoSlideInterval = setInterval(() => {
      nextImage()
    }, 5000)
  }
  
  currentIndex.value = index
}

// Auto-advance slide every 5 seconds
let autoSlideInterval = null

onMounted(() => {
  // Auto-advance with a reasonable delay
  autoSlideInterval = setInterval(() => {
    nextImage()
  }, 5000)
  
  // Preload images for smoother transitions
  if (props.carImages && props.carImages.length > 0) {
    props.carImages.forEach(image => {
      if (image.url) {
        const img = new Image()
        img.src = image.url
      }
    })
  }
})

onBeforeUnmount(() => {
  if (autoSlideInterval) clearInterval(autoSlideInterval)
})
</script>

<style scoped>
/* Enhanced transitions */
.transition-transform {
  will-change: transform;
}

/* Custom scrollbar for thumbnails row */
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 9999px;
}

.scrollbar-track-gray-100::-webkit-scrollbar-track {
  background-color: #f3f4f6;
}

.scrollbar-thin::-webkit-scrollbar {
  height: 6px;
}

/* Hide scrollbar for mobile devices while keeping functionality */
@media (max-width: 640px) {
  .scrollbar-thin::-webkit-scrollbar {
    display: none;
  }
  
  .scrollbar-thin {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  
  /* Mobile optimizations */
  .car-showcase {
    border-radius: 1rem;
  }
  
  /* Adjust thumbnail size on smaller screens */
  button[aria-label^="View"] {
    height: 12px;
    width: 16px;
  }
}

/* Add subtle animation for the current image to draw attention */
@keyframes subtle-scale {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

/* Smooth hover transitions */
button, a {
  transition: all 0.2s ease-in-out;
}

/* Better focus styles for accessibility */
button:focus, a:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.5);
}

/* Prevent layout shifts during loading */
img {
  max-width: 100%;
  height: auto;
  transition: opacity 0.3s ease;
}

/* Enhanced thumbnail navigation for many images */
.overflow-x-auto {
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  padding-bottom: 4px; /* To prevent cutoff of focus rings */
  max-width: 100%;
}

/* Animate the current thumbnail */
button[aria-label^="View"].border-green-500 img {
  animation: subtle-scale 3s infinite ease-in-out;
}

/* Ensure thumbnail container doesn't break layout */
.overflow-x-auto > * {
  flex-shrink: 0;
}
</style>