import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import SmartImage from './SmartImage.jsx'

gsap.registerPlugin(useGSAP)

// Case-study dialog. Rendered through a portal so no transformed ancestor
// (reveals, card-stack scrubs) breaks its fixed positioning. Closes via the
// X button, backdrop click, or Escape — all through an animated exit.
export default function CaseStudyModal({ project, onClose }) {
  const backdropRef = useRef(null)
  const panelRef = useRef(null)
  const closingRef = useRef(false)
  const { caseStudy } = project

  // Lock the page scroller while open.
  useEffect(() => {
    const scroller = document.querySelector('[data-scroll-root]')
    const prev = scroller?.style.overflowY
    if (scroller) scroller.style.overflowY = 'hidden'
    return () => {
      if (scroller) scroller.style.overflowY = prev || ''
    }
  }, [])

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(backdropRef.current, { opacity: 0, duration: 0.25, ease: 'power1.out' })
      gsap.from(panelRef.current, {
        opacity: 0,
        y: 44,
        scale: 0.96,
        duration: 0.4,
        ease: 'back.out(1.4)',
      })
    })
  })

  const close = () => {
    if (closingRef.current) return
    closingRef.current = true
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return onClose()
    const tl = gsap.timeline({ onComplete: onClose })
    tl.to(panelRef.current, { opacity: 0, y: 28, scale: 0.97, duration: 0.22, ease: 'power2.in' })
      .to(backdropRef.current, { opacity: 0, duration: 0.2 }, '<')
  }

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return createPortal(
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label={project.title}>
      <div
        ref={backdropRef}
        onClick={close}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4 md:p-8">
        <div
          ref={panelRef}
          className="pointer-events-auto relative flex max-h-[88dvh] w-full max-w-[760px] flex-col overflow-hidden rounded-3xl border border-border bg-surface-1 shadow-float"
        >
          <button
            type="button"
            aria-label="Close case study"
            autoFocus
            onClick={close}
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-1/90 text-ink-muted shadow-float backdrop-blur transition-colors hover:bg-surface-2 hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <div className="overflow-y-auto no-scrollbar">
            {/* Visual banner */}
            <div className={`relative h-[180px] shrink-0 bg-gradient-to-br md:h-[220px] ${project.tone}`}>
              <SmartImage src={project.image} alt={project.title} imgClassName="object-contain p-4" />
            </div>

            <div className="flex flex-col gap-6 p-7 md:p-10">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-ink-subtle">
                  Case study · {project.year}
                </p>
                <h3 className="mt-2 font-sans text-2xl font-semibold leading-tight tracking-tight text-ink md:text-[30px]">
                  {project.title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-surface-2 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <p className="font-serif text-[19px] italic leading-relaxed text-ink-muted">
                {caseStudy.intro}
              </p>

              {caseStudy.meta && (
                <div className="grid grid-cols-1 gap-3 rounded-2xl border border-border bg-surface-2/60 p-5 sm:grid-cols-3">
                  {caseStudy.meta.map((m) => (
                    <div key={m.label}>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-ink-subtle">
                        {m.label}
                      </p>
                      <p className="mt-1 font-sans text-sm font-medium text-ink">{m.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {caseStudy.sections.map((section) => (
                <div key={section.heading}>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
                    {section.heading}
                  </p>
                  {section.body && (
                    <p className="mt-2.5 font-sans text-[15px] leading-[1.85] text-ink-muted">
                      {section.body}
                    </p>
                  )}
                  {section.bullets && (
                    <ul className="mt-3 flex flex-col gap-2.5">
                      {section.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3">
                          <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          <p className="font-sans text-[15px] leading-relaxed text-ink-muted">{b}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              <div className="mt-2 flex flex-wrap items-center gap-3 border-t border-border pt-6">
                {project.link && (
                  <a
                    href={project.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-action-bg px-5 py-2.5 font-sans text-sm font-medium text-action-text transition-colors hover:bg-action-bg-hover"
                  >
                    {project.link.label}
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </a>
                )}
                <button
                  type="button"
                  onClick={close}
                  className="rounded-full border border-border bg-surface-1 px-5 py-2.5 font-sans text-sm text-ink-muted transition-colors hover:border-border-hover hover:text-ink"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
