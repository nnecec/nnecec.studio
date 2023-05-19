/** @type {import('eslint').Linter.Config} */
module.exports = {
  ignorePatterns: ['./posts/**', '.next', 'public'],
  extends: ['@nnecec/eslint-config/react-universal', 'next'],
  rules: {
    'unicorn/filename-case': 'off',
  },
}
