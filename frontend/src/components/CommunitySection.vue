<template>
  <section id="communaute" class="section-fullscreen texture-endstone flex flex-col items-center justify-center py-20 md:py-32">
    <div class="container mx-auto px-6 max-w-5xl">
      <!-- Section Header -->
      <div class="text-center mb-16 space-y-4">
        <h2 class="font-pixel text-2xl md:text-3xl glow-green-text tracking-wider">
          COMMUNAUTÉ
        </h2>
        <p class="font-body text-lg text-steel-400">
          Rejoins des milliers de joueurs passionnés
        </p>
      </div>

      <div class="mb-12 grid gap-4 md:grid-cols-3">
        <div class="glass rounded-2xl border border-white/10 p-5 text-center">
          <p class="font-pixel text-[10px] uppercase tracking-[0.3em] text-neon-green">Événements</p>
          <p class="mt-3 text-sm text-steel-300">Soirées, boss mondiaux et surprises qui donnent vie au serveur.</p>
        </div>
        <div class="glass rounded-2xl border border-white/10 p-5 text-center">
          <p class="font-pixel text-[10px] uppercase tracking-[0.3em] text-neon-green">Guildes</p>
          <p class="mt-3 text-sm text-steel-300">Créez votre identité, formez votre équipe et prenez le contrôle.</p>
        </div>
        <div class="glass rounded-2xl border border-white/10 p-5 text-center">
          <p class="font-pixel text-[10px] uppercase tracking-[0.3em] text-neon-green">Progression</p>
          <p class="mt-3 text-sm text-steel-300">Chaque session compte, chaque avancée laisse une trace dans la communauté.</p>
        </div>
      </div>

      <!-- Stats Row -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-20">
        <!-- Stat 1: Joueurs inscrits -->
        <div class="text-center space-y-2">
          <div
            :ref="(el) => { playersRef.elementRef.value = el as HTMLElement }"
            class="font-pixel text-3xl md:text-5xl text-neon-green glow-green-text"
          >
            {{ playersRef.display.value }}
          </div>
          <div class="font-body text-sm text-steel-400 uppercase tracking-widest">
            Joueurs inscrits
          </div>
        </div>

        <!-- Stat 2: Heures de jeu -->
        <div class="text-center space-y-2">
          <div
            :ref="(el) => { hoursRef.elementRef.value = el as HTMLElement }"
            class="font-pixel text-3xl md:text-5xl text-neon-green glow-green-text"
          >
            {{ hoursRef.display.value }}
          </div>
          <div class="font-body text-sm text-steel-400 uppercase tracking-widest">
            Heures de jeu
          </div>
        </div>

        <!-- Stat 3: Joueurs en ligne -->
        <div class="text-center space-y-2">
          <div
            :ref="(el) => { onlineRef.elementRef.value = el as HTMLElement }"
            class="font-pixel text-3xl md:text-5xl text-neon-green glow-green-text"
          >
            {{ onlineRef.display.value }}
          </div>
          <div class="font-body text-sm text-steel-400 uppercase tracking-widest">
            Joueurs en ligne
          </div>
        </div>
      </div>

      <!-- Discord CTA Card -->
      <div class="glass rounded-2xl p-8 md:p-10 max-w-lg mx-auto text-center space-y-5">
        <!-- Discord Icon -->
        <div class="flex justify-center">
          <svg class="w-12 h-12 text-[#5865F2]" viewBox="0 0 20 19" fill="currentColor">
            <path d="M16.224 3.768a14.5 14.5 0 0 0-3.67-1.153c-.158.286-.343.67-.47.976a13.5 13.5 0 0 0-4.067 0c-.128-.306-.317-.69-.476-.976A14.4 14.4 0 0 0 3.868 3.77C1.546 7.28.916 10.703 1.231 14.077a14.7 14.7 0 0 0 4.5 2.306q.545-.748.965-1.587a9.5 9.5 0 0 1-1.518-.74q.191-.14.372-.293c2.927 1.369 6.107 1.369 8.999 0q.183.152.372.294-.723.437-1.52.74.418.838.963 1.588a14.6 14.6 0 0 0 4.504-2.308c.37-3.911-.63-7.302-2.644-10.309m-9.13 8.234c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.894 0 1.614.82 1.599 1.82.001 1-.705 1.82-1.6 1.82m5.91 0c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.893 0 1.614.82 1.599 1.82 0 1-.706 1.82-1.6 1.82"/>
          </svg>
        </div>

        <h3 class="font-pixel text-xs text-white tracking-wide">
          Rejoins notre Discord
        </h3>
        <p class="font-body text-sm text-steel-400 leading-relaxed">
          Discute avec la communauté, participe aux events et reste informé
          des dernières nouveautés.
        </p>
        <a href="#" class="btn-outline !text-[10px] inline-flex" target="_blank" rel="noopener">
          REJOINDRE DISCORD
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useCountUp } from '@/composables/useCountUp'

const playersRef = useCountUp(1247, 2.5)
const hoursRef = useCountUp(3891, 3, 'h')
const onlineRef = useCountUp(156, 2)
</script>
