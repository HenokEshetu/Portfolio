# Henok Eshetu — Portfolio

Portfolio and writing of [Henok Eshetu](https://github.com/HenokEshetu), security
engineer and full-stack developer.

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
| `content/profile.ts` | Bio, experience, education, certifications, skills, socials, nav |
| `content/projects.ts` | Projects and their case-study copy (`/work/<slug>`) |
| `content/posts.ts` | Blog posts (`/blog/<slug>`) |

Adding a project or post to the relevant array is enough: the route, the sitemap
entry, and the listing all follow automatically.

### Résumé

`profile.resumeUrl` is `null` by default, which hides the Résumé buttons. To
enable them, drop the PDF at `public/henok-eshetu-cv.pdf` and set:

```ts
resumeUrl: "/henok-eshetu-cv.pdf",
```

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

- **One accent on a neutral ramp.** Colour tokens are defined once in
  `app/globals.css` under `@theme`. Every foreground token clears WCAG AA
  against both the page background and the card surface.
- **Animation is CSS-only.** Entrances use keyframes; scroll reveals use
  `animation-timeline: view()`. The default state of every element is *visible*,
  so slow JS, failed hydration, or a browser without scroll-driven animations
  never hides content. All of it is disabled under
  `prefers-reduced-motion: reduce`.
- **No render-blocking media.** The hero backdrop is two CSS gradients rather
  than video or a WebGL canvas.
- Semantic landmarks, a skip link, labelled form controls, `aria-live` status
  messaging, and visible focus rings throughout.

## Security

- Contact submissions are validated with Zod, rate limited per IP, and screened
  by a honeypot field; all interpolated values are HTML-escaped.
- `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and
  `Permissions-Policy` are set in `next.config.ts`.

## Licence

MIT — see [LICENSE](./LICENSE).
