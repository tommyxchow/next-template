# [next-template](https://github.com/tommyxchow/next-template)

A tailored Next.js starter for shipping fast with AI-ready defaults. Optimized for Cloudflare Workers, but the app source is platform-agnostic — see [Other platforms](#other-platforms) for deploying elsewhere.

## Stack

**Framework**

- [Next.js 16](https://nextjs.org/) — App Router, React Compiler, Typed Routes
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/) — strict mode + `noUncheckedIndexedAccess`

**Styling & UI**

- [Tailwind CSS v4](https://tailwindcss.com/) — CSS-first config, [Typography](https://tailwindcss.com/docs/typography-plugin) plugin
- [shadcn/ui](https://ui.shadcn.com/) — base-vega style, includes [Base UI](https://base-ui.com/), [Recharts](https://recharts.org/), [date-fns](https://date-fns.org/), and more
- [lucide-react](https://lucide.dev/) — icons
- [motion](https://motion.dev/) — animations
- [next-themes](https://github.com/pacocoursey/next-themes) — dark mode
- [sonner](https://sonner.emilkowal.ski/) — toasts

**Data & Forms**

- [Zod](https://zod.dev/) — schema validation
- [React Hook Form](https://react-hook-form.com/) — forms
- [Vercel AI SDK](https://ai-sdk.dev/) — AI integration core; add provider packages per project

**Tooling**

- [Vitest](https://vitest.dev/) — unit tests
- [ESLint](https://eslint.org/) — strict type-aware rules + [Prettier](https://prettier.io/)
- [react-scan](https://github.com/aidenybai/react-scan) — runtime render performance visualization, dev only

**Infrastructure**

- [Cloudflare Workers](https://developers.cloudflare.com/workers/) via [@opennextjs/cloudflare](https://opennext.js.org/cloudflare)

---

## Setup

1. Clone or use as template
2. `pnpm install`
3. Create `.env.local` for any server-only keys your app needs
4. Optionally create `.dev.vars` for [Cloudflare bindings](https://developers.cloudflare.com/workers/testing/local-development/#local-only-environment-variables) during local dev
5. `pnpm dev`

---

## Scripts

| Command           | Description                                   |
| :---------------- | :-------------------------------------------- |
| `pnpm dev`        | Start development server                      |
| `pnpm build`      | Production build (Next.js)                    |
| `pnpm start`      | Start production server (Node.js)             |
| `pnpm preview`    | Build and preview on local Cloudflare Workers |
| `pnpm deploy`     | Build and deploy to Cloudflare Workers        |
| `pnpm upload`     | Build and upload to Cloudflare Workers        |
| `pnpm cf-typegen` | Generate types from Cloudflare bindings       |
| `pnpm lint`       | Run ESLint                                    |
| `pnpm typecheck`  | TypeScript type checking                      |
| `pnpm format`     | Format with Prettier                          |
| `pnpm test`       | Run unit tests (Vitest)                       |
| `pnpm check`      | Full check: typecheck + lint + test + build   |
| `pnpm clean`      | Delete `.next`, `.open-next`, `node_modules`  |
| `pnpm nuke`       | Clean + delete `pnpm-lock.yaml`               |

> [!TIP]
> Run `pnpm check` before pushing to catch type errors, lint issues, test failures, and build errors in one shot.

---

## Deployment

### Via dashboard (recommended)

1. Go to the [Cloudflare dashboard](https://dash.cloudflare.com/) > **Workers & Pages** > **Create**
2. Connect your GitHub repo
3. Set the build and deploy commands:

   | Field          | Value                                    |
   | :------------- | :--------------------------------------- |
   | Build command  | `pnpm exec opennextjs-cloudflare build`  |
   | Deploy command | `pnpm exec opennextjs-cloudflare deploy` |

4. Push to your branch to trigger the first build and deploy

### Via CLI

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

### Other platforms

The app source (`src/`) is fully platform-agnostic and should work on Vercel or other platforms as-is.

> [!NOTE]
> To clean up unused Cloudflare-specific config:
>
> 1. Delete `wrangler.jsonc` and `open-next.config.ts`
> 2. Remove the `initOpenNextCloudflareForDev` block in `next.config.ts`
> 3. Remove devDependencies: `@opennextjs/cloudflare`, `wrangler`
> 4. Remove scripts: `preview`, `deploy`, `upload`, `cf-typegen`

---

## License

[MIT](LICENSE)
