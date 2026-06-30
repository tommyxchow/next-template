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

Enabled via `cacheComponents: true`. Everything is dynamic (SSR) by default — opt into caching with `"use cache"` + `cacheLife()`, and wrap async work in `<Suspense>` for PPR. Invalidate with `cacheTag()` + `revalidateTag()`/`updateTag()` (`updateTag` only works inside Server Actions). The old `revalidate`/`dynamic`/`fetchCache` route exports are build-breaking once `cacheComponents` is on — remove them rather than leaving them in place. On Cloudflare, durable cache needs the R2 binding (commented in `wrangler.jsonc` / `open-next.config.ts`); time-based and on-demand revalidation also need OpenNext's DO queue + tag cache.

`cacheComponents` also enables React `<Activity>` for route-level UI state: navigating away and back no longer unmounts the previous route, so `useState`, form inputs, and scroll position persist. Dropdowns/dialogs/forms that should reset on return need explicit reset logic.

## Environment

- `process.env.X` is typed globally in `src/env.d.ts` — use it directly, no validation lib.
- `SITE_URL` (in `wrangler.jsonc`, defaults to `http://localhost:3000`) feeds `metadataBase`, sitemap, and robots via `src/lib/constants.ts`.
- Never put secrets in `wrangler.jsonc` (it's committed) — use the Cloudflare dashboard or `pnpm exec wrangler secret put`.

## Gotchas

- **shadcn = Base UI, not Radix.** Imports differ from older examples and most components have no `asChild`. Check `src/components/ui/` before building custom UI.
- **`form` has no Base UI port** — `shadcn add form` fails silently (it hard-depends on Radix). shadcn deprecated the `<Form>` wrapper for `<Field>` (`shadcn add field` has a Base UI port), but `Field` has no `FormField`-style auto-binding — wire each field yourself with `react-hook-form`'s `Controller` render prop (`field` spread onto the input, `fieldState.invalid`/`fieldState.error` into `Field`/`FieldError`) per `ui.shadcn.com/docs/forms/react-hook-form`.
- **`useSearchParams()` needs a `<Suspense>` boundary**, or the production build fails.
- **Never remove `tw-animate-css`** — shadcn animations depend on it.
- **Images on Cloudflare bill per call.** Static images: pre-generate webp at build time and use plain `<img srcset>`, not `next/image`. User uploads: enable the IMAGES binding in `wrangler.jsonc` + a Cache Rule on `/_next/image*` (Edge TTL 1y), or every cache miss re-bills.
- **pnpm 11 config lives in `pnpm-workspace.yaml`** (`.npmrc` is auth/registry only). `allowBuilds` replaces the old `onlyBuiltDependencies`/`neverBuiltDependencies`/`ignoredBuiltDependencies` keys; env vars are `pnpm_config_*` not `npm_config_*`. Defaults `minimumReleaseAge` to 24h for supply-chain protection — keep that default; wait a day after a fresh publish before bumping, or add a targeted `minimumReleaseAgeExclude` entry if you truly need same-day.
- **pnpm version is pinned in `packageManager`** (`package.json`) — if `pnpm -v` differs, a standalone install is shadowing corepack's shim. (`pmOnFail: error` in `pnpm-workspace.yaml` turns that mismatch into a hard failure instead of a silent one — a team-wide behavior change, so ask before adding it, don't add it preemptively.)

## shadcn workflow

Style `base-nova` / `neutral` / Geist (`components.json`). Components install lazily — keep the style deps (`@base-ui/react`, `class-variance-authority`, `lucide-react`, `clsx`, `tailwind-merge`, `tw-animate-css`, `shadcn`) even when none are installed. Inspect with `pnpm exec shadcn info` (project config + CSS vars); pull a component's docs into context with `pnpm exec shadcn docs <name>`.

