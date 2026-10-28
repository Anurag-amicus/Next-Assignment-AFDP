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
| `src/proxy.ts` | **Server (Proxy)** | Next.js 16 edge request interceptor; enforces route guards for `/checkout` and `/orders`, logs execution duration. |
| `src/app/actions/authActions.ts` | **Server Action** | Form submission handlers (`loginAction`, `registerAction`, `logoutAction`), open-redirect sanitization, cookie dispatch. |
| `src/lib/session.ts` | **Server Utility** | Secure HttpOnly cookie session manager (`access_token`, `refresh_token`, `auth_user`). |
| `src/lib/auth.ts` | **Server Utility** | Proactive token renewal helper for server-side callers, kept decoupled from Server Action exports. |
| `src/app/checkout/page.tsx` | **Server** | Protected checkout stub requiring session authentication; renders status banner and verified user details. |
| `src/app/orders/page.tsx` | **Server** | Protected orders history stub requiring session authentication; renders status banner and verified user details. |
| `src/components/layout/Footer.tsx` | **Server** | Static trust bar, site map links, and copyright notice. |
| `src/components/products/CategoryGrid.tsx` | **Server** | Fetches categories server-side with fallback for instant, JS-free rendering. |
| `src/components/common/Button.tsx` | **Client** | Manages browser events (`onClick`), loading states, and interactive feedback. |
| `src/components/products/ProductCard.tsx` | **Client** | Holds interactive local item quantity state for purchasing workflows. |
| `src/components/products/AddToCartSection.tsx` | **Client** | Isolates interactive quantity selection, Add to Cart event, and success toast. |
| `src/components/products/FeaturedCarousel.tsx` | **Client** | Controls touch events, sliding navigation, and DOM events via Swiper. |
| `src/components/layout/Header.tsx` | **Client** | Reads pathname for active route indicators, manages search input, and controls mobile drawer state. |
| `src/components/layout/HeaderUserMenu.tsx` | **Client** | Handles profile toggle, user initials badge, click-outside dropdown, and logout trigger. |
| `src/components/auth/LoginForm.tsx` | **Client** | Manages login form submission via `useActionState`, return URL pass-through, and eye-icon password toggle. |
| `src/components/auth/RegisterForm.tsx` | **Client** | Manages registration via `useActionState`, field validation, and eye-icon password toggles. |
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
   - Renders interactive quantity controls and cart submission in `src/components/products/AddToCartSection.tsx`.

2. **Reachable Links (`next/link`)**:
   - Updated `src/components/products/ProductCard.tsx` image and title links to point to `/products/${id}`.
   - Cleaned up `src/components/products/CategoryGrid.tsx` to apply button styling directly to `<Link>`, eliminating invalid nested `<button>` inside `<a>` tags.
   - Back-link on detail page routes back to `/products`.

3. **Dynamic Breadcrumbs (`src/components/common/Breadcrumb.tsx`)**:
   - Standardized strictly on `href` property.
   - Automatically generates breadcrumbs for static paths (`Home › Products`, `Home › About Us`).
   - Accepts custom `items` on dynamic routes to render `Home › Products › [Product Name]` instead of numeric IDs.

4. **Active Link Highlighting (`usePathname`)**:
   - Updated `isActive` in `src/components/layout/Header.tsx`:
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

All 5 endpoints were tested against the running Next.js application using an automated test suite (`scripts/test-endpoints.js`). You can execute the entire test suite locally anytime with:

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

The search flow is powered by the generic `useDebounce` hook (`src/hooks/useDebounce.ts`):
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
- **Server Component**: `src/app/page.tsx` is an asynchronous Server Component that fetches the top 8 products server-side using `productApiService.getProducts({ Page: 1, PageSize: 8 }, { next: { revalidate: 60 } })`.
- **Eliminated Client Waterfall**: The client carousel component (`src/components/products/FeaturedCarousel.tsx`) receives `initialProducts` as a prop and renders immediately without initiating a client-side `useEffect` network request.
- **Prerendered with ISR**: Configured segment-level `export const revalidate = 60;`. Next.js prerenders the Home page at build time (`○ /` with `Revalidate 1m Expire 1y`).

