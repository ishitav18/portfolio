import { useState } from 'react'

// Light/dark toggle sticker (behavior cloned from the reference site's
// "switch the mood" lamp): stamps data-theme="dark" on <html>, persists the
// choice, and crossfades all colors via the .theme-switching helper class.
export default function ThemeToggle() {
  const [dark, setDark] = useState(
    () => typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark',
  )

  const toggle = () => {
    const next = !dark
    const root = document.documentElement
    root.classList.add('theme-switching')
    if (next) root.dataset.theme = 'dark'
    else delete root.dataset.theme
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch (e) {
      /* private mode */
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', next ? '#121714' : '#f6f4ef')
    window.setTimeout(() => root.classList.remove('theme-switching'), 400)
    setDark(next)
  }

  return (
    <div className="relative flex flex-col items-center select-none">
      <span className="font-script text-xl text-ink-muted -rotate-3">switch the mood</span>
      <button
        type="button"
        role="switch"
        aria-checked={dark}
        aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        onClick={toggle}
        className="mt-1.5 relative flex h-9 w-[68px] items-center rounded-full border border-border bg-surface-2 px-1 shadow-float transition-colors hover:border-border-hover"
      >
        {/* Sliding knob */}
        <span
          className="absolute left-1 top-1 h-[26px] w-[26px] rounded-full bg-surface-1 shadow-float"
          style={{
            transform: dark ? 'translateX(32px)' : 'translateX(0)',
            transition: 'transform 260ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
        {/* Sun */}
        <span className="relative z-[1] flex h-[26px] w-[26px] items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className={`h-3.5 w-3.5 transition-colors ${dark ? 'text-ink-subtle' : 'text-accent'}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        </span>
        {/* Moon */}
        <span className="relative z-[1] ml-auto flex h-[26px] w-[26px] items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className={`h-3.5 w-3.5 transition-colors ${dark ? 'text-accent' : 'text-ink-subtle'}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
          </svg>
        </span>
      </button>
    </div>
  )
}
