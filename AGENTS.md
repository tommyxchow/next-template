# AGENTS.md

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

---

Next.js 16 (App Router) + React 19 template. Deploys to Vercel (zero-config) or Cloudflare Workers via `@opennextjs/cloudflare`. Node >= 24, pnpm 11. React Compiler and typed routes are on. Deployment, setup, and the full script table live in `README.md`.

## Commands

- `pnpm dev` / `pnpm build` / `pnpm start` — Node.js dev / build / prod server
- `pnpm preview` / `pnpm deploy` — build + run/ship on Cloudflare Workers
- `pnpm check` — typecheck + lint + format check + test + build (run before pushing)
- `pnpm ui:add <name>` / `pnpm ui:update <name...>` — add / refresh shadcn components

## Layout

`src/app/` pages & layouts · `src/components/` (`ui/` = shadcn) · `src/lib/` utils & constants · `src/hooks/`. Tests colocated: `*.test.ts` (unit, node), `*.test.tsx` (integration, jsdom).

## Caching (Cache Components)

Enabled via `cacheComponents: true`. Everything is dynamic (SSR) by default — opt into caching with `"use cache"` + `cacheLife()`, and wrap async work in `<Suspense>` for PPR. Invalidate with `cacheTag()` + `revalidateTag()`/`updateTag()`. The old `revalidate`/`dynamic`/`fetchCache` route exports no longer exist. On Cloudflare, durable cache needs the R2 binding (commented in `wrangler.jsonc` / `open-next.config.ts`); time-based and on-demand revalidation also need OpenNext's DO queue + tag cache.

## Environment

- `process.env.X` is typed globally in `src/env.d.ts` — use it directly, no validation lib.
- `SITE_URL` (in `wrangler.jsonc`, defaults to `http://localhost:3000`) feeds `metadataBase`, sitemap, and robots via `src/lib/constants.ts`.
- Never put secrets in `wrangler.jsonc` (it's committed) — use the Cloudflare dashboard or `pnpm exec wrangler secret put`.

## Gotchas

- **shadcn = Base UI, not Radix.** Imports differ from older examples and most components have no `asChild`. Check `src/components/ui/` before building custom UI.
- **`form` has no Base UI port** — `shadcn add form` fails silently. Use `react-hook-form` directly (already installed), or a port from [basecn.dev](https://basecn.dev).
- **`useSearchParams()` needs a `<Suspense>` boundary**, or the production build fails.
- **Never remove `tw-animate-css`** — shadcn animations depend on it.
- **Images on Cloudflare bill per call.** Static images: pre-generate webp at build time and use plain `<img srcset>`, not `next/image`. User uploads: enable the IMAGES binding in `wrangler.jsonc` + a Cache Rule on `/_next/image*` (Edge TTL 1y), or every cache miss re-bills.
- **pnpm 11 config lives in `pnpm-workspace.yaml`** (`.npmrc` is auth/registry only). `allowBuilds` replaces the old `*BuiltDependencies` keys; env vars are `pnpm_config_*` not `npm_config_*`. The version is pinned in `packageManager` (`package.json`); if `pnpm -v` differs, a standalone install is shadowing corepack's shim.
- **`package.json` scripts use bare commands** (`next build`, not `pnpm next build`) — pnpm is already the runner.

## shadcn workflow

Style `base-nova` / `neutral` / Geist (`components.json`). Components install lazily — keep the style deps (`@base-ui/react`, `class-variance-authority`, `lucide-react`, `clsx`, `tailwind-merge`, `tw-animate-css`, `shadcn`) even when none are installed. Inspect with `pnpm exec shadcn info` (project config + CSS vars); pull a component's docs into context with `pnpm exec shadcn docs <name>`.

1. `pnpm ui:add <name>` adds, `pnpm ui:update <name...>` refreshes. These run the local `shadcn` (bump it in `package.json` to upgrade), never `pnpm dlx shadcn@latest`.
2. **Never `shadcn apply` or `shadcn add --all`** — `apply` rewrites files outside `ui/` with its own style and duplicates imports; `--all` installs the entire registry.
3. If `ui:update` skips more files than expected, `globals.css` is probably missing a theme token — shadcn silently strips classes that reference unknown `--*` vars. Check `shadcn info` for CSS vars, then diff `globals.css` against a fresh reference (`pnpm dlx shadcn@latest init --template next --base base --preset nova ...` — the CLI wants the bare preset name `nova` + `--base base`, not the combined `base-nova` from `components.json`), add the missing tokens, re-run.
4. If `recharts`/`chart.tsx` is installed, `ui:update` may strip the `^` off `recharts` in `package.json` — restore it, then `pnpm install --lockfile-only`.
