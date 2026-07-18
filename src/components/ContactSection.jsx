import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { site, contact, crew } from '../data/content.js'
import SocialLinks from './SocialLinks.jsx'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function CrewAvatar({ member }) {
  return (
    <div className="group relative flex flex-col items-center">
      <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-max -translate-x-1/2 rounded-lg bg-action-bg px-2.5 py-1 font-sans text-[11px] text-action-text opacity-0 transition-opacity group-hover:opacity-100">
        {member.quip}
      </div>
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-2 text-base transition-transform duration-200 group-hover:-translate-y-1">
        {member.emoji}
      </span>
      <p className="mt-1 font-mono text-[10px] text-ink-subtle/50 group-hover:text-ink-muted">
        {member.name}
      </p>
    </div>
  )
}

export default function ContactSection() {
  const sectionRef = useRef(null)

  // The two heading lines slide in from opposite sides and lock together,
  // scrubbed to the approach scroll.
  useGSAP(
    () => {
      // Element, not selector: strings are scoped to this useGSAP context
      // and would never match the ancestor scroller.
      const scroller = document.querySelector('[data-scroll-root]')
      const mm = gsap.matchMedia()
      // Desktop only: the ±160px start offsets would overflow a phone
      // viewport sideways. Mobile gets the lines statically visible.
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            scroller,
            start: 'top bottom',
            end: 'top 25%',
            scrub: 0.5,
          },
        })
        tl.fromTo(
          '[data-line="1"]',
          { x: -160, opacity: 0, rotate: -3 },
          { x: 0, opacity: 1, rotate: 0, ease: 'none' },
          0,
        ).fromTo(
          '[data-line="2"]',
          { x: 160, opacity: 0, rotate: 3 },
          { x: 0, opacity: 1, rotate: 0, ease: 'none' },
          0,
        )
      })
      mm.add('(max-width: 767.98px), (prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-line="1"], [data-line="2"]', { opacity: 1, x: 0, rotate: 0 })
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="contact"
      data-section="contact"
      className="relative z-10 snap-start bg-canvas min-h-dvh flex flex-col"
    >
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="max-w-[900px] w-full">
          <p className="font-mono text-xs uppercase tracking-widest text-ink-subtle">
            {contact.kicker}
          </p>

          <div className="btn-gradient-ring mx-auto mt-6 mb-8 max-w-full md:w-max">
            <div className="btn-gradient-ring-inner inline-flex max-w-full items-center gap-2 px-4 py-2">
              <span className="h-2 w-2 shrink-0 rounded-full bg-accent animate-pulse" />
              <span className="text-center font-sans text-sm text-ink-muted">
                {contact.availability}
              </span>
            </div>
          </div>

          <h2 className="font-sans text-[44px] md:text-[76px] leading-[1.05] tracking-tight text-ink">
            <span data-line="1" className="inline-block font-medium">
              {contact.title[0]}
            </span>
            <br />
            <span data-line="2" className="inline-block whitespace-nowrap">
              <span className="font-serif italic text-gradient-accent">{contact.title[1]}</span>
            </span>
          </h2>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${site.email}`}
              className="text-fill-trigger inline-flex items-center gap-3 rounded-full border border-border bg-surface-1 px-5 py-3 font-mono text-sm shadow-float transition-colors hover:border-border-hover"
            >
              <span className="text-fill-hover">{site.email}</span>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-action-bg px-6 py-3 font-sans text-sm font-medium text-action-text transition-colors hover:bg-action-bg-hover"
            >
              {contact.talkCta}
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>
          </div>

          <SocialLinks />
        </div>
      </div>

      {/* Extra bottom padding on mobile so the fixed bottom dock never
          covers the crew row. */}
      <footer className="border-t border-border px-6 pt-6 pb-28 md:py-6">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2 shrink-0">
            <p className="flex items-center gap-1.5 font-sans text-xs text-ink-subtle">
              <span>© {site.year} {site.fullName}</span>
              <svg viewBox="0 0 24 24" className="h-3 w-3 text-accent" fill="currentColor">
                <path d="M12 21s-7.5-4.7-9.8-9.2C.6 8.6 2.6 5 6.1 5c2 0 3.4 1 4.4 2.5H12h1.5C14.5 6 15.9 5 17.9 5c3.5 0 5.5 3.6 3.9 6.8C19.5 16.3 12 21 12 21z" />
              </svg>
              <span>{contact.builtWith}</span>
            </p>
          </div>
          <div className="flex items-end gap-6">
            {crew.map((member) => (
              <CrewAvatar key={member.name} member={member} />
            ))}
          </div>
        </div>
      </footer>
    </section>
  )
}
