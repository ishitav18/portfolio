import { contact } from '../data/content.js'

// Circular social-icon buttons (design cloned from the reference site):
// muted icons in soft filled circles that lift + tint accent on hover.
// Add a platform by adding its key to `icons` and an entry in
// content.js `contact.socials`.
const icons = {
  linkedin: (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.65h.05c.53-1 1.82-2.05 3.75-2.05 4.01 0 4.75 2.64 4.75 6.07V21h-4v-5.4c0-1.29-.02-2.94-1.79-2.94-1.79 0-2.06 1.4-2.06 2.85V21h-4z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  behance: (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
      <path d="M8.8 11.3c.86-.42 1.3-1.06 1.3-1.98 0-.72-.25-1.29-.74-1.72-.5-.44-1.2-.65-2.12-.65H2v11.5h5.4c.44 0 .87-.05 1.3-.15.42-.1.8-.27 1.13-.5.32-.23.58-.53.77-.9.19-.37.28-.83.28-1.36 0-.65-.15-1.2-.46-1.65-.31-.44-.78-.75-1.42-.94zM4.5 8.9h2.4c.28 0 .53.02.76.08.22.05.41.14.56.27.15.13.26.28.33.47.06.19.09.42.09.7 0 .48-.14.83-.42 1.06-.28.23-.65.34-1.1.34H4.5zm3.65 6.44c-.16.14-.35.24-.58.3-.23.06-.47.08-.72.08H4.5v-3.02h2.42c.55 0 .99.13 1.32.38.33.25.5.68.5 1.28 0 .3-.06.55-.16.75-.1.2-.24.36-.43.5zM22 12.7c0-.7-.1-1.36-.32-1.98-.21-.62-.52-1.16-.92-1.62-.4-.46-.9-.82-1.48-1.08-.58-.26-1.24-.39-1.97-.39-.7 0-1.34.13-1.92.38-.58.25-1.08.6-1.5 1.05-.42.45-.74.98-.97 1.6-.23.62-.34 1.29-.34 2.02 0 .74.11 1.42.33 2.04.22.62.53 1.15.94 1.58.41.43.9.77 1.48 1 .58.23 1.23.35 1.95.35 1.04 0 1.92-.24 2.65-.71.73-.47 1.27-1.24 1.61-2.31h-2.2c-.08.28-.3.55-.65.8-.35.25-.78.38-1.28.38-.7 0-1.24-.18-1.62-.55-.38-.37-.6-.96-.64-1.63H22c.01-.13.02-.29.02-.9zM15.46 11.9c.03-.28.1-.53.2-.75.1-.22.24-.4.4-.55.16-.15.36-.26.58-.34.22-.08.47-.12.74-.12.55 0 .98.15 1.28.44.3.29.5.72.6 1.29h-4.15zm.29-4.85h5.13v1.25h-5.13z" />
    </svg>
  ),
  dribbble: (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="12" r="9.2" />
      <path d="M5 8.2c4.3.2 9.6.4 13.8-2.1M9 3.5c2.4 2.7 5.4 7.8 6.4 16.6M20.6 13.4c-5.4-1.7-10 .1-13.4 4.6" />
    </svg>
  ),
  figma: (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
      <path d="M9.25 2.5A2.75 2.75 0 0 0 9.25 8H12V2.5zM12 2.5V8h2.75a2.75 2.75 0 1 0 0-5.5zM6.5 12A2.75 2.75 0 0 1 9.25 9.25H12v5.5H9.25A2.75 2.75 0 0 1 6.5 12zm5.5-2.75V14.75H9.25A2.75 2.75 0 0 0 9.25 20 2.75 2.75 0 0 0 12 17.25zM14.75 9.25a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="currentColor">
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.82l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.12z" />
    </svg>
  ),
}

export default function SocialLinks() {
  const socials = contact.socials.filter((s) => icons[s.platform])
  if (!socials.length) return null

  return (
    <div className="mt-14">
      <p className="text-center font-mono text-xs uppercase tracking-widest text-ink-subtle">
        {contact.socialsKicker}
      </p>
      <div className="mt-6 flex items-center justify-center gap-4">
        {socials.map((s) => (
          <a
            key={s.platform}
            href={s.href || undefined}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            title={s.label}
            className="group flex items-center justify-center"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface-2 text-ink-muted shadow-float transition-all duration-200 group-hover:-translate-y-1 group-hover:border-border-hover group-hover:text-accent">
              {icons[s.platform]}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
