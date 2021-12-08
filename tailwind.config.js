const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: 'jit',
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      ...defaultTheme.colors,
      primary: 'var(--primary-color)'
    },
    extend: {
      fontFamily: {
        sans: [
          "SF Pro SC", "SF Pro Display", "SF Pro Icons", "PingFang SC", "Helvetica Neue",
          "Helvetica", "Arial", 'sans-serif', 'Optimistic Display', '-apple-system',
          ...defaultTheme.fontFamily.sans,
        ],
        mono: ['"Source Code Pro"', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  variants: {
    extend: {

    },
  },
  plugins: [
    // require('@tailwindcss/typography'),
  ],
}
