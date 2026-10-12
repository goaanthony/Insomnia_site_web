<template>
  <div
    class="relative bg-navy-800 rounded-lg overflow-hidden border border-navy-700/50
           hover:border-neon-green/30 transition-all duration-300 group"
    :style="{ aspectRatio: aspectRatio }"
  >
    <!-- Slot for real images -->
    <slot>
      <!-- Default placeholder content -->
      <div class="absolute inset-0 flex flex-col items-center justify-center gap-3 placeholder-grid">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40" height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-steel-500 group-hover:text-neon-green/50 transition-colors duration-300"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
          <circle cx="9" cy="9" r="2"/>
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
        </svg>
        <span class="font-body text-sm text-steel-500">{{ alt }}</span>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  alt?: string
  aspectRatio?: string
}>(), {
  alt: 'Screenshot à venir',
  aspectRatio: '16/9',
})
</script>

<style scoped>
/* Subtle pixel grid pattern for the placeholder */
.placeholder-grid {
  background-image:
    linear-gradient(rgba(37, 51, 88, 0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba(37, 51, 88, 0.3) 1px, transparent 1px);
  background-size: 16px 16px;
}
</style>
