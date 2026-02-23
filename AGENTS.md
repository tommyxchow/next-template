# AGENTS.md

---

# Author Preferences

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
- Prefer minimal, tightly scoped diffs
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

- **React Compiler**: Enabled in `next.config.ts` for automatic memoization
- **Typed Routes**: Enabled for type-safe navigation (use `Route` type from `next/navigation`)
- **Path Alias**: `@/*` maps to `./src/*`
- **Strict TypeScript**: `noUncheckedIndexedAccess`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, `noImplicitOverride`, `verbatimModuleSyntax`

### Source Structure

- `src/app/` - App Router pages and layouts
- `src/components/` - React components (`ui/` subdirectory for shadcn — add with `pnpm dlx shadcn@latest add <component>`)
  - **shadcn components are pre-installed.** Before building custom UI, check `src/components/ui/` for existing components and consult [shadcn docs](https://ui.shadcn.com/docs/components) for usage patterns, composition examples, and any newer components that can be added.
- `src/lib/` - Utilities (`cn()` for className merging)
- `src/hooks/` - Custom React hooks
- `__tests__/` - Vitest unit tests

### Cloudflare Workers

- `wrangler.jsonc` - Cloudflare Workers configuration (bindings, R2, services, etc.)
- `open-next.config.ts` - OpenNext adapter config (ISR requires uncommenting R2 incremental cache)
- `cloudflare-env.d.ts` - Generated types for Cloudflare bindings (run `pnpm cf-typegen` to regenerate)
- Dev mode calls `initOpenNextCloudflareForDev()` in `next.config.ts` for local Cloudflare emulation

### Environment Variables

- `SITE_URL` — Base URL for the site (defaults to `http://localhost:3000`). Used in `src/lib/constants.ts` for SEO routes and metadata.

### Key Libraries

- **TanStack Query** — Server state management; wrapped in `Providers.tsx`
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
