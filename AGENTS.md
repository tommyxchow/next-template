# AGENTS.md

---

# Author Preferences

## Behavior

- For quick questions, give a concise answer. Don't over-research straightforward decisions.
- When asked to add items to a list (models, emotes, constants, etc.), be thorough on the first pass. Read the source data completely and add ALL relevant items, not just the first few.

## Code Opinions

- Prefer production-ready solutions over toy examples
- Named exports only — no default exports except where required by Next.js (page, layout, route, etc.)
- `satisfies` over `as` for type validation
- `UPPER_SNAKE_CASE` for constants
- Derive state where possible — avoid duplicating what can be computed
- Avoid `useRef` unless DOM access or imperative work
- Inline until a pattern repeats 3+ times, then extract
- For new components/hooks/APIs: include a usage example

## Workflow

- In plan mode, interview thoroughly — ask about technical implementation, UI/UX, tradeoffs, and edge cases before coding. Don't begin implementation until all important details are resolved.
- When implementing new code, search the codebase for existing usages and follow established patterns.
- When new code supersedes existing functionality, find and remove everything it makes redundant.
- Favor parallel tool calls and subagents when tasks are independent.
- For refactors: summary → trade-offs → next steps.

## Testing

- Suggest tests when changes touch logic, but don't write tests unless asked.
- Run targeted tests for relevant files, not the full suite.

## Code Review

- Label severity: `critical` / `major` / `minor`
- Prefer minimal, tightly scoped diffs — don't switch layout strategies (e.g., grid to flex) unless explicitly asked, as it often breaks dependent sizing
- Flag security issues (XSS, CSRF, injection, auth gaps) with fixes
- Flag unnecessary complexity with a simpler alternative

## Commit Convention

Commits use lowercase, descriptive messages without prefixes (e.g., `fix landscape bottom padding`, `add swipe gesture support`). Keep commits tightly scoped.

## Verification

When asked to "verify", always use web search to check current documentation and sources before responding. Do not rely solely on training data.

## Never

- Never use `npm`, `npx`, or `yarn` — always use `pnpm` / `pnpx`
- Never install a new dependency without asking first

---

# Project

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm start        # Start production server (Node.js)
pnpm preview      # Build and preview on local Cloudflare Workers
pnpm deploy       # Build and deploy to Cloudflare Workers
pnpm upload       # Build and upload to Cloudflare Workers (no deploy)
pnpm cf-typegen   # Generate CloudflareEnv types from wrangler.jsonc
pnpm lint         # Run ESLint
pnpm typecheck    # TypeScript type checking (tsc --noEmit)
pnpm format       # Format with Prettier
pnpm test         # Run unit tests (Vitest)
pnpm check        # Full check: typecheck + lint + test + build
pnpm ui:update    # Regenerate all shadcn components to latest
pnpm clean        # Delete .next, .open-next, and node_modules
pnpm nuke         # Delete .next, .open-next, node_modules, and pnpm-lock.yaml
```

## Architecture

Next.js 16 template using the App Router with React 19. Deployed on **Cloudflare Workers** via `@opennextjs/cloudflare`.

**Runtime**: Node.js >= 22, pnpm 10

### Key Configuration

- **Cache Components**: Enabled ([docs](https://nextjs.org/docs/app/getting-started/cache-components)) — everything is dynamic (SSR) by default. Opt into caching with `"use cache"` + `cacheLife()`, wrap async work in `<Suspense>` for PPR. Old `revalidate`/`dynamic`/`fetchCache` exports are replaced. Use `cacheTag()` + `revalidateTag()`/`updateTag()` for on-demand invalidation.
- **Fetch Logging**: `logging.fetches.fullUrl` enabled — dev console shows full URLs for all fetches
- **React Compiler**: Enabled in `next.config.ts` for automatic memoization
- **Typed Routes**: Enabled for type-safe navigation (use `Route` type from `next/navigation`)
- **Path Alias**: `@/*` maps to `./src/*`
- **Strict TypeScript**: `noUncheckedIndexedAccess`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, `noImplicitOverride`, `verbatimModuleSyntax`

### Source Structure

- `src/app/` - App Router pages and layouts
- `src/components/` - React components (`ui/` subdirectory for shadcn — add with `pnpm dlx shadcn@latest add <component>`)
  - **shadcn components are pre-installed.** Before building custom UI, check `src/components/ui/` for existing components and consult [shadcn docs](https://ui.shadcn.com/docs/components) for usage patterns, composition examples, and any newer components that can be added.
  - `button.tsx` is a `'use client'` module — `buttonVariants()` and `<Button>` can only be used in client components. There is no `asChild` prop (Base UI, not Radix).
- `src/lib/` - Utilities (`cn()` for className merging), constants, and server-only code
- `src/hooks/` - Custom React hooks
- Tests are colocated next to source files (e.g., `src/lib/utils.test.ts`)

### Cloudflare Workers

- `wrangler.jsonc` - Cloudflare Workers configuration (bindings, R2, services, etc.)
- `open-next.config.ts` - OpenNext adapter config (ISR requires uncommenting R2 incremental cache)
- `cloudflare-env.d.ts` - Generated types for Cloudflare bindings (run `pnpm cf-typegen` to regenerate)
- Dev mode calls `initOpenNextCloudflareForDev()` in `next.config.ts` for local Cloudflare emulation
- Durable `"use cache"` at runtime requires R2 incremental cache — without it, runtime cache is in-memory only (per-Worker-instance). Build-time prerendering works regardless.

### Environment Variables

- `SITE_URL` — Base URL for the site. Declared in `wrangler.jsonc`, defaults to `http://localhost:3000` for local dev. Used in `src/lib/constants.ts` for `metadataBase`, sitemap, and robots.txt. Update in `wrangler.jsonc` when the production domain is set.

### Key Libraries

- **TanStack Query** — Client-side data caching (polling, optimistic updates, refetch-on-focus); wrapped in `Providers.tsx`. Server-side caching uses `"use cache"` instead.
- **nuqs** — Type-safe URL search params (`useQueryState`, `useQueryStates`)
- **Vercel AI SDK** (`ai`) — AI/LLM integration utilities
- **Zod** — Schema validation (v4)
- **react-hook-form** + `@hookform/resolvers` — Form handling with Zod validation
- **motion** — Animation library (Framer Motion v12+)
- **sonner** — Toast notifications
- **next-themes** — Dark/light theme switching

## Code Style

Enforced by `pnpm lint` (ESLint) and `pnpm format` (Prettier). Non-obvious decisions:

- Enums are banned — use `as const` objects or union types
- Use `import type` / `export type` with inline style (`import { type Foo }`)
- Prefix unused variables with `_`
- Prettier auto-sorts imports and Tailwind classes — don't sort manually
- `better-tailwindcss` ESLint plugin enforces shorthand classes and consistent `!important` position (Tailwind v4)
- `react-you-might-not-need-an-effect` — flags unnecessary `useEffect`; derive state or use event handlers instead

## Gotchas

- **shadcn uses @base-ui/react**: Not Radix UI — component primitives differ from older shadcn examples
- **`useSearchParams()` needs Suspense**: Always wrap components using `useSearchParams()` in a `<Suspense>` boundary — required for production builds.
- **Never remove `tw-animate-css`**: Required by shadcn/ui components for animations. Check shadcn dependencies before removing any package.
- **No `pnpm` prefix inside package.json scripts**: The package manager is already the script runner. Use bare commands (e.g., `next build`, not `pnpm next build`).
- **Dev tools**: `react-scan` (React render debugging) and `next-devtools-mcp` (Next.js MCP server) are available as devDependencies.
