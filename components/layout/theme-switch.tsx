import { useMemo } from 'react'
import { Moon, Sun } from '@icon-park/react'
import { Switch } from '@nextui-org/react'
import { useTheme as useNextTheme } from 'next-themes'

export const ThemeSwitch = () => {
  const { theme, setTheme } = useNextTheme()

  const isChecked = useMemo(() => theme === 'dark', [theme])

  return (
    <Switch
      aria-label="toggle dark mode"
      checked={isChecked}
      onChange={e => setTheme(e.target.checked ? 'dark' : 'light')}
      iconOff={<Sun theme="filled" />}
      iconOn={<Moon theme="filled" />}
      initialChecked={isChecked}
    ></Switch>
  )
}
