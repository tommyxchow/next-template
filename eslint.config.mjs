import eslintReact from '@eslint-react/eslint-plugin'
import eslintJs from '@eslint/js'
import nextVitals from 'eslint-config-next/core-web-vitals'
import prettier from 'eslint-config-prettier/flat'
import betterTailwindcss from 'eslint-plugin-better-tailwindcss'
import reactYouMightNotNeedAnEffect from 'eslint-plugin-react-you-might-not-need-an-effect'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig(
  // Managed by shadcn (pnpm ui:update)
  { ignores: ['src/components/ui/', 'src/hooks/use-mobile.ts', '.open-next/'] },
  eslintJs.configs.recommended,
  nextVitals,

  // Next.js bundles eslint-plugin-react; disable its rules that overlap with @eslint-react
  eslintReact.configs['disable-conflict-eslint-plugin-react'],

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
      tseslint.configs.stylisticTypeChecked,
      eslintReact.configs['recommended-type-checked'],
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
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      '@eslint-react/jsx-shorthand-boolean': 'error',
      '@eslint-react/no-array-index-key': 'warn',

      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSEnumDeclaration',
          message: 'Use `as const` objects or union types instead of enums.',
        },
      ],

      // Redundant with react-you-might-not-need-an-effect
      '@eslint-react/hooks-extra/no-direct-set-state-in-use-effect': 'off',
      '@eslint-react/hooks-extra/no-direct-set-state-in-use-layout-effect':
        'off',
    },
  },

  // Tailwind CSS v4 linting
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['__tests__/**'],
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
