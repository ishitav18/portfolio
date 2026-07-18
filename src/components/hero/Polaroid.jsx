import SmartImage from '../SmartImage.jsx'

// Polaroid photo sticker. Shows `image` when provided, else a placeholder.
export default function Polaroid({ caption = 'ishita ✷', size = 200, image = '' }) {
  return (
    <div className="rounded-xl bg-white p-2 pb-6 shadow-float select-none" style={{ width: size }}>
      <div
        className="relative overflow-hidden rounded-lg bg-gradient-to-br from-[#ddeee6] via-[#e6efd8] to-[#dcebf3]"
        style={{ height: size - 40 }}
      >
        <SmartImage src={image} alt={caption} imgClassName="object-cover">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-10 w-10 text-ink/20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="9" r="3.5" />
              <path d="M4 20c1.8-4 4.7-6 8-6s6.2 2 8 6" />
            </svg>
          </div>
          <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide text-white">
            photo here
          </span>
        </SmartImage>
      </div>
      {/* Fixed color: the polaroid frame stays white in both themes. */}
      <p className="mt-2 text-center font-script text-lg leading-none text-[#6f7d76]">{caption}</p>
    </div>
  )
}
