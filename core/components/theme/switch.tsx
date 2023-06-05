'use client'

import { IconDeviceLaptop, IconMoon, IconSun } from '@tabler/icons-react'
import clsx from 'clsx'

import { useTheme } from '.'

const options = [
  {
    label: <IconMoon />,
    value: 'dark',
  },
  {
    label: <IconSun />,
    value: 'light',
  },
  {
    label: <IconDeviceLaptop />,
    value: 'system',
  },
]

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme()

  const changeTheme = (value: string) => {
    setTheme(value)
  }

  const active = options.find(option => option.value === theme)

  return (
    <div className="dropdown-end dropdown-hover dropdown">
      <label tabIndex={0} className="btn-ghost btn-sm btn-circle btn">
        {active?.label}
      </label>
      <ul tabIndex={0} className="dropdown-content menu rounded-box w-52 bg-base-200 p-2 shadow">
        {options.map(({ label, value }) => (
          <li key={value} onClick={() => changeTheme(value)}>
            <button className={clsx(active?.value === value && 'active')}>
              {label} {value}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
