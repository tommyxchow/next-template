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

## Conventions

- **Exports**: Named exports only — default exports only where Next.js requires them (`page`, `layout`, `route`, etc.)
- **TypeScript**: `satisfies` over `as`; `??` over `||`; no enums — use `as const` objects or union types
- **Constants**: `UPPER_SNAKE_CASE`
- **React**: Derive state where possible; avoid `useRef` unless DOM/imperative; extract grouped logic into custom hooks when it aids readability
- **DRY**: Inline until a pattern repeats 3+ times, then extract

## Cache Components

Enabled ([docs](https://nextjs.org/docs/app/getting-started/cache-components)) — everything is dynamic (SSR) by default. Opt into caching with `"use cache"` + `cacheLife()`, wrap async work in `<Suspense>` for PPR. Old `revalidate`/`dynamic`/`fetchCache` exports are replaced. Use `cacheTag()` + `revalidateTag()`/`updateTag()` for on-demand invalidation. Durable runtime cache requires R2 incremental cache (see `open-next.config.ts`) — without it, cache is in-memory only per Worker instance.

## Environment

- `SITE_URL` — Base URL for the site. Declared in `wrangler.jsonc`, defaults to `http://localhost:3000` for local dev. Used in `src/lib/constants.ts` for `metadataBase`, sitemap, and robots.txt.
- `src/env.d.ts` types `process.env` globally — use `process.env.X` directly, no env validation library needed. Don't declare secrets in `wrangler.jsonc` (committed to git) — set production secrets via Cloudflare dashboard or `pnpx wrangler secret put`.

## Images

- **Static/known images**: pre-generate webp variants at build time (e.g., via `sharp` in a build script) and use plain `<img srcset>`. Don't use `next/image` with the Cloudflare IMAGES binding for static images — it bills per-call with no dedup and `/_next/image` responses aren't edge-cached without a Cache Rule.
- **Dynamic/user-uploaded images**: uncomment the IMAGES binding in `wrangler.jsonc` and configure a Cache Rule for `/_next/image*` in the Cloudflare dashboard (Caching → Cache Rules → Edge TTL override 1 year). Without it, every cache miss re-bills — the binding has no dedup and responses aren't auto-cached (no file extension in the URL).

## Gotchas

- **shadcn uses @base-ui/react**: Not Radix UI — imports differ from older shadcn examples, and most components don't expose `asChild`. Check `src/components/ui/` before building custom UI.
- **`useSearchParams()` needs Suspense**: Always wrap components using `useSearchParams()` in a `<Suspense>` boundary — required for production builds.
- **Never remove `tw-animate-css`**: Required by shadcn/ui components for animations. Check shadcn dependencies before removing any package.
- **No `pnpm` prefix inside package.json scripts**: The package manager is already the script runner. Use bare commands (e.g., `next build`, not `pnpm next build`).
- **Dev tools**: `next-devtools-mcp` (Next.js MCP server) is fetched on demand via `pnpm dlx`.

## Updating shadcn

Preset: `base-vega` + `neutral` (see `components.json`). Update command: `pnpm ui:update`. **Never use `shadcn apply`** — see Gotchas.

### Workflow

1. Ensure clean working tree: `git status`
2. Run `pnpm ui:update`
3. **Always revert the recharts caret**: `git diff package.json` will show `recharts: "^3.8.0"` → `recharts: "3.8.0"` on every run (not just when `chart.tsx` is touched). Restore the caret, then `pnpm install --lockfile-only` to resync
4. **Check for silently stripped components**: if the shadcn output says "Skipped N files (might be identical)" for more components than seems right, your `globals.css` is probably missing a new theme token. Proceed to step 5. Otherwise skip to 7
5. Generate a reference project in a sandbox path:
   ```
   pnpm dlx shadcn@latest init --template next --base base --preset vega --name fresh --yes --cwd "C:/Users/Tommy/Developer/shadcn-fresh-ref"
   ```
   Diff `shadcn-fresh-ref/fresh/app/globals.css` against `src/app/globals.css`. Look for new `--*` tokens in `@theme inline {}` and any chart/color palette changes
6. Add missing tokens to `src/app/globals.css` manually, then re-run `pnpm ui:update`. Repeat until the skipped count stabilizes. Clean up the sandbox dir after: `rm -rf "C:/Users/Tommy/Developer/shadcn-fresh-ref"`
7. `git diff` the full changeset, commit

### Gotchas

- **`add --all` scope**: `shadcn add --all --overwrite --yes` iterates through components already installed in `src/components/ui/` and re-renders each from the registry. It does NOT install brand-new components from the registry — for those, use `shadcn add <name>` explicitly. Base-incompatible components (see `form` below) are silently excluded.
- **`add` is config-aware**: If a newer component references a CSS variable missing from `globals.css`, shadcn silently strips the class from the rendered output and skips the file as "identical". That's why workflow step 5 exists — your `globals.css` gates which component classes actually make it to disk.
- **Misleading skip hint**: `"use --overwrite to overwrite"` is printed even when `--overwrite` is already passed. It means "rendered output matches disk", not "you forgot a flag".
- **Recharts caret bug**: Every `pnpm ui:update` strips the `^` from `recharts` in `package.json`, regardless of whether any component was updated. Triggered on every run. Caught by workflow step 3.
- **`form` is Radix-only**: The shadcn `form` component depends on `@radix-ui/react-slot` for the `asChild` pattern and has no Base UI variant. `shadcn add form` fails silently at "Checking registry" on this project. For form composition, use `react-hook-form` directly without the shadcn wrapper, or check [basecn.dev](https://basecn.dev) for Base UI ports. `react-hook-form` is already in `package.json` for this reason.
- **Don't use `shadcn apply`**: It writes files outside `src/components/ui/` (`layout.tsx`, `globals.css`, `lib/utils.ts`, `package.json`) with its own template style, and has a broken dedupe that inserts duplicate imports when quote styles differ. Its one advantage — bringing in new theme tokens automatically — isn't worth the cleanup. `add --all` + manual `globals.css` edits is the only clean path on this project.
- **Preset name mismatch**: `components.json` stores the style as `"base-vega"` (with prefix), but the CLI `init`/`apply` accepts only `vega` (no prefix) with an explicit `--base base` flag. Used by workflow step 5.

## Commits

Conventional commits: `type(optional scope): description` — lowercase, no period. Types: `feat`, `fix`, `chore`, `refactor`, `style`, `docs`, `test`, `perf`, `ci`, `build`. Append `!` before `:` for breaking changes. Keep commits tightly scoped.
