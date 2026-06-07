# [next-template](https://github.com/tommyxchow/next-template)

A tailored Next.js starter for shipping fast with AI-ready defaults. Deploys to [Vercel](https://vercel.com/) with zero config or [Cloudflare Workers](https://developers.cloudflare.com/workers/) with included configuration.

## Stack

**Framework**

- [Next.js 16](https://nextjs.org/) — App Router, React Compiler, Typed Routes
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/) — strict mode + `noUncheckedIndexedAccess`

**Styling & UI**

- [Tailwind CSS v4](https://tailwindcss.com/) — CSS-first config
- [shadcn/ui](https://ui.shadcn.com/) — base-vega style, configured for on-demand component installs
- [Base UI](https://base-ui.com/) and [lucide-react](https://lucide.dev/) — base dependencies for generated shadcn components
- [Geist](https://vercel.com/font) — sans and mono font families
- [motion](https://motion.dev/) — animations

**Data & State**

- [Zod](https://zod.dev/) — schema validation
- [React Hook Form](https://react-hook-form.com/) — forms
- [Vercel AI SDK](https://ai-sdk.dev/) — AI integration core; add provider packages per project

**Tooling**

- [Vitest](https://vitest.dev/) — unit + integration tests
- [ESLint](https://eslint.org/) — strict type-aware rules + [Prettier](https://prettier.io/)

**Infrastructure**

- [Vercel](https://vercel.com/) — zero-config deployment
- [Cloudflare Workers](https://developers.cloudflare.com/workers/) via [@opennextjs/cloudflare](https://opennext.js.org/cloudflare)

---

## Setup

1. Create a new repo from this template:

   ```sh
   gh repo create my-app --template tommyxchow/next-template --private --clone
   cd my-app
   ```

   Or use the **"Use this template"** button on GitHub.

2. `corepack pnpm install` (this project uses [corepack](https://nodejs.org/api/corepack.html) to pin pnpm 11 — corepack downloads it automatically)
3. Create `.env.local` for any server-only keys your app needs
4. Optionally create `.dev.vars` for [Cloudflare bindings](https://developers.cloudflare.com/workers/testing/local-development/#local-only-environment-variables) during local dev (Cloudflare only)
5. `corepack pnpm dev`

> [!NOTE]
> On **Windows**, always prefix pnpm commands with `corepack` (e.g., `corepack pnpm install`).
> Bare `pnpm` may fail due to a corepack shim conflict. On macOS/Linux, `pnpm` works directly.

---

## Scripts

| Command             | Description                                          |
| :------------------ | :--------------------------------------------------- |
| `pnpm dev`          | Start development server                             |
| `pnpm build`        | Production build (Next.js)                           |
| `pnpm start`        | Start production server (Node.js)                    |
| `pnpm preview`      | Build and preview on local Cloudflare Workers        |
| `pnpm deploy`       | Build and deploy to Cloudflare Workers               |
| `pnpm upload`       | Build and upload to Cloudflare Workers               |
| `pnpm cf-typegen`   | Generate types from Cloudflare bindings              |
| `pnpm lint`         | Run ESLint                                           |
| `pnpm typecheck`    | TypeScript type checking                             |
| `pnpm format`       | Format with Prettier                                 |
| `pnpm format:check` | Check formatting with Prettier                       |
| `pnpm test`         | Run all tests (Vitest)                               |
| `pnpm check`        | Full check: typecheck + lint + format + test + build |
| `pnpm ui:add`       | Add shadcn components on demand                      |
| `pnpm ui:update`    | Regenerate named shadcn components                   |
| `pnpm clean`        | Delete `.next`, `.open-next`, `node_modules`         |
| `pnpm nuke`         | Clean + delete `pnpm-lock.yaml`                      |

> [!TIP]
> Run `pnpm check` before pushing to catch type errors, lint issues, formatting drift, test failures, and build errors in one shot.

---

## Deployment

### Vercel

No configuration needed — connect your GitHub repo on [Vercel](https://vercel.com/) and push.

> [!NOTE]
> To clean up unused Cloudflare-specific config:
>
> 1. Delete `wrangler.jsonc`, `open-next.config.ts`, and `cloudflare-env.d.ts`
> 2. Remove the `initOpenNextCloudflareForDev` block in `next.config.ts`
> 3. Remove devDependencies: `@opennextjs/cloudflare`, `wrangler`
> 4. Remove scripts: `preview`, `deploy`, `upload`, `cf-typegen`

### Cloudflare Workers

#### Via dashboard (recommended)

1. Go to the [Cloudflare dashboard](https://dash.cloudflare.com/) > **Workers & Pages** > **Create**
2. Connect your GitHub repo
3. Set the build and deploy commands:

   | Field          | Value                                    |
   | :------------- | :--------------------------------------- |
   | Build command  | `pnpm exec opennextjs-cloudflare build`  |
   | Deploy command | `pnpm exec opennextjs-cloudflare deploy` |

4. Push to your branch to trigger the first build and deploy

#### Via CLI

Alternatively, deploy directly from your machine:

```sh
pnpm exec wrangler login
pnpm deploy
```

This creates the Worker on Cloudflare using the `name` field in `wrangler.jsonc`. You can then connect your Git repo in the dashboard under **Settings > Build** for CI/CD.

<details>
<summary><strong>Caching (ISR)</strong></summary>

<br>

ISR and caching require additional Cloudflare bindings. The R2 incremental cache is pre-configured but commented out in `wrangler.jsonc` and `open-next.config.ts` — uncomment both to enable.

For time-based revalidation or on-demand revalidation (`revalidateTag` / `revalidatePath`), you'll also need a DO queue and/or tag cache. See the [OpenNext caching docs](https://opennext.js.org/cloudflare/caching) for full setup.

</details>

<details>
<summary><strong>Image optimization</strong></summary>

<br>

[Cloudflare Images](https://developers.cloudflare.com/images/) is pre-configured for `next/image` optimization via the `images` binding in `wrangler.jsonc`. See the [OpenNext image docs](https://opennext.js.org/cloudflare/howtos/image) for details.

</details>

<details>
<summary><strong>Static asset caching</strong></summary>

<br>

`public/_headers` sets immutable caching for `/_next/static/*` assets. See the [OpenNext static assets docs](https://opennext.js.org/cloudflare/caching#static-assets-caching) for more info.

</details>

### Production checklist

Before going live, ensure:

- [ ] `SITE_URL` environment variable is set to your production domain — in `wrangler.jsonc` for Cloudflare or the dashboard for Vercel (used by `metadataBase`, `robots.txt`, `sitemap.xml`)
- [ ] Security headers are configured for your app (e.g., `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`)
- [ ] Replace the demo home page (`src/app/page.tsx`) with your app content
