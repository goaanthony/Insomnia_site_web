<template>
  <section id="hero" class="section-fullscreen relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-navy-950">
    <!-- Gradient Overlay Background -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-navy-800/30 via-navy-950 to-navy-950 z-0"></div>
    
    <!-- Parallax Layer 0: Far Starfield -->
    <div ref="layer0Ref" class="absolute inset-0 z-0 opacity-40" style="background-image: radial-gradient(circle, #fff 1px, transparent 1px); background-size: 50px 50px;"></div>
    
    <!-- Parallax Layer 1: Mist/Fog -->
    <div ref="layer1Ref" class="absolute inset-0 z-10 opacity-30 bg-gradient-to-t from-navy-900 via-transparent to-transparent"></div>
    
    <!-- Particles -->
    <ParticlesBackground variant="stars" class="z-10" />

    <!-- Parallax Layer 2: Main Content -->
    <div ref="layer2Ref" class="container relative z-20 mx-auto px-4 flex flex-col md:flex-row items-center justify-between mt-20">
      
      <!-- Text Content -->
      <div class="flex flex-col items-center md:items-start text-center md:text-left md:w-1/2 lg:w-3/5 space-y-6">
        <img src="@/assets/logo.png" alt="Insomnia" class="w-32 md:w-48 animate-glow-pulse mb-2 drop-shadow-xl" />
        
        <div>
          <h1 class="font-pixel text-4xl md:text-6xl glow-green-text tracking-wide mb-4">
            INSOMNIA
          </h1>
          <p class="font-body text-lg md:text-xl text-steel-300">
            Le 1er PvP Faction Modé basé sur les <strong class="text-white">Civilisations</strong>.
            <br/><span class="text-steel-400 text-base italic mt-2 block">Ouvert depuis 2017</span>
          </p>
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <a href="#rejoindre" class="btn-primary text-sm md:text-base px-8 py-4">
            REJOINDRE LE SERVEUR
          </a>
          
          <button 
            @click="copyIp" 
            class="flex items-center gap-2 px-6 py-4 glass border border-steel-500 rounded-sm hover:border-neon-green transition-colors group"
          >
            <span class="font-pixel text-xs text-white group-hover:text-neon-green transition-colors">{{ copied ? 'Copié !' : 'play.insomnia.mc' }}</span>
            <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-steel-400 group-hover:text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 3D Skin Viewer (Desktop only) -->
      <div class="hidden md:flex justify-center items-center md:w-1/2 lg:w-2/5 mt-10 md:mt-0 relative">
        <div class="absolute inset-0 bg-neon-green/5 blur-[100px] rounded-full"></div>
        <canvas ref="skinCanvasRef" class="relative z-10"></canvas>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ParticlesBackground from './ParticlesBackground.vue'
import { gsap, ScrollTrigger } from '@/composables/useScrollAnimations'
import { prefersReducedMotion } from '@/composables/useScrollAnimations'
import { useCopyToClipboard } from '@/composables/useCopyToClipboard'
import { SkinViewer, IdleAnimation } from 'skinview3d'

const layer0Ref = ref<HTMLElement | null>(null)
const layer1Ref = ref<HTMLElement | null>(null)
const layer2Ref = ref<HTMLElement | null>(null)
const skinCanvasRef = ref<HTMLCanvasElement | null>(null)

let skinViewer: SkinViewer | null = null
let scrollTriggers: ScrollTrigger[] = []

// Fallbacks for composables if they are structurally different
let copy: (text: string) => Promise<void> = async () => {}
let copied = ref(false)

try {
  const clipboard = useCopyToClipboard()
  copy = clipboard.copy
  copied = clipboard.copied
} catch (e) {
  // Simple fallback implementation
  copy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => copied.value = false, 2000)
  }
}

const copyIp = () => {
  copy('play.insomnia.mc')
}

onMounted(() => {
  // Setup Parallax
  let isReducedMotion = false
  try {
    isReducedMotion = prefersReducedMotion()
  } catch (e) {
    isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  if (!isReducedMotion) {
    if (layer0Ref.value) {
      const st = ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        animation: gsap.to(layer0Ref.value, { y: '30%', ease: 'none' })
      })
      scrollTriggers.push(st)
    }

    if (layer1Ref.value) {
      const st = ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        animation: gsap.to(layer1Ref.value, { y: '60%', ease: 'none' })
      })
      scrollTriggers.push(st)
    }

    if (layer2Ref.value) {
      const st = ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        animation: gsap.to(layer2Ref.value, { y: '15%', opacity: 0.5, ease: 'none' })
      })
      scrollTriggers.push(st)
    }
  }

  // Setup Skinview3d
  if (skinCanvasRef.value) {
    skinViewer = new SkinViewer({
      canvas: skinCanvasRef.value,
      width: 250,
      height: 350,
      skin: 'https://mc-heads.net/skin/MHF_Steve', // Default Steve fallback
      zoom: 0.8
    })
    
    // Add idle animation
    skinViewer.animation = new IdleAnimation()
    skinViewer.autoRotate = true
    skinViewer.autoRotateSpeed = 0.5
  }
})

onUnmounted(() => {
  // Clean up GSAP
  scrollTriggers.forEach(st => st.kill())
  
  // Clean up skinviewer
  if (skinViewer) {
    skinViewer.dispose()
  }
})
</script>
