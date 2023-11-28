import prettierConfig from '@nnecec/prettier-config'
/**
 * @type {import('prettier').Config&import('prettier-plugin-zh').ZhOptions}
 */
export default {
  ...prettierConfig,
  plugins: ['prettier-plugin-zh'],
  spaceAroundCode: true,
  spaceAroundLink: true,
}
