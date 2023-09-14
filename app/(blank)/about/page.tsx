import type { Metadata } from 'next'

import { Contact, Intro, Tech } from '~/core/components/about'

export const metadata: Metadata = {
  title: 'About me.',
}

export default function ResumePage() {
  return (
    <div>
      <section className="mt-header">
        <Intro />
      </section>
      <section>
        <Tech />
      </section>
      <section>
        <Contact />
      </section>
    </div>
  )
}
