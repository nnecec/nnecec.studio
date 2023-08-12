'use client'

import React, { createContext, memo, useCallback, useContext, useEffect, useMemo, useState } from 'react'

interface ValueObject {
  [themeName: string]: string
}

export interface UseThemeProps {
  /** Forced theme name for the current page */
  forcedTheme?: string
  /** If `enableSystem` is true and the active theme is "system", this returns whether the system preference resolved to "dark" or "light". Otherwise, identical to `theme` */
  resolvedTheme?: string
  /** Update the theme */
  setTheme: (theme: string) => void
  /** If enableSystem is true, returns the System theme preference ("dark" or "light"), regardless what the active theme is */
  systemTheme?: 'dark' | 'light'
  /** Active theme name */
  theme?: string
  /** List of all available theme names */
  themes: string[]
}

export interface ThemeProviderProps {
  /** HTML attribute modified based on the active theme. Accepts `class` and `data-*` (meaning any data attribute, `data-mode`, `data-color`, etc.) */
  attribute?: 'class' | string
  children?: React.ReactNode
  /** Default theme name (for v0.0.12 and lower the default was light). If `enableSystem` is false, the default theme is light */
  defaultTheme?: string
  /** Disable all CSS transitions when switching themes */
  disableTransitionOnChange?: boolean
  /** Whether to indicate to browsers which color scheme is used (dark or light) for built-in UI like inputs and buttons */
  enableColorScheme?: boolean
  /** Whether to switch between dark and light themes based on prefers-color-scheme */
  enableSystem?: boolean
  /** Forced theme name for the current page */
  forcedTheme?: string
  /** Nonce string to pass to the inline script for CSP headers */
  nonce?: string
  /** Key used to store theme setting in localStorage */
  storageKey?: string
  /** List of all available theme names */
  themes?: string[]

  /** Mapping of theme name to HTML attribute value. Object where key is the theme name and value is the attribute value */
  value?: ValueObject
}

const colorSchemes = new Set(['light', 'dark'])
const MEDIA = '(prefers-color-scheme: dark)'
const isServer = typeof window === 'undefined'
const ThemeContext = createContext<UseThemeProps | undefined>(undefined)
// eslint-disable-next-line @typescript-eslint/no-empty-function
const defaultContext: UseThemeProps = { setTheme: _ => {}, themes: [] }
const defaultThemes = ['light', 'dark']

export const useTheme = () => useContext(ThemeContext) ?? defaultContext

// Helpers
const getTheme = (key: string, fallback?: string) => {
  if (isServer) return
  let theme
  try {
    theme = localStorage.getItem(key) || undefined
  } catch {
    // Unsupported
  }
  return theme || fallback
}

const disableAnimation = () => {
  const css = document.createElement('style')
  css.append(
    document.createTextNode(
      `*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`,
    ),
  )
  document.head.append(css)

  return () => {
    // Force restyle
    ;(() => window.getComputedStyle(document.body))()

    // Wait for next tick before removing
    setTimeout(() => {
      css.remove()
    }, 1)
  }
}

const getSystemTheme = (e?: MediaQueryList | MediaQueryListEvent) => {
  if (!e) e = window.matchMedia(MEDIA)
  const isDark = e.matches
  const systemTheme = isDark ? 'dark' : 'light'
  return systemTheme
}

