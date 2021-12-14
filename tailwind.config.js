const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        'primary-dark': 'var(--primary-dark-color)'
      },
      fontFamily: {
        sans: [
          "SF Pro SC", "SF Pro Display", "SF Pro Icons", "PingFang SC", "Helvetica Neue",
          "Helvetica", "Arial", 'sans-serif', 'Optimistic Display', '-apple-system',
          ...fontFamily.sans,
        ],
        mono: ['"Source Code Pro"', ...fontFamily.mono],
      },
    },
  },
}
