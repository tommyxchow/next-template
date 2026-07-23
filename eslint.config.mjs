import eslintJs from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import prettier from 'eslint-config-prettier/flat'
import betterTailwindcss from 'eslint-plugin-better-tailwindcss'
import reactHooks from 'eslint-plugin-react-hooks'
import reactYouMightNotNeedAnEffect from 'eslint-plugin-react-you-might-not-need-an-effect'
import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig(
  globalIgnores([
    '.next/',
    '.open-next/',
    'out/**',
    'build/**',
    '.claude/',
    'next-env.d.ts',
    'cloudflare-env.d.ts',
  ]),

  eslintJs.configs.recommended,

  // TODO: switch both Next + hooks blocks to eslint-config-next once
  // eslint-plugin-react supports ESLint 10. Track:
  // https://github.com/jsx-eslint/eslint-plugin-react/issues/3977
  // https://github.com/vercel/next.js/issues/89764
  // Next.js-specific rules (no-html-link-for-pages, no-img-element, etc.)
  {
    files: ['**/*.{ts,tsx}'],
    ...nextPlugin.configs['core-web-vitals'],
  },

  reactHooks.configs.flat.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    extends: [
      tseslint.configs.recommendedTypeChecked,
      reactYouMightNotNeedAnEffect.configs.recommended,
    ],
    rules: {
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/consistent-type-exports': [
        'error',
        { fixMixedExportsWithInlineTypeSpecifier: true },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unnecessary-condition': [
        'error',
        { allowConstantLoopConditions: 'only-allowed-literals' },
      ],
      '@typescript-eslint/prefer-nullish-coalescing': [
        'error',
        { ignorePrimitives: { string: true } },
      ],
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      '@typescript-eslint/only-throw-error': 'error',
      '@typescript-eslint/return-await': ['error', 'in-try-catch'],
      '@typescript-eslint/no-array-delete': 'error',

      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSEnumDeclaration',
          message: 'Use `as const` objects or union types instead of enums.',
        },
      ],

      // Next App Router: cookies()/headers() during render are legitimate
      'react-hooks/purity': 'off',
    },
  },

  // Tailwind CSS v4 linting
  {
    files: ['**/*.{ts,tsx}'],
    extends: [betterTailwindcss.configs['recommended-warn']],
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/app/globals.css',
      },
    },
    rules: {
      // Handled by prettier-plugin-tailwindcss
      'better-tailwindcss/enforce-consistent-class-order': 'off',
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
      'better-tailwindcss/no-unnecessary-whitespace': 'off',
      // Not in recommended — opt-in
      'better-tailwindcss/enforce-consistent-important-position': 'warn',
      'better-tailwindcss/enforce-shorthand-classes': 'warn',
    },
  },

  // Must be last — disables formatting rules from all preceding configs
  prettier,
)
