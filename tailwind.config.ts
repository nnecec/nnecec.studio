import type { Config } from 'tailwindcss'

import { fontFamily } from 'tailwindcss/defaultTheme'

import { colors, nextui } from '@nextui-org/react'
import typography from '@tailwindcss/typography'

export default {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './core/**/*.{ts,tsx,js,jsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  plugins: [
    typography,
    nextui({
      themes: {
        dark: {
          colors: {
            primary: colors.yellow[500],
            secondary: colors.blue[600],
          },
        },
        light: {
          colors: {
            primary: colors.yellow[500],
            secondary: colors.blue[600],
          },
        },
      },
    }),
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Roboto Mono', 'Source Code Pro', ...fontFamily.mono],
        sans: ['Mona Sans', 'Inter', 'SF Pro SC', 'PingFang SC', ...fontFamily.sans],
      },
      spacing: {
        header: '96px',
      },
    },
  },
} satisfies Config
