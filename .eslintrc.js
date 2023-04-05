/** @type {import('eslint').Linter.Config} */
module.exports = {
  ignorePatterns: ['posts', 'build', 'api', 'public'],
  extends: [
    '@nnecec/eslint-config/react-universal',
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
  ],
  rules: {
    camelcase: ['error', { allow: ['^V2_', '^v2_', 'unstable_'] }],
    'unicorn/filename-case': 'off',
  },
}
