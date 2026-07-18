import { stacks } from '../../data/content.js'

// Small "my stacks" sticker with a looping marquee of tool names.
export default function StacksMarquee() {
  const doubled = [...stacks, ...stacks]
  return (
    <div className="flex w-[260px] flex-col gap-2 rounded-2xl border border-border bg-surface-1 p-3 shadow-float select-none">
      <p className="font-script text-lg leading-none text-ink-muted">my stacks</p>
      <div className="marquee-paused overflow-hidden">
        <div
          className="flex w-max items-center gap-2 animate-marquee"
          style={{ '--marquee-duration': '18s' }}
        >
          {doubled.map((tool, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-full border border-border bg-surface-2 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-muted"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
