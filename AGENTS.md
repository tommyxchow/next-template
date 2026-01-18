# AGENTS.md

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm lint         # Run ESLint
pnpm typecheck    # TypeScript type checking (tsc --noEmit)
pnpm format       # Format with Prettier
```

## Architecture

This is a Next.js 16 template using the App Router with React 19.

### Key Configuration

- **React Compiler**: Enabled in `next.config.ts` for automatic memoization
- **Typed Routes**: Enabled for type-safe navigation (use `Route` type from `next/navigation`)
- **Path Alias**: `@/*` maps to `./src/*`

### Source Structure

- `src/app/` - App Router pages and layouts
- `src/components/` - React components (shadcn/ui components go in `ui/` subdirectory)
- `src/lib/` - Utilities (`cn()` for className merging) and constants

### Styling

- Tailwind CSS v4 with CSS-first configuration in `globals.css`
- shadcn/ui configured with `base-mira` style and `neutral` base color
- Dark mode via `next-themes` with class-based toggling
- Use `cn()` from `@/lib/utils` for conditional class merging

### Providers Pattern

Client-side providers are wrapped in `src/components/Providers.tsx` (includes ThemeProvider and react-scan for dev).

## ESLint Rules

Notable strict rules enforced:

- `@typescript-eslint/strict-boolean-expressions` - No implicit boolean coercion
- `@typescript-eslint/switch-exhaustiveness-check` - Exhaustive switch statements
- `@typescript-eslint/consistent-type-imports` - Use `import type` for types
- `react-you-might-not-need-an-effect` - Avoid unnecessary useEffect
- Unused variables must be prefixed with `_`
