import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { about, experience } from '../data/content.js'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import SmartImage from './SmartImage.jsx'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function AboutSection() {
  // Repeat enough that one loop-unit (half the track) always exceeds the
  // viewport, so the marquee never shows a gap and loops seamlessly at -50%.
  const marqueeBrands = Array.from({ length: 6 }).flatMap(() => about.brands)
  const titleRef = useScrollReveal({ y: 24 })
  const sectionRef = useRef(null)
  const portraitRef = useRef(null)

  // Portrait drifts and tilts as the section passes through the viewport.
  useGSAP(
    () => {
      // Element, not selector: strings are scoped to this useGSAP context
      // and would never match the ancestor scroller.
      const scroller = document.querySelector('[data-scroll-root]')
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          portraitRef.current,
          { y: 70, rotate: -3 },
          {
            y: -70,
            rotate: 2,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              scroller,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
            },
          },
        )
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="about"
      data-section="about"
      className="relative z-10 snap-start bg-surface-1 min-h-dvh md:h-dvh md:overflow-hidden flex flex-col justify-center gap-10 md:gap-8 py-24 md:py-8"
    >
      <div className="max-w-[1200px] w-full mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-7">
            <p className="font-mono text-xs uppercase tracking-widest text-ink-subtle">
              {about.kicker}
            </p>
            <h2
              ref={titleRef}
              className="font-sans text-4xl md:text-[52px] font-semibold leading-[1.1] tracking-tight text-ink"
            >
              {about.title[0]}
              <br />
              <span className="text-gradient-accent">{about.title[1]}</span>
            </h2>
            <p className="max-w-[480px] font-sans text-[15px] leading-[1.85] text-ink-muted">
              {about.body}
            </p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="rounded-full bg-action-bg px-5 py-2.5 font-sans text-sm font-medium text-action-text transition-colors hover:bg-action-bg-hover"
              >
                {about.moreCta}
              </button>
              {about.comingSoon && (
                <span className="coming-soon-shimmer rounded-full border border-border px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-ink-muted">
                  Coming soon
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div
              ref={portraitRef}
              className="relative mx-auto aspect-[4/5] w-full max-w-[320px] md:max-h-[38dvh] overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-tone-mint via-[#e6efd8] to-[#dcebf3] shadow-float will-change-transform"
            >
              <SmartImage src={about.portraitImage} alt="Portrait of Ishita" imgClassName="object-cover">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="rounded-lg bg-black/55 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white">
                    portrait placeholder
                  </span>
                </div>
              </SmartImage>
            </div>
            <ul className="mx-auto w-full max-w-[420px] flex flex-col divide-y divide-border">
              {experience.map((job) => (
                <li key={job.role + job.org} className="flex items-baseline justify-between gap-4 py-2.5">
                  <div>
                    <p className="font-sans text-sm font-medium text-ink">{job.role}</p>
                    <p className="font-sans text-xs text-ink-muted">{job.org}</p>
                  </div>
                  <p className="shrink-0 font-mono text-[10px] uppercase tracking-wide text-ink-subtle">
                    {job.period}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div>
        <p className="mb-4 text-center font-mono text-xs uppercase tracking-widest text-ink-subtle">
          {about.brandsKicker}
        </p>
        <div
          className="marquee-paused overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          }}
        >
          <div
            className="flex w-max items-center animate-marquee will-change-transform"
            style={{ animationDuration: '55s' }}
          >
            {marqueeBrands.map((brand, i) => (
              <div
                key={i}
                className="mr-5 flex h-16 min-w-[170px] shrink-0 items-center justify-center rounded-2xl bg-white px-7 shadow-[0_1px_3px_#0000000a]"
              >
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-8 w-auto max-w-[160px] object-contain"
                  />
                ) : (
                  <span className="whitespace-nowrap font-sans text-2xl font-bold tracking-tight text-[#14201b]">
                    {brand.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
