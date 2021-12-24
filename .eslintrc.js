module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'graphql',
    'react',
    '@typescript-eslint'
  ],
  globals: {
    graphql: true,
    __PATH_PREFIX__: true,
    __BASE_PATH__: true // this will rarely, if ever, be used by consumers
  },
  ignorePatterns: ['contents/**/*.md'],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off'
  }
}
