<template>
  <header
    :class="[
      'fixed top-0 left-0 w-full z-50 transition-all duration-500',
      isScrolled ? 'glass border-b border-neon-green/20 shadow-lg shadow-neon-green/5 py-3' : 'bg-transparent py-5'
    ]"
  >
    <div class="container mx-auto px-4 md:px-6 flex items-center justify-between">
      <!-- Logo & Title -->
      <a href="#hero" class="flex items-center gap-3 group">
        <img
          src="@/assets/logo-insomnia.svg"
          alt="Insomnia Logo"
          class="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
        />
        <span class="font-pixel text-white text-xs tracking-wider group-hover:text-neon-green transition-colors duration-300">
          INSOMNIA
        </span>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-8">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="nav-link font-body text-steel-400 hover:text-neon-green transition-colors duration-300 uppercase text-sm tracking-wider"
        >
          {{ link.label }}
        </a>
        <a href="#rejoindre" class="btn-primary !py-3 !px-6 !text-[10px]">Rejoindre</a>
      </nav>

      <!-- Mobile Hamburger -->
      <button
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="md:hidden relative flex flex-col justify-center items-center w-10 h-10 focus:outline-none z-50"
        aria-label="Menu"
      >
        <span
          :class="['block w-6 h-0.5 bg-white transition-all duration-300 origin-center', mobileMenuOpen ? 'rotate-45 translate-y-[3px]' : '']"
        ></span>
        <span
          :class="['block w-6 h-0.5 bg-white transition-all duration-300 mt-1.5', mobileMenuOpen ? 'opacity-0 scale-0' : '']"
        ></span>
        <span
          :class="['block w-6 h-0.5 bg-white transition-all duration-300 mt-1.5 origin-center', mobileMenuOpen ? '-rotate-45 -translate-y-[5px]' : '']"
        ></span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 -translate-y-4"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="mobileMenuOpen" class="absolute top-full left-0 w-full glass border-b border-neon-green/20 md:hidden">
        <nav class="flex flex-col items-center gap-6 py-8">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            @click="mobileMenuOpen = false"
            class="font-body text-steel-400 hover:text-neon-green transition-colors uppercase text-sm tracking-wider"
          >
            {{ link.label }}
          </a>
          <a href="#rejoindre" @click="mobileMenuOpen = false" class="btn-primary !py-3 !px-6 !text-[10px] mt-2">
            Rejoindre
          </a>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const navLinks = [
  { href: '#univers', label: 'Univers' },
  { href: '#features', label: 'Features' },
  { href: '#communaute', label: 'Communauté' },
]

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 100
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
