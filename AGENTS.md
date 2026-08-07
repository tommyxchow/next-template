# AGENTS.md

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

Next.js 16.3 (App Router) + React 19 template. Deploys to Vercel (zero-config) or Cloudflare Workers via `@opennextjs/cloudflare`. Node >= 24, pnpm 11. React Compiler and typed routes are on. Deployment, setup, and the full script table live in `README.md`.

## Commands

- `pnpm dev` / `pnpm build` / `pnpm start` — Node.js dev / build / prod server
- `pnpm preview` / `pnpm deploy` — build + run/ship on Cloudflare Workers
- `pnpm check` — typecheck + lint + format check + test + build (what CI runs)
- `pnpm ui:add <name>` / `pnpm ui:update <name...>` — add / refresh shadcn components
- `pnpm ui:diff` — report installed shadcn items against the registry

## Layout

`src/app/` pages & layouts · `src/components/` (`ui/` = shadcn) · `src/lib/` utils & constants · `src/hooks/` (aliased as `@/hooks`; create on first use). Tests colocated: `*.test.ts` (unit, node), `*.test.tsx` (integration, jsdom).

## Caching (Cache Components)

Enabled via `cacheComponents: true`. Everything is dynamic (SSR) by default — opt into caching with `"use cache"` + `cacheLife()`, and wrap async work in `<Suspense>` for PPR. Invalidate with `cacheTag()` + `revalidateTag()`/`updateTag()` (`updateTag` only works inside Server Actions). The old `revalidate`/`dynamic`/`fetchCache` route exports are build-breaking once `cacheComponents` is on — remove them rather than leaving them in place. On Cloudflare, durable cache needs the R2 binding (commented in `wrangler.jsonc` / `open-next.config.ts`); time-based and on-demand revalidation also need OpenNext's DO queue + tag cache.

`cacheComponents` also enables React `<Activity>` for route-level UI state: navigating away and back no longer unmounts the previous route, so `useState`, form inputs, and scroll position persist. Dropdowns/dialogs/forms that should reset on return need explicit reset logic.

## Prefetching (Partial Prefetching)

`partialPrefetching: true` (requires `cacheComponents`) makes every `<Link>` prefetch one reusable App Shell per route — the route's static plus URL-independent cached content — instead of a per-link prefetch. `<Link prefetch={true}>` additionally resolves per-link runtime data (`params`, `searchParams`, full URL); only reach for it when the destination actually reads URL data, since a shell already covers static/cached content. `cookies()`/`headers()` vary per session, not per link, so they stay in the shell.

Dev surfaces instant-navigation insights (dev-only, never build-breaking) when a route can't produce a useful shell — usually URL data read outside `<Suspense>`. Fix by wrapping the read in `<Suspense>` or caching it; `export const instant = false` opts a route out of the validation.

## Environment

- `process.env.X` is typed globally in `src/env.d.ts` — use it directly, no validation lib.
- `SITE_URL` (in `wrangler.jsonc`, defaults to `http://localhost:3000`) feeds `metadataBase`, sitemap, and robots via `src/lib/constants.ts`.
- Never put secrets in `wrangler.jsonc` (it's committed) — use the Cloudflare dashboard or `pnpm exec wrangler secret put`.

## Gotchas

- **Use `pnpm`, never `npm`/`npx`/`yarn`** — `packageManager` + corepack pin the version, but not the tool choice.
- **shadcn = Base UI, not Radix.** Imports differ from older examples and most components have no `asChild`. Check `src/components/ui/` before building custom UI.
- **`form` has no Base UI port** — `shadcn add form` fails silently (it hard-depends on Radix). shadcn deprecated the `<Form>` wrapper for `<Field>` (`shadcn add field` has a Base UI port), but `Field` has no `FormField`-style auto-binding — wire each field yourself with `react-hook-form`'s `Controller` render prop (`field` spread onto the input, `fieldState.invalid`/`fieldState.error` into `Field`/`FieldError`) per `ui.shadcn.com/docs/forms/react-hook-form`.
- **`useSearchParams()` needs a `<Suspense>` boundary**, or the production build fails.
- **Never remove `tw-animate-css`** — shadcn animations depend on it.
- **Images on Cloudflare bill per call.** Static images: pre-generate webp at build time and use plain `<img srcset>`, not `next/image`. User uploads: enable the IMAGES binding in `wrangler.jsonc` + a Cache Rule on `/_next/image*` (Edge TTL 1y), or every cache miss re-bills.
- **pnpm 11 config lives in `pnpm-workspace.yaml`** (`.npmrc` is auth/registry only). `allowBuilds` replaces the old `onlyBuiltDependencies`/`neverBuiltDependencies`/`ignoredBuiltDependencies` keys; env vars are `pnpm_config_*` not `npm_config_*`. Defaults `minimumReleaseAge` to 24h for supply-chain protection — keep that default; wait a day after a fresh publish before bumping, or add a targeted `minimumReleaseAgeExclude` entry if you truly need same-day.
- **pnpm version is pinned in `packageManager`** (`package.json`) — if `pnpm -v` differs, a standalone install is shadowing corepack's shim. (`pmOnFail: error` in `pnpm-workspace.yaml` turns that mismatch into a hard failure instead of a silent one — a team-wide behavior change, so ask before adding it, don't add it preemptively.)
- **`error.tsx` takes `retry`, not `reset`** (stable since 16.3). `retry()` re-fetches and re-renders the boundary's children, including failed Server Components; `reset()` only clears client error state and still exists for that narrow case.
- **Next won't scaffold a root `CLAUDE.md`** while this `AGENTS.md` exists — that's why the project's own lives at `.claude/CLAUDE.md`. Deleting `AGENTS.md` makes `next dev` create both at the root.
- **TypeScript is pinned to 6.x on purpose.** TS 7 is ~10x faster but `typescript-eslint` peers `<6.1.0` and crashes on it — TS 7 has no stable programmatic API until 7.1. Don't bump until typescript-eslint ships support.
- **Two other majors are held back deliberately** — don't "fix" them with `pnpm update --latest`. `@types/node` tracks the runtime major (`.nvmrc` = 24), so v26 would typecheck against APIs Node 24 doesn't have. `jsdom` 30 needs Node `^24.15.0`, which `engineStrict: true` turns into a hard install failure — bump Node first, then jsdom.

