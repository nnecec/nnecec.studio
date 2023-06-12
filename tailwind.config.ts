import typography from '@tailwindcss/typography'
import daisyui from 'daisyui'
import colors from 'tailwindcss/colors'
import { fontFamily } from 'tailwindcss/defaultTheme'

import type { Config } from 'tailwindcss'

const light = {
  accent: colors.green[500],
  'accent-content': colors.cyan[800],
  'base-100': colors.zinc[100],
  'base-200': colors.zinc[200],
  'base-300': colors.zinc[300],
  'base-400': colors.zinc[400],
  'base-500': colors.zinc[500],
  'base-content': colors.zinc[900],
  neutral: colors.neutral[100],
  'neutral-content': colors.neutral[700],
  primary: colors.rose[500],
  'primary-content': colors.gray[100],
  secondary: colors.yellow[500],
  'secondary-content': colors.gray[100],
}
const dark = {
  accent: colors.green[500],
  'accent-content': colors.cyan[800],
  'base-100': colors.zinc[900],
  'base-200': colors.zinc[800],
  'base-300': colors.zinc[700],
  'base-400': colors.zinc[600],
  'base-500': colors.zinc[600],
  'base-content': colors.zinc[200],
  neutral: colors.neutral[900],
  'neutral-content': colors.neutral[200],
  'neutral-focus': colors.neutral[800],
  primary: colors.rose[500],
  'primary-content': colors.gray[100],
  secondary: colors.yellow[400],
  'secondary-content': colors.gray[100],
}

export default {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './core/**/*.{ts,tsx,js,jsx}',
    './curation/**/*.{ts,tsx,js,jsx}',
  ],
  daisyui: {
    themes: [{ dark, light }],
  },
  darkMode: ['class', '[data-theme="dark"]'],
  plugins: [typography, daisyui],
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
