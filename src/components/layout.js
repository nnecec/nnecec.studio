import { Link } from "gatsby"
import { ThemeSwitch } from './theme-switch'

export const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="mb-16 flex justify-between items-center">
        <div>{header}</div>
        {typeof window !== "undefined" && <div><ThemeSwitch /></div>}
      </header>
      <main>{children}</main>
      <footer className="py-8">
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>,
        Source Code at
        {` `}
        <a href="https://github.com/nnecec/nnecec.github.io">Github</a>.
      </footer>
    </div>
  )
}
