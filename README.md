# Online Express — Next.js E-Commerce Platform

A production-grade, responsive e-commerce web application built using **Next.js 16 (App Router + Turbopack)**, **React 19**, and **Tailwind CSS v4**, successfully migrating and enhancing an existing React application to modern server-first paradigms.

---

## 🚀 Quickstart & Setup

### Prerequisites
- **Node.js**: `v18.18+` or `v20+`
- **Package Manager**: `npm`

### 1. Installation
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the project root:
```env
API_URL=https://core-api-production.up.railway.app
NEXT_PUBLIC_API_URL=https://core-api-production.up.railway.app
```

### 3. Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 4. Production Build & Validation
```bash
npm run build
npm run start
```

---

## 📋 Assignment 1: Next.js Project Setup

### Objectives
- Set up a Next.js project using the App Router.
- Create Home and About pages inside a shared layout.
- Port theme colors, typography, and reusable components (`Button`, `Card`, `ProductCard`) from the React project.
- Port static Home page sections.
- Formulate a clear Server vs. Client Component architecture.

### Architectural Decisions: Server vs. Client Components

| Component | Type | Rationale |
| :--- | :--- | :--- |
| `src/app/layout.tsx` | **Server** | Root document structure, meta tags, and font definitions. Zero client JS. |
| `src/app/page.tsx` | **Server** | Composes static Home page sections without requiring browser state. |
| `src/app/about/page.tsx` | **Server** | Static company info, hero, and reusable `AboutCard` grids. Fully SEO-optimized. |
| `src/components/layout/Footer.tsx` | **Server** | Static trust bar, site map links, and copyright notice. |
| `src/components/products/CategoryGrid.tsx` | **Server** | Fetches categories server-side with fallback for instant, JS-free rendering. |
| `src/components/common/Button.tsx` | **Client** | Manages browser events (`onClick`), loading states, and interactive feedback. |
| `src/components/products/ProductCard.tsx` | **Client** | Holds interactive local item quantity state for purchasing workflows. |
| `src/components/products/FeaturedCarousel.tsx` | **Client** | Controls touch events, sliding navigation, and DOM events via Swiper. |
| `src/components/layout/Header.tsx` | **Client** | Reads pathname for active route indicators, manages search input, and controls mobile drawer state. |
| `src/components/layout/Sidebar.tsx` | **Client** | Interacts with Next.js navigation hooks (`useRouter`, `useSearchParams`) to update URL filters. |

### Design System & Theme Tokens
- Configured in `src/app/globals.css` using Tailwind v4 `@theme`.
- **Colors**:
  - `orange`: `#ea580c` (primary action / accent)
  - `charcoal`: `#1f2937` (primary headings & dark banners)
  - `muted`: `#6b7280` (subtitles & body descriptions)
  - `surface`: `#f9fafb` (card backgrounds & section fills)
  - `border`: `#e5e7eb` (industrial dividing lines)
- **Typography**: Custom `@font-face` configured for `IndustryTest-Black`, `IndustryTest-Bold`, and `IndustryTest-Medium`.

---

## 🛒 Assignment 2: E-commerce Layout Structure

### Objectives
- Create a Root Layout with responsive `Header` (NavBar) and `Footer`.
- Create a `(store)` layout with a category sidebar, keeping only the product listing page inside it.
- Create an `(auth)` layout for authentication workflows (login and registration).
- Build a responsive NavBar with logo, search, active route indicators, Sign In, and a cart icon with item count.
- Ensure the NavBar, sidebar, and layouts are fully responsive.

### Three Layout Groups Architecture

```
src/app/
├── layout.tsx                # [1] Root Layout: Shared Header + Children + Footer
├── page.tsx                  # Home Page (inside Root Layout)
├── about/page.tsx            # About Page (inside Root Layout)
├── (store)/                  # [2] Store Route Group
│   ├── layout.tsx            # 2-Column Store Layout (Breadcrumb + Title + Sidebar + Content)
│   └── products/page.tsx     # Product Listing Page (Filtered catalog)
└── (auth)/                   # [3] Auth Route Group
    ├── layout.tsx            # Centered, distraction-free Auth Shell
    ├── login/page.tsx        # Sign In form
    └── register/page.tsx     # Registration route
```

### Key Layout Features

1. **Root Layout (`src/app/layout.tsx`)**:
   - Houses the responsive sticky **Header** and **Footer**.
   - Includes full-width trust bar and comprehensive footer navigation.

2. **Store Layout (`src/app/(store)/layout.tsx`)**:
   - Dedicated shell isolating the product catalog.
   - Features top breadcrumbs (`Home › Products`), section title, and a `Refresh` button.
   - **Responsive 2-Column Grid**: `grid-cols-[200px_minmax(0,1fr)]` on desktop, transitioning seamlessly to a single column with an expandable mobile filter drawer on screens `<800px`.

3. **Auth Layout (`src/app/(auth)/layout.tsx`)**:
   - Clean, centered card presentation on a muted surface background (`min-h-[75vh]`).
   - Supports both `/login` and `/register`.

4. **Responsive Navigation Bar (`src/components/layout/Header.tsx`)**:
   - **Desktop / Tablet**: Search form, active page highlight with an orange underline dynamically matching word length, Sign In link, and Shopping Cart icon with a live item count badge.
   - **Mobile (<768px)**: Collapsible slide-out drawer with hamburger toggle, stacked search form (<600px), and touch-friendly navigation.

5. **Multi-Filter Sidebar (`src/components/layout/Sidebar.tsx`)**:
   - Real-time synchronization with URL search parameters (`useSearchParams`).
   - Supports Category filtering, Brand filtering, Price range inputs, Rating filtering, and Sort order.

---

## 📁 Clean Folder Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (store)/
│   │   ├── layout.tsx
│   │   └── products/page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── about/
│   │   └── AboutCard.tsx
│   ├── common/
│   │   ├── Arrow.tsx
│   │   ├── Breadcrumb.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Pagination.tsx
│   │   └── QuantitySelector.tsx
│   ├── layout/
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   └── Sidebar.tsx
│   └── products/
│       ├── CategoryGrid.tsx
│       ├── CtaCard.tsx
│       ├── CtaGrid.tsx
│       ├── FeaturedCarousel.tsx
│       ├── ProductCard.tsx
│       ├── RefreshButton.tsx
│       └── filters/
│           ├── BrandFilter.tsx
│           ├── CategoryFilter.tsx
│           ├── PriceFilter.tsx
│           ├── RatingFilter.tsx
│           └── SortFilter.tsx
├── data/
│   └── products.json
├── services/
│   ├── apiClient.ts
│   └── apiService.ts
├── types/
│   ├── api.ts
│   ├── button.ts
│   ├── card.ts
│   ├── filterPropTypes.ts
│   ├── pagination.ts
│   └── product.ts
└── utils/
    ├── cn.ts
    └── dataTransformation.ts
```

---

## ✅ Deliverables Verification

- [x] **Next.js project running locally with 0 errors**: Checked with Turbopack dev server and `npm run build`.
- [x] **Home and About pages rendered inside shared layout**: Accessible at `/` and `/about`.
- [x] **Ported components and theme working**: Typography, colors, and button/card variants verified.
- [x] **Three layouts working for respective pages**: Root (`/`, `/about`), Store (`/products`), and Auth (`/login`, `/register`).
- [x] **Responsive NavBar, Sidebar, and Footer**: Tested across desktop, tablet, and mobile breakpoints.
- [x] **Folder structure reflects layout groups**: `(store)` and `(auth)` route groups implemented cleanly.
