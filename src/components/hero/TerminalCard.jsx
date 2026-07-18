import { terminal } from '../../data/content.js'

// Fixed dark chrome (not the ink token): the terminal stays dark in both
// themes — its text is literal white.
export default function TerminalCard() {
  return (
    <div className="w-[340px] overflow-hidden rounded-xl border border-border bg-[#14201b] shadow-float select-none">
      <div className="flex items-center gap-2 border-b border-white/10 px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[11px] text-white/50">{terminal.title}</span>
      </div>
      <div className="flex flex-col gap-2 px-4 py-4 font-mono text-[12px] leading-relaxed">
        {terminal.lines.map((line) => (
          <div key={line.cmd}>
            <p className="text-white/45">
              <span className="text-accent">~ $</span> {line.cmd}
            </p>
            <p className="text-white/90">{line.out}</p>
          </div>
        ))}
        <p className="text-white/45">
          <span className="text-accent">~ $</span> <span className="caret-blink inline-block h-[1.1em] w-[7px] translate-y-[3px] bg-white/80" />
        </p>
      </div>
    </div>
  )
}
