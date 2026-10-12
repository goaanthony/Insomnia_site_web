<template>
  <section id="univers" ref="sectionRef" class="section-fullscreen texture-obsidian">
    <!--
      SCROLLYTELLING: This section is pinned for ~300vh.
      A GSAP timeline progresses as the user scrolls, revealing
      3 story chapters one after another.
    -->
    <div ref="pinContainerRef" class="relative w-full h-screen overflow-hidden">

      <!-- Section Title (always visible at top) -->
      <div class="absolute top-8 left-0 w-full text-center z-10 pt-8">
        <h2 class="font-pixel text-2xl md:text-4xl glow-green-text tracking-wider">
          LES CIVILISATIONS
        </h2>
      </div>

      <!-- Progress indicator (left edge) -->
      <div class="absolute left-0 top-0 w-1 h-full z-20 bg-navy-700/30">
        <div
          ref="progressBarRef"
          class="w-full bg-neon-green origin-top"
          style="height: 100%; transform: scaleY(0)"
        ></div>
      </div>

      <!-- Chapter 1: Les Grecs -->
      <div
        ref="chapter1Ref"
        class="absolute inset-0 flex items-center justify-center px-6 md:px-16"
      >
        <div class="flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-6xl mx-auto w-full pt-20">
          <div class="md:w-1/2 space-y-4">
            <h3 class="font-pixel text-sm md:text-base text-bronze tracking-wide">
              Les Grecs : Sagesse et Puissance
            </h3>
            <p class="font-body text-base md:text-lg text-steel-300 leading-relaxed">
              Incarnez les puissants hoplites et philosophes d'Hellas. Maîtrisez des armes forgées dans les cieux de l'Olympe et protégez vos cités-états avec une architecture de marbre à couper le souffle.
            </p>
          </div>
          <div class="md:w-1/2">
            <GalleryPlaceholder alt="La civilisation Grecque" />
          </div>
        </div>
      </div>

      <!-- Chapter 2: Les Égyptiens -->
      <div
        ref="chapter2Ref"
        class="absolute inset-0 flex items-center justify-center px-6 md:px-16 opacity-0"
      >
        <div class="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16 max-w-6xl mx-auto w-full pt-20">
          <div class="md:w-1/2 space-y-4">
            <h3 class="font-pixel text-sm md:text-base text-bronze tracking-wide">
              Les Égyptiens : Mystères du Désert
            </h3>
            <p class="font-body text-base md:text-lg text-steel-300 leading-relaxed">
              Héritiers des pharaons, dominez les sables dorés. Utilisez la magie des Dieux anciens, bâtissez d'imposantes pyramides et équipez-vous d'armures scintillantes forgées pour l'éternité.
            </p>
          </div>
          <div class="md:w-1/2">
            <GalleryPlaceholder alt="La civilisation Égyptienne" />
          </div>
        </div>
      </div>

      <!-- Chapter 3: Les Romains -->
      <div
        ref="chapter3Ref"
        class="absolute inset-0 flex items-center justify-center px-6 md:px-16 opacity-0"
      >
        <div class="flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-6xl mx-auto w-full pt-20">
          <div class="md:w-1/2 space-y-4">
            <h3 class="font-pixel text-sm md:text-base text-bronze tracking-wide">
              Les Romains : Gloire et Conquête
            </h3>
            <p class="font-body text-base md:text-lg text-steel-300 leading-relaxed">
              Formez la légion la plus redoutable. Bâtisseurs d'empires, les Romains allient discipline de fer, ingénierie avancée et glaives meurtriers pour écraser leurs ennemis sans pitié.
            </p>
          </div>
          <div class="md:w-1/2">
            <GalleryPlaceholder alt="La civilisation Romaine" />
          </div>
        </div>
      </div>
    </div>

    <!-- Fallback for reduced motion: stacked chapters -->
    <div v-if="reducedMotion" class="py-20 px-6 space-y-20 max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="font-pixel text-2xl md:text-4xl glow-green-text tracking-wider">L'UNIVERS</h2>
      </div>
      <div v-for="(chapter, i) in chapters" :key="i" class="flex flex-col md:flex-row items-center gap-8" :class="i % 2 ? 'md:flex-row-reverse' : ''">
        <div class="md:w-1/2 space-y-4">
          <h3 class="font-pixel text-sm text-bronze tracking-wide">{{ chapter.title }}</h3>
          <p class="font-body text-base text-steel-300 leading-relaxed">{{ chapter.text }}</p>
        </div>
        <div class="md:w-1/2">
          <GalleryPlaceholder :alt="chapter.alt" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import GalleryPlaceholder from './GalleryPlaceholder.vue'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/composables/useScrollAnimations'

