import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

// Each letter is its own span so it can reveal on a stagger and lift on hover.
function Word({ word, italic }) {
  return (
    <span className={`inline-block whitespace-nowrap align-baseline ${italic ? 'font-serif italic' : ''}`}>
      {word.split('').map((ch, i) => (
        <span key={i} className="kinetic-letter">
          {ch}
        </span>
      ))}
    </span>
  )
}

// Headline that reveals letter by letter (GSAP stagger); each letter lifts on
// hover via CSS once the entrance finishes (see .headline-ready in index.css).
export default function KineticHeadline({ segments, className }) {
  const rootRef = useRef(null)

  useGSAP(
    () => {
      const root = rootRef.current
      const letters = root.querySelectorAll('.kinetic-letter')
      const enableHover = () => root.classList.add('headline-ready')

      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(letters, {
          yPercent: 60,
          opacity: 0,
          duration: 0.5,
          ease: 'back.out(1.7)',
          stagger: 0.014,
          delay: 0.1,
          clearProps: 'transform',
          onComplete: enableHover,
        })
      })
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(letters, { opacity: 1 })
        enableHover()
      })
    },
    { scope: rootRef },
  )

  let key = 0
  return (
    <h1 ref={rootRef} className={className}>
      {segments.map((seg, si) => {
        const words = seg.text.split(' ')
        return (
          <span key={si}>
            {words.map((w, wi) => (
              <span key={`${si}-${wi}`}>
                <Word word={w} italic={seg.italic} key={key++} />
                {wi < words.length - 1 ? ' ' : ''}
              </span>
            ))}
            {seg.break ? <br className="hidden md:block" /> : null}
          </span>
        )
      })}
    </h1>
  )
}
