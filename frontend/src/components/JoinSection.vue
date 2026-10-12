<template>
  <section
    id="rejoindre"
    class="section-fullscreen flex flex-col items-center justify-center relative overflow-hidden"
  >
    <!-- Background with radial neon glow -->
    <div class="absolute inset-0 bg-gradient-to-b from-navy-900 to-navy-950"></div>
    <div
      class="absolute inset-0 opacity-20"
      style="background: radial-gradient(ellipse at center, rgba(61, 255, 154, 0.15) 0%, transparent 60%)"
    ></div>

    <div class="relative z-10 text-center px-6 space-y-10 max-w-2xl mx-auto">
      <!-- Title -->
      <div class="space-y-2">
        <h2 class="font-pixel text-xl md:text-3xl glow-green-text tracking-wider leading-relaxed">
          PRÊT À REJOINDRE
        </h2>
        <h2 class="font-pixel text-2xl md:text-4xl glow-green-text tracking-wider">
          INSOMNIA ?
        </h2>
      </div>

      <!-- Server IP Box -->
      <div class="space-y-3">
        <button
          @click="copy('play.insomnia.mc')"
          class="animate-float inline-flex items-center gap-3
                 bg-navy-800 border-2 border-neon-green/50 rounded-lg px-8 py-5
                 hover:border-neon-green hover:glow-green-sm
                 transition-all duration-300 group cursor-pointer"
        >
          <span class="font-pixel text-sm md:text-lg text-neon-green tracking-wider">
            {{ copied ? 'IP COPIÉE !' : 'play.insomnia.mc' }}
          </span>
          <!-- Copy icon -->
          <svg
            v-if="!copied"
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-neon-green/60 group-hover:text-neon-green transition-colors"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <!-- Check icon -->
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-neon-green"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </button>

        <p class="font-body text-sm text-steel-400">
          Minecraft <span class="text-steel-300">Bedrock Edition</span>
          <span class="block text-xs mt-1 text-steel-500">Port : 19132</span>
        </p>
      </div>

      <!-- CTA Button -->
      <div>
        <a href="minecraft://?addExternalServer=Insomnia|play.insomnia.mc:19132" class="btn-primary !text-xs text-center">
          AJOUTER LE SERVEUR
          <span class="block text-[9px] opacity-70 mt-1 normal-case tracking-normal">(ouvre Minecraft Bedrock)</span>
        </a>
      </div>

      <!-- Subtle hint -->
      <p class="font-body text-xs text-steel-500">
        Clique sur l'IP pour la copier dans ton presse-papiers
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useCopyToClipboard } from '@/composables/useCopyToClipboard'

const { copied, copy } = useCopyToClipboard()
</script>
