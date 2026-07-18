import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SideNav from './components/SideNav.jsx'
import BottomDock from './components/BottomDock.jsx'
import CursorPointer from './components/CursorPointer.jsx'
import Hero from './components/Hero.jsx'
import WorkSection from './components/WorkSection.jsx'
import AboutSection from './components/AboutSection.jsx'
import ContactSection from './components/ContactSection.jsx'
import { navItems } from './data/content.js'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function App() {
  const scrollRef = useRef(null)
  const barRef = useRef(null)
  const pagerRef = useRef(null)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const root = scrollRef.current
    if (!root) return
    const sections = root.querySelectorAll('section[data-section]')
    // Center-band detection: a section is "active" while it crosses the middle
    // 10% of the viewport — works regardless of section heights.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.dataset.section)
        }
      },
      { root, rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Page-level scroll FX + the section pager (ported 1:1 from the reference
  // site's scroll engine). One wheel gesture = one view. The work cards are
  // virtual views: while the outer scroller rests on the work section, the
  // pager drives the section's INNER card scroller so the header stays put.
  // Scrollbar dragging stays completely free (no snap) — the current view
  // index is derived from live positions, never stored.
  useGSAP(
    () => {
      const scroller = scrollRef.current
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Thin gradient bar tracking overall scroll progress.
        gsap.fromTo(
          barRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: { scroller, start: 0, end: 'max', scrub: 0.3 },
          },
        )
      })

      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const sectionEl = (id) => scroller.querySelector(`section[data-section="${id}"]`)
        const workSection = sectionEl('work')
        const workScroller = workSection?.querySelector('[data-work-scroll]')
        const cards = () => workScroller?.querySelectorAll('[data-work-card]').length ?? 0
        const slotH = () => workScroller.clientHeight
        // Virtual views: 0 = home, 1..cards = work cards, then about, contact.
        const maxIndex = () => cards() + 2
        const indexOfSection = (id) =>
          id === 'home' ? 0 : id === 'work' ? 1 : id === 'about' ? cards() + 1 : cards() + 2
        const atWork = () => Math.abs(scroller.scrollTop - workSection.offsetTop) < 2

        let animating = false
        const glide = (target, value) => {
          animating = true
          gsap.to(target, {
            scrollTop: value,
            duration: 0.9,
            ease: 'power2.inOut', // easeInOutCubic, same as the reference
            overwrite: true,
            onComplete: () => {
              animating = false
            },
          })
        }

        const goTo = (i) => {
          i = gsap.utils.clamp(0, maxIndex(), i)
          if (i >= 1 && i <= cards()) {
            const cardTop = (i - 1) * slotH()
            if (atWork()) {
              glide(workScroller, cardTop)
            } else {
              // Arriving from another section: pre-position the card
              // instantly, then glide the outer scroller to the section.
              workScroller.scrollTop = cardTop
              glide(scroller, workSection.offsetTop)
            }
          } else {
            const id = i === 0 ? 'home' : i === cards() + 1 ? 'about' : 'contact'
            glide(scroller, sectionEl(id).offsetTop)
          }
        }

        // Current view, derived from live positions (never stored).
        const currentIndex = () => {
          if (atWork()) {
            const c = Math.round(workScroller.scrollTop / slotH())
            return 1 + gsap.utils.clamp(0, cards() - 1, c)
          }
          let best = 0
          let bestDist = Infinity
          for (const id of ['home', 'work', 'about', 'contact']) {
            const dist = Math.abs(sectionEl(id).offsetTop - scroller.scrollTop)
            if (dist < bestDist) {
              bestDist = dist
              best = indexOfSection(id)
            }
          }
          return best
        }

        const step = (dir) => {
          const cur = currentIndex()
          const next = gsap.utils.clamp(0, maxIndex(), cur + dir)
          if (next !== cur) goTo(next)
        }

        // Wheel: one step per *gesture*. A new gesture is a >160ms pause, a
        // direction flip, or a sudden acceleration spike (>1.8× the previous
        // delta) — so trackpad inertia tails never double-fire. Same
        // heuristics as the reference implementation.
        let lastTime = 0
        let lastDir = 0
        let lastMag = 0
        const onWheel = (e) => {
          // Let the case-study modal scroll natively.
          if (e.target instanceof Element && e.target.closest('[role="dialog"]')) return
          e.preventDefault()
          const mag = Math.abs(e.deltaY)
          if (mag < 1) return
          const now = performance.now()
          const dir = e.deltaY > 0 ? 1 : -1
          const paused = now - lastTime > 160
          const flipped = lastDir !== 0 && dir !== lastDir && mag > 10
          const spike = mag > 1.8 * lastMag && mag > 12
          lastTime = now
          lastDir = dir
          lastMag = mag
          if (!animating && (paused || flipped || spike)) step(dir)
        }
        // On window, not the scroller — fixed overlays (sidebar, progress
        // bar) sit outside the scroller and would otherwise be dead zones.
        window.addEventListener('wheel', onWheel, { passive: false })

        // Keyboard paging (reference parity). Inert while the modal is open.
        const onKey = (e) => {
          if (document.querySelector('[role="dialog"]')) return
          const tag = e.target?.tagName
          if (tag === 'INPUT' || tag === 'TEXTAREA') return
          if (e.key === 'Home') {
            e.preventDefault()
            if (!animating) goTo(0)
            return
          }
          if (e.key === 'End') {
            e.preventDefault()
            if (!animating) goTo(maxIndex())
            return
          }
          let dir = 0
          if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') dir = 1
          else if (e.key === 'ArrowUp' || e.key === 'PageUp') dir = -1
          if (dir !== 0) {
            e.preventDefault()
            if (!animating) step(dir)
          }
        }
        window.addEventListener('keydown', onKey)

        pagerRef.current = { goToId: (id) => goTo(indexOfSection(id)) }

        return () => {
          window.removeEventListener('wheel', onWheel)
          window.removeEventListener('keydown', onKey)
          pagerRef.current = null
        }
      })
    },
    { scope: scrollRef },
  )

  const scrollTo = (id) => {
    if (pagerRef.current) return pagerRef.current.goToId(id)
    const el = scrollRef.current?.querySelector(`section[data-section="${id}"]`)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="font-sans text-ink bg-canvas">
      <div
        ref={barRef}
        className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left scale-x-0"
        style={{ background: 'var(--gradient-accent-text)' }}
      />
      <CursorPointer />
      <SideNav items={navItems} active={active} onSelect={scrollTo} />
      <BottomDock items={navItems} active={active} onSelect={scrollTo} />
      {/* Desktop: free native scroller (no snap) — wheel/keys are paged by
          the JS pager above. Mobile: proximity scroll-snap gives a paged feel
          on touch without trapping content in taller-than-viewport sections;
          md:snap-none hands control back to the pager on desktop. */}
      <div
        ref={scrollRef}
        data-scroll-root
        className="h-dvh snap-y snap-proximity overflow-y-scroll overflow-x-hidden md:snap-none"
      >
        <Hero />
        <WorkSection />
        <AboutSection />
        <ContactSection />
      </div>
    </main>
  )
}
