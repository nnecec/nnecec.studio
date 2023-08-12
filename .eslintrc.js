/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['@nnecec/eslint-config/react-universal', 'next/core-web-vitals'],
  ignorePatterns: ['/posts/**/**', '.next', 'public', 'node_modules'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'unicorn/filename-case': 'off',
  },
}
