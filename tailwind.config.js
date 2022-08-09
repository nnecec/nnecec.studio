const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        'primary-dark': 'var(--primary-dark-color)'
      },
      fontFamily: {
        sans: [
          'SF Pro SC',
          'PingFang SC',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif',
          '-apple-system',
          ...fontFamily.sans
        ],
        mono: ['Roboto Mono', 'Source Code Pro', ...fontFamily.mono]
      }
    }
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: ['light', 'dark']
  }
}
