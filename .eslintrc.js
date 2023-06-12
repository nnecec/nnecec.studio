/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['@nnecec/eslint-config/react-universal', 'next'],
  ignorePatterns: ['/posts/**/**', '.next', 'public', 'node_modules'],
  rules: {
    'unicorn/filename-case': 'off',
  },
}
