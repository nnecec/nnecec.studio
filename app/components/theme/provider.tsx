import { createContext, useContext } from 'react'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { useMedia } from '../../hooks/media'
import { useLocalStorage } from '../../hooks/local-storage'

export type Theme = 'auto' | 'dark' | 'light'

type ThemeContextType = {
  theme: Theme
  setTheme: Dispatch<SetStateAction<Theme | undefined>>
  prefersTheme: Theme
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function ThemeProvider({ children }: { children: ReactNode }) {
  const [selectedTheme = 'auto', setTheme] = useLocalStorage<Theme>('auto')
  const prefersDarkMode = useMedia('(prefers-color-scheme: dark)', false)

  const prefersTheme =
    selectedTheme === 'auto' ? (prefersDarkMode ? 'dark' : 'light') : selectedTheme

  return (
    <ThemeContext.Provider value={{ theme: selectedTheme, prefersTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

function useThemeProvider() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export { ThemeProvider, useThemeProvider as useTheme }
