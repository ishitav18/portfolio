import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' keeps asset URLs relative so the build works on GitHub Pages
// (project pages, user pages, or a custom domain) without changes.
// outDir 'docs' lets GitHub Pages serve the built site straight from the
// main branch (Settings -> Pages -> main + /docs), no separate branch.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
  build: {
    outDir: 'docs',
  },
})
