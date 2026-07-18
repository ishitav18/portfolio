import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' keeps asset URLs relative so the build works on GitHub Pages
// (project pages, user pages, or a custom domain) without changes.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
})
