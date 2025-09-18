// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
    
  // CSS Framework
  css: ['~/assets/css/main.css'],
  
  // Modules
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  
  // Runtime config for environment variables
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'default_secret',
    paystackSecretKey: process.env.PAYSTACK_SECRET_KEY || '',
    adminPassword: process.env.ADMIN_PASSWORD || '',
    tursoDbUrl: process.env.TURSO_DATABASE_URL || '',
    tursoAuthToken: process.env.TURSO_AUTH_TOKEN || '',
    public: {
      paystackPublicKey: process.env.PAYSTACK_PUBLIC_KEY || ''
    }
  },
 
  // App configuration
  app: {
    head: {
      title: 'AutoHub - Win a Brand New Car!',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Join AutoHub car raffle for just ₦10,000 per ticket. Win a brand new car with fair and transparent draws!' }
      ],
      script: [
        // Paystack script will be loaded dynamically when needed
      ]
    }
  },
  
})