## shadcn workflow

Style `base-nova` / `neutral` / Geist (`components.json`). Components install lazily — keep the style deps (`@base-ui/react`, `class-variance-authority`, `lucide-react`, `clsx`, `tailwind-merge`, `tw-animate-css`, `shadcn`) even when none are installed. Inspect with `pnpm exec shadcn info` (project config + CSS vars); pull a component's docs into context with `pnpm exec shadcn docs <name>`.

1. `pnpm ui:add <name>` adds, `pnpm ui:update <name...>` refreshes. These run the local `shadcn` (bump it in `package.json` to upgrade), never `pnpm dlx shadcn@latest`.
2. **Never `shadcn apply` or `shadcn add --all`** — `apply` rewrites files outside `ui/` with its own style and duplicates imports; `--all` installs the entire registry.
3. `pnpm ui:diff` reports every installed item against the registry in one table (`= skip (identical)` vs `~ overwrite`). Inspect anything listed `overwrite` with `pnpm exec shadcn add <name> --diff`, and take the change only if the registry genuinely superseded yours. `src/lib/utils.ts` always shows `overwrite` — `src/lib/` isn't prettier-ignored, so `prettier-plugin-organize-imports` reorders the `clsx` import after install. Cosmetic.
4. **Never `shadcn diff`** — the CLI marks it `[DEPRECATED]` and it returns false negatives, reporting "No updates found" for files that `add --diff` shows real hunks for. `add --diff` with no arguments is no help either: it opens an interactive picker over the whole registry instead of your installed items.
5. `utils` (and `use-mobile`, once a component pulls it in) are registry _dependencies_ of other components — e.g. `pnpm ui:update sidebar` rewrites `src/hooks/use-mobile.ts`. Always `pnpm ui:diff` before and `git diff` after a refresh.
6. If `ui:update` skips more files than expected, `globals.css` is probably missing a theme token — shadcn silently strips classes that reference unknown `--*` vars. Check `shadcn info` for CSS vars, then regenerate a fresh reference via `shadcn init` in a scratch dir (check the current CLI flags first — historically it wanted the bare preset name, not the combined `base-nova` from `components.json`), diff `globals.css` against it, add the missing tokens, re-run.

## Conventions

- React Compiler is on — let it handle memoization. `useMemo`/`useCallback`/`memo` remain escape hatches for effect-dependency stability or refs handed to non-compiled third-party code.
- Use the project `cn()` (`@/lib/utils`) for conditional/merged class lists, and style from the theme tokens in `globals.css` (`bg-background`, `text-foreground`) rather than raw palette values.
- `tw-animate-css` powers shadcn's animations; `motion` (import from `motion/react`) is installed for orchestration, gesture/interrupt control, and shared-element transitions. Reach for CSS first — Tailwind covers `starting:` + `transition-discrete`, view transitions, and scroll-driven animations.
