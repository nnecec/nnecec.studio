import { HalfMoon, SunLight } from 'iconoir-react'
import { useDarkMode } from '~/hooks/dark-mode'

export const ThemeSwitch = () => {
  const [darkMode, setDarkMode] = useDarkMode()

  const toggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDarkMode(e.target.checked)
  }

  return (
    <label className="swap-rotate swap">
      <input type="checkbox" checked={darkMode} onChange={toggle} />

      <HalfMoon className="swap-on" />
      <SunLight className="swap-off" />
    </label>
  )
}
