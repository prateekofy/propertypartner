# PropertyPartner AI — Working SaaS Demo

A real estate dealer CRM and collaboration marketplace demo for Indian property dealers.
Next.js 14 (App Router) · TypeScript · Tailwind CSS · Lucide · Recharts · LocalStorage.
No backend, no API keys, no payment gateway. All people, phone numbers and figures are **fictional**.

## Run on Windows (PowerShell)

Requires Node.js 18.18+ (20 LTS recommended).

```powershell
cd path\to\propertypartner-ai
node -v
npm install
npm run dev
```

Open http://localhost:3000

Verification commands:

```powershell
npm run typecheck
npm run lint
npm run build
npm run start
```

## Pages
Dashboard · Property Inventory · Leads & Buyers · Smart Matching · Dealer Network · Shared Listings ·
Deal Rooms · Commission Tracker · Marketing Tasks · Notifications · Settings (Reset Demo Data).

## Code layout
```
src/app/            routes (one folder per page), layout, error, not-found
src/components/     ui.tsx (design-system primitives), shell.tsx (sidebar/topbar)
src/components/features/  drawers, deal form/drawer, commission panel, print statement
src/lib/types.ts    typed data model and constants
src/lib/seed.ts     fictional Delhi/NCR seed data
src/lib/store.tsx   shared state + LocalStorage persistence + toasts
src/lib/commission.ts  split engine (integer paise / basis points)
src/lib/matching.ts    deterministic 0-100 match scoring
src/lib/mutations.ts   pure data helpers, notifications, reminder sync
```

## How key logic works
- **Money**: commission amounts are integer paise; percentages are basis points (50% = 5000). Rounding paise are distributed by largest remainder so a valid 100% split always sums exactly.
- **Matching** (max 100): budget 35, locality 25, property type 20, bedrooms 20. Only Available properties whose Sale/Rent type fits the lead's Buy/Rent intent are considered. Nearby localities and near-budget properties earn partial credit. Every score comes with a per-criterion explanation.
- **Acceptance rule**: a participant can be marked Accepted only when allocations are valid and nothing is unallocated (pure-percentage splits must equal exactly 100%). Changing any commission term resets agreements to Proposed. Deals cannot move to Agreement or Closed with an invalid split.
- **Privacy**: properties owned by other dealers appear only after you accept a share. Owner name/phone are shown only for Collaboration access.
- **Integrity**: leads/properties linked to a deal cannot be deleted (a clear message names the deal). Deleting a property also removes its marketing tasks, shares and saved matches. Closing a deal marks the lead Won and your property Sold/Rented.
- **Demo helpers**: "Simulate incoming request", "Simulate acceptance" and "Simulate: dealer accepts" stand in for the other side of a network interaction.

## Known limitations
- Single browser-local user; no authentication, no multi-dealer accounts, no real privacy enforcement.
- UI primitives are hand-written shadcn-style components (no Radix / shadcn CLI), to keep installation dependency-light.
- Property images use picsum.photos URLs (need internet; blank otherwise).
- Dealer "available listings" counts are seeded numbers for the network profiles.
- Print statement uses the browser print dialog (choose "Save as PDF" if needed).
- Not mobile-device tested; layout is responsive by design.

## Next steps
Supabase auth + database → multi-dealer permissions → WhatsApp follow-ups → Razorpay subscriptions → AI qualification → portal integrations (subject to portal APIs).
