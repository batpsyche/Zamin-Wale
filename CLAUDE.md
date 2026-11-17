# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Client real-estate site for Zaminwale (plots/properties around Mumbai/Raigad), live at **zaminwale.com**. Two apps in one repo:

- **Frontend** (repo root): Next.js 15 App Router, plain JSX (no TypeScript), Tailwind + shadcn/ui (`src/components/ui`), react-hook-form + zod, Zustand store (`src/store`).
- **Backend** (`backend/`): Express 4 + Prisma 6 + PostgreSQL, ESM. API under `/api/v1`, uploaded media served from `/uploads`. Endpoints documented in `docs/API.md`.

No test suite exists.

## Commands

Frontend (root). `pnpm-lock.yaml` is stale (pins Next 15.1.7 vs 15.5.9 in package.json), so `pnpm i --frozen-lockfile` fails; use npm with `package-lock.json` (the server does too):
```bash
npm ci
npm run dev     # next dev --turbo
npm run build   # the only correctness check available — run it before deploying
npm run lint    # next lint
```
Set `API_URL=http://localhost:4000/api/v1` in `.env.local` to point at a local API.

Backend (`backend/`, npm):
```bash
docker compose up -d db        # from repo root; Postgres exposed on host port 5433
npm install
npm run db:generate            # prisma generate
npm run db:migrate             # prisma migrate deploy  (db:migrate:dev for new migrations)
npm run db:seed                # prisma/seed.js
npm run dev                    # node --watch src/index.js, port 4000 by default
```

## Architecture notes

- Route groups: `src/app/(root)` public pages, `src/app/(user)` auth + user dashboard/post-property, `src/app/(admin)` admin panel. API calls live in `src/actions/*`; components follow atoms / molecules / organism.
- Search flow: homepage `Hero` → `SearchBar` pushes `/search/top-location/<slug>?propertyType=...`. On that page `SearchFilter` maps the slug to a locality string via its `Location` array (`SearchTrigger`), calls `filterProperty`, and stores results in the Zustand `searchList`. The backend filters with **exact** match on `property.locality` (`backend/src/routes/property.js`), so the locality string must match what was saved on the property.

- Property types (`Residential`, `Commercial`, `Villa/bungalow`, `Investment`) are likewise hardcoded in `post-property/BasicDetails.jsx` (zod enum + `Step1Data`; sub-category pickers are rendered per type), both edit pages (zod enum + `Data[1]`), and the admin list filter in `admin/properties/page.jsx`. The backend stores `propertyType` as a free string. The admin "create property" page just re-exports the user `post-property/create-property` page.

### Adding a location (recurring client request)

Location lists are hardcoded and duplicated; there is no shared constant. Add a new location to all of these (see commit `ce537e1` for the "Pen" example):

| File | What |
|---|---|
| `src/components/molecules/SearchBar.jsx` | `SearchData` "Locality" entry — homepage "Select Your Location" dropdown (value = URL slug) |
| `src/components/molecules/SearchFilter.jsx` | `Location` slug→locality map **and** `FilterData` locality options |
| `src/components/molecules/post-property/LocationDetails.jsx` | `Step2Data` — user post-property form |
| `src/app/(admin)/admin/properties/[id]/edit/page.jsx` | `Data` — admin property edit form |
| `src/app/(user)/(authenticate)/dashboard/edit/[propertyId]/page.jsx` | user property edit form |
| Optional: `organism/Footer.jsx`, `NearByLocations.jsx`, `TopLocations.jsx` | footer links / homepage location cards |

Without the property-form entries, no property can be tagged with the new locality and the search returns nothing. Existing values are inconsistent in casing (`"alibaug"` vs `"Karjat"`); the slug→locality value in `SearchFilter` must equal what the forms save.

## Deployment (production)

- SSH: `ssh -F ~/.ssh/zamin/zamin_config zamin` (root on a VPS).
- Repo checked out at `/root/Zamin-Wale` on branch `feat/cms`. The server's `origin` is `batpsyche/Zamin-Wale`, which is **`origin-2`** locally (local `origin` is a different fork). Push to `origin-2` to deploy.
- pm2 processes: `zamin-frontend` (`npm start` in `/root/Zamin-Wale`, port 3000) and `zamin-backend` (`backend/src/index.js`, port 4003).
- nginx (`/etc/nginx/sites-enabled/zaminwale.conf`) proxies `/` → 3000, `/api/` and `/uploads/` → 4003.
- Frontend deploy: `git pull && npm run build && pm2 restart zamin-frontend`. Backend changes: `pm2 restart zamin-backend` (run `npm run db:migrate` first if there are new migrations).
- Server has SQL backups in `/root` and `backend/`; take a DB dump before running migrations in prod.
