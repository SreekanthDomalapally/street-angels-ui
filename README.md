# YouHooAlert Website

Static marketing site for **YouHooAlert** — a community-driven emergency assistance app. No API or backend integration; deploy as static HTML.

## Quick start

```bash
npm install
npm run clean   # if dev server crashed or shows Turbopack file-lock errors (Windows)
npm run dev
```

On Windows, `npm run dev` uses **webpack** instead of Turbopack to avoid `.next` file-lock errors (os error 1224). Use `npm run dev:turbo` only if you need Turbopack.

Open [http://localhost:3000](http://localhost:3000).

## Build & deploy

```bash
npm run build
```

Static output is in `out/`. Host on Vercel, Netlify, S3, Cloudflare Pages, etc.

Set your production URL in `lib/site.ts` (`SITE_URL`) before deploying.

## Stack

- Next.js (App Router, static export)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Dark mode (`next-themes`)

## Pages

| Route      | Description                                              |
| ---------- | -------------------------------------------------------- |
| `/`        | Landing (hero, features, mission, download, donate, FAQ) |
| `/privacy` | Privacy policy                                           |
| `/terms`   | Terms of use                                             |
| `/contact` | Contact                                                  |

## Mobile app

The Expo mobile app lives in a separate repository (`mobile-street-angels-ui`).
