import type React from 'react'
import { useEffect } from 'react'
import { useLocalStorage } from './local-storage'
import { useMedia } from './media'

export const useDarkMode = (): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean | undefined>>
] => {
  const [enabledState, setEnabledState] = useLocalStorage<boolean>('theme')

  const prefersDarkMode = useMedia('(prefers-color-scheme: dark)', false)

  const enabled = enabledState ?? prefersDarkMode

  useEffect(() => {
    const darkName = 'dark'
    const element = window.document.body
    if (enabled) {
      element.classList.add(darkName)
      document.documentElement.setAttribute('data-theme', darkName)
    } else {
      element.classList.remove(darkName)
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }, [enabled])

  return [enabled, setEnabledState]
}
