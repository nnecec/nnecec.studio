module.exports = {
  extends: [
    'eslint:recommended',
    'next',
    'plugin:prettier/recommended',
    'plugin:sort/recommended'
  ],
  plugins: ['sort'],
  rules: {
    'import/order': [
      'warn',
      {
        'newlines-between': 'always'
      }
    ]
  }
}
