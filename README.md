# personal-website-react

Pedro Serdio Hank's personal site — the public surface for his work history, projects,
and resume. React 19 + TypeScript on Vite, deployed to GitHub Pages.

## What this is for

One place that answers "who is this person and what have they built," and one place that
hands out the resume PDF. It's the link that goes on applications, in a bio, at the top
of a message to a recruiter — so the two things it has to get right are **being current**
and **not looking like a template**.

Those two goals pull in different directions, and the rest of this README is how the repo
resolves each of them: a generation pipeline for the first, a written design direction for
the second.

## Content is generated, not authored here

Everything in `src/data/` and most of `public/` is **generated**. Do not hand-edit it —
the next sync will overwrite your changes.

The canonical facts live one repo over, in `personal-assistant/profile/`:

```
personal-assistant/profile/profile.json   ─┬─→ src/data/about.json
personal-assistant/profile/projects.json  ─┘   src/data/projects.json
                                               src/data/experience.json
                                               public/images/
                                               public/assets/pedro-serdio-hank-CV.pdf
```

The same two JSON files also generate the resume (`resume.md` → `resume.html` → PDF).
That's the whole point: the site and the resume are two renderings of one set of facts, so
a job title updated in one place can't go stale in the other. The site imports these JSON
files directly — Vite bundles them — so there's no fetch and no runtime failure mode. A
bad sync breaks the build, not the live page.

### To change site content

```bash
# in ../personal-assistant
$EDITOR profile/profile.json      # or profile/projects.json — see profile/SCHEMA.md
node sync-site.mjs                # regenerates src/data/ and public/images/
node resume/build.mjs             # regenerates the resume, copies the PDF here

# back here
npm run build                     # confirm the site still compiles
```

Commit in both repos. `sync-site.mjs` is the only writer of `src/data/`; if a value on the
page looks wrong, the bug is in the profile JSON or in the sync script, never in the JSON
it produced.

Components, styles, routing, and layout **are** authored here. The generated/authored line
runs at the data boundary, not the file-type boundary.

## Design direction

The visual language is specified in a published artifact:

**[Terminal theme — direction](https://claude.ai/code/artifact/88441f15-89eb-43ed-bf6c-52d8d574a79b)**

An amber-on-black terminal look — dark only, zero border radius, monospace throughout. It
draws on three sources: the palette Longbox already ships, a poster's terminal vocabulary,
and a single-column page flow with one focal element and room to breathe.

It covers:

- **Palette** — tokens lifted verbatim from `comic-track/src/constants/theme.ts`, so the
  site and Longbox read as one hand. `success` and `danger` are semantic (shipped /
  archived) and never decorative.
- **Type** — one rounded face for the wordmark against monospace for everything else. The
  artifact uses system substitutes; the real site ships Space Mono (`src/assets/fonts/`).
- **Motifs** — shell prompts, `[SECTION]` rules, dotted key/value leaders, progress bars,
  status bar, buttons. Each is separable, and the artifact's recommendation is to keep the
  structural ones and drop the purely decorative hex chips — using all of them at once
  tips from elegant into costume.
- **ASCII torus** — z-buffered, rendered as text rather than WebGL, frozen under
  `prefers-reduced-motion`. Implemented in `src/components/main-page/AsciiTorus.tsx`.
- **Layout variants** — three ways to open the home page (boot sequence, torus hero,
  directory listing) and two project treatments (cards vs. hairline rows), each with a
  written verdict on the trade-off.
- **Decisions** — all five settled and built, each recorded with the reasoning and the
  file it landed in: torus hero for the home page, expanding rows for projects, the ASCII
  portrait on `/about`, self-hosted Space Mono, and dark-only with no theme toggle.

Treat it as the source of truth for color, spacing, and motif usage. If the implementation
and the artifact disagree, one of them needs updating — decide which before writing more
CSS.

## Local development

```bash
npm install
npm run dev       # vite dev server
npm run build     # tsc -b && vite build
npm run lint      # eslint
npm run preview   # serve the production build locally
```

## Structure

```
src/
  App.tsx                    routes: / /about /projects /work-exp /contact-me
  main.tsx                   router basename, read from import.meta.env.BASE_URL
  components/main-page/      landing page: Layout, AsciiArt, AsciiTorus
  components/projects/       ProjectRow
  components/shared/         Navigation, PageShell
  pages/                     About, Projects, WorkExp, Contact, NotFound
  data/                      GENERATED — see above
  styles/                    global, main-page, pages, torus
public/
  images/                    GENERATED — project screenshots
  assets/                    GENERATED — resume PDF
```

## Deployment

`.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on every push
to `main`, and can be re-run from the Actions tab without a commit.

The site is served from a project page at `/personal-website/`. Two places depend
on that path and must stay in sync if the repo is renamed or a custom domain is added:

- `base` in `vite.config.ts` (defaults to `/personal-website/`, override with
  `BASE_PATH=/`)
- `basename` in `src/main.tsx`, which reads it from `import.meta.env.BASE_URL`

GitHub Pages has no rewrite rules, so a hard load of `/projects` would 404. `vite.config.ts`
copies `index.html` to `404.html` at build time, which makes deep links and refreshes work
without a server.
