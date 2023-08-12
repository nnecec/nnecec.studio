import { colors, nextui } from '@nextui-org/react'
import typography from '@tailwindcss/typography'
import { fontFamily } from 'tailwindcss/defaultTheme'

import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './core/**/*.{ts,tsx,js,jsx}',
    './curation/**/*.{ts,tsx,js,jsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  plugins: [
    typography,
    nextui({
      themes: {
        dark: {
          colors: {
            primary: colors.red[300],
          },
        },
        light: {
          colors: {
            primary: colors.red[500],
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
