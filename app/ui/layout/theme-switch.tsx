import { IconMoon, IconSun } from '@tabler/icons-react'
import { useEffect } from 'react'
import { useDarkMode } from '~/hooks/dark-mode'

export const ThemeSwitch = () => {
  const [darkMode, setDarkMode] = useDarkMode()

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const lightStyle = document.querySelector(
        '#light-style'
      ) as HTMLLinkElement
      const darkStyle = document.querySelector('#dark-style') as HTMLLinkElement

      if (!lightStyle || !darkStyle) return

      if (darkMode) {
        darkStyle.disabled = false
        lightStyle.disabled = true
      } else {
        darkStyle.disabled = true
        lightStyle.disabled = false
      }
    }
  }, [darkMode])

  const toggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDarkMode(e.target.checked)
  }

  return (
    <label className="swap swap-rotate">
      <input type="checkbox" checked={darkMode} onChange={toggle} />

      <IconMoon className="swap-on" />
      <IconSun className="swap-off" />
    </label>
  )
}