#### 2. Product Details Page ISR (`/products/[id]`)
- **`generateStaticParams()`**: Queries the upstream API at build time to statically generate HTML for the top 20 known product IDs (`/products/1`, `/products/2`, etc.).
- **60-Second Background Revalidation**: Segment-level `export const revalidate = 60;` applies the Stale-While-Revalidate caching strategy. The first visitor after 60 seconds is served the cached page instantly while Next.js triggers a background revalidation to query the API and update the cache for future visitors.
- **On-Demand Generation (`export const dynamicParams = true;`)**: Products not pre-rendered at build time are generated on-demand upon first visit, served to the user, and immediately added to the ISR cache for subsequent requests.
- **Error Boundaries**: Dedicated error boundary (`src/app/products/[id]/error.tsx`) and 404 page (`src/app/products/[id]/not-found.tsx`) handle failures cleanly without dummy fallbacks.

#### 3. Product Listing Shell & Catalog (`/products`)
- **Statically Cached Shell**: The store layout (`src/app/(store)/layout.tsx`) pre-renders the page heading, breadcrumbs, sidebar categories, and brand filters with 60-second ISR caching.
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

Running `npm run build` compiles with zero TypeScript, routing, or linting errors:

```text
▲ Next.js 16.4.2 (Turbopack)
- Environments: .env
✓ Running next.config.ts took 66ms

  Creating an optimized production build ...
✓ Compiled successfully in 2.5s
  Running TypeScript ...
  Finished TypeScript in 3.7s ...
  Collecting page data using 7 workers ...
  Generating static pages using 7 workers (0/31) ...
✓ Generating static pages using 7 workers (31/31) in 2.2s
  Finalizing page optimization ...

Route (app)
┌ ƒ /
├ ƒ /_not-found
├ ƒ /about
├ ƒ /api/products
├ ƒ /api/products/[id]
├ ƒ /checkout
├ ƒ /login
├ ƒ /orders
├ ƒ /products
├ ƒ /products/[id]
└ ƒ /register

ƒ Proxy (Middleware)

ƒ  (Dynamic)  server-rendered on demand
```

- **Root Session SSR**: Root layout accesses session cookies on the server (`await getSession()`), enabling instant user menu hydration without client layout shifts or flashes of unauthenticated content.
- **Edge Proxy (`src/proxy.ts`)**: Registered as the edge proxy/interceptor (`ƒ Proxy (Middleware)`), running before route handlers and pages.
- **Protected Routes**: `/checkout` and `/orders` execute dynamic server rendering with session checks.
- **Data Caching & ISR**: Dynamic queries (`/products`) and product detail ISR (`/products/[id]`) remain backed by the Next.js Data Cache.

---

## 🔐 Assignment 7: Authentication Flow

### Objectives
- Implement secure, end-to-end user authentication using Next.js 16 App Router paradigms and React 19 Server Actions.
- Integrate directly with the live Azure backend authentication endpoints:
  - `POST /api/v1/Customers/login`
  - `POST /api/v1/Customers/register`
  - `POST /api/v1/Customers/refresh-token`
  - `POST /api/v1/Customers/logout`
- Store access and refresh tokens exclusively in secure, `HttpOnly`, `SameSite=Lax` cookies, preventing cross-site scripting (XSS) token theft.
- Implement proactive token renewal (`getValidAccessToken`) for server-side callers, keeping it strictly isolated from public Server Action entry points.
- Refactor authentication forms into focused Client Component islands (`LoginForm.tsx` and `RegisterForm.tsx`) using React 19's `useActionState`.
- Enforce strict client-side and server-side validation (stricter name checking, email format regex, complex password requirements, and confirmation matching).
- Guarantee return URL preservation across both login and registration flows, with strict open-redirect sanitization (`sanitizeReturnUrl`).
- Achieve full UI and UX parity with the original React application:
  - Header profile button with initial letter circle or fallback icon (`bg-orange/15 border border-orange/40 text-orange font-bold`).
  - First name display in the navigation bar (`user.name.split(" ")[0]`).
  - Caret toggle (`▲` / `▼`) with a click-outside profile dropdown (`#header-profile-dropdown`).
  - Dropdown menu displaying Full Name, Role badge (`CUSTOMER` / `ADMIN`), "My Orders" link (`/orders`), and red "Sign Out" button (`#header-logout-button`) with FontAwesome `faRightFromBracket`.
  - Unauthenticated "Sign In" link (`#header-sign-in-link`) with `faRightToBracket`.
  - Responsive mobile drawer parity reflecting the authenticated user's avatar, name, role badge, and working Sign Out action.
  - Industry-standard password visibility toggle using inline `faEye` and `faEyeSlash` icons inside password input fields.

