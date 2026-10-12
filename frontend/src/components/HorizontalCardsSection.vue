<template>
  <section ref="sectionRef" class="relative h-[260vh] w-full overflow-hidden bg-navy-950">
    <div class="sticky top-0 flex h-screen w-full items-center gap-6 px-6 md:px-10 lg:px-16">
      <div class="relative z-10 w-full max-w-md shrink-0 pt-12 md:pt-0">
        <p class="font-pixel text-[10px] uppercase tracking-[0.35em] text-neon-green">
          scrollytelling
        </p>

        <h2 class="mt-6 max-w-[12ch] font-pixel text-3xl leading-none text-white md:text-5xl">
          Armes, armures & blocs <span class="text-neon-green">uniques</span>
        </h2>

        <p class="mt-6 max-w-sm text-base leading-relaxed text-steel-300">
          Chaque chapitre de l’aventure se dessine au fil du scroll. Des cartes vides pour le moment,
          prêtes à accueillir tes contenus, tes visuels et tes futurs événements.
        </p>
      </div>

      <div class="relative h-full flex-1 overflow-hidden">
        <div ref="trackRef" class="absolute left-0 top-1/2 flex -translate-y-1/2 items-center gap-8 whitespace-nowrap pr-12 md:pr-20">
          <article
            v-for="(card, index) in cards"
            :key="card.id"
            class="group relative flex h-[420px] w-[290px] flex-col justify-between overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-all duration-500 md:w-[330px]"
            :style="{ background: card.bg }"
          >
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(61,255,154,0.14),_transparent_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

            <div class="relative z-10 flex items-center justify-between">
              <span class="font-pixel text-[10px] uppercase tracking-[0.3em] text-white/70">
                0{{ index + 1 }}
              </span>
              <span class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/20 text-xs text-white/80">
                →
              </span>
            </div>

            <div class="relative z-10">
              <div class="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-neon-green/90">
                {{ card.tag }}
              </div>
              <h3 class="font-pixel text-xl leading-snug text-white md:text-2xl">
                {{ card.title }}
              </h3>
            </div>

            <div class="relative z-10 space-y-3">
              <div class="h-32 rounded-2xl border border-dashed border-white/15 bg-black/10"></div>
              <div class="h-2 w-2/3 rounded-full bg-white/20"></div>
              <div class="h-2 w-1/2 rounded-full bg-white/10"></div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap, ScrollTrigger, prefersReducedMotion, getLenisInstance } from '@/composables/useScrollAnimations'

const sectionRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)

const cards = [
  {
    id: 1,
    tag: 'armes',
    title: 'Armes Divines',
    bg: 'linear-gradient(135deg, rgba(18, 22, 34, 0.92), rgba(17, 25, 35, 0.86))',
  },
  {
    id: 2,
    tag: 'armures',
    title: 'Équipements',
    bg: 'linear-gradient(135deg, rgba(22, 16, 29, 0.92), rgba(17, 28, 34, 0.88))',
  },
  {
    id: 3,
    tag: 'blocs',
    title: 'Architecture',
    bg: 'linear-gradient(135deg, rgba(10, 20, 18, 0.92), rgba(21, 25, 35, 0.88))',
  },
  {
    id: 4,
    tag: 'crafts',
    title: 'Nouvelles recettes',
    bg: 'linear-gradient(135deg, rgba(16, 18, 24, 0.92), rgba(26, 18, 23, 0.88))',
  },
]

let horizontalTrigger: ScrollTrigger | null = null

const cleanupHorizontalScroll = () => {
  horizontalTrigger?.kill()
  horizontalTrigger = null
}

const setupHorizontalScroll = () => {
  if (!sectionRef.value || !trackRef.value) return
  if (prefersReducedMotion()) return

  cleanupHorizontalScroll()

  const section = sectionRef.value
  const track = trackRef.value
  const maxDistance = Math.max(track.scrollWidth - section.clientWidth * 0.7, 0)

  gsap.set(track, { x: 0 })

  horizontalTrigger = ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom top',
    scrub: 1.2,
    invalidateOnRefresh: true,
  })

  gsap.to(track, {
    x: -maxDistance,
    ease: 'none',
    scrollTrigger: horizontalTrigger,
  })
}

onMounted(() => {
  const lenis = getLenisInstance()
  lenis?.stop()
  requestAnimationFrame(() => setupHorizontalScroll())
})

onUnmounted(() => {
  cleanupHorizontalScroll()
  const lenis = getLenisInstance()
  lenis?.start()
  ScrollTrigger.getAll().forEach((st) => {
    if (st.trigger === sectionRef.value) st.kill()
  })
})
</script>
