import { useEffect, useState } from 'react'

const moods = ['teal', 'coral', 'violet', 'amber']

// Cycles the site accent palette by stamping data-mood on <html>.
export default function MoodSwitch() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const mood = moods[index]
    if (mood === 'teal') document.documentElement.removeAttribute('data-mood')
    else document.documentElement.setAttribute('data-mood', mood)
  }, [index])

  return (
    <div className="relative flex flex-col items-center select-none">
      <span className="font-script text-xl text-ink-muted -rotate-3">switch the color</span>
      <button
        type="button"
        aria-label="Switch accent color"
        onClick={() => setIndex((i) => (i + 1) % moods.length)}
        className="mt-1 flex items-center gap-2 rounded-full border border-border bg-surface-1 px-3 py-2 shadow-float transition-transform hover:scale-105 active:scale-95"
      >
        <span className="h-4 w-4 rounded-full bg-accent transition-colors" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
          {moods[index]}
        </span>
      </button>
    </div>
  )
}
