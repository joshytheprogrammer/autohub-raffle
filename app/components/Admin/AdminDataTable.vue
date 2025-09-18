<template>
  <div class="bg-white shadow rounded-lg mb-8">
    <div class="px-4 py-5 sm:p-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">{{ title }}</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th 
                v-for="column in columns" 
                :key="column.key" 
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ column.label }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <template v-if="data.length > 0">
              <tr v-for="(item, index) in data" :key="index">
                <td 
                  v-for="column in columns" 
                  :key="`${index}-${column.key}`" 
                  :class="getCellClasses(column)"
                  class="px-6 py-4 whitespace-nowrap text-sm"
                >
                  <slot :name="`cell-${column.key}`" :value="item[column.key]" :item="item">
                    {{ formatCellValue(item[column.key], column.format) }}
                  </slot>
                </td>
              </tr>
            </template>
            <tr v-else>
              <td :colspan="columns.length" class="px-6 py-4 text-center text-sm text-gray-500">
                No data available
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  columns: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    default: () => []
  }
})

const getCellClasses = (column) => {
  const classes = []
  
  if (column.key === 'ticket_number') {
    classes.push('font-medium text-purple-600')
  } else if (column.key === 'id') {
    classes.push('font-medium text-gray-900')
  } else if (column.key.includes('email')) {
    classes.push('text-gray-900')
  } else if (column.key.includes('name')) {
    classes.push('text-gray-900')
  } else {
    classes.push('text-gray-500')
  }
  
  return classes.join(' ')
}

const formatCellValue = (value, format) => {
  if (!value) return ''
  
  if (format === 'date') {
    return new Date(value).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
  
  if (format === 'datetime') {
    return new Date(value).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  if (format === 'currency') {
    return `₦${Number(value).toLocaleString()}`
  }
  
  return value
}
</script>