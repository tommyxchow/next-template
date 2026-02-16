# AGENTS.md

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm start        # Start production server (Node.js)
pnpm preview      # Build and preview on local Cloudflare Workers
pnpm deploy       # Build and deploy to Cloudflare Workers
pnpm lint         # Run ESLint
pnpm typecheck    # TypeScript type checking (tsc --noEmit)
pnpm format       # Format with Prettier
pnpm test         # Run unit tests (Vitest, watch mode)
pnpm test:run     # Run unit tests (single run, CI)
pnpm verify       # Full check: typecheck + lint + test + build
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

## File Conventions

- `page.tsx` - Route pages (Server Components by default)
- `layout.tsx` - Shared layouts
- `loading.tsx` - Loading UI (Suspense boundary)
- `error.tsx` - Error boundaries (`'use client'` required)
- `not-found.tsx` - 404 pages
- `route.ts` - API routes (Route Handlers)

## Naming Conventions

- Components: PascalCase (`Button.tsx`)
- Utilities: camelCase (`formatDate.ts`)
- Server Actions: camelCase (`createTodo.ts`)
- Hooks: `use` prefix (`useDebounce.ts`)
- Types: PascalCase (`UserProfile`)

## Adding Routes

Create `src/app/<route>/page.tsx` for a new page:

```tsx
export default function MyPage() {
  return <div>My page content</div>
}
```

Dynamic routes use `src/app/posts/[id]/page.tsx`:

```tsx
interface Props {
  params: Promise<{ id: string }>
}

export default async function PostPage({ params }: Props) {
  const { id } = await params
  return <div>Post {id}</div>
}
```

## Environment Variables

Use `.env.local` for local development (gitignored by default).

- **Server-only keys** (never prefix with `NEXT_PUBLIC_`): API keys, database URLs, secrets
- **Public variables** (`NEXT_PUBLIC_*`): Values accessible in client-side code
- **AI providers**: Add provider-specific SDK packages and env vars per project (for example `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`)

## ESLint Rules

Notable strict rules enforced:

- `@typescript-eslint/strict-boolean-expressions` - No implicit boolean coercion
- `@typescript-eslint/switch-exhaustiveness-check` - Exhaustive switch statements
- `@typescript-eslint/consistent-type-imports` - Use `import type` for types
- `@typescript-eslint/no-unnecessary-condition` - No redundant conditions
- `react-you-might-not-need-an-effect` - Avoid unnecessary useEffect
- Unused variables must be prefixed with `_`

## Testing

- **Unit tests**: Vitest in `__tests__/`
