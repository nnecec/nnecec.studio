import pluginNext from '@next/eslint-plugin-next'
import nnecec from '@nnecec/eslint-config'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...nnecec({
    react: true,
    tailwindcss: true,
    typescript: true,
  }),
  {
    plugins: {
      '@next/next': pluginNext,
    },
    rules: {
      ...pluginNext.configs['core-web-vitals'].rules,
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    ignores: ['/posts/**/**', '.next', 'public', 'node_modules'],
  },
]
