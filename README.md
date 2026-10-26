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
API_URL=https://training-ecom1-a9a2cmbsefdvgwha.centralindia-01.azurewebsites.net
```
> **Security Note:** `API_URL` is kept **server-only** (without `NEXT_PUBLIC_` prefix) to prevent leaking internal upstream API URLs or credentials to the browser bundle.

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
| `src/app/products/[id]/page.tsx` | **Server** | Dynamic product route; fetches data server-side; generates dynamic SEO metadata. |
| `src/app/api/products/route.ts` | **Server (Route Handler)** | REST API proxy and transformation wrapper for product list & creation. |
| `src/app/api/products/[id]/route.ts` | **Server (Route Handler)** | REST API proxy for individual product retrieval, update, and deletion. |
| `src/components/layout/Footer.tsx` | **Server** | Static trust bar, site map links, and copyright notice. |
| `src/components/products/CategoryGrid.tsx` | **Server** | Fetches categories server-side with fallback for instant, JS-free rendering. |
| `src/components/common/Button.tsx` | **Client** | Manages browser events (`onClick`), loading states, and interactive feedback. |
| `src/components/products/ProductCard.tsx` | **Client** | Holds interactive local item quantity state for purchasing workflows. |
| `src/components/products/AddToCartSection.tsx` | **Client** | Isolates interactive quantity selection, Add to Cart event, and success toast. |
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

### Layout Groups Architecture

```
src/app/
├── layout.tsx                # [1] Root Layout: Shared Header + Children + Footer
├── page.tsx                  # Home Page (inside Root Layout)
├── about/page.tsx            # About Page (inside Root Layout)
├── products/[id]/page.tsx    # Dynamic Product Details Page (Full width, outside store layout)
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

## 🧭 Assignment 3: Navigation System

### Objectives
- Implement `next/link` across all internal navigation.
- Implement `usePathname` for dynamic active link highlighting.
- Implement the dynamic products route (`/products/[id]`).
- Port breadcrumb navigation so it dynamically updates per page.
- Ensure Hero search and category cards lead to the product listing with the correct parameters.

### Key Implementation Details

