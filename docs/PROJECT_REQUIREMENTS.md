# Zaminwale – Project Requirements & Current Status

**Document for:** Zaminwale (Client)  
**Purpose:** Simple overview of what the website does today, what still needs a backend, and what we will build.  
**Last updated:** February 2025

---

## 1. Introduction

This document explains the **current state** of the Zaminwale website and the **work we will do** to complete it with a proper **backend (admin panel + API)** so that:

- Property listings, user accounts, and enquiries work with **real data**.
- You can **manage** properties, users, and enquiries from an **admin panel**.
- The **public website** keeps working as designed, but powered by your own system instead of mock or external APIs.

We have kept the language **simple** and avoided technical jargon where possible.

---

## 2. Objective

- **Complete the application** by building a **backend panel** and **API** that the existing frontend website will use.
- **Replace** all temporary or mock data with **real data** from your backend.
- Give Zaminwale a **single, clear picture** of:
  - What is **already static** (fixed content, no API needed).
  - What **depends on an API** today and will be **fulfilled by the new backend**.

---

## 3. Current Status – What Is Static vs What Needs the API

The table below shows **each area of the website**, how it works **today**, and **what the new backend/API will provide**.

| # | Area / Feature | Current status | What the backend & API will do |
|---|----------------|----------------|---------------------------------|
| **1** | **Blogs** (blog listing, blog post pages, “Trending News” section) | **Static** – Content is stored in code files. No API is used. | Optional later: backend can manage blog posts; for now these can stay static if you prefer. |
| **2** | **Property listing** (homepage highlights, “Recommended”, “Similar”, search results, properties page) | **API** – Website expects to load properties from an API. Without a working API, these sections fail or stay empty. | Backend will store properties; API will serve list and filters (e.g. by city, price, type) so the website can show real listings. |
| **3** | **Single property page** (property details when you click a listing) | **API** – Property details are loaded by property ID from an API. | Backend will store full property details; API will return one property by ID so the detail page shows correct data. |
| **4** | **Search & filters** (location, price, type, etc.) | **API** – Filter options and results are fetched from an API. | API will accept filter parameters and return matching properties so search and filters work with your data. |
| **5** | **User registration & login** | **API** – Sign up and login call an API to create accounts and get auth tokens. | Backend will manage user accounts; API will handle registration, login, and secure tokens so only real users can access their dashboard. |
| **6** | **User profile** (after login) | **API** – Profile data is loaded from an API using the user’s token. | API will return the logged-in user’s profile so the website can show name, contact, etc. |
| **7** | **“My properties” (dashboard)** – List of properties added by the logged-in user | **API** – List is loaded from an API. | Backend will link properties to users; API will return only that user’s properties for the dashboard. |
| **8** | **Add new property** (post property flow) | **API** – Form submits to an API to create a property and upload images. | Backend will save new properties and images; API will accept the form data and file uploads so new listings appear on the site. |
| **9** | **Edit property** (dashboard) | **API** – Existing property is loaded and updated via API. | Backend will update property details and images; API will support “get one” and “update” so edits reflect on the website. |
| **10** | **Delete property** (dashboard) | **API** – Delete request is sent to an API. | Backend will soft-delete or remove the property; API will accept delete so the listing is removed from the site. |
| **11** | **Website enquiry form** (general contact / popup enquiry) | **API** – Form submits to an API. | Backend will store enquiries; API will accept submissions so you can view and manage them in the admin panel. |
| **12** | **Property enquiry form** (enquiry on a specific property) | **API** – Form submits to an API with property ID. | Backend will store enquiries linked to properties; API will accept submissions so you can see which property each enquiry is for. |
| **13** | **Property visit request form** | **API** – Form submits to an API with property ID. | Backend will store visit requests; API will accept submissions so you can manage site visits in the admin panel. |
| **14** | **Dashboard – Website enquiries list** | **API** – List and export of general enquiries from API. | Backend will store data; API will return list and support export (e.g. Excel) for date range. |
| **15** | **Dashboard – Property enquiries list** (per property) | **API** – List and export from API. | Backend will store data; API will return enquiries per property and support export. |
| **16** | **Dashboard – Property visits list** (per property) | **API** – List and export from API. | Backend will store data; API will return visit requests per property and support export. |
| **17** | **Navigation, footer links, dealer packages, testimonials, locations, etc.** | **Static** – Links, labels, testimonials, location names, and similar content are fixed in the website code. No API. | No change needed for “static” content. Optional: later, some labels or links could be managed from admin if you want. |

---

## 4. Summary of Current Status (Simple Terms)

| Status | Meaning | Examples on Zaminwale |
|--------|--------|------------------------|
| **Static** | Content is fixed in the website. No server or database is needed for it to show. | Blogs, menu links, footer, dealer package text, testimonials, “Top locations” labels, connectivity content. |
| **API (to be fulfilled)** | The website is built to load or send data via an API. Today there is no backend, so these parts need the backend we will build. | All property listing/detail/search, user signup/login/profile, “My properties”, add/edit/delete property, all enquiry and visit forms, and dashboard enquiry/visit lists and exports. |

---

## 5. What We Will Deliver (High Level)

We will build the following so that the frontend website works end-to-end with **your** data:

1. **Backend / Admin panel**
   - A secure **admin panel** (website or app) where you can:
     - Manage **properties** (add, edit, delete, approve, etc.).
     - View and manage **users** (customers who register).
     - View and manage **enquiries** (website, property-specific, and visit requests) and export them (e.g. Excel) where the frontend already supports it.
   - Access only for authorised staff (login, roles if needed).

2. **API (backend services)**
   - **APIs** that the existing Zaminwale **frontend website** already expects:
     - Auth: signup, login, profile.
     - Properties: list, get one, filter, create, update, delete, image upload.
     - Enquiries: website enquiry, property enquiry, property visit – submit and (for dashboard) list and export.
   - APIs will be **documented** and **secure** (e.g. tokens for logged-in users, validation).

3. **Database**
   - A **database** to store:
     - Users, properties, property images, website enquiries, property enquiries, and property visit requests.
   - So that all “API” rows in the table above get **real, persistent data** from your backend.

4. **Connection**
   - The **current website** will be **configured** to use your new API (e.g. base URL, env variables) so that every feature marked “API” in the table uses your backend instead of mock or missing endpoints.

---

## 6. What Stays as Is (No Backend Change)

These will **not** require backend work for the first phase:

- **Blogs** – Can stay as static content in the website unless you later want to manage blogs from the admin panel.
- **Static content** – Navigation, footer, dealer packages, testimonials, location names, connectivity text, and similar content remain as they are today.

---

## 7. Next Steps (Suggested)

1. **Client (Zaminwale)** – Review this document and the table. Confirm that the “Current status” matches your understanding and that the “What the backend & API will do” column covers your expectations.
2. **Development team** – After approval, proceed with:
   - Detailed technical specification (API endpoints, data models, admin screens).
   - Backend and admin panel development.
   - API integration with the existing frontend and testing.
   - Deployment and handover.

---

*If you have questions or want something added to this document, please share your feedback so we can update it for you.*
