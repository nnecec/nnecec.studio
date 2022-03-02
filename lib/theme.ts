import { createTheme } from '@nextui-org/react'

export const darkTheme = createTheme({
  type: 'dark',
  className: 'dark',
  theme: {
    colors: {
      selection: 'red'
    }
  }
})

export const lightTheme = createTheme({
  type: 'light',
  className: 'light',
  theme: {
    colors: {}
  }
})
