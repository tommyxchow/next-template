# AGENTS.md

<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->

---

# Project

Next.js 16 template using the App Router with React 19. Deployed on **Cloudflare Workers** via `@opennextjs/cloudflare`. Runtime: Node.js >= 22, pnpm 10.

## Commands

`pnpm dev` / `pnpm build` / `pnpm start` — dev server, production build, production server (Node.js)
`pnpm preview` / `pnpm deploy` — build and preview/deploy on Cloudflare Workers
`pnpm check` — full check: typecheck + lint + test + build

## Source Structure

`src/app/` (pages/layouts), `src/components/` (React components, `ui/` for shadcn), `src/lib/` (utilities, constants), `src/hooks/` (custom hooks). Tests colocated next to source files.

## Cache Components

Enabled ([docs](https://nextjs.org/docs/app/getting-started/cache-components)) — everything is dynamic (SSR) by default. Opt into caching with `"use cache"` + `cacheLife()`, wrap async work in `<Suspense>` for PPR. Old `revalidate`/`dynamic`/`fetchCache` exports are replaced. Use `cacheTag()` + `revalidateTag()`/`updateTag()` for on-demand invalidation. Durable runtime cache requires R2 incremental cache (see `open-next.config.ts`) — without it, cache is in-memory only per Worker instance.

## Environment

- `SITE_URL` — Base URL for the site. Declared in `wrangler.jsonc`, defaults to `http://localhost:3000` for local dev. Used in `src/lib/constants.ts` for `metadataBase`, sitemap, and robots.txt.
- `src/env.d.ts` types `process.env` globally — use `process.env.X` directly, no env validation library needed. Don't declare secrets in `wrangler.jsonc` (committed to git) — set production secrets via Cloudflare dashboard or `pnpx wrangler secret put`.

## Gotchas

- **shadcn uses @base-ui/react**: Not Radix UI — component primitives differ from older shadcn examples. `button.tsx` is a `'use client'` module with no `asChild` prop. Check `src/components/ui/` before building custom UI.
- **`useSearchParams()` needs Suspense**: Always wrap components using `useSearchParams()` in a `<Suspense>` boundary — required for production builds.
- **Never remove `tw-animate-css`**: Required by shadcn/ui components for animations. Check shadcn dependencies before removing any package.
- **No `pnpm` prefix inside package.json scripts**: The package manager is already the script runner. Use bare commands (e.g., `next build`, not `pnpm next build`).
- **Dev tools**: `next-devtools-mcp` (Next.js MCP server) is fetched on demand via `pnpm dlx`.
