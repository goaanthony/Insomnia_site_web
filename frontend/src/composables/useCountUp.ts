import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useCountUp(target: number, duration = 2, suffix = '') {
  const count: Ref<number> = ref(0)
  const display: Ref<string> = ref('0' + suffix)
  const elementRef: Ref<HTMLElement | null> = ref(null)
  let trigger: ScrollTrigger | null = null

  onMounted(() => {
    if (!elementRef.value) return

    const obj = { val: 0 }
    trigger = ScrollTrigger.create({
      trigger: elementRef.value,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            count.value = Math.round(obj.val)
            display.value = count.value.toLocaleString('fr-FR') + suffix
          },
        })
      },
    })
  })

  onUnmounted(() => {
    trigger?.kill()
  })

  return { count, display, elementRef }
}
