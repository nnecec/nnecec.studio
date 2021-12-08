import { useMemo } from 'react'
import { Link } from "gatsby"
import { ThemeSwitch } from './theme-switch'

export const Layout = ({ location, title, children }) => {
  const Header = () => useMemo(() => {
    const rootPathReg = new RegExp(`^${__PATH_PREFIX__}/(\\d+)?$`)
    const isRootPath = rootPathReg.test(location.pathname)
    if (isRootPath) {
      return <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    }
    return <Link className="header-link-home" to="/">
      {title}
    </Link>
  }, [location.pathname])

  return (
    <div className="global-wrapper">
      <header className="mb-16 flex justify-between items-center">
        <Header />
        {typeof window !== "undefined" && <div><ThemeSwitch /></div>}
      </header>
      <main>{children}</main>
      <footer className="py-8 text-sm">
        © {new Date().getFullYear()} Built with <a href="https://www.gatsbyjs.com">Gatsby</a>,
        Code at <a href="https://github.com/nnecec/nnecec.github.io">Github</a>.
      </footer>
    </div>
  )
}
