// One-shot image optimizer for public/images.
// Run with: npm run optimize-images
// - Resizes anything wider than MAX_W (retina-safe for this site's slots).
// - Paintings (photographic) -> WebP, which is dramatically smaller than PNG.
// - UI screenshots stay PNG (crisp text) but get resized + recompressed.
import sharp from 'sharp'
import { readdir, stat, writeFile, unlink } from 'node:fs/promises'
import path from 'node:path'

const dir = 'public/images'
const MAX_W = 1400
const toWebp = new Set(['art-cat.png', 'art-window.png']) // convert these to .webp

const kb = (n) => `${(n / 1024).toFixed(0)}K`
const files = (await readdir(dir)).filter((f) => /\.(png|jpe?g)$/i.test(f))

for (const f of files) {
  const input = path.join(dir, f)
  const before = (await stat(input)).size
  const pipeline = sharp(input).resize({ width: MAX_W, withoutEnlargement: true })

  if (toWebp.has(f) || /\.jpe?g$/i.test(f)) {
    // photos (jpg) always convert to webp
    const out = input.replace(/\.(png|jpe?g)$/i, '.webp')
    await pipeline.webp({ quality: 80 }).toFile(out)
    await unlink(input)
    const after = (await stat(out)).size
    console.log(`${f} -> ${path.basename(out)}   ${kb(before)} -> ${kb(after)}`)
  } else {
    const buf = await pipeline.png({ compressionLevel: 9, quality: 90, effort: 8 }).toBuffer()
    await writeFile(input, buf)
    const after = (await stat(input)).size
    console.log(`${f}   ${kb(before)} -> ${kb(after)}`)
  }
}
