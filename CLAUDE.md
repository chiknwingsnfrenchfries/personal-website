# CLAUDE.md — chiknwingsnfrenchfries (edgarramos.com)

Edgar's personal bio/portfolio site. Single-page React app deployed to `edgarramos.com` via GitHub Pages.

## Stack

- **React 19** (plain JSX, no TypeScript)
- **Vite 8** — dev server + build tool
- **oxlint** — linter (not ESLint)
- **Framer Motion** — installed but not yet used; keep unless explicitly removed
- **react-router-dom** — installed but not used; site is single-page, no routes needed yet

## Commands

```bash
npm run dev       # local dev server (localhost:5173)
npm run build     # production build → /dist
npm run preview   # preview the /dist build locally
npm run lint      # oxlint
```

## File map

```
src/
  App.jsx         # all page sections live here as named components
  i18n.js         # EN/FR copy — all user-facing text lives here
  index.css       # all styles — custom CSS, no framework
  useReveal.js    # IntersectionObserver hook: adds .visible class on scroll-in
  ScrollExpand.jsx # scroll-driven scale animation (0.88 → 1.05)
  main.jsx        # React root
public/
  404.html        # GitHub Pages SPA redirect hack (preserves deep links)
```

## Architecture conventions

**All components are in `src/App.jsx`** — this is intentional for a single-page personal site. Don't split into separate files unless the file gets genuinely unwieldy.

**All copy lives in `src/i18n.js`** — never hardcode user-facing text in JSX. Both `en` and `fr` objects must always be kept in sync.

**Custom scroll animations** use two patterns:
- `useReveal(delayMs)` — opacity/transform reveal triggered once on intersection; returns a ref
- `<ScrollExpand>` — continuous scroll-driven scale wrapper (Collins-style)

**CSS conventions:**
- Design tokens in `:root` — `--bg`, `--ink`, `--muted`, `--rule`, `--accent`, `--surface`
- Accent color: `#e8410a` (orange-red)
- Fonts: `Cormorant Garamond` (display), `Inter` (body), `Space Mono` (mono/ticker)
- All styles in `src/index.css` — no CSS modules, no Tailwind

## Deployment

Auto-deploys to GitHub Pages on every merge to `main` via `.github/workflows/deploy.yml`.

- GitHub repo: `https://github.com/chiknwingsnfrenchfries/personal-website`
- Workflow builds with `npm run build`, deploys `/dist` via `actions/deploy-pages`
- `CNAME` lives in `/public/` so Vite copies it into the build output automatically
- Pages source must be set to **GitHub Actions** in repo Settings → Pages

**Branch workflow — strictly no direct pushes to `main`:**
1. Create a branch: `git checkout -b your-branch-name`
2. Make changes and commit on that branch
3. Push the branch and open a PR
4. PR Actions build must pass (green) before merging
5. Edgar merges the PR → triggers auto-deploy to edgarramos.com

Claude must always follow this flow. Never push to `main` directly, even for small fixes.

**Domain:** `edgarramos.com` — currently DNS managed on Squarespace, plan to move to Cloudflare later. No changes needed to this repo for that migration.

## Pending / known placeholders

- `YOURHANDLE` in social links (LinkedIn, Instagram, Bluesky, Upscrolled) — replace with real handles
- `#` on Portfolio link — no portfolio page exists yet
- `https://calendly.com/YOURLINK` — replace with real Calendly URL
- Newsletter form has no backend wiring — ESP TBD (form is UI-only)
- Avatar in Hero shows initials "E" — swap for `<img src="/photo.jpg">` when ready

## No test suite

There are no tests. Don't add a testing framework unless explicitly asked.
