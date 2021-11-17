import { useState, useMemo, useEffect } from 'react'
import Switch from 'rc-switch'
import sun from '../images/sun.png'
import moon from '../images/moon.png'

export const ThemeSwitch = () => {
  const getTheme = () => {
    return localStorage.getItem('theme')
  }

  const isPrefersDark = useMemo(() => window.matchMedia('(prefers-color-scheme: dark)').matches, [window])
  const [currentTheme, setCurrentTheme] = useState(getTheme() || (isPrefersDark ? 'dark' : 'light'))

  useEffect(() => {
    const html = document.querySelector('html')
    html.classList = currentTheme === 'dark' ? 'dark' : 'light'
  }, [currentTheme])

  const setTheme = (theme) => {
    localStorage.setItem('theme', theme)
    setCurrentTheme(theme)

  }

  return <Switch
    checked={currentTheme === 'dark'}
    onChange={checked => {
      const theme = checked ? 'dark' : 'light'
      setTheme(theme)
    }}
    checkedChildren={<img
      src={moon}
      width="16"
      height="16"
      role="presentation"
      style={{ pointerEvents: 'none' }}
    />}
    unCheckedChildren={<img
      src={sun}
      width="16"
      height="16"
      role="presentation"
      style={{ pointerEvents: 'none' }}
    />}
  ></Switch >
}