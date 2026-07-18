import { useState } from 'react'

// Shows `src` once it successfully loads; until then (and if it errors or is
// empty) it renders `children` — the section's gradient placeholder. This lets
// image paths be wired up before the files exist: the placeholder stays until a
// real file is dropped in, then the image fades in. The parent must be relative.
export default function SmartImage({ src, alt = '', imgClassName = 'object-cover', children }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && children}
      {src && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(false)}
          className={`absolute inset-0 h-full w-full ${imgClassName} transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </>
  )
}
