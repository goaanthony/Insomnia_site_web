import { onMounted, onUnmounted, ref } from 'vue'
import type { Ref } from 'vue'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let globalLenisInstance: Lenis | null = null

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimations() {
  const lenis: Ref<Lenis | null> = ref(null)

  onMounted(() => {
    // Skip smooth scroll if user prefers reduced motion
    if (prefersReducedMotion()) return

    const instance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    globalLenisInstance = instance
    lenis.value = instance

    // Bridge: every Lenis scroll event updates ScrollTrigger positions
    instance.on('scroll', ScrollTrigger.update)

    // Drive Lenis from GSAP's ticker for frame-perfect sync
    gsap.ticker.add((time: number) => {
      instance.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)
  })

  onUnmounted(() => {
    lenis.value?.destroy()
    lenis.value = null
    if (globalLenisInstance === lenis.value) {
      globalLenisInstance = null
    }
    // Clean up all ScrollTrigger instances
    ScrollTrigger.getAll().forEach((st) => st.kill())
  })

  return { lenis }
}

export function getLenisInstance(): Lenis | null {
  return globalLenisInstance
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

interface RevealOptions {
  y?: number
  duration?: number
  stagger?: number
  start?: string
  children?: boolean
  repeat?: boolean
}

export function useRevealOnScroll(
  target: Ref<HTMLElement | null>,
  options: RevealOptions = {}
) {
  const {
    y = 24,
    duration = 0.9,
    stagger = 0.08,
    start = 'top 85%',
    children = false,
    repeat = false,
  } = options

  let trigger: ScrollTrigger | null = null

  onMounted(() => {
    if (!target.value || prefersReducedMotion()) return

    const els = children ? Array.from(target.value.children) : target.value
    gsap.set(els, { opacity: 0, y })

    const anim = gsap.to(els, {
      opacity: 1,
      y: 0,
      duration,
      stagger: children ? stagger : 0,
      ease: 'power3.out',
      paused: true,
    })

    trigger = ScrollTrigger.create({
      trigger: target.value,
      start,
      onEnter: () => anim.play(),
      onLeaveBack: () => {
        if (repeat) anim.pause(0)
      },
    })
  })

  onUnmounted(() => {
    trigger?.kill()
  })
}

// ---------------------------------------------------------------------------
// Parallax — moves an element at a fraction/multiple of scroll speed.
// speed < 1 moves slower than scroll (background feel), speed > 1 moves faster.
// Kept subtle by default (0.15) so it reads as premium polish, not gimmick.
// ---------------------------------------------------------------------------

interface ParallaxOptions {
  /** Relative speed. 0.15 = subtle drift, 1 = matches scroll, negative = opposite direction. */
  speed?: number
  /** Optional custom scroller/container; defaults to the whole page. */
  scroller?: HTMLElement | Window
}

export function useParallax(
  target: Ref<HTMLElement | null>,
  options: ParallaxOptions = {}
) {
  const { speed = 0.15, scroller } = options
  let trigger: ScrollTrigger | null = null

  onMounted(() => {
    if (!target.value || prefersReducedMotion()) return

    const anim = gsap.fromTo(
      target.value,
      { y: 0 },
      {
        y: () => target.value!.offsetHeight * speed,
        ease: 'none',
        force3D: true,
      }
    )

    trigger = ScrollTrigger.create({
      trigger: target.value,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      scroller,
      animation: anim,
    })
  })

  onUnmounted(() => {
    trigger?.kill()
  })
}

// ---------------------------------------------------------------------------
// Subtle pin — pins a section briefly while gently scaling/fading its content,
// for a "cinematic but tasteful" transition rather than a hard full-screen pin.
// ---------------------------------------------------------------------------

interface PinOptions {
  /** How much extra scroll distance to pin for, e.g. '+=60%'. */
  end?: string
  /** Scale applied to the pinned content over the course of the pin. */
  scaleTo?: number
  /** Opacity applied to the pinned content near the end of the pin. */
  fadeTo?: number
  pinSpacing?: boolean
}

export function usePinSection(
  target: Ref<HTMLElement | null>,
  options: PinOptions = {}
) {
  const { end = '+=50%', scaleTo = 0.96, fadeTo = 0.85, pinSpacing = true } = options
  let trigger: ScrollTrigger | null = null

  onMounted(() => {
    if (!target.value || prefersReducedMotion()) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: target.value,
        start: 'top top',
        end,
        scrub: true,
        pin: true,
        pinSpacing,
      },
    })

    tl.to(target.value, { scale: scaleTo, opacity: fadeTo, ease: 'none' })
    trigger = tl.scrollTrigger ?? null
  })

  onUnmounted(() => {
    trigger?.kill()
  })
}

// ---------------------------------------------------------------------------
// Scroll progress — reactive 0..1 value for a top progress bar or nav indicator.
// ---------------------------------------------------------------------------

export function useScrollProgress() {
  const progress = ref(0)
  let trigger: ScrollTrigger | null = null

  onMounted(() => {
    trigger = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => {
        progress.value = self.progress
      },
    })
  })

  onUnmounted(() => {
    trigger?.kill()
  })

  return { progress }
}

/**
 * Re-exports gsap and ScrollTrigger for convenience.
 * Components can import them from here instead of gsap directly.
 */
export { gsap, ScrollTrigger }