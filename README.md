# Henok Eshetu — Portfolio

Portfolio and writing of [Henok Eshetu](https://github.com/HenokEshetu), Secure
Systems Developer and SIEM Development Team Leader. The design language is a dark
"secure pipeline" console with a DevSecOps theme.

**Live:** https://henokeshetuportfolio.vercel.app

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5.9, React 19 |
| Styling | Tailwind CSS 4 (CSS-first `@theme` tokens) |
| Email | Resend |
| Package manager | pnpm |
| Hosting | Vercel |

Every page except the contact endpoint is statically generated.

## Editing content

All content lives in `content/` — no component changes needed to update the site.

| File | Holds |
|---|---|
| `content/profile.ts` | Bio, stats, experience, platform modules, DevSecOps stages, lab repos, credentials, socials, nav |
| `content/projects.ts` | Projects and their case-study copy (`/work/<slug>`) |
| `content/posts.ts` | Blog posts (`/blog/<slug>`) |

Adding a project or post to the relevant array is enough: the route, the sitemap
entry, and the listing all follow automatically.

### Résumé

The CV lives at `public/Henok_Eshetu_CV.pdf` and `profile.resumeUrl` points to
it. Set `resumeUrl` to `null` to hide every Résumé button.

## Page anatomy

| Section | Component | Idea |
|---|---|---|
| Hero | `components/sections/hero.tsx` | Headline, identity card and a CI pipeline that "types" through its security gates |
| About | `components/sections/about.tsx` | Narrative alongside `profile.yaml` and a `tail -f now.log` panel |
| Platform | `components/sections/platform.tsx` | Bento grid of the SIEM/XDR modules, shown at architecture level only |
| DevSecOps | `components/sections/devsecops.tsx` | SVG infinity loop with a packet travelling through eight stages, with SEC at the crossing |
| Experience | `components/sections/experience.tsx` | Career as a `git log --graph`, with each highlight shown as a diff line |
| Work | `components/sections/work.tsx` | Terminal-window case-study cards plus an `ls -la ~/lab` table |
| Credentials | `components/sections/credentials.tsx` | Education, certifications and their status, languages |
| Contact | `components/sections/contact.tsx` | Contact form styled as a terminal |
| Case studies | `app/work/[slug]/page.tsx` | Cover in window chrome, sticky table of contents with scrollspy, screenshot gallery with a keyboard-navigable lightbox, and previous/next cards |

Screenshots live in `public/work/<slug>/` as WebP and are listed in each project's
`gallery` in `content/projects.ts`; the first one becomes the cover. Projects without
public screenshots set `visual` to `"chess"` or `"terminal"` to get a drawn cover instead.

Press <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>K</kbd> anywhere to open the command palette
(`components/ui/command-palette.tsx`). A scroll-progress hairline and a back-to-top
ring both use CSS scroll timelines, and the navbar highlights the section in view.

## Local development

```bash
pnpm install
cp .env.example .env.local   # add RESEND_API_KEY to test the contact form
pnpm dev
```

| Script | Does |
|---|---|
| `pnpm dev` | Development server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | `tsc --noEmit` |

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Yes, for the contact form | Without it the form returns an honest error rather than silently discarding the message |
| `CONTACT_FROM_EMAIL` | No | Sender address; defaults to Resend's shared sender |
| `CONTACT_TO_EMAIL` | No | Recipient; defaults to the address in `content/profile.ts` |

## Design and accessibility notes

- **One signal accent on a neutral ramp.** Colour tokens are defined once in
  `app/globals.css` under `@theme`: mint is the accent, cyan is its gradient partner,
  and amber and rose are reserved for status. Every foreground token clears WCAG AA
  against both the page background and the card surface.
- **Animation is CSS-only.** Entrances use keyframes; scroll reveals use
  `animation-timeline: view()`. The default state of every element is *visible*,
  so slow JS, failed hydration, or a browser without scroll-driven animations
  never hides content. All of it is disabled under
  `prefers-reduced-motion: reduce`.
- **No render-blocking media.** Backdrops are CSS gradients plus an inline SVG
  noise texture, with no video or WebGL. The only client JS is the navbar, the
  command palette, the clock and a single throttled pointer listener for the
  card spotlight, which is skipped on touch devices.
- Semantic landmarks, a skip link, labelled form controls, `aria-live` status
  messaging, and visible focus rings throughout.

## Security

- Contact submissions are validated with Zod, rate limited per IP, and screened
  by a honeypot field; all interpolated values are HTML-escaped.
- `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and
  `Permissions-Policy` are set in `next.config.ts`.

## Licence

MIT — see [LICENSE](./LICENSE).
