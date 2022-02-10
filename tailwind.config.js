const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./components/**/*.tsx', './pages/**/*.tsx'],
  darkMode: 'class',
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        'primary-dark': 'var(--primary-dark-color)'
      },
      fontFamily: {
        sans: [
          'SF Pro SC',
          'SF Pro Display',
          'SF Pro Icons',
          'PingFang SC',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif',
          'Optimistic Display',
          '-apple-system',
          ...fontFamily.sans
        ],
        mono: ['"Source Code Pro"', ...fontFamily.mono]
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
