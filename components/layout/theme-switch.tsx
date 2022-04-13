import { Sun, Moon } from '@icon-park/react'
import { useTheme as useNextTheme } from 'next-themes'
import { Switch, useTheme } from '@nextui-org/react'

export const ThemeSwitch = () => {
  const { setTheme } = useNextTheme()
  const { isDark } = useTheme()

  return (
    <Switch
      checked={isDark}
      onChange={e => setTheme(e.target.checked ? 'dark' : 'light')}
      iconOff={<Sun theme="filled" />}
      iconOn={<Moon theme="filled" />}
    ></Switch>
  )
}