1. **Dynamic Product Details Route (`src/app/products/[id]/page.tsx`)**:
   - Created **outside** the `(store)` route group so the detail view does not inherit the catalog filter sidebar, while retaining the clean URL `/products/:id`.
   - Async Server Component utilizing Next.js 16 awaited params: `const { id } = await params`.
   - Generates dynamic SEO metadata (`generateMetadata`) reflecting the active product name and description.
   - Server-renders product specifications, tax-inclusive pricing, brand/category badges, ratings, and guarantee perks.
   - Renders interactive quantity controls and cart submission in [`AddToCartSection.tsx`](file:///c:/CustomApps/NextJs/Next-Assignment-AFDP/src/components/products/AddToCartSection.tsx).

2. **Reachable Links (`next/link`)**:
   - Updated [`ProductCard.tsx`](file:///c:/CustomApps/NextJs/Next-Assignment-AFDP/src/components/products/ProductCard.tsx) image and title links to point to `/products/${id}`.
   - Cleaned up [`CategoryGrid.tsx`](file:///c:/CustomApps/NextJs/Next-Assignment-AFDP/src/components/products/CategoryGrid.tsx) to apply button styling directly to `<Link>`, eliminating invalid nested `<button>` inside `<a>` tags.
   - Back-link on detail page routes back to `/products`.

3. **Dynamic Breadcrumbs (`src/components/common/Breadcrumb.tsx`)**:
   - Standardized strictly on `href` property.
   - Automatically generates breadcrumbs for static paths (`Home › Products`, `Home › About Us`).
   - Accepts custom `items` on dynamic routes to render `Home › Products › [Product Name]` instead of numeric IDs.

4. **Active Link Highlighting (`usePathname`)**:
   - Updated `isActive` in [`Header.tsx`](file:///c:/CustomApps/NextJs/Next-Assignment-AFDP/src/components/layout/Header.tsx):
     ```ts
     const isActive = (href: string) => {
         if (href === "/") return pathname === "/";
         return pathname === href || pathname.startsWith(`${href}/`);
     };
     ```
   - "Products" remains highlighted when on `/products` as well as any `/products/:id` subroute.

5. **Discovery Entry Points**:
   - Hero search form routes directly to `/products?search=...`.
   - Category grid cards route directly to `/products?categoryId=...`.

---

## ⚡ Assignment 4: Product Catalog REST API (Wrapper)

### Objectives
- Build a wrapper API with Route Handlers on top of the existing .NET product API, for product CRUD only:
  - `GET /api/products` with pagination
  - `POST /api/products`
  - `GET /api/products/[id]`
  - `PUT /api/products/[id]`
  - `DELETE /api/products/[id]`
- Configure .NET API base URL using environment variables and keep it strictly on the server (`API_URL`).
- Convert .NET responses into the product shape used in the React app (`id`, `name`, `price`, `category`, `image`, `rating`), and convert incoming request bodies back to what .NET expects.
- Pass `page` and `pageSize` through to the .NET API and return total count for the `"Showing X of Y products"` indicator.
- Return proper status codes and error messages for invalid input (400), non-existent products (404), and upstream failures (502).

### Architecture & Data Flow

```
[Browser / Client Component]
       │
       ▼ (1) HTTP fetch via /api/products (Browser-safe)
[Next.js Route Handlers: /api/products]
       │
       ▼ (2) Direct TypeScript call
[Server Service Layer: productApiService] ◄── [Server Components: page.tsx]
       │                                         (Direct call — NO self-fetch overhead)
       ▼ (3) Server-to-Server HTTP with process.env.API_URL
[.NET Web API Backend: /api/v1/Products/...]
```

### Route Handler Endpoints

| Endpoint | Method | Description | Status Codes |
| :--- | :--- | :--- | :--- |
| `/api/products` | `GET` | Parses pagination (`page`, `pageSize`) and filters. Forwards to upstream .NET search endpoint. Returns transformed product list with total count. | `200 OK`, `400 Bad Request`, `502 Bad Gateway` |
| `/api/products` | `POST` | Validates incoming JSON (`name`, `price`, `categoryId`). Maps React shape ➔ .NET shape. Forwards to .NET create endpoint. | `201 Created`, `400 Bad Request`, `502 Bad Gateway` |
| `/api/products/[id]` | `GET` | Awaits `params.id`. Validates numeric ID. Forwards to .NET by-ID endpoint. Returns React product shape. | `200 OK`, `400 Bad Request`, `404 Not Found`, `502 Bad Gateway` |
| `/api/products/[id]` | `PUT` | Awaits `params.id`. Validates ID & body fields. Forwards update to .NET API. Returns updated product. | `200 OK`, `400 Bad Request`, `404 Not Found`, `502 Bad Gateway` |
| `/api/products/[id]` | `DELETE`| Awaits `params.id`. Validates ID. Forwards deletion to upstream .NET API. | `200 OK`, `400 Bad Request`, `404 Not Found`, `502 Bad Gateway` |

### Notes on Endpoint Testing & Verification

All 5 endpoints were tested against the running Next.js application using an automated test suite ([`scripts/test-endpoints.js`](file:///c:/CustomApps/NextJs/Next-Assignment-AFDP/scripts/test-endpoints.js)). You can execute the entire test suite locally anytime with:

```bash
npm run test:api
```

The test runner verifies HTTP status codes, response contracts, and error resilience across 7 test cases:

1. **`GET /api/products?page=1&pageSize=2` (Pagination & Contract Test)**:
   - **Result**: `Status 200 OK`.
   - **Payload**: Returned `{ products: [...], page: 1, pageSize: 2, totalRecords: 30, totalPages: 15 }`.
   - **Contract Verification**: Successfully transformed .NET DTO fields into React shape (`id`, `name`, `category`, `price`, `imageUrl`, `image`, `rating`).
2. **`GET /api/products/1` (Single Product Retrieval)**:
   - **Result**: `Status 200 OK`.
   - **Payload**: Returned individual product object with formatted price and details.
3. **`GET /api/products/9999999` (404 Not Found Test)**:
   - **Result**: `Status 404 Not Found`.
   - **Payload**: `{"error":"Not Found"}`.
4. **`GET /api/products/invalid-id` (400 Input Validation Test)**:
   - **Result**: `Status 400 Bad Request`.
   - **Payload**: `{"error":"Invalid product ID. ID must be a numeric value."}`.
5. **`POST /api/products` (Validation Failure Test)**:
   - **Request**: Sent `{ name: "Incomplete Product" }` (missing required `price` and `categoryId`).
   - **Result**: `Status 400 Bad Request`.
   - **Payload**: `{"error":"Product price is required."}`.
6. **`PUT /api/products/1` (Validation Failure Test)**:
   - **Request**: Sent `{ price: -50 }` (negative price).
   - **Result**: `Status 400 Bad Request`.
   - **Payload**: `{"error":"Price must be a valid non-negative number."}`.
7. **`DELETE /api/products/9999999` (Upstream Handling)**:
   - **Result**: Cleanly captured upstream status and error response without server crash.

---

## 🔍 Assignment 5: Product Listing, Search and Product Page

### Objectives
- Fetch product catalog and single product data inside Server Components for optimal performance, instant First Contentful Paint (FCP), and search engine optimization (SEO).
- Implement a generic debounced search hook (`useDebounce<T>`) and synchronize keystrokes directly with the URL `search` parameter without full page reloads.
- Keep category, brand, price range, rating, sort order, and pagination in complete synchronization with shareable, bookmarkable URL query parameters.
- Provide responsive empty states (`"No products found"`) and an active `"Showing X of Y results"` count.
- Keep the Product Details Page server-rendered at `/products/[id]` with dynamic SEO metadata, and isolate interactivity (`QuantitySelector`, `AddToCartSection` toast) inside targeted Client Components.
- Implement production-grade streaming skeletons (`loading.tsx`), resilient error boundaries (`error.tsx`), and clean not-found handlers (`not-found.tsx`).

### 📐 Architectural Breakdown: Server vs. Client Components

Next.js App Router promotes rendering as much as possible on the server, pushing Client Component boundaries to the interactive leaves of the component tree.

| Component / Route File | Component Type | Architectural Rationale |
| :--- | :--- | :--- |
| `src/app/(store)/products/page.tsx` | **Server Component** | Awaits Next.js 16 `searchParams`, executes server-only data fetching directly via `productApiService.getProducts()` without client bundle bloat or waterfall network hops, and renders the catalog HTML on the server. |
| `src/app/products/[id]/page.tsx` | **Server Component** | Awaits dynamic route `params`, fetches product details on the server, generates dynamic SEO and OpenGraph metadata (`generateMetadata`), preventing layout shift. |
| `src/app/(store)/layout.tsx` | **Server Component** | Fetches `categories` and `brands` in parallel on the server using `Promise.all` and passes them as static props into the sidebar. |
| `src/components/products/ProductCard.tsx` | **Server Component** | Pure presentational component that renders semantic HTML, product links, formatted prices, and ratings without client state or event listeners. |
| `src/components/layout/Header.tsx` | **Client Component** (`"use client"`) | Requires DOM event listeners for user input keystrokes, mobile hamburger drawer toggle, and synchronizes URL search parameters via `useSearchParams()` and `useRouter()`. |
| `src/hooks/useDebounce.ts` | **Client Hook** | Uses `useState` and `useEffect` with a timer to delay updating debounced values by 300ms, preventing API request flooding. |
| `src/components/layout/Sidebar.tsx` | **Client Component** (`"use client"`) | Manages accordion states for mobile filter expansion and triggers interactive URL filter pushes. |
| `src/components/products/filters/*` | **Client Components** (`"use client"`) | Renders interactive checkboxes, radio buttons, and toggles for category, brand, price range, rating, and sort direction. |
| `src/components/common/Pagination.tsx` | **Client Component** (`"use client"`) | Listens to page clicks and navigates via `router.push()` while preserving all existing filter and search parameters. |
| `src/components/products/AddToCartSection.tsx` | **Client Component** (`"use client"`) | Isolates local quantity state (`quantity`), dynamic price calculation, and 2.5s temporary feedback toast to an interactive island. |
| `src/app/(store)/products/loading.tsx` | **Server Component** | Instant streaming skeleton matching the 8-card grid, info bar, and pagination controls for zero Cumulative Layout Shift (CLS). |
| `src/app/(store)/products/error.tsx` | **Client Component** (`"use client"`) | Catches unexpected server/network failures and renders an interactive **"Try Again"** button calling `reset()`. |
| `src/app/products/[id]/loading.tsx` | **Server Component** | Instant streaming skeleton for breadcrumbs, image container, badges, ratings, price, description, and AddToCart section. |
| `src/app/products/[id]/error.tsx` | **Client Component** (`"use client"`) | Error boundary for server outages with **"Try Again"** and **"Browse All Products"** navigation. |
| `src/app/products/[id]/not-found.tsx` | **Server Component** | Dedicated 404 page rendered when a product does not exist, with navigation back to `/products`. |

### ⚡ Debounced Search & URL Synchronization

The search flow is powered by the generic `useDebounce` hook ([`src/hooks/useDebounce.ts`](file:///c:/CustomApps/NextJs/Next-Assignment-AFDP/src/hooks/useDebounce.ts)):
```typescript
import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number = 300): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}
```

1. **Context-Aware Routing:**
   - **On `/products`**: As the user types into the header search bar, keystrokes are debounced by 300ms. When `debouncedSearch` changes, `Header.tsx` automatically updates the URL query string (`?search=...`) and resets the pagination parameter (`page`), triggering a server re-fetch without full page reload.
   - **On other routes (`/`, `/about`, `/login`)**: The search input does not navigate on every keystroke. Pressing Enter or clicking the magnifying glass explicitly routes the user to `/products?search=...`.
2. **Bidirectional State Sync (React 19 Safe):**
   - The search input initializes from `searchParams.get("search")`.
   - When the URL changes externally (e.g., navigating back in browser history or clicking a category link), the input value adjusts during render without triggering React 19's `react-hooks/set-state-in-effect` cascade warning.

### 🔄 Multi-Filter & Shareable URL Query State

All catalog state is represented directly in the URL:
- `search`: Filter by keyword.
- `categoryId`: Filter by specific category ID.
- `brandId`: Filter by specific brand ID.
- `minPrice` & `maxPrice`: Filter by selected price bracket.
- `minRating`: Filter by minimum customer review score (3+ or 4+ stars).
- `sortBy`: Sort property (`name`, `price`, `rating`).
- `sortOrder`: Sort direction (`asc`, `desc`).
- `page`: Current page index.

Because all state lives in the URL query string:
- Any filtered catalog view can be copied and shared with other users.
- Refreshing the page preserves the exact search terms, active filters, and sort options.
- Unchecking a filter cleanly removes the key from the query string and recalculates the result set.

### 🛡️ Three-Tier Error & Loading Strategy

1. **404 Not Found**: If a product does not exist, `notFound()` is invoked in `src/app/products/[id]/page.tsx`, rendering `not-found.tsx` with proper 404 HTTP status.
2. **5xx / Network Outage**: If the backend API fails, the server component throws `new Error(...)`, triggering `error.tsx` with an interactive "Try Again" `reset()` button.
3. **Empty Filter Results**: If a valid filter returns 0 products, an inline empty state (`"No products found"`) renders inside the layout with sidebar filters intact.
4. **Streaming Skeletons**: `loading.tsx` renders instantaneously via React Suspense, eliminating layout shift while backend data is fetched.

---

## ⚡ Assignment 6: Product Catalog with SSG and ISR

### Objectives
- Statically generate the Product Listing Page shell and category catalog at build time.
- Implement **Incremental Static Regeneration (ISR)** with 60-second background revalidation on the Product Details Page (`/products/[id]`) using `generateStaticParams()`.
- Move Home Page featured products fetching from client-side `useEffect` to server-side rendering with ISR.
- Eliminate mock data fallbacks, ensuring real errors flow directly to error boundaries.
- Provide a rigorous, in-depth architectural comparison between traditional React Client-Side Fetching and Next.js SSG/ISR.

---

### 🏗️ SSG and ISR Implementation Architecture

#### 1. Home Page Featured Products (`/`)
- **Server Component**: [`src/app/page.tsx`](file:///c:/CustomApps/NextJs/Next-Assignment-AFDP/src/app/page.tsx) is an asynchronous Server Component that fetches the top 8 products server-side using `productApiService.getProducts({ Page: 1, PageSize: 8 }, { next: { revalidate: 60 } })`.
- **Eliminated Client Waterfall**: The client carousel component ([`FeaturedCarousel.tsx`](file:///c:/CustomApps/NextJs/Next-Assignment-AFDP/src/components/products/FeaturedCarousel.tsx)) receives `initialProducts` as a prop and renders immediately without initiating a client-side `useEffect` network request.
- **Prerendered with ISR**: Configured segment-level `export const revalidate = 60;`. Next.js prerenders the Home page at build time (`○ /` with `Revalidate 1m Expire 1y`).

#### 2. Product Details Page ISR (`/products/[id]`)
- **`generateStaticParams()`**: Queries the upstream API at build time to statically generate HTML for the top 20 known product IDs (`/products/1`, `/products/2`, etc.).
- **60-Second Background Revalidation**: Segment-level `export const revalidate = 60;` applies the Stale-While-Revalidate caching strategy. The first visitor after 60 seconds is served the cached page instantly while Next.js triggers a background revalidation to query the API and update the cache for future visitors.
- **On-Demand Generation (`export const dynamicParams = true;`)**: Products not pre-rendered at build time are generated on-demand upon first visit, served to the user, and immediately added to the ISR cache for subsequent requests.
- **Error Boundaries**: Dedicated error boundary ([`src/app/products/[id]/error.tsx`](file:///c:/CustomApps/NextJs/Next-Assignment-AFDP/src/app/products/[id]/error.tsx)) and 404 page ([`src/app/products/[id]/not-found.tsx`](file:///c:/CustomApps/NextJs/Next-Assignment-AFDP/src/app/products/[id]/not-found.tsx)) handle failures cleanly without dummy fallbacks.

#### 3. Product Listing Shell & Catalog (`/products`)
- **Statically Cached Shell**: The store layout ([`src/app/(store)/layout.tsx`](file:///c:/CustomApps/NextJs/Next-Assignment-AFDP/src/app/(store)/layout.tsx)) pre-renders the page heading, breadcrumbs, sidebar categories, and brand filters with 60-second ISR caching.
- **Dynamic Query Filtering**: Dynamic URL search parameters (`?search=...&categoryId=...&page=...`) are rendered on-demand on the server with underlying API requests cached per query in the Next.js Data Cache.

---

### 📊 In-Depth Comparison: React Client-Side Fetching vs. Next.js SSG / ISR

| Feature / Metric | Traditional React (Client-Side Fetching) | Next.js SSG / ISR (Incremental Static Regeneration) |
| :--- | :--- | :--- |
| **Initial HTML Payload** | **Empty Shell (`<div id="root"></div>`)**.<br>Contains no product text, images, or semantic content. | **Complete, Semantic HTML Document**.<br>Product cards, images, titles, prices, and links are fully formed in the initial response. |
| **Time to First Byte (TTFB)** | Fast TTFB for the empty HTML shell, but misleading because the user cannot see or interact with any data. | **Ultra-Low TTFB (<50ms)**.<br>Cached static pages are served directly from edge CDN / server memory cache without database delay. |
| **First Contentful Paint (FCP)** | Delayed until the browser downloads, parses, and executes the entire React bundle. | **Near Instantaneous**.<br>The browser paints meaningful UI content on the first rendered frame. |
| **Largest Contentful Paint (LCP)** | **Slow (1.8s - 3.5s+)**.<br>Must complete: HTML download $\rightarrow$ JS parse/execute $\rightarrow$ component mount $\rightarrow$ API network call $\rightarrow$ state update $\rightarrow$ DOM render. | **Fast (<0.8s - 1.2s)**.<br>The largest content element (hero image, product image, title) is embedded directly in the initial HTML markup. |
| **Cumulative Layout Shift (CLS)** | **High Risk**.<br>Page elements jump and shift when API responses arrive and replace loading spinners or empty containers with cards. | **Zero CLS (0.00)**.<br>Grid layouts, card dimensions, and text placeholders are present in the DOM from the initial paint. |
| **Search Engine Optimization (SEO)** | **Poor**.<br>Web crawlers (Googlebot, Bingbot, social media bots) often miss asynchronously fetched content or penalize slow rendering. | **Excellent**.<br>Search engine spiders index complete HTML, metadata, and Open Graph tags immediately without JavaScript execution. |
| **Social Media Sharing (Open Graph)** | **Fails**.<br>Facebook, Twitter/X, and WhatsApp scrapers do not run client JavaScript, resulting in generic or empty link previews. | **Fully Functional**.<br>`generateMetadata` embeds per-product Open Graph titles, descriptions, and canonical URLs on the server. |
| **Data Freshness** | **Strictly Real-Time**.<br>Fetches fresh data on every component mount, at the cost of high latency and server load. | **Configurable Freshness (e.g. 60s)**.<br>Serves cached data instantly while refreshing in the background at set intervals via Stale-While-Revalidate. |
| **Server / Database Load** | **High**.<br>Every single page view across all users triggers a distinct HTTP request to the backend database/API. | **Extremely Low**.<br>Thousands of user visits within a 60-second window hit the static cache, resulting in only 1 backend query per minute. |
| **Offline / Slow Network Resilience** | Shows a blank screen or spinner until connection succeeds. Fails completely on poor mobile connections. | Static HTML and cached pages remain viewable even if connection drops or the backend API encounters transient latency. |
| **Client JS Bundle Size** | Larger bundle because client components must include data-fetching libraries, abort controllers, and error handlers. | Smaller bundle because data-fetching logic, schemas, and transformations stay strictly on the server. |

---

### 🖥️ Verified Next.js Production Build Output

Running `npm run build` generates the complete production route matrix:

```text
Route (app)             Revalidate  Expire
┌ ○ /                           1m      1y
├ ○ /_not-found
├ ○ /about
├ ƒ /api/products
├ ƒ /api/products/[id]
├ ○ /login
├ ƒ /products
├   /products/[id]
│ ├ ● /products/1               1m      1y
│ ├ ● /products/2               1m      1y
│ ├ ● /products/3               1m      1y
│ └ ● [+17 more paths]
└ ○ /register

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```

- `○ /`: Home Page statically pre-rendered with 60-second ISR.
- `● /products/[id]`: Product Details pre-renders 20 static product pages with 60-second ISR, generating new product IDs on-demand (`dynamicParams = true`).
- `ƒ /products`: Product Catalog dynamically renders on-demand to process combined URL search, filter, and pagination parameters, backed by Next.js Data Cache.

---

## 📁 Clean Folder Structure

```
scripts/
└── test-endpoints.js                 # Automated test suite for Assignment 4 API wrapper
src/
├── app/
│   ├── (auth)/
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (store)/
│   │   ├── layout.tsx
│   │   └── products/
│   │       ├── error.tsx             # Error boundary with reset()
│   │       ├── loading.tsx           # 8-card streaming skeleton
│   │       └── page.tsx              # Product catalog (Server Component)
│   ├── about/
│   │   └── page.tsx
│   ├── api/
│   │   └── products/
│   │       ├── route.ts              # GET (list + pagination), POST (create)
│   │       └── [id]/
│   │           └── route.ts          # GET (detail), PUT (update), DELETE (remove)
│   ├── products/
│   │   └── [id]/
│   │       ├── error.tsx             # Detail error boundary
│   │       ├── loading.tsx           # Full-page detail skeleton
│   │       ├── not-found.tsx         # Dedicated 404 page
│   │       └── page.tsx              # Dynamic Product Details Page (Server Component)
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
│       ├── AddToCartSection.tsx      # Client Component for Product Details Page
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
├── hooks/
│   └── useDebounce.ts                # Generic 300ms debouncing hook for search input
├── services/
│   ├── apiClient.ts                  # Resilient HTTP request utility with status tracking
│   └── productApiServices.ts         # Server-only .NET API communication service
├── types/
│   ├── api.ts                        # ApiResult with HTTP status codes
│   ├── button.ts
│   ├── card.ts
│   ├── filterPropTypes.ts
│   ├── pagination.ts
│   └── product.ts                    # Product, ProductResponse, ProductCreateInput, ProductUpdateInput
└── utils/
    ├── cn.ts
    └── dataTransformation.ts         # Bidirectional schema mappers and input validators
```

---

## ✅ Deliverables Verification

### Assignment 1 & 2
- [x] **Next.js project running locally with 0 errors**: Checked with Turbopack dev server and `npm run build`.
- [x] **Home and About pages rendered inside shared layout**: Accessible at `/` and `/about`.
- [x] **Ported components and theme working**: Typography, colors, and button/card variants verified.
- [x] **Three layouts working for respective pages**: Root (`/`, `/about`), Store (`/products`), and Auth (`/login`, `/register`).
- [x] **Responsive NavBar, Sidebar, and Footer**: Tested across desktop, tablet, and mobile breakpoints.
- [x] **Folder structure reflects layout groups**: `(store)` and `(auth)` route groups implemented cleanly.

### Assignment 3: Navigation System
- [x] **All main pages reachable through links**: Nav links, product cards, category cards, and back-links.
- [x] **Active link highlighting**: `usePathname` active indicator in Header covers main routes and `/products/:id` subroutes.
- [x] **Breadcrumbs updating per page**: Breadcrumbs reflect `Home › Products › [Product Name]` dynamically.
- [x] **Working search and category entry points**: Hero search and category grid cards connect seamlessly to filtered catalog.
- [x] **Dynamic products route implemented**: Accessible at `/products/[id]` with server data fetching and SEO metadata.

### Assignment 4: Product Catalog REST API (Wrapper)
- [x] **Five working Route Handlers**: GET, POST, GET [id], PUT [id], DELETE [id].
- [x] **Environment-based API configuration**: Uses server-only `API_URL` without browser exposure.
- [x] **Paginated product list response**: Returns paginated products with `totalRecords` and `totalPages`.
- [x] **Correct HTTP status codes**: 200, 201, 400 Bad Request, 404 Not Found, 502 Bad Gateway.
- [x] **Notes on how each endpoint was tested**: Documented test cases, inputs, and verified outputs.

### Assignment 5: Product Listing, Search and Product Page
- [x] **Listing page with search, filters, sort and pagination combined**: Operates together over URL state on `/products`.
- [x] **Debounced search**: Implemented via generic `useDebounce` hook (300ms) with zero layout shift.
- [x] **State driven by the URL**: All filters, search terms, sorting, and pagination survive browser refresh and link sharing.
- [x] **Empty state and product count**: Active `"Showing X of Y results"` and clean empty state for unmatched filters.
- [x] **Product details page showing server-fetched data**: Dynamic route `/products/[id]` with SSR data and metadata.
- [x] **Working Add to Cart control**: Isolated client component with quantity controls and feedback toast.
- [x] **Streaming Loading & Error Boundaries**: Instant skeletons (`loading.tsx`), resilient error recovery (`error.tsx`), and dedicated 404 handling (`not-found.tsx`).
- [x] **Architectural documentation**: Comprehensive Server vs. Client breakdown table and rationale.

### Assignment 6: Product Catalog with SSG and ISR
- [x] **Product Listing Page Shell SSG**: Pre-renders store layout, sidebar, and breadcrumbs with 60-second ISR.
- [x] **Product Details Page ISR with 60-Second Revalidation**: `export const revalidate = 60` and `generateStaticParams()` pre-render top 20 known product pages at build time.
- [x] **On-Demand Static Generation (`dynamicParams = true`)**: New or unbuilt product IDs are rendered on-demand on first request and cached for future visitors.
- [x] **Home Page Featured Products Server-Fetched**: Direct server component fetching with zero client `useEffect` waterfall.
- [x] **Zero Mock Data Fallback**: Real API data with graceful error boundary recovery and dedicated 404 pages.
- [x] **Documented Comparison**: Exhaustive comparison table comparing traditional React client-side fetching to Next.js SSG/ISR across 11 key performance, SEO, and UX metrics.
- [x] **Verified Production Build**: Full build output captured and documented (`○`, `●`, `ƒ`).

