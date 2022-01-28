import { useState, useEffect } from 'react'
import Switch from 'rc-switch'
import sun from '../images/sun.png'
import moon from '../images/moon.png'

export const ThemeSwitch = () => {
  const [currentTheme, setCurrentTheme] = useState(window.__theme ?? null)

  useEffect(() => {
    setCurrentTheme(window.__theme)
    window.__onThemeChange = () => {
      setCurrentTheme(window.__theme)
    }
  }, [currentTheme])

  return (
    <Switch
      checked={currentTheme === 'dark'}
      onChange={checked => {
        window.__setPreferredTheme(checked ? 'dark' : 'light')
      }}
      checkedChildren={
        <img
          src={moon}
          width="16"
          height="16"
          role="presentation"
          style={{ pointerEvents: 'none' }}
        />
      }
      unCheckedChildren={
        <img
          src={sun}
          width="16"
          height="16"
          role="presentation"
          style={{ pointerEvents: 'none' }}
        />
      }
    ></Switch>
  )
}
