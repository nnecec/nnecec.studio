import nnecec from '@nnecec/prettier-config'
/**
 * @type {import('prettier').Config&import('prettier-plugin-zh').ZhOptions}
 */
export default {
  ...nnecec,
  overrides: [
    {
      files: ['*.md', '*.mdx'],
      options: {
        proseWrap: 'always',
      },
    },
  ],
  plugins: ['prettier-plugin-zh'],
  spaceAroundCode: true,
  spaceAroundLink: true,
}