1. `pnpm ui:add <name>` adds, `pnpm ui:update <name...>` refreshes. These run the local `shadcn` (bump it in `package.json` to upgrade), never `pnpm dlx shadcn@latest`.
2. **Never `shadcn apply` or `shadcn add --all`** — `apply` rewrites files outside `ui/` with its own style and duplicates imports; `--all` installs the entire registry.
3. If `ui:update` skips more files than expected, `globals.css` is probably missing a theme token — shadcn silently strips classes that reference unknown `--*` vars. Check `shadcn info` for CSS vars, then diff `globals.css` against a fresh reference (`pnpm dlx shadcn@latest init --template next --base base --preset nova ...` — the CLI wants the bare preset name `nova` + `--base base`, not the combined `base-nova` from `components.json`), add the missing tokens, re-run.

## React

- React Compiler is on — let it handle memoization instead of reaching for `useMemo`/`useCallback`/`memo` by default. They're still legitimate escape hatches for effect-dependency stability or refs handed to non-compiled third-party code.
- Avoid `useEffect` unless syncing with an external system (React's "You Might Not Need an Effect") — otherwise compute during render or in event handlers. Avoid `useRef` unless you need DOM access, imperative work, or a mutable value that shouldn't trigger a re-render.

## Styling

- Use the project `cn()` (shadcn's `@/lib/utils`) for conditional/merged class lists, not string concatenation.
- Style from the theme tokens in `globals.css` (`bg-background`, `text-foreground`), not scattered raw palette. Arbitrary values (`w-[37px]`) are an escape hatch; extract a repeated class string into a component/variant rather than `@apply`.
- The default scale (`p-4`, `text-lg`, `gap-2`) is rem-based — lean on it. Use fixed px only for things meant to stay put on zoom (hairline borders/dividers `border`/`h-px`, decorative underlines `decoration-2`).
- Default to logical utilities (`ms`/`me`/`ps`/`pe`, logical `inset`) over physical (`ml`/`mr`) for RTL-readiness.
- Full-height layouts: `min-h-svh` over `min-h-screen`/`100vh` (which overflows under mobile browser chrome). Use `dvh` only to track the bar live (can jank); fixed `h-svh` only for app shells with internal scroll.
- For a component reused at different widths (or heights), prefer container queries (`@container`, `@sm:`/`@md:`, `@container-size` + `cqh`/`cqb` for height-aware) over viewport breakpoints.
- Translucent fill/border: a color/alpha utility (`bg-black/50`, `border-white/20`) or a solid token, not `opacity-*` (which fades children too). Keep `opacity-*` for fading a whole element/state.
- `tabular-nums` for numbers that update in place or align in columns (timers, counters, prices, tables).
- `text-balance` on headings, `text-pretty` on body copy (`pretty` not in Firefox yet — progressive enhancement).
- Tracking scales inversely with size: widen all-caps/eyebrow labels (`tracking-wider`/`tracking-widest`), tighten large display headings (`tracking-tight`/`tracking-tighter`), leave body alone.
- Don't hard-cut overflow: `truncate`/`line-clamp-*` for text, a fade (`mask-*` gradient)/shadow/peek edge for scrollable regions.
- Reserve space to avoid CLS: `aspect-*` (or `size-*`/`w-`/`h-`) on media, fixed skeleton dims, `scrollbar-gutter-stable` on scroll containers/modals.

## Animation

- Reach for native CSS / Web Animations first — Tailwind covers most of it (`transition`/`animate-*`, `starting:` + `transition-discrete`, view transitions, scroll-driven animations); `tw-animate-css` powers shadcn's. Pull in Motion (npm `motion`, import `motion/react`) only for orchestration, gesture/interrupt control, or shared-element/layout animations.
- Animate open/close to intrinsic height with the grid trick (`grid-rows-[0fr]` → `grid-rows-[1fr]`); transitioning to `h-auto` via `interpolate-size`/`calc-size()` is cleaner but Chromium-only (enhancement).
- Animate only compositor-friendly props — transform utilities (`translate-*`/`scale-*`/`rotate-*`) and `opacity-*`. Avoid transitioning layout utilities (`w-`/`h-`/`inset`/`m-`).
- Respect `prefers-reduced-motion` — gate non-essential motion behind `motion-safe:`; reduce/replace rather than strip.
- Keep keyboard focus visible: style `focus-visible:` with `ring-*`/`outline-*`; never strip it (`outline-hidden`, `ring-0`) without a clear replacement.