const ThemeScript = memo(
  function ThemeScriptInternal({
    attribute,
    attrs,
    defaultTheme,
    enableColorScheme,
    enableSystem,
    forcedTheme,
    nonce,
    storageKey,
    value,
  }: ThemeProviderProps & { attrs: string[]; defaultTheme: string }) {
    const defaultSystem = defaultTheme === 'system'

    // Code-golfing the amount of characters in the script
    const optimization = (() => {
      if (attribute === 'class') {
        const removeClasses = `c.remove(${attrs.map((t: string) => `'${t}'`).join(',')})`

        return `var d=document.documentElement,c=d.classList;${removeClasses};`
      } else {
        return `var d=document.documentElement,n='${attribute}',s='setAttribute';`
      }
    })()

    const fallbackColorScheme = (() => {
      if (!enableColorScheme) {
        return ''
      }

      const fallback = colorSchemes.has(defaultTheme) ? defaultTheme : null

      return fallback
        ? `if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${defaultTheme}'`
        : `if(e==='light'||e==='dark')d.style.colorScheme=e`
    })()

    const updateDOM = (name: string, literal = false, setColorScheme = true) => {
      const resolvedName = value ? value[name] : name
      const val = literal ? name + `|| ''` : `'${resolvedName}'`
      let text = ''

      // MUCH faster to set colorScheme alongside HTML attribute/class
      // as it only incurs 1 style recalculation rather than 2
      // This can save over 250ms of work for pages with big DOM
      if (enableColorScheme && setColorScheme && !literal && colorSchemes.has(name)) {
        text += `d.style.colorScheme = '${name}';`
      }

      if (attribute === 'class') {
        text += literal || resolvedName ? `c.add(${val})` : `null`
      } else {
        if (resolvedName) {
          text += `d[s](n,${val})`
        }
      }

      return text
    }

    const scriptSrc = (() => {
      if (forcedTheme) {
        return `!function(){${optimization}${updateDOM(forcedTheme)}}()`
      }

      if (enableSystem) {
        return `!function(){try{${optimization}var e=localStorage.getItem('${storageKey}');if('system'===e||(!e&&${defaultSystem})){var t='${MEDIA}',m=window.matchMedia(t);if(m.media!==t||m.matches){${updateDOM(
          'dark',
        )}}else{${updateDOM('light')}}}else if(e){${value ? `var x=${JSON.stringify(value)};` : ''}${updateDOM(
          value ? `x[e]` : 'e',
          true,
        )}}${
          defaultSystem ? '' : `else{` + updateDOM(defaultTheme, false, false) + '}'
        }${fallbackColorScheme}}catch(e){}}()`
      }

      return `!function(){try{${optimization}var e=localStorage.getItem('${storageKey}');if(e){${
        value ? `var x=${JSON.stringify(value)};` : ''
      }${updateDOM(value ? `x[e]` : 'e', true)}}else{${updateDOM(
        defaultTheme,
        false,
        false,
      )};}${fallbackColorScheme}}catch(t){}}();`
    })()

    return <script dangerouslySetInnerHTML={{ __html: scriptSrc }} nonce={nonce} />
  },
  // Never re-render this component
  () => true,
)

const Theme: React.FC<ThemeProviderProps> = ({
  attribute = 'data-theme',
  children,
  enableSystem = true,
  // eslint-disable-next-line perfectionist/sort-objects
  defaultTheme = enableSystem ? 'system' : 'light',
  disableTransitionOnChange = false,
  enableColorScheme = true,
  forcedTheme,
  nonce,
  storageKey = 'theme',
  themes = defaultThemes,
  value,
}) => {
  const [theme, setThemeState] = useState(() => getTheme(storageKey, defaultTheme))
  const [resolvedTheme, setResolvedTheme] = useState(() => getTheme(storageKey))
  const attrs = value ? Object.values(value) : themes

  const applyTheme = useCallback((theme?: string) => {
    let resolved = theme
    if (!resolved) return

    // If theme is system, resolve it before setting theme
    if (theme === 'system' && enableSystem) {
      resolved = getSystemTheme()
    }

    const name = value ? value[resolved] : resolved
    const enable = disableTransitionOnChange ? disableAnimation() : null
    const d = document.documentElement

    if (attribute === 'class') {
      d.classList.remove(...attrs)

      if (name) d.classList.add(name)
    } else {
      if (name) {
        d.setAttribute(attribute, name)
      } else {
        d.removeAttribute(attribute)
      }
    }

    if (enableColorScheme) {
      const fallback = colorSchemes.has(defaultTheme) ? defaultTheme : null
      const colorScheme = colorSchemes.has(resolved) ? resolved : fallback
      d.style.colorScheme = colorScheme as string
    }

    enable?.()
  }, [])

  const setTheme = useCallback(
    (theme: string) => {
      setThemeState(theme)

      // Save to storage
      try {
        localStorage.setItem(storageKey, theme)
      } catch {
        // Unsupported
      }
    },
    [forcedTheme],
  )

  const handleMediaQuery = useCallback(
    (e: MediaQueryList | MediaQueryListEvent) => {
      const resolved = getSystemTheme(e)
      setResolvedTheme(resolved)

      if (theme === 'system' && enableSystem && !forcedTheme) {
        applyTheme('system')
      }
    },
    [theme, forcedTheme],
  )

  // Always listen to System preference
  useEffect(() => {
    const media = window.matchMedia(MEDIA)

    // Intentionally use deprecated listener methods to support iOS & old browsers
    media.addListener(handleMediaQuery)
    handleMediaQuery(media)

    return () => media.removeListener(handleMediaQuery)
  }, [handleMediaQuery])

  // localStorage event handling
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== storageKey) {
        return
      }

      // If default theme set, use it if localstorage === null (happens on local storage manual deletion)
      const theme = e.newValue || defaultTheme
      setTheme(theme)
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [setTheme])

  // Whenever theme or forcedTheme changes, apply it
  useEffect(() => {
    applyTheme(forcedTheme ?? theme)
  }, [forcedTheme, theme])

  const providerValue = useMemo(
    () => ({
      forcedTheme,
      resolvedTheme: theme === 'system' ? resolvedTheme : theme,
      setTheme,
      systemTheme: (enableSystem ? resolvedTheme : undefined) as 'dark' | 'light' | undefined,
      theme,
      themes: enableSystem ? [...themes, 'system'] : themes,
    }),
    [theme, setTheme, forcedTheme, resolvedTheme, enableSystem, themes],
  )

  return (
    <ThemeContext.Provider value={providerValue}>
      <ThemeScript
        {...{
          attribute,
          attrs,
          children,
          defaultTheme,
          disableTransitionOnChange,
          enableColorScheme,
          enableSystem,
          forcedTheme,
          nonce,
          storageKey,
          themes,
          value,
        }}
      />
      {children}
    </ThemeContext.Provider>
  )
}

export const ThemeProvider: React.FC<ThemeProviderProps> = props => {
  const context = useContext(ThemeContext)

  // Ignore nested context providers, just passthrough children
  if (context) return <>{props.children}</>
  return <Theme {...props} />
}
