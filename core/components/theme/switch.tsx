'use client'

import { Switch } from '@nextui-org/react'
import { IconMoon, IconSun } from '@tabler/icons-react'

import { useTheme } from '.'

export const ThemeSwitch = () => {
  const { setTheme } = useTheme()

  const changeTheme = (value: string) => {
    setTheme(value)
  }

  return (
    <Switch
      defaultSelected
      endContent={<IconSun />}
      onValueChange={isSelected => changeTheme(isSelected ? 'dark' : 'light')}
      startContent={<IconMoon />}
    />
  )
}
