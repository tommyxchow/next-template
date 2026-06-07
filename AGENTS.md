# AGENTS.md

<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->

---

# Project

Next.js 16 template using the App Router with React 19. Deployed on **Cloudflare Workers** via `@opennextjs/cloudflare`. Runtime: Node.js >= 22, pnpm 11.

## Commands

`pnpm dev` / `pnpm build` / `pnpm start` — dev server, production build, production server (Node.js)
`pnpm build:worker` / `pnpm preview` / `pnpm deploy` — build and preview/deploy on Cloudflare Workers
`pnpm check` — full check: typecheck + lint + format check + test + build

## Source Structure

`src/app/` (pages/layouts), `src/components/` (React components, `ui/` for shadcn), `src/lib/` (utilities, constants), `src/hooks/` (custom hooks). Tests colocated next to source files.

## Cache Components

Enabled ([docs](https://nextjs.org/docs/app/getting-started/cache-components)) — everything is dynamic (SSR) by default. Opt into caching with `"use cache"` + `cacheLife()`, wrap async work in `<Suspense>` for PPR. Old `revalidate`/`dynamic`/`fetchCache` exports are replaced. Use `cacheTag()` + `revalidateTag()`/`updateTag()` for on-demand invalidation. Durable cache storage uses the R2 incremental cache (see `open-next.config.ts`); time-based and on-demand revalidation may also need OpenNext's DO queue and tag cache pieces.

## Environment

- `SITE_URL` — Base URL for the site. Declared in `wrangler.jsonc`, defaults to `http://localhost:3000` for local dev. Used in `src/lib/constants.ts` for `metadataBase`, sitemap, and robots.txt.
- `src/env.d.ts` types `process.env` globally — use `process.env.X` directly, no env validation library needed. Don't declare secrets in `wrangler.jsonc` (committed to git) — set production secrets via Cloudflare dashboard or `pnpx wrangler secret put`.

## Images

- **Static/known images**: pre-generate webp variants at build time (e.g., via `sharp` in a build script) and use plain `<img srcset>`. Don't use `next/image` with the Cloudflare IMAGES binding for static images — it bills per-call with no dedup and `/_next/image` responses aren't edge-cached without a Cache Rule.
- **Dynamic/user-uploaded images**: uncomment the IMAGES binding in `wrangler.jsonc` and configure a Cache Rule for `/_next/image*` in the Cloudflare dashboard (Caching → Cache Rules → Edge TTL override 1 year). Without it, every cache miss re-bills — the binding has no dedup and responses aren't auto-cached (no file extension in the URL).

## pnpm 11

This project uses [corepack](https://nodejs.org/api/corepack.html) to manage the pnpm version via the `packageManager` field in `package.json`. Corepack downloads pnpm 11 automatically — no global install needed.

- **Windows**: Always prefix pnpm commands with `corepack` (e.g., `corepack pnpm install`). Bare `pnpm` may fail due to a corepack shim conflict.
- **Command config exception**: `package.json` scripts and MCP server configs should use bare executable names because the package manager or launcher provides the execution context.
- **Config migration from v10**: pnpm 11 restricts `.npmrc` to auth/registry settings only. All other config lives in `pnpm-workspace.yaml`:
  - `allowBuilds` map replaces `onlyBuiltDependencies` / `neverBuiltDependencies` / `ignoredBuiltDependencies`
  - `publicHoistPattern` and `engineStrict` moved from `.npmrc` to `pnpm-workspace.yaml`
- **Env vars**: pnpm 11 no longer reads `npm_config_*` variables. Use `pnpm_config_*` instead (e.g., `pnpm_config_registry`).

## Gotchas

- **shadcn uses @base-ui/react**: Not Radix UI — imports differ from older shadcn examples, and most components don't expose `asChild`. Check `src/components/ui/` before building custom UI.
- **`useSearchParams()` needs Suspense**: Always wrap components using `useSearchParams()` in a `<Suspense>` boundary — required for production builds.
- **Never remove `tw-animate-css`**: Required by shadcn/ui components for animations. Check shadcn dependencies before removing any package.
- **No `pnpm` prefix inside package.json scripts**: The package manager is already the script runner. Use bare commands (e.g., `next build`, not `pnpm next build`).
- **Dev tools**: `next-devtools-mcp` (Next.js MCP server) is fetched on demand via `pnpm dlx`.

## shadcn

Preset: `base-vega` + `neutral` + `default-translucent` menus + Geist fonts (see `components.json` and `src/app/layout.tsx`). Components are installed lazily with `pnpm ui:add <component>`. Refresh named components with `pnpm ui:update <component...>`. **Never use `shadcn apply`** — see Gotchas.

Keep the Base/Vega style-level dependencies (`@base-ui/react`, `class-variance-authority`, `lucide-react`, `clsx`, `tailwind-merge`, `tw-animate-css`, `shadcn`) even when no components are installed; individual component installs assume the initialized style dependencies already exist.

> [!NOTE]
> `pnpm ui:add` and `pnpm ui:update` run the locally-installed `shadcn`, not `pnpm dlx shadcn@latest`. To pick up newer shadcn releases, bump `shadcn` in `package.json` first, then `corepack pnpm install`.

### Workflow

1. Ensure clean working tree: `git status`
2. Add components on demand with `pnpm ui:add <component>`
3. Refresh existing components explicitly with `pnpm ui:update <component...>`
4. If `chart.tsx` / `recharts` is installed, check for the shadcn recharts caret bug: `git diff package.json` may show `recharts: "^3.8.0"` → `recharts: "3.8.0"`. Restore the caret, then `pnpm install --lockfile-only` to resync
5. **Check for silently stripped components**: if the shadcn output says "Skipped N files (might be identical)" for more components than seems right, your `globals.css` is probably missing a new theme token. Proceed to step 6. Otherwise skip to 8
6. Generate a reference project in a sandbox path:
   ```
   pnpm dlx shadcn@latest init --template next --base base --preset vega --name fresh --yes --cwd "C:/Users/Tommy/Developer/shadcn-fresh-ref"
   ```
   Diff `shadcn-fresh-ref/fresh/app/globals.css` against `src/app/globals.css`. Look for new `--*` tokens in `@theme inline {}` and any chart/color palette changes
7. Add missing tokens to `src/app/globals.css` manually, then re-run `pnpm ui:update`. Repeat until the skipped count stabilizes. Clean up the sandbox dir after: `rm -rf "C:/Users/Tommy/Developer/shadcn-fresh-ref"`
8. `git diff` the full changeset, commit

### Gotchas

- **`add --all` scope**: `shadcn add --all` installs every available registry component. Do not use it for this lazy template; add or refresh named components explicitly.
- **`add` is config-aware**: If a newer component references a CSS variable missing from `globals.css`, shadcn silently strips the class from the rendered output and skips the file as "identical". That's why workflow step 5 exists — your `globals.css` gates which component classes actually make it to disk.
- **Misleading skip hint**: `"use --overwrite to overwrite"` is printed even when `--overwrite` is already passed. It means "rendered output matches disk", not "you forgot a flag".
- **Recharts caret bug**: If `chart.tsx` / `recharts` is installed, `pnpm ui:update` may strip the `^` from `recharts` in `package.json`. Caught by workflow step 4.
- **`form` is Radix-only**: The shadcn `form` component depends on `@radix-ui/react-slot` for the `asChild` pattern and has no Base UI variant. `shadcn add form` fails silently at "Checking registry" on this project. For form composition, use `react-hook-form` directly without the shadcn wrapper, or check [basecn.dev](https://basecn.dev) for Base UI ports. `react-hook-form` is already in `package.json` for this reason.
- **Don't use `shadcn apply`**: It writes files outside `src/components/ui/` (`layout.tsx`, `globals.css`, `lib/utils.ts`, `package.json`) with its own template style, and has a broken dedupe that inserts duplicate imports when quote styles differ. Use named `ui:add` / `ui:update` commands and apply any missing `globals.css` tokens manually.
- **Preset name mismatch**: `components.json` stores the style as `"base-vega"` (with prefix), but the CLI `init`/`apply` accepts only `vega` (no prefix) with an explicit `--base base` flag. Used by workflow step 5.
