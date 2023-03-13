import { IconMoon, IconSun, IconDeviceLaptop } from '@tabler/icons-react'
import type { Theme} from './provider';
import { useTheme } from './provider'

const options = [
  {
    label: <IconMoon size={20} />,
    value: 'dark',
  },
  {
    label: <IconSun size={20} />,
    value: 'light',
  },
  {
    label: <IconDeviceLaptop size={20} />,
    value: 'auto',
  },
]

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme()

  const changeTheme = (value: Theme) => {
    setTheme(value)
  }

  return (
    <div className="dropdown dropdown-end dropdown-hover">
      <label tabIndex={0} className="btn m-1">
        {options.find(option => option.value === theme)?.label}
      </label>
      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        {options.map(({ label, value }) => (
          <li key={value} onClick={() => changeTheme(value)}>
            <a>
              {label} {value}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
