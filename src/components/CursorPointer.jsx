import { useEffect, useRef } from 'react'

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, summary'

// Custom mouse pointer (cloned from the reference site): an accent-colored
// arrow that follows the mouse instantly, swapping to a pointing hand over
// interactive elements. The native cursor is hidden via the .custom-cursor
// class on <html> (fine-pointer desktops only).
export default function CursorPointer() {
  const wrapRef = useRef(null)
  const arrowRef = useRef(null)
  const handRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(min-width: 768px) and (pointer: fine)').matches) return
    const wrap = wrapRef.current
    document.documentElement.classList.add('custom-cursor')

    const onMove = (e) => {
      wrap.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      wrap.style.opacity = '1'
      const interactive = e.target instanceof Element && e.target.closest(INTERACTIVE)
      arrowRef.current.style.opacity = interactive ? '0' : '1'
      handRef.current.style.opacity = interactive ? '1' : '0'
    }
    const onLeave = () => {
      wrap.style.opacity = '0'
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden will-change-transform md:block"
      style={{ transform: 'translate(-100px, -100px)', opacity: 0 }}
    >
      <div ref={arrowRef} className="absolute left-0 top-0 transition-opacity duration-150">
        <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
          <path
            d="M2 2L19 11.5L11.5 13.5L8 21L2 2Z"
            fill="var(--color-accent)"
            stroke="color-mix(in srgb, var(--color-accent) 75%, black)"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div ref={handRef} className="absolute left-0 top-0 transition-opacity duration-150" style={{ opacity: 0 }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="var(--color-accent)" viewBox="0 0 256 256">
          <path d="M224,104v50.93c0,46.2-36.85,84.55-83,85.06A83.71,83.71,0,0,1,80.6,215.4C58.79,192.33,34.15,136,34.15,136a16,16,0,0,1,6.53-22.23c7.66-4,17.1-.84,21.4,6.62l21,36.44a6.09,6.09,0,0,0,6,3.09l.12,0A8.19,8.19,0,0,0,96,151.74V32a16,16,0,0,1,16.77-16c8.61.4,15.23,7.82,15.23,16.43V104a8,8,0,0,0,8.53,8,8.17,8.17,0,0,0,7.47-8.25V88a16,16,0,0,1,16.77-16c8.61.4,15.23,7.82,15.23,16.43V112a8,8,0,0,0,8.53,8,8.17,8.17,0,0,0,7.47-8.25v-7.28c0-8.61,6.62-16,15.23-16.43A16,16,0,0,1,224,104Z" />
        </svg>
      </div>
    </div>
  )
}
