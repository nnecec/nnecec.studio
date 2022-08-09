import type React from 'react'
import { useEffect } from 'react'
import { useLocalStorage } from './local-storage'
import { useMedia } from './media'

export const useDarkMode = (): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean | undefined>>
] => {
  const [enabledState, setEnabledState] = useLocalStorage<boolean>(
    'theme',
    false
  )

  const prefersDarkMode = useMedia('(prefers-color-scheme: dark)', false)

  const enabled = enabledState ?? prefersDarkMode

  useEffect(() => {
    const className = 'dark'
    const element = window.document.body
    if (enabled) {
      element.classList.add(className)
      document.documentElement.setAttribute('data-theme', className)
    } else {
      element.classList.remove(className)
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }, [enabled])

  return [enabled, setEnabledState]
}
