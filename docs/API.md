# Zaminwale API Reference

Base path: `/api/v1`

All success responses use the envelope `{ results: { data: <payload> } }` unless noted. List endpoints return `{ result: array, pagination: object }` inside `data`. Errors return `{ results: { data: { error: "message" } } }`.

## Auth (no token)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/client/signup` | Register. Body: `name`, `email`, `mobileNo`, `password`. Returns `token`, `message`. |
| POST | `/client/login` | Login. Body: `email`, `password`. Returns `token`, `message`. |

## User (Bearer token required)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/user/profile` | Current user profile. Returns `id`, `name`, `email`, `mobileNo`, `isAdmin`. |
| GET | `/user/properties?page=&limit=` | Logged-in user's properties (dashboard). |
| PUT | `/user/properties/edit` | Update property. Body: property fields + `propertyId`. |
| DELETE | `/user/properties/delete/:id` | Delete property. |

## Property

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/property/add` | Yes | Create property. |
| GET | `/property/getAll?page=&limit=` | No | List all properties. |
| GET | `/property/getAll/filter?…` | No | Filtered list (query: propertyType, city, locality, priceTotalMinValue, priceTotalMaxValue, etc.). |
| GET | `/property/:id` | No | Single property by ID. |
| POST | `/property/upload/file` | Yes | Multipart file upload. Returns `{ results: { url: "…" } }`. |

## Enquiry

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/enquiry/website/add` | No | Website enquiry. Body: `name`, `email`, `mobile`/`mobileNo`, `message`. |
| GET | `/enquiry/website/getAll?page=&limit=` | Yes | List website enquiries. |
| GET | `/enquiry/website/export?startDate=&endDate=` | Yes | CSV export. |

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/enquiry/property/add/:propertyId` | No | Property enquiry. |
| GET | `/enquiry/property/getAll/:propertyId?page=&limit=` | Yes | List property enquiries. |
| GET | `/enquiry/property/export/:propertyId?startDate=&endDate=` | Yes | CSV export. |

## Property visit

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/enquiry/property/add/visit/:propertyId` | No | Site visit request. Body: `name`, `email`, `mobileNo`, `visitAt`/`preferredDate`, `message`. |
| GET | `/enquiry/property/getAll/visit/:propertyId?page=&limit=` | Yes | List visits. |
| GET | `/enquiry/property/export/visit/:propertyId?startDate=&endDate=` | Yes | CSV export. |

## Admin (Bearer token required; user must have `isAdmin: true`)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/admin/users?page=&limit=` | List all users. Returns `result` array and `pagination`. |
| PUT | `/admin/properties/:id` | Update any property. Body: same as user property edit. |
| DELETE | `/admin/properties/:id` | Delete any property. |
| GET | `/admin/enquiries/property?page=&limit=` | List all property enquiries (with property title). |
| GET | `/admin/enquiries/visit?page=&limit=` | List all property visits (with property title). |
