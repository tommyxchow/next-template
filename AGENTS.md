# AGENTS.md

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
pnpm clean        # Delete .next, .open-next, and node_modules
pnpm nuke         # Delete .next, .open-next, node_modules, and pnpm-lock.yaml
```

## Architecture

Next.js 16 template using the App Router with React 19. Deployed on **Cloudflare Workers** via `@opennextjs/cloudflare`.

### Key Configuration

- **React Compiler**: Enabled in `next.config.ts` for automatic memoization
- **Typed Routes**: Enabled for type-safe navigation (use `Route` type from `next/navigation`)
- **Path Alias**: `@/*` maps to `./src/*`
- **Strict TypeScript**: `noUncheckedIndexedAccess`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, `noImplicitOverride`, `verbatimModuleSyntax`

### Source Structure

- `src/app/` - App Router pages and layouts
- `src/components/` - React components (`ui/` subdirectory for shadcn — add with `pnpm dlx shadcn@latest add <component>`)
- `src/lib/` - Utilities (`cn()` for className merging)
- `src/hooks/` - Custom React hooks
- `__tests__/` - Vitest unit tests

### Cloudflare Workers

- `wrangler.jsonc` - Cloudflare Workers configuration (bindings, R2, services, etc.)
- `open-next.config.ts` - OpenNext adapter config (ISR requires uncommenting R2 incremental cache)
- `cloudflare-env.d.ts` - Generated types for Cloudflare bindings (run `pnpm cf-typegen` to regenerate)
- Dev mode calls `initOpenNextCloudflareForDev()` in `next.config.ts` for local Cloudflare emulation

## Naming Conventions

- Components: PascalCase (`Button.tsx`)
- Utilities: camelCase (`formatDate.ts`)
- Server Actions: camelCase (`createTodo.ts`)
- Hooks: `use` prefix (`useDebounce.ts`)
- Types: PascalCase (`UserProfile`)

## ESLint Rules

Config: `eslint.config.mjs`. Ignores `src/components/ui/` and `src/hooks/use-mobile.ts`.

Notable strict rules enforced:

- `eqeqeq: 'always'` - Strict equality (except `== null` via `null: 'ignore'`)
- `no-console` - Warn on console usage (allows `console.warn` and `console.error`)
- `@typescript-eslint/switch-exhaustiveness-check` - Exhaustive switch statements
- `@typescript-eslint/consistent-type-imports` - Use `import type` for types (`fixStyle: 'inline-type-imports'`)
- `@typescript-eslint/consistent-type-exports` - Use `export type` for types (`fixMixedExportsWithInlineTypeSpecifier`)
- `@typescript-eslint/no-unnecessary-condition` - No redundant conditions
- `@typescript-eslint/no-misused-promises` - Prevent floating promises (`checksVoidReturn.attributes` disabled for JSX)
- `@eslint-react/jsx-shorthand-boolean` - Use shorthand boolean JSX props
- `react-you-might-not-need-an-effect` - Avoid unnecessary useEffect
- `no-restricted-syntax` - Enums are banned; use `as const` objects or union types instead
- Unused variables must be prefixed with `_`

## Testing

- **Unit tests**: Vitest in `__tests__/`

## Dev Tooling

- **Prettier**: Auto-sorts imports (`prettier-plugin-organize-imports`) and Tailwind classes (`prettier-plugin-tailwindcss`)
- **react-scan**: Runtime render performance visualization (dev only)