const sectionRef = ref<HTMLElement | null>(null)
const pinContainerRef = ref<HTMLElement | null>(null)
const progressBarRef = ref<HTMLElement | null>(null)
const chapter1Ref = ref<HTMLElement | null>(null)
const chapter2Ref = ref<HTMLElement | null>(null)
const chapter3Ref = ref<HTMLElement | null>(null)

const reducedMotion = ref(false)

let mainTrigger: globalThis.ScrollTrigger | null = null

const chapters = [
  {
    title: "Les Grecs : Sagesse et Puissance",
    text: "Incarnez les puissants hoplites et philosophes d'Hellas. Maîtrisez des armes forgées dans les cieux de l'Olympe et protégez vos cités-états avec une architecture de marbre à couper le souffle.",
    alt: "La civilisation Grecque",
  },
  {
    title: "Les Égyptiens : Mystères du Désert",
    text: "Héritiers des pharaons, dominez les sables dorés. Utilisez la magie des Dieux anciens, bâtissez d'imposantes pyramides et équipez-vous d'armures scintillantes forgées pour l'éternité.",
    alt: "La civilisation Égyptienne",
  },
  {
    title: "Les Romains : Gloire et Conquête",
    text: "Formez la légion la plus redoutable. Bâtisseurs d'empires, les Romains allient discipline de fer, ingénierie avancée et glaives meurtriers pour écraser leurs ennemis sans pitié.",
    alt: "La civilisation Romaine",
  },
]

onMounted(() => {
  reducedMotion.value = prefersReducedMotion()
  if (reducedMotion.value) return
  if (!sectionRef.value || !pinContainerRef.value) return

  const tl = gsap.timeline()

  tl.to(chapter1Ref.value, { opacity: 1, duration: 0.5, ease: 'power2.out' })
    .fromTo(
      chapter1Ref.value!.querySelector('.md\\:w-1\\/2:first-child'),
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      '<'
    )
    .fromTo(
      chapter1Ref.value!.querySelector('.md\\:w-1\\/2:last-child'),
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      '<0.1'
    )
    .to({}, { duration: 0.5 })
    .to(chapter1Ref.value, { opacity: 0, duration: 0.3, ease: 'power2.in' })

  tl.to(chapter2Ref.value, { opacity: 1, duration: 0.5, ease: 'power2.out' })
    .fromTo(
      chapter2Ref.value!.querySelector('.md\\:w-1\\/2:first-child'),
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      '<'
    )
    .fromTo(
      chapter2Ref.value!.querySelector('.md\\:w-1\\/2:last-child'),
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      '<0.1'
    )
    .to({}, { duration: 0.5 })
    .to(chapter2Ref.value, { opacity: 0, duration: 0.3, ease: 'power2.in' })

  tl.to(chapter3Ref.value, { opacity: 1, duration: 0.5, ease: 'power2.out' })
    .fromTo(
      chapter3Ref.value!.querySelector('.md\\:w-1\\/2:first-child'),
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      '<'
    )
    .fromTo(
      chapter3Ref.value!.querySelector('.md\\:w-1\\/2:last-child'),
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      '<0.1'
    )
    .to({}, { duration: 0.5 })

  tl.to(
    progressBarRef.value,
    { scaleY: 1, ease: 'none', duration: tl.duration() },
    0
  )

  mainTrigger = ScrollTrigger.create({
    trigger: sectionRef.value,
    pin: pinContainerRef.value,
    start: 'top top',
    end: '+=300%',
    scrub: 1,
    animation: tl,
    anticipatePin: 1,
  })
})

onUnmounted(() => {
  mainTrigger?.kill()
})
</script>
