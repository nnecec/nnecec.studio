import pluginNext from '@next/eslint-plugin-next'
import nnecec from '@nnecec/eslint-config'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...nnecec({
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
    ignorePatterns: ['/posts/**/**', '.next', 'public', 'node_modules'],
  },
]
