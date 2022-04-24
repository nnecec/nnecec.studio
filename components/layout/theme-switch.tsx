import { Moon, Sun } from '@icon-park/react'
import { Switch, useTheme } from '@nextui-org/react'
import { useTheme as useNextTheme } from 'next-themes'

export const ThemeSwitch = () => {
  const { setTheme } = useNextTheme()
  const { isDark } = useTheme()

  return (
    <Switch
      aria-label="toggle dark mode"
      checked={isDark}
      onChange={e => setTheme(e.target.checked ? 'dark' : 'light')}
      iconOff={<Sun theme="filled" />}
      iconOn={<Moon theme="filled" />}
    ></Switch>
  )
}
