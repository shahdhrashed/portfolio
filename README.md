# Shahd — Portfolio

A mass-communication portfolio for video reports & documentaries, written articles/blogs, and photo stories. Built with Next.js + Tailwind, with content managed in a free Sanity CMS dashboard.

- **Framework:** Next.js (App Router) + TypeScript + Tailwind CSS v4
- **CMS:** Sanity (admin dashboard embedded at `/studio`)
- **Video:** YouTube / Vimeo links are embedded automatically
- **Hosting:** Vercel (free)

---

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

> **Demo mode:** Until a Sanity project is connected, the site automatically uses
> built-in sample content (`lib/sampleData.ts`) so you can see it fully working.

---

## Connecting the CMS (one-time setup)

1. Create a free account at [sanity.io](https://www.sanity.io/) and make a new project (dataset name: `production`).
2. In the project's API settings on sanity.io/manage, add `http://localhost:3000` and your live URL to **CORS origins**.
3. Copy `.env.local.example` to `.env.local` and fill in `NEXT_PUBLIC_SANITY_PROJECT_ID`.
4. Restart `npm run dev`. The site now reads live content, and the sample data is no longer used.

The admin dashboard lives at **http://localhost:3000/studio** (and `/studio` on the live site).

---

## How Shahd adds her work

Go to `/studio` and sign in. From the sidebar:

- **Videos** — add a title and paste the YouTube/Vimeo link. The player and thumbnail appear automatically.
- **Articles / blogs** — write with headings, images, and quotes in the rich editor.
- **Photo stories** — upload a set of photos with captions; they show as a gallery with a lightbox.
- **Categories** — reusable topics (e.g. News reports, Documentary) used by the filters.
- **Profile / about** — name, bio, photo, CV (PDF), email, and social links.

Tick **"Feature on the homepage"** on any item to surface it in the featured row. New work appears on the site within ~60 seconds.

---

## Project structure

```
app/(site)/        Public pages (home, /work, /video, /writing, /photo, /about)
app/studio/        Embedded Sanity admin dashboard
components/        Nav, Footer, WorkCard, WorkGrid, VideoEmbed, Gallery, PortableBody
lib/               Types, data fetching (content.ts), sample data, helpers
sanity/            CMS client, schemas, queries, Studio config
```

---

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it at [vercel.com](https://vercel.com); add the same env vars from `.env.local`.
3. Deploy. Add a custom domain later from the Vercel dashboard if desired.
