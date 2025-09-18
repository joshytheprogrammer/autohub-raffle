<template>
  <div class="bg-white rounded-2xl p-6 shadow-sm border border-yellow-200 overflow-hidden relative">
    <!-- Winner Trophy Background (decorative) -->
    <div class="absolute -right-6 -bottom-6 opacity-5">
      <svg class="w-32 h-32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.2 8.9c.5 0 1-.1 1.5-.4.2-.1.3-.3.3-.5s-.1-.4-.3-.5c-1.5-.7-2.3-2.3-1.8-3.9.1-.2 0-.4-.1-.6-.2-.2-.4-.2-.6-.1-1.6.5-3.3-.3-3.9-1.8-.1-.2-.3-.3-.5-.3s-.4.1-.5.3c-.7 1.5-2.3 2.3-3.9 1.8-.2-.1-.4 0-.6.1-.2.2-.2.4-.1.6.5 1.6-.3 3.2-1.8 3.9-.2.1-.3.3-.3.5s.1.4.3.5c.5.2.9.4 1.5.4.7 0 1.3-.2 1.9-.6.5-.3 1-.8 1.3-1.3.5.9 1.1 1.6 1.9 1.6s1.4-.7 1.9-1.6c.3.5.8 1 1.3 1.3.6.4 1.2.6 1.9.6zM17.9 2.3c.7 1.9 2.7 2.9 4.6 2.5-.5 1.9-2.5 3-4.6 2.5-1.4 1.4-2.4 3.5-2.9 5.9-1.1-4.3-2.4-4.3-2.9-4.3-.5 0-1.7 0-2.9 4.3-.5-2.5-1.5-4.5-2.9-5.9-2.2.5-4.2-.6-4.6-2.5C3.5 5.2 5.4 4.2 6.1 2.3c1.7 0 3.2-1.1 3.9-2.7.7 1.6 2.2 2.7 3.9 2.7.8 0 1.6-.3 2.2-.8.7.6 1.1.8 1.8.8zM8.7 8.3c1.3 1.3 2.3 3.2 2.9 5.5.5 2 .9 4.4.9 6.7 0 .6-.5 1.1-1.1 1.1h-4c-.6 0-1.1-.5-1.1-1.1 0-.5.4-1 .9-1.1h3.1c-.1-1.9-.4-3.7-.8-5.3-.5-1.7-1.1-3.1-1.8-4.2-.5-.7-1-1.2-1.5-1.6h2.5zm11 11.2h-4c-.7 0-1.4.3-1.8 1l-1.2 2c-.1.2-.1.3-.1.5 0 .6.5 1.1 1.1 1.1h6c.6 0 1.1-.5 1.1-1.1s-.5-1.1-1.1-1.1h-4.7l.8-1.3c.2-.3.5-.5.9-.5h3c.6 0 1.1-.5 1.1-1.1s-.5-1.1-1.1-1.1z"/>
      </svg>
    </div>

    <h3 class="text-lg font-bold text-neutral-900 mb-4 flex items-center">
      <svg class="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5z" />
      </svg>
      Your Winning Ticket
    </h3>

    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div>
        <p class="text-sm text-neutral-600 mb-1">Ticket Number</p>
        <p class="text-xl font-bold text-yellow-600">{{ ticket.ticket_number }}</p>
      </div>
      <div class="mt-3 md:mt-0">
        <span class="inline-flex items-center bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full">
          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 1a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 1ZM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15ZM10 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
            <path fill-rule="evenodd" d="M7.84 1.804A8 8 0 1 0 17.793 15.2l-6.013-5.233a2.994 2.994 0 0 1 .055-4.457l.085-.082 2.84 2.476a1 1 0 1 0 1.313-1.504l-2.84-2.476a1.994 1.994 0 0 0-2.815.146 1 1 0 0 0-.064 1.332l.085.082 4.42 3.847a4.992 4.992 0 0 0-.148.186A6 6 0 1 1 9.035 3.802L8.977 3.8a1 1 0 0 0-.001-1.996l.058.002.806-.002a8 8 0 0 0-2 0Z" clip-rule="evenodd" />
          </svg>
          WINNER
        </span>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      <div>
        <p class="text-neutral-600">Draw Date</p>
        <p class="font-medium">{{ formatDate(ticket.draw_date) }}</p>
      </div>
      <div>
        <p class="text-neutral-600">Purchase Date</p>
        <p class="font-medium">{{ formatDate(ticket.purchase_date) }}</p>
      </div>
    </div>

    <div class="mt-6 pt-6 border-t border-neutral-200">
      <div class="flex justify-between items-center">
        <p class="text-neutral-600 text-sm">Ticket Value</p>
        <p class="font-bold text-green-600">₦10,000</p>
      </div>

      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  ticket: {
    type: Object,
    required: true
  }
});

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
</script>