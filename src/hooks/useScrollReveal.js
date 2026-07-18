import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

// Reveal an element with a GSAP tween the first time it scrolls into view.
// Detection uses IntersectionObserver (not ScrollTrigger) so it works inside
// the app's custom/nested/snap scroll containers with no scroller config —
// the same mechanism Framer Motion's `whileInView` used under the hood.
export function useScrollReveal({ y = 24, duration = 0.7, ease = 'power3.out', amount = 0.3 } = {}) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      let io

      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(el, { opacity: 0, y })
        io = new IntersectionObserver(
          (entries, obs) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                gsap.to(el, { opacity: 1, y: 0, duration, ease })
                obs.disconnect()
              }
            }
          },
          { threshold: amount },
        )
        io.observe(el)
      })
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(el, { opacity: 1, y: 0 })
      })

      return () => {
        io?.disconnect()
        mm.revert()
      }
    },
    { scope: ref },
  )

  return ref
}
