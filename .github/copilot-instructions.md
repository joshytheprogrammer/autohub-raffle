# Copilot Instructions for AutoHub Car Raffle System

## Project Overview
- **Nuxt 4 fullstack app** for car raffles with Paystack payments and Turso (cloud SQLite) database.
- Users buy tickets, admins manage draws and export data.
- Key directories: `app/` (frontend, server API, database, utils), `server/api/` (backend routes), `public/` (static assets).

## Architecture & Data Flow
- **Frontend**: Vue components in `app/components/`, pages in `app/pages/`.
- **Backend**: API routes in `server/api/` (file-based, e.g. `tickets/create.post.js`).
- **Database**: Turso SQLite, schema in `app/database/schema.sql`, setup in `app/database/setup.js`.
- **Auth**: JWT tokens, bcrypt password hashing, logic in `app/middleware/auth.js` and `app/utils/auth.js`.
- **Payments**: Paystack integration, keys in `.env`, payment flow handled in `server/api/tickets/create.post.js`.

## Developer Workflows
- **Install dependencies**: `bun install` (recommended) or `npm install`
- **Start dev server**: `bun run dev` or `npm run dev`
- **DB init**: `bun run db:init` or `npm run db:init`
- **Build for production**: `bun run build`
- **Preview build**: `bun run preview`
- **Admin panel**: `/admin` (password from `.env`)

## Conventions & Patterns
- **Ticket numbers**: Format `AUTOHUB-000001`, generated in backend.
- **API route naming**: `[resource].[method].js` (e.g. `create.post.js`)
- **Auth**: JWT secret and admin password in `.env`.
- **Payments**: Always verify Paystack payment server-side before ticket creation.
- **Security**: Use bcrypt (12 salt rounds), JWT (7-day expiry), crypto for draws.
- **Export**: Admin can export tickets as CSV via API.

## Integration Points
- **Paystack**: API keys in `.env` (PAYSTACK_PUBLIC_KEY, PAYSTACK_SECRET_KEY), payment utilities in `app/utils/paystack.js`.
- **Turso**: DB URL/token in `.env`, schema in `app/database/schema.sql`.
- **Netlify**: For deployment, use `.output/public` as publish dir, set env vars in Netlify settings.

## Key Files & Directories
- `app/components/` — UI components
- `app/pages/` — Main pages (landing, dashboard, admin, auth)
- `app/utils/paystack.js` — Paystack payment integration utilities
- `server/api/` — API endpoints (auth, tickets, admin)
- `app/database/schema.sql` — DB schema
- `.env` — Secrets and config
- `README.md` — Full setup and workflow details

## Example Patterns
- **Payment Flow**: Client uses `app/utils/paystack.js` to initialize payment, server verifies with Paystack API in `server/api/tickets/create.post.js`.
- **API route**: `server/api/tickets/create.post.js` verifies payment, generates ticket, saves to DB.
- **Auth middleware**: `app/middleware/auth.js` protects admin routes.
- **Ticket export**: `server/api/admin/export.get.js` returns CSV of tickets.

---
For more details, see `README.md` and code comments. Ask for clarification if any workflow or pattern is unclear.