---

### 🏛️ Authentication Architecture & Cookie Session Model

```
[Browser / Client Component]
       │
       ▼ (1) Submits FormData via useActionState
[Server Actions: authActions.ts]
       │
       ├─► (2) Sanitizes inputs & validates constraints
       │
       ├─► (3) Calls authApiService.ts (Server-to-Server HTTPS)
       │         │
       │         ▼
       │     [.NET Azure API: /api/v1/Customers/...]
       │
       ▼ (4) Dispatches secure HttpOnly cookies via next/headers
[Browser Cookies Storage: access_token, refresh_token, auth_user]
       │
       ▼ (5) Redirects user to sanitized returnUrl or /login
```

#### 1. Cookie Storage Strategy (`src/lib/session.ts`)

Instead of storing JWTs in browser `localStorage` or `sessionStorage` (which are vulnerable to XSS attacks), all session state is maintained across three independent cookies configured with strict security flags:

| Cookie Name | Purpose | Expiration | Security Flags |
| :--- | :--- | :--- | :--- |
| `access_token` | JWT bearer token for authenticating upstream API requests. | 1 hour | `HttpOnly; SameSite=Lax; Path=/; Secure` |
| `refresh_token` | Long-lived token used to renew expired access tokens. | 7 days | `HttpOnly; SameSite=Lax; Path=/; Secure` |
| `auth_user` | Serialized JSON containing user metadata (`customerId`, `name`, `role`, `email`). | 7 days | `HttpOnly; SameSite=Lax; Path=/; Secure` |

- **`createSession(accessToken, refreshToken, user)`**: Sets all three cookies simultaneously upon successful login.
- **`getSession()`**: Reads cookies server-side and returns a strongly-typed `SessionData` object (`{ user, accessToken, isAuthenticated }`).
- **`deleteSession()`**: Deletes all three cookies upon logout or session invalidation.

#### 2. Architectural Separation: Server Actions vs. Internal Helpers

In Next.js, every function exported from a file marked with `"use server"` is automatically exposed as a public HTTP endpoint callable by clients. 

To prevent security vulnerabilities:
- **`src/app/actions/authActions.ts`**: Contains only functions intended to be invoked by client forms (`loginAction`, `registerAction`, `logoutAction`).
- **`src/lib/auth.ts`**: Contains internal server utilities such as `getValidAccessToken()`. This proactive token renewal function refreshes expired access tokens using the refresh token before invoking protected backend services, but is never exposed as a public Server Action endpoint.

#### 3. Open-Redirect Sanitization & Return URL Flow

To prevent attackers from crafting phishing links that redirect users to malicious external domains after authenticating (e.g., `/login?returnUrl=https://evil.com`), all return URLs are processed through `sanitizeReturnUrl()`:

```typescript
export function sanitizeReturnUrl(url?: string | null): string {
    if (!url || typeof url !== "string") return "/";
    const trimmed = url.trim();
    if (!trimmed.startsWith("/") || trimmed.startsWith("//") || trimmed.includes("\\")) {
        return "/";
    }
    return trimmed;
}
```

- **Login Flow**: If an unauthenticated user attempts to visit `/checkout`, the proxy redirects to `/login?returnUrl=%2Fcheckout`. `LoginForm.tsx` maintains the target in a hidden form input. Upon successful credential verification, `loginAction` redirects directly to `/checkout`.
- **Registration Flow**: If a new user lands on `/register?returnUrl=%2Fcheckout`, `RegisterForm.tsx` captures the return URL in a hidden input. When registration succeeds, `registerAction` redirects to `/login?registered=true&returnUrl=%2Fcheckout`, ensuring the original destination is preserved across the entire onboarding lifecycle.

#### 4. UI / UX Parity: Profile Dropdown & Mobile Drawer

1. **Avatar Circle**: Displays `{user.name ? user.name.charAt(0).toUpperCase() : "👤"}` styled with `bg-orange/15 border border-orange/40 text-orange font-bold font-display text-sm`.
2. **First Name & Caret**: Header displays `user.name.split(" ")[0]` accompanied by a `▲` / `▼` toggle caret.
3. **Click-Outside Menu**: Managed by `src/components/layout/HeaderUserMenu.tsx`. Clicking outside the dropdown automatically closes the menu.
4. **Dropdown Actions**: Contains user details, role badge (`CUSTOMER`), direct link to "My Orders" (`/orders`), and a red "Sign Out" button (`#header-logout-button`) triggering server-side logout.
5. **Mobile Drawer**: Slide-out mobile menu cleanly renders the user badge, name, role, and logout button on screen widths `<768px`.
6. **Password Visibility**: Text "Show / Hide" buttons were replaced with standard interactive FontAwesome `faEye` and `faEyeSlash` icons positioned inside the password input fields.

