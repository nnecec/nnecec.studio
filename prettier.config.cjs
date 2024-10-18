/**
 * @type {import('prettier').Config&import('prettier-plugin-zh').ZhOptions}
 */
module.exports = {
  ...require('@nnecec/prettier-config'),
  plugins: ['prettier-plugin-zh'],
  spaceAroundCode: true,
  spaceAroundLink: true,
}
