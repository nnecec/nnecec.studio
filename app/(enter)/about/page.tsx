import type { Metadata } from 'next'

import { AboutEditorialPage } from '~/libs/components/about'

export const metadata: Metadata = { title: 'About me.' }

export default function ResumePage() {
  return <AboutEditorialPage />
}