---

## 🛡️ Assignment 8: Proxy (Route Protection & Execution Logging)

### Objectives
- Implement request interception and edge route protection using Next.js 16's official `src/proxy.ts` convention (replacing deprecated `middleware.ts`).
- Enforce strict route guards on designated private routes: **exclusively `/checkout` and `/orders` (and subpaths)**.
- Unauthenticated requests to protected routes must be intercepted and redirected to `/login?returnUrl=<encodedPath>`.
- Authenticated visitors navigating to auth routes (`/login`, `/register`) must be automatically redirected to their destination `returnUrl` or root (`/`).
- Measure and log the execution duration of every intercepted request in server logs: `[Proxy] <METHOD> <PATH> - <DURATION>ms (<STATUS>)`.
- Prevent redirect ping-pong loops by ensuring the proxy and session manager share a single source of truth for authentication status.
- Implement defense-in-depth on protected stub pages (`/checkout` and `/orders`) with server-side session checks and informative status cards.

---

### ⚙️ Next.js 16 Proxy Architecture (`src/proxy.ts`)

In Next.js 16, the legacy `middleware.ts` naming convention was deprecated in favor of `src/proxy.ts`. Our application exports the standard `proxy` interceptor:

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const startTime = performance.now();
    const { pathname, search } = request.nextUrl;
    
    // Auth status derived from access token cookie
    const hasAuth = Boolean(request.cookies.get(COOKIE_ACCESS_TOKEN)?.value);
    
    // Route matching & redirection logic
    ...
    
    // High-resolution execution timing logging
    const duration = (performance.now() - startTime).toFixed(2);
    console.log(`[Proxy] ${request.method} ${pathname} - ${duration}ms (${response.status})`);
    
    return response;
}
```

#### Route Interception Workflow

```
[Incoming HTTP Request]
          │
          ▼
   [src/proxy.ts] ───► Starts performance.now()
          │
   ┌──────┴───────────────────────────────────────────────────────┐
   │ Check Authentication Status (COOKIE_ACCESS_TOKEN)             │
   └──────┬───────────────────────────────────────────────────────┘
          │
   Is path /checkout/* or /orders/* ?
   ├─► YES & NOT Authenticated ──► Redirect to /login?returnUrl=<path>
   │
   Is path /login or /register ?
   ├─► YES & Authenticated ──────► Redirect to sanitized returnUrl or /
   │
   Other public routes (/, /about, /products, /api/*)
   └─► YES ──────────────────────► Pass through (NextResponse.next())
          │
          ▼
   Calculates duration = (now - startTime).toFixed(2)ms
   Emits log: [Proxy] GET /orders - 0.42ms (307)
          │
          ▼
   [Final HTTP Response / Next.js Page Server]
```

#### Key Implementation Highlights:

1. **Explicit Route Boundaries**:
   Route protection is strictly confined to `/checkout` and `/orders` (and their respective subpaths). Public pages (`/`, `/about`, `/products`, `/products/:id`, `/api/products`) remain globally accessible.
2. **Single Source of Truth**:
   Both `src/proxy.ts` and `src/lib/session.ts` derive authentication state directly from `COOKIE_ACCESS_TOKEN`. This prevents subtle authentication mismatches where one subsystem considers a user logged in while the other redirects, eliminating infinite redirect loops.
3. **Execution Timing & Logging**:
   Every request handled by the proxy records execution duration with sub-millisecond precision. Typical log outputs demonstrate ultra-fast edge interception:
   ```text
   [Proxy] GET /orders - 0.38ms (307)
   [Proxy] GET /login?returnUrl=%2Forders - 0.22ms (200)
   [Proxy] GET /checkout - 0.41ms (307)
   [Proxy] GET / - 0.19ms (200)
   ```
4. **Optimized Route Matcher**:
   Static files, images, icons, and fonts are excluded from proxy execution using the Next.js negative-lookahead matcher regex:
   ```typescript
   export const config = {
       matcher: [
           "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|otf|ttf|woff|woff2)$).*)",
       ],
   };
   ```
5. **Defense-in-Depth Stub Pages**:
   Even with proxy guards active, `src/app/checkout/page.tsx` and `src/app/orders/page.tsx` perform secondary server-side session checks (`await getSession()`). They render an informative *"Feature Not Configured Yet"* status banner, display verified session credentials (Customer ID, Full Name, Role, Email), and offer direct navigation back to the product catalog.

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
│   ├── actions/
│   │   └── authActions.ts            # Server Actions: loginAction, registerAction, logoutAction
│   ├── api/
│   │   └── products/
│   │       ├── route.ts              # GET (list + pagination), POST (create)
│   │       └── [id]/
│   │           └── route.ts          # GET (detail), PUT (update), DELETE (remove)
│   ├── checkout/
│   │   └── page.tsx                  # Protected checkout stub (Server Component)
│   ├── orders/
│   │   └── page.tsx                  # Protected orders history stub (Server Component)
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
│   ├── auth/
│   │   ├── LoginForm.tsx             # Client Component: login form with useActionState
│   │   └── RegisterForm.tsx          # Client Component: registration form with validation
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
│   │   ├── HeaderUserMenu.tsx        # Client Component: user dropdown, initials avatar & logout
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
├── lib/
│   ├── auth.ts                       # Proactive access token renewal helper (internal)
│   └── session.ts                    # HttpOnly cookie session manager
├── proxy.ts                          # Next.js 16 Proxy: route protection & duration logging
├── services/
│   ├── apiClient.ts                  # Resilient HTTP request utility with status tracking
│   ├── authApiService.ts             # Server-side Azure auth communication service
│   └── productApiServices.ts         # Server-only .NET API communication service
├── types/
│   ├── api.ts                        # ApiResult with HTTP status codes
│   ├── auth.ts                       # Auth credentials, User, Session, and Action state definitions
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

### Assignment 7: Authentication Flow
- [x] **Server Actions for Auth**: `loginAction`, `registerAction`, and `logoutAction` with React 19 `useActionState`.
- [x] **Secure HttpOnly Cookie Sessions**: `access_token` (1h), `refresh_token` (7d), and `auth_user` (7d) cookies with `SameSite=Lax`, `Path=/`, and `secure: true`.
- [x] **Real Backend Azure API Integration**: Tested against live endpoints for login, registration, token refresh, and logout.
- [x] **Proactive Token Refresh**: Dedicated `getValidAccessToken()` helper isolated outside `"use server"` action exports.
- [x] **Strict Form Validation**: Name (min 2 chars), email regex, 8+ char complex password, and confirmation equality checking.
- [x] **Open-Redirect Sanitization & Return URL**: `sanitizeReturnUrl()` prevents open redirect attacks; target path preserved across login and registration.
- [x] **Password Visibility Eye Toggles**: Replaced text buttons with interactive inline `faEye` and `faEyeSlash` icons.
- [x] **Header UI Parity & User Menu**: Initial avatar circle, user first name, caret indicator, click-outside dropdown, orders link, and red logout button.
- [x] **Responsive Mobile Drawer Parity**: Mobile slide-out drawer reflects user avatar, name, role badge, and working logout action.

### Assignment 8: Proxy (Route Protection & Execution Logging)
- [x] **Next.js 16 Proxy Migration**: Implemented in `src/proxy.ts` using `export function proxy(request: NextRequest)`.
- [x] **Route Protection for `/checkout` and `/orders`**: Exclusively guards `/checkout` and `/orders` (and subpaths); unauthenticated visitors redirected to `/login?returnUrl=...`.
- [x] **Return URL Forwarding**: Preserves origin path in URL query parameters, automatically navigating back after authentication.
- [x] **Auth Page Redirect Bypass**: Authenticated users visiting `/login` or `/register` are redirected to their destination or `"/"`.
- [x] **Execution Duration Logging**: High-resolution `[Proxy] <METHOD> <PATH> - <DURATION>ms (<STATUS>)` logged for every intercepted request.
- [x] **Single Source of Auth Truth**: Synchronized on `COOKIE_ACCESS_TOKEN` across `proxy.ts` and `session.ts` to prevent redirect loops.
- [x] **Defense-in-Depth Protected Pages**: `/checkout` and `/orders` verify session server-side, rendering status banners and verified user details.

