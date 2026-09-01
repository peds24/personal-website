import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

// GitHub Pages serves this repo from /<repo>/ unless the repo is renamed to
// peds24.github.io or a custom domain is set. Override with BASE_PATH=/ if that
// changes — nothing else in the app hardcodes the prefix.
const base = process.env.BASE_PATH ?? '/personal-website/'

// GitHub Pages has no rewrite rules, so a hard load of /projects would 404.
// Serving the SPA shell as 404.html makes deep links and refreshes work without
// the query-string redirect hack, and without its flash of a blank page.
function spaFallback(): Plugin {
  return {
    name: 'spa-404-fallback',
    apply: 'build',
    closeBundle() {
      const dist = resolve(__dirname, 'dist')
      copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), spaFallback()],
})
