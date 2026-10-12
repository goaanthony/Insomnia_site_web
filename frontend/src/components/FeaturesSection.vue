<template>
  <section id="features" class="section-fullscreen texture-stone py-20 md:py-32">
    <div class="container mx-auto px-6 max-w-6xl">
      <!-- Section Header -->
      <div class="text-center mb-16 space-y-4">
        <h2 class="font-pixel text-2xl md:text-3xl glow-green-text tracking-wider">
          FONCTIONNALITÉS
        </h2>
        <p class="font-body text-lg text-steel-400">
          Tout ce qui rend Insomnia unique
        </p>
      </div>

      <div class="mb-12 grid gap-4 md:grid-cols-3">
        <div class="glass rounded-2xl border border-white/10 p-5 text-left">
          <p class="font-pixel text-[10px] uppercase tracking-[0.3em] text-neon-green">PvP</p>
          <p class="mt-3 text-sm text-steel-300">Des duels rapides, des rankings et des combats qui changent la donne.</p>
        </div>
        <div class="glass rounded-2xl border border-white/10 p-5 text-left">
          <p class="font-pixel text-[10px] uppercase tracking-[0.3em] text-neon-green">Survie</p>
          <p class="mt-3 text-sm text-steel-300">Un monde exigeant, des ressources rares et des décisions à forte tension.</p>
        </div>
        <div class="glass rounded-2xl border border-white/10 p-5 text-left">
          <p class="font-pixel text-[10px] uppercase tracking-[0.3em] text-neon-green">RPG</p>
          <p class="mt-3 text-sm text-steel-300">Progression, quêtes, boss et aventure immersive jusqu’au bout de la nuit.</p>
        </div>
      </div>

      <!-- Feature Cards Grid -->
      <div ref="gridRef" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(feature, index) in features"
          :key="index"
          ref="cardRefs"
          class="feature-card group relative bg-navy-800/50 border border-navy-700/50 rounded-xl p-6
                 hover:-translate-y-1 hover:border-neon-green/30 transition-all duration-300
                 backdrop-blur-sm"
        >
          <!-- Icon -->
          <div class="mb-4 w-12 h-12 flex items-center justify-center rounded-lg bg-neon-green/10
                      group-hover:bg-neon-green/20 transition-colors duration-300">
            <component
              :is="feature.icon"
              :size="28"
              class="text-neon-green"
            />
          </div>

          <!-- Title -->
          <h3 class="font-pixel text-[10px] text-white mb-3 tracking-wide leading-relaxed">
            {{ feature.title }}
          </h3>

          <!-- Description -->
          <p class="font-body text-sm text-steel-300 leading-relaxed">
            {{ feature.description }}
          </p>

          <!-- Hover glow effect (pseudo-element via CSS) -->
          <div
            class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style="box-shadow: inset 0 0 30px rgba(61, 255, 154, 0.05), 0 0 15px rgba(61, 255, 154, 0.1)"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Sword, Shield, Coins, Moon, Skull, Flag } from 'lucide-vue-next'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/composables/useScrollAnimations'

const cardRefs = ref<HTMLElement[]>([])
let batchTriggers: ScrollTrigger[] = []

const features = [
  {
    icon: Sword,
    title: 'PVP INTENSE',
    description:
      'Combattez dans des arènes compétitives avec un système de classement ELO et des récompenses saisonnières.',
  },
  {
    icon: Shield,
    title: 'SURVIE HARDCORE',
    description:
      'Un monde sans pitié où chaque décision compte. Morts permanentes, ressources rares, tensions constantes.',
  },
  {
    icon: Coins,
    title: 'ÉCONOMIE DYNAMIQUE',
    description:
      'Marché joueur-à-joueur, enchères, shops personnalisés. Devenez le marchand le plus riche du serveur.',
  },
  {
    icon: Moon,
    title: 'EVENTS NOCTURNES',
    description:
      'Chaque nuit apporte des événements uniques : invasions de mobs, chasses au trésor, boss world.',
  },
  {
    icon: Skull,
    title: 'DONJONS & BOSS',
    description:
      'Explorez des donjons procéduraux et affrontez des boss épiques pour obtenir du loot légendaire.',
  },
  {
    icon: Flag,
    title: 'CLANS & TERRITOIRES',
    description:
      'Créez votre clan, revendiquez des territoires et menez des guerres de faction épiques.',
  },
]

onMounted(() => {
  if (prefersReducedMotion()) return
  if (!cardRefs.value.length) return

  gsap.set(cardRefs.value, { opacity: 0, y: 40 })

  ScrollTrigger.batch(cardRefs.value, {
    start: 'top 85%',
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
      })
    },
    once: true,
  })

  batchTriggers = ScrollTrigger.getAll().filter(
    (st) => st.vars.trigger === undefined
  )
})

onUnmounted(() => {
  batchTriggers.forEach((st) => st.kill())
})
</script>
