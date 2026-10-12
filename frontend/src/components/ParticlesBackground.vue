<template>
  <div :id="containerId" class="absolute inset-0 pointer-events-none z-0"></div>
</template>

<script setup lang="ts">
/**
 * ParticlesBackground — tsParticles wrapper for ambient effects.
 * Two variants:
 *   'stars'  → white/green dots drifting upward (for Hero)
 *   'embers' → warm orange particles floating up (for content sections)
 * Disabled entirely when user prefers reduced motion.
 */
import { onMounted, onUnmounted } from 'vue'
import { tsParticles } from '@tsparticles/engine'
import { loadSlim } from '@tsparticles/slim'
import { prefersReducedMotion } from '@/composables/useScrollAnimations'

const props = withDefaults(defineProps<{
  variant: 'stars' | 'embers'
  id?: string
}>(), {
  id: ''
})

// Generate a unique ID for this particle instance
const containerId = props.id || `particles-${Math.random().toString(36).substring(2, 9)}`

onMounted(async () => {
  if (prefersReducedMotion()) return

  await loadSlim(tsParticles)

  const options = props.variant === 'stars' ? getStarsConfig() : getEmbersConfig()
  await tsParticles.load({ id: containerId, options })
})

onUnmounted(() => {
  const container = tsParticles.dom().find((c: any) => c.id?.description === containerId)
  if (container) {
    container.destroy()
  }
})

function getStarsConfig() {
  return {
    fullScreen: { enable: false },
    particles: {
      number: { value: 40, density: { enable: true, width: 800, height: 800 } },
      color: { value: ['#ffffff', '#3dff9a', '#00ffaa'] },
      shape: { type: 'circle' },
      opacity: {
        value: { min: 0.1, max: 0.5 },
        animation: { enable: true, speed: 0.8, sync: false },
      },
      size: { value: { min: 0.5, max: 2 } },
      move: {
        enable: true,
        speed: 0.3,
        direction: 'top' as const,
        random: true,
        straight: false,
        outModes: { default: 'out' as const },
      },
    },
    detectRetina: true,
  }
}

function getEmbersConfig() {
  return {
    fullScreen: { enable: false },
    particles: {
      number: { value: 25, density: { enable: true, width: 800, height: 800 } },
      color: { value: ['#e8b88a', '#c4956a', '#f0d0a8'] },
      shape: { type: 'circle' },
      opacity: {
        value: { min: 0.2, max: 0.6 },
        animation: { enable: true, speed: 1.5, sync: false },
      },
      size: { value: { min: 1, max: 3 } },
      move: {
        enable: true,
        speed: 0.8,
        direction: 'top' as const,
        random: true,
        straight: false,
        outModes: { default: 'out' as const },
      },
    },
    detectRetina: true,
  }
}
</script>
