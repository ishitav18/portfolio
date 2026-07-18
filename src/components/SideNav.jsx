import { useState } from 'react'
import { site } from '../data/content.js'

const icons = {
  home: (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </svg>
  ),
  work: (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  about: (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5" />
    </svg>
  ),
  contact: (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
}

const resumeIcon = (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h9l4 4v14H6z" />
    <path d="M15 3v4h4M9 12h7M9 16h7" />
  </svg>
)

// Expanding icon rail (cloned from the reference): a 52px frosted glass pill
// that grows to 200px on hover, revealing inline labels. The active item gets
// a soft accent-tinted pill; everything else tints on hover.
export default function SideNav({ items, active, onSelect }) {
  const [expanded, setExpanded] = useState(false)
  const activeIndex = Math.max(0, items.findIndex((item) => item.id === active))
  // Row pitch: h-10 rows (40px) + gap-0.5 (2px); nav padding-top = 6px (p-1.5).
  const pillY = 6 + activeIndex * 42

  const rowClass = (isActive) =>
    `relative flex h-10 shrink-0 items-center rounded-[10px] transition-colors ${
      expanded ? 'gap-3 px-3' : 'justify-center'
    } ${isActive ? 'text-ink' : 'text-ink-muted hover:bg-ink/[0.06] hover:text-ink'}`

  return (
    <nav
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className="fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-0.5 rounded-[18px] border border-border/90 bg-surface-1/85 p-1.5 backdrop-blur-xl md:flex"
      style={{
        width: expanded ? 200 : 52,
        transition: 'width 240ms cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'clip',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.03)',
      }}
    >
      {/* Single active pill that SLIDES to the active row as scroll changes it. */}
      <div
        aria-hidden="true"
        className="absolute left-1.5 right-1.5 top-0 h-10 rounded-[10px]"
        style={{
          background: 'color-mix(in srgb, var(--color-accent) 12%, transparent)',
          transform: `translateY(${pillY}px)`,
          transition: 'transform 260ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          title={item.label}
          onClick={() => onSelect(item.id)}
          className={rowClass(active === item.id)}
        >
          <span className="relative z-[1] shrink-0">{icons[item.id]}</span>
          {expanded && (
            <span className="relative z-[1] truncate font-sans text-sm font-semibold">
              {item.label}
            </span>
          )}
        </button>
      ))}
      <div className="mx-2 my-1 shrink-0 border-t border-border/60" />
      {/* Resume stands apart: accent-colored. */}
      <a
        href={site.resumeUrl || undefined}
        target="_blank"
        rel="noreferrer"
        title="Resume"
        className={`relative flex h-10 shrink-0 items-center rounded-[10px] text-accent transition-colors hover:bg-ink/[0.06] ${
          expanded ? 'gap-3 px-3' : 'justify-center'
        }`}
      >
        <span className="relative z-[1] shrink-0">{resumeIcon}</span>
        {expanded && (
          <span className="relative z-[1] truncate font-sans text-sm font-semibold">Resume</span>
        )}
      </a>
    </nav>
  )
}
