import { useRef } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(Draggable, InertiaPlugin, useGSAP)

// Wraps any hero decoration in a draggable, springy sticker (GSAP Draggable).
// Rotation, hover-scale and press-scale are separate transform channels so
// dragging never clobbers them.
export default function DraggableSticker({ children, className, constraintsRef, initialRotate = 0 }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const el = ref.current
      gsap.set(el, { rotation: initialRotate })

      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(el, { opacity: 0, scale: 0.9, duration: 0.5, ease: 'back.out(1.6)' })
      })
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(el, { opacity: 1 })
      })

      const [drag] = Draggable.create(el, {
        bounds: constraintsRef.current,
        edgeResistance: 0.82,
        inertia: true,
        onPress() {
          gsap.to(el, { scale: 1.06, duration: 0.2, ease: 'power2.out' })
        },
        onRelease() {
          gsap.to(el, { scale: 1, duration: 0.35, ease: 'power2.out' })
        },
      })

      const onEnter = () => {
        if (!drag.isPressed) gsap.to(el, { scale: 1.03, duration: 0.2, ease: 'power2.out' })
      }
      const onLeave = () => {
        if (!drag.isPressed) gsap.to(el, { scale: 1, duration: 0.2, ease: 'power2.out' })
      }
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)

      return () => {
        drag.kill()
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      }
    },
    { scope: ref, dependencies: [initialRotate] },
  )

  return (
    <div
      ref={ref}
      className={`hidden md:block absolute z-20 cursor-grab active:cursor-grabbing ${className ?? ''}`}
    >
      {children}
    </div>
  )
}
