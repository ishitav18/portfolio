import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { projects } from '../data/content.js'
import SmartImage from './SmartImage.jsx'
import CaseStudyModal from './CaseStudyModal.jsx'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Reference architecture: the section is one viewport tall with a persistent
// header; the cards live in a nested scroller ([data-work-scroll]) as sticky
// full-height slots that stack over each other. The app-level pager drives
// this scroller one card per wheel gesture; the header never leaves.
function ProjectCard({ project, index, onOpenCase }) {
  return (
    <div
      data-work-card
      className={`w-full md:sticky md:top-0 md:h-full flex items-center ${
        index > 0 ? 'snap-start' : ''
      }`}
      style={{ zIndex: index + 1 }}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 py-6 md:h-full md:py-5">
        <article className="grid md:h-full grid-cols-1 overflow-hidden rounded-3xl border border-border bg-surface-1 shadow-float md:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col gap-5 p-7 md:p-10">
            <p className="font-mono text-xs uppercase tracking-widest text-ink-subtle">
              {project.year} · {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </p>
            <h3 className="font-sans text-2xl md:text-[32px] font-semibold leading-tight tracking-tight text-ink">
              {project.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-surface-2 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
            <ul className="mt-auto flex flex-col gap-3">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <p className="font-sans text-[15px] leading-relaxed text-ink-muted">{h}</p>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-3">
              {project.caseStudy && (
                <button
                  type="button"
                  onClick={() => onOpenCase(project)}
                  className="inline-flex items-center gap-2 rounded-full bg-action-bg px-5 py-2.5 font-sans text-sm font-medium text-action-text transition-colors hover:bg-action-bg-hover"
                >
                  Case study
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              )}
              {project.link && (
                <a
                  href={project.link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-1 px-5 py-2.5 font-sans text-sm text-ink transition-colors hover:border-border-hover"
                >
                  {project.link.label}
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </a>
              )}
            </div>
          </div>
          <div className={`relative min-h-[220px] overflow-hidden bg-gradient-to-br ${project.tone}`}>
            <SmartImage src={project.image} alt={project.title} imgClassName="object-contain p-6">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="rounded-lg bg-black/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white">
                  project visual placeholder
                </span>
              </div>
            </SmartImage>
          </div>
        </article>
      </div>
    </div>
  )
}

export default function WorkSection() {
  const sectionRef = useRef(null)
  const [openProject, setOpenProject] = useState(null)

  // Covered-card sink: while the next card slides over inside the inner
  // scroller, the previous card scales down and dims.
  useGSAP(
    () => {
      // Element, not selector, for the scroller (selector strings resolve
      // against this useGSAP context's scope).
      const scroller = sectionRef.current.querySelector('[data-work-scroll]')
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const slots = gsap.utils.toArray('[data-work-card]', sectionRef.current)
        slots.forEach((slot, i) => {
          if (i === 0) return
          const covered = slots[i - 1].querySelector('article')
          gsap.to(covered, {
            scale: 0.92,
            opacity: 0.5,
            transformOrigin: 'center top',
            ease: 'none',
            scrollTrigger: {
              trigger: slot,
              scroller,
              start: 'top bottom',
              end: 'top top',
              scrub: 0.4,
            },
          })
        })
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="work"
      data-section="work"
      className="relative z-10 snap-start min-h-dvh md:h-dvh flex flex-col bg-canvas"
    >
      <div className="shrink-0 flex items-end pt-16 pb-2 md:pt-20">
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-8">
          <p className="font-mono text-xs uppercase tracking-widest text-ink-subtle">
            Selected work
          </p>
          <h2 className="mt-2 font-sans text-4xl md:text-5xl font-semibold tracking-tight text-ink">
            What I’ve shipped
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {['MOBILE', 'B2B', 'WEB'].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-border bg-surface-1 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-muted"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Nested scroller on desktop only. On mobile it must NOT be a scroll
          container, or the cards' snap-align would bind to it (unscrollable)
          instead of the page. */}
      <div data-work-scroll className="md:flex-1 md:overflow-y-auto md:overflow-x-hidden no-scrollbar">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} onOpenCase={setOpenProject} />
        ))}
      </div>
      {openProject && (
        <CaseStudyModal project={openProject} onClose={() => setOpenProject(null)} />
      )}
    </section>
  )
}
