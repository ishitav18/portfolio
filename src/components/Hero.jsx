import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import KineticHeadline from './hero/KineticHeadline.jsx'
import DraggableSticker from './hero/DraggableSticker.jsx'
import TerminalCard from './hero/TerminalCard.jsx'
import StacksMarquee from './hero/StacksMarquee.jsx'
import MoodSwitch from './hero/MoodSwitch.jsx'
import ThemeToggle from './hero/ThemeToggle.jsx'
import Polaroid from './hero/Polaroid.jsx'
import { site, headline, principleChips } from '../data/content.js'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function Chip({ text }) {
  return (
    <div className="flex items-center gap-2.5 rounded-full border border-border bg-surface-1 px-4 py-2 shadow-float select-none">
      <span className="h-1.5 w-1.5 rounded-full bg-accent dot-color-cycle" />
      <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-wide text-ink">
        {text}
      </span>
    </div>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const headlineWrap = useRef(null)
  const dragArea = useRef(null)
  const [showBanner, setShowBanner] = useState(true)

  // Cinematic exit: scrubbed to the scroll, the headline zooms away, the
  // sticker layer radiates outward from center (scale pushes every sticker
  // along its own direction — no conflict with Draggable's x/y), and the
  // grid backdrop parallaxes.
  useGSAP(
    () => {
      // Resolve to a real element: selector strings would be scoped to this
      // component's useGSAP context and never find the ancestor scroller.
      const scroller = document.querySelector('[data-scroll-root]')
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            scroller,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        })
        tl.to(headlineWrap.current, { scale: 1.3, autoAlpha: 0, ease: 'none' }, 0)
          .to(dragArea.current, { scale: 1.65, autoAlpha: 0, ease: 'none' }, 0)
          .to(sectionRef.current, { backgroundPosition: '0px 220px', ease: 'none' }, 0)
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="home"
      data-section="home"
      className="relative min-h-[100dvh] snap-start bg-canvas bg-grid overflow-hidden"
    >
      {/* Desktop: centered kinetic headline behind draggable stickers */}
      <div
        ref={headlineWrap}
        className="absolute inset-0 hidden md:flex flex-col items-center justify-center px-16 text-center"
      >
        <KineticHeadline
          segments={headline}
          className="max-w-[900px] font-sans font-semibold text-[22px] md:text-[33px] lg:text-[40px] leading-snug tracking-tight text-ink"
        />
      </div>

      {/* Soft fade at the bottom edge */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-canvas to-transparent" />


      {/* Draggable sticker layer (desktop only) */}
      <div ref={dragArea} className="absolute inset-0 z-10 hidden md:block">
        <DraggableSticker constraintsRef={dragArea} className="left-[7%] top-[12%]" initialRotate={-6}>
          <Polaroid caption={`${site.name} ✷`} image={site.photo} />
        </DraggableSticker>

        <DraggableSticker constraintsRef={dragArea} className="right-[6%] top-[10%]" initialRotate={3}>
          <TerminalCard />
        </DraggableSticker>

        <DraggableSticker constraintsRef={dragArea} className="left-[5%] bottom-[16%]" initialRotate={-3}>
          <StacksMarquee />
        </DraggableSticker>

        <DraggableSticker constraintsRef={dragArea} className="right-[9%] bottom-[14%]" initialRotate={4}>
          <MoodSwitch />
        </DraggableSticker>

        <DraggableSticker constraintsRef={dragArea} className="left-[30%] top-[8%]" initialRotate={-2}>
          <Chip text={principleChips[0]} />
        </DraggableSticker>
        <DraggableSticker constraintsRef={dragArea} className="right-[28%] top-[20%]" initialRotate={5}>
          <Chip text={principleChips[1]} />
        </DraggableSticker>
        <DraggableSticker constraintsRef={dragArea} className="left-[24%] bottom-[12%]" initialRotate={2}>
          <Chip text={principleChips[2]} />
        </DraggableSticker>
        <DraggableSticker constraintsRef={dragArea} className="right-[30%] bottom-[22%]" initialRotate={-4}>
          <Chip text={principleChips[3]} />
        </DraggableSticker>

        <DraggableSticker constraintsRef={dragArea} className="left-[48%] top-[16%]" initialRotate={-8}>
          <span className="font-script text-2xl text-ink-muted select-none">move me around</span>
        </DraggableSticker>

        <DraggableSticker constraintsRef={dragArea} className="right-[46%] bottom-[10%]" initialRotate={0}>
          <ThemeToggle />
        </DraggableSticker>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden relative z-20 min-h-[100dvh] flex flex-col px-5 pb-24 pt-5">
        {showBanner && (
          <div className="flex items-start gap-3 rounded-2xl bg-ink p-4 text-canvas">
            <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="13" rx="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
            <p className="flex-1 font-sans text-[13px] leading-snug">
              Best experienced on desktop — grab a big screen when you can.
            </p>
            <button
              type="button"
              aria-label="Dismiss"
              onClick={() => setShowBanner(false)}
              className="shrink-0 text-canvas/60 transition-colors active:text-canvas"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        )}

        <div className="mt-6 mb-2 flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="font-sans text-sm font-semibold text-ink">{site.fullName}</span>
        </div>

        <div className="relative flex flex-1 flex-col">
          <div className="pointer-events-none absolute left-1 top-2 w-[112px] -rotate-6">
            <Polaroid caption={site.name} size={112} image={site.photo} />
          </div>
          <div className="pointer-events-none absolute right-0 top-4 rotate-3">
            <Chip text={principleChips[1]} />
          </div>

          <KineticHeadline
            segments={headline}
            className="mt-48 max-w-[320px] self-center text-center font-sans text-[26px] font-semibold leading-snug tracking-tight text-ink"
          />

          <div className="mt-auto flex items-end justify-center gap-10 self-center pt-10">
            <MoodSwitch />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </section>
  )
}
