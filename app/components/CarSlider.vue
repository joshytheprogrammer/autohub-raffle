<template>
  <div class="relative w-full">
    <!-- Controls -->
    <div class="absolute inset-0 flex items-center justify-between z-20 px-4">
      <button 
        @click="prevCar" 
        class="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 text-neutral-700 hover:text-green-600 transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        aria-label="Previous car"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        @click="nextCar" 
        class="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 text-neutral-700 hover:text-green-600 transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        aria-label="Next car"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Slider -->
    <div class="overflow-hidden rounded-3xl">
      <div 
        class="flex transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div 
          v-for="(car, index) in cars" 
          :key="index" 
          class="w-full flex-shrink-0"
        >
          <div class="bg-gradient-to-br from-green-100 to-emerald-50 p-8 sm:p-12">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <!-- Car Image -->
              <div class="flex justify-center">
                <img 
                  :src="car.image" 
                  :alt="car.name" 
                  class="max-h-64 md:max-h-80 object-contain transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <!-- Car Details -->
              <div class="text-left">
                <div class="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium mb-3">
                  Current Prize
                </div>
                <h3 class="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">{{ car.name }}</h3>
                <div class="flex items-center mb-4">
                  <span class="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-lg font-semibold">
                    Worth ₦{{ car.price.toLocaleString() }}
                  </span>
                </div>
                <p class="text-neutral-600 mb-4">{{ car.description }}</p>
                
                <!-- Features -->
                <div class="grid grid-cols-2 gap-2 mb-6">
                  <div v-for="(feature, i) in car.features" :key="i" class="flex items-center">
                    <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-sm text-neutral-600">{{ feature }}</span>
                  </div>
                </div>
                
                <!-- Draw Date -->
                <div class="mb-6">
                  <span class="text-sm font-semibold text-neutral-700">Draw Date::</span>
                  <span class="text-sm ml-2 text-neutral-600">{{ car.drawDate }}</span>
                </div>
                
                <NuxtLink 
                  to="/register" 
                  class="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-lg"
                >
                  Get Your Ticket
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Indicators -->
    <div class="flex justify-center mt-4">
      <button 
        v-for="(car, index) in cars" 
        :key="index"
        @click="goToCar(index)"
        class="w-2.5 h-2.5 mx-1 rounded-full transition-colors focus:outline-none"
        :class="index === currentIndex ? 'bg-green-600' : 'bg-neutral-300 hover:bg-neutral-400'"
        :aria-label="`Go to car ${index + 1}`"
      ></button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  cars: {
    type: Array,
    default: () => [
      {
        name: "2025 Toyota Camry SE",
        image: "/images/cars/toyota-camry.png",
        price: 18500000,
        description: "Experience luxury and performance with the all-new Toyota Camry SE. This sleek sedan offers outstanding fuel economy and cutting-edge technology.",
        features: ["Leather Interior", "Touch Screen", "Backup Camera", "Automatic", "Bluetooth", "Climate Control"],
        drawDate: "October 15, 2025"
      },
      {
        name: "2025 Honda Accord Sport",
        image: "/images/cars/honda-accord.png",
        price: 19800000,
        description: "The Honda Accord Sport combines elegance with power. Its sporty design and responsive handling make every drive an exciting experience.",
        features: ["Sport Mode", "Sunroof", "Heated Seats", "Apple CarPlay", "Lane Assist", "Turbo Engine"],
        drawDate: "November 20, 2025"
      },
      {
        name: "2025 Lexus ES 350",
        image: "/images/cars/lexus-es.png",
        price: 36500000,
        description: "Luxury redefined. The Lexus ES 350 delivers premium comfort with state-of-the-art technology and sophisticated styling.",
        features: ["Premium Sound", "Leather Package", "Navigation", "Adaptive Cruise", "Wireless Charging", "Safety System+"],
        drawDate: "December 10, 2025"
      }
    ]
  }
})

const currentIndex = ref(0)

const nextCar = () => {
  if (currentIndex.value < props.cars.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0 // Loop back to first car
  }
}

const prevCar = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = props.cars.length - 1 // Loop to last car
  }
}

const goToCar = (index) => {
  currentIndex.value = index
}

// Auto-advance slide every 5 seconds
let autoSlideInterval = null

onMounted(() => {
  autoSlideInterval = setInterval(() => {
    nextCar()
  }, 5000)
})

onBeforeUnmount(() => {
  if (autoSlideInterval) clearInterval(autoSlideInterval)
})
</script>