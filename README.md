# Ishita — Portfolio

Single-page portfolio built with **React + Vite + Tailwind CSS v4 + GSAP**.
All copy is placeholder — edit one file to make it real.

## Edit content

Everything (name, email, headline, projects, socials, bios) lives in
[`src/data/content.js`](src/data/content.js). Search for `Placeholder` / `TODO`.

## Images

Drop image files into `public/images/` and point to them from `src/data/content.js`
with a relative path like `./images/massive-charging.png`. Each slot shows its
gradient placeholder until a real file loads (see `src/components/SmartImage.jsx`),
so paths can be wired up before the files exist. Slots: project visuals
(`projects[].image`), hero polaroid (`site.photo`), About portrait
(`about.portraitImage`).

After adding images, run `npm run optimize-images` — it resizes anything oversized,
converts photographic art to WebP, and recompresses screenshots (needs the `sharp`
dev dependency). It rewrites files in place, so update `.png`→`.webp` paths in
`content.js` for any converted art.

## Run locally

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

Option A — GitHub Actions (recommended):

1. Create a GitHub repo, push this folder to the `main` branch.
2. Repo → Settings → Pages → Source: **GitHub Actions**.
3. Every push to `main` auto-deploys via `.github/workflows/deploy.yml`.

Option B — one-shot from your machine:

```bash
npm run deploy   # builds and pushes dist/ to the gh-pages branch
```

Then set Pages source to the `gh-pages` branch.

Custom domain later: add a `CNAME` file with your domain into `public/`
(it gets copied into the build), and point the domain's DNS at GitHub Pages.
Asset paths are relative (`base: './'` in `vite.config.js`), so no config change needed.

## Structure

- `src/App.jsx` — snap-scroll shell, section tracking, nav wiring
- `src/components/Hero.jsx` + `src/components/hero/*` — kinetic headline, draggable
  stickers, terminal card, stacks marquee, mood switch
- `src/components/WorkSection.jsx` — sticky stacked case-study cards
- `src/components/InterfacesSection.jsx` — two-row gallery marquee
- `src/components/PlaygroundSection.jsx` — side-project card marquee
- `src/components/AboutSection.jsx` — bio + brands marquee
- `src/components/ContactSection.jsx` — contact hero + footer with crew avatars
- `src/index.css` — design tokens (colors, fonts, moods) + custom keyframes
