import { Bio } from './bio'

export const Footer = () => {
  return (
    <footer className="py-12 text-sm">
      <div className="mx-auto">
        <Bio />

        <div className="mt-8 text-center">
          © 2020-{new Date().getFullYear()} nnecec. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
