---
name: Admin listing UX + disable popup
overview: Improve admin table listings with search, filters, and page-number pagination across Users/Properties/Enquiries/Visits, and disable the public enquiry popup on all /admin routes.
todos: []
isProject: false
---

# Admin listing UX + disable popup

## Goals

- Add **search**, **filters**, and **page-number pagination** to all admin listings:
  - `/admin/users`
  - `/admin/properties`
  - `/admin/enquiries/website`
  - `/admin/enquiries/property`
  - `/admin/visits`
- Disable the **“Contact us for Enquiry”** timed popup on all `/admin/*` routes.

## Current state (what I found)

- The popup is rendered globally in [src/app/layout.jsx](src/app/layout.jsx) via `<PopupEnquiry />` and is controlled by the zustand flag `popupEnquiry` (defaults to `true`) in [src/store/index.js](src/store/index.js).
- Admin list pages currently:
  - Use basic `useEffect` fetches and have either “Load more” or simple pagination state.
  - Backend admin APIs exist at [backend/src/routes/admin.js](backend/src/routes/admin.js) but do not accept filters/search.

---

## Part A — Disable popup on `/admin/*`

### Approach

Keep `PopupEnquiry` for the public site, but **wrap it in a tiny client component** that checks the pathname.

### Changes

- Add `src/components/molecules/PopupEnquiryGate.jsx`:
  - Uses `usePathname()`.
  - If `pathname?.startsWith("/admin")` return `null`.
  - Else render `<PopupEnquiry />`.
- Update [src/app/layout.jsx](src/app/layout.jsx) to render `<PopupEnquiryGate />` instead of `<PopupEnquiry />`.

This avoids touching the popup logic itself and guarantees the popup never appears in admin.

---

## Part B — Backend: add filtering + search support for admin listing endpoints

### Standard query params

- `page`, `limit` (existing)
- `q` (search string)
- `startDate`, `endDate` (createdAt date range)

### Users: `GET /admin/users`

Add support for:

- `q` searching across `name`, `email`, `mobileNo`
- `isAdmin=true|false` filter

Implementation detail:

- Build Prisma `where` using `OR` for `q`, and `createdAt` range for date filters.

### Property enquiries: `GET /admin/enquiries/property`

Add support for:

- `q` searching across enquiry `name`, `email`, `mobile`, `message`, and `property.title`
- `propertyId` exact filter
- `startDate`, `endDate`

### Visits: `GET /admin/enquiries/visit`

Add support for:

- `q` searching across visit `name`, `email`, `mobile`, `message`, and `property.title`
- `propertyId` exact filter
- `preferredDate` exact filter (optional)
- `startDate`, `endDate`

### Website enquiries

Two options (pick one in implementation):

- **Option 1 (minimal):** keep using existing `/enquiry/website/getAll` and add `q/startDate/endDate` support there.
- **Option 2 (consistent admin):** add a new admin endpoint `GET /admin/enquiries/website` that wraps the same dataset and supports the same filter params.

Given you asked for “CMS in `/admin`”, Option 2 keeps admin UI decoupled from non-admin routes.

---

## Part C — Frontend: search + filters + page-number pagination UI

### Common UI pattern

Create a reusable pattern per listing page:

- **Top bar**:
  - Search input (debounced 250–400ms)
  - Filter controls (dropdowns / date range)
  - Reset filters button
- **Pagination footer**:
  - Prev / Next
  - Page indicator `Page X` and optional total (if backend returns it)

### Page-specific defaults

- `**/admin/users`**:
  - Search: name/email/mobile
  - Filter: isAdmin (All / Admin / Non-admin)
  - Date range: createdAt
- `**/admin/properties`**:
  - Search: title/city/locality
  - Filters: city, locality, listingType, propertyType, price range
  - Pagination: page/limit
  Implementation detail:
  - Prefer using existing `filterProperty` action (`/property/getAll/filter`) for filters.
  - If you need admin-only fields later, add an admin property list endpoint; for now the public list+filter is enough.
- `**/admin/enquiries/website`**:
  - Search: name/email/mobile/message
  - Date range: createdAt
- `**/admin/enquiries/property`**:
  - Search: name/email/mobile/message/propertyTitle
  - Filter: propertyId
  - Date range: createdAt
- `**/admin/visits`**:
  - Search: name/email/mobile/message/propertyTitle
  - Filter: propertyId (optional)
  - Date range: createdAt

### Actions

Update or add admin actions in `src/actions/admin.js` to accept the new params and build the query string:

- `getAdminUsers({ page, limit, q, isAdmin, startDate, endDate })`
- `getAdminPropertyEnquiries({ page, limit, q, propertyId, startDate, endDate })`
- `getAdminPropertyVisits({ page, limit, q, propertyId, startDate, endDate })`
- plus whichever option you choose for website enquiries.

---

## Files to change/add (high signal)

- Popup gating
  - Add: `src/components/molecules/PopupEnquiryGate.jsx`
  - Update: [src/app/layout.jsx](src/app/layout.jsx)
- Backend filtering
  - Update: [backend/src/routes/admin.js](backend/src/routes/admin.js)
  - Possibly update/add: [backend/src/routes/enquiry.js](backend/src/routes/enquiry.js) or new admin website enquiry endpoint
- Frontend listing UX
  - Update: `src/app/(admin)/admin/users/page.jsx`
  - Update: `src/app/(admin)/admin/properties/page.jsx`
  - Update: `src/app/(admin)/admin/enquiries/website/page.jsx`
  - Update: `src/app/(admin)/admin/enquiries/property/page.jsx`
  - Update: `src/app/(admin)/admin/visits/page.jsx`
  - Update: `src/actions/admin.js`

## Test plan

- Visit `/admin/*` routes and verify **no popup appears** after 15s.
- For each admin listing page:
  - Search returns matching rows
  - Filters narrow correctly
  - Reset restores defaults
  - Pagination: Prev/Next works and page indicator updates
- Confirm non-admin users are redirected away from `/admin/`* as before.

