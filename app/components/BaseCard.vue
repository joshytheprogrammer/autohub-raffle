<template>
  <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
    <!-- Card Header -->
    <div v-if="title || $slots.header" class="mb-4">
      <slot name="header">
        <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
        <p v-if="subtitle" class="text-sm text-gray-600 mt-1">{{ subtitle }}</p>
      </slot>
    </div>

    <!-- Card Content -->
    <div class="space-y-4">
      <slot />
    </div>

    <!-- Card Footer -->
    <div v-if="$slots.footer" class="mt-6 pt-4 border-t border-gray-100">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  }
})
</script>