# Hadi Halal Foods Grocery ltd — website

Next.js (App Router) + TypeScript + Tailwind CSS v4 + Lucide icons.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in values (see below)
npm run dev                   # http://localhost:3000
npm run check                 # typecheck + lint + production build
```

Contact form API tests (against a running server):

```bash
npm run build && npm start
BASE_URL=http://localhost:3000 npm run test:contact
```

## Where to edit content

| What | File |
| --- | --- |
| Business name, phone, email, address, map link, opening hours | `src/config/site.ts` |
| Store categories and their copy | `src/config/categories.ts` |
| Approved shop photos (homepage section + Gallery) | `src/config/photos.ts` + `public/images/shop/` |
| Colours and fonts | `src/app/globals.css` (`@theme`) and `src/app/layout.tsx` |
| Privacy notice (draft, pending legal review) | `src/app/privacy/page.tsx` |

**Accuracy rule:** only add verified facts. Unknown contact details stay `null` and the
related UI (footer contact lines, visit card, map button, JSON-LD fields) is hidden
automatically. The shop photo section only appears once `shopPhotos` has entries.
Photos must be current, approved, and must not show former signage or business names.

## Contact form

`POST /api/contact` (`src/app/api/contact/route.ts`, logic in `src/lib/contact.ts`):

- Server-side validation (zod), with matching client-side validation and accessible errors.
- Anti-spam: hidden honeypot field, signed timing token (blocks instant/bot and stale submissions),
  per-IP rate limit (5 per 10 minutes, best-effort per instance), 16 KB body limit.
- Delivery via [Resend](https://resend.com) using environment variables:
  `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (verified sender domain).
  Optional `CONTACT_FORM_SECRET` for token signing.
- Truthful status: if email isn't configured, or the provider fails, visitors are told their
  message was **not** sent. Success is only shown after the provider accepts the email.
- Works without JavaScript (form posts and redirects back with a status banner).

## Deploying to Vercel

1. Push this repo to GitHub and import it in Vercel (framework: Next.js, defaults are fine).
2. Add environment variables: `NEXT_PUBLIC_SITE_URL` (e.g. `https://www.yourdomain.ie`),
   `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `CONTACT_FORM_SECRET`.
3. Deploy, then submit the contact form once to confirm delivery to the store inbox.
