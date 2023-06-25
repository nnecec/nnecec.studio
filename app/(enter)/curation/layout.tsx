import clsx from 'clsx'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Curations",
}

export default function CurationLayout({ children }: { children: React.ReactNode }) {
  return <main className={clsx(inter.className, 'min-h-screen p-24')}>{children}</main>
}
