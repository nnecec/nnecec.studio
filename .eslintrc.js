/** @type {import('eslint').Linter.Config} */
module.exports = {
  ignorePatterns: ['posts/*', 'build/*', 'api/*'],
  extends: [
    '@nnecec/eslint-config/react-universal',
    // '@remix-run/eslint-config',
    // '@remix-run/eslint-config/node',
  ],
}
