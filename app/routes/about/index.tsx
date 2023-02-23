import { useRef } from 'react'

import { Header } from '~/components/layout/header'
import { Contact, Intro, Tech } from '~/components/about'

const Resume = () => {
  return (
    <div>
      <Header />
      <section className="mt-[-96px]">
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

export default Resume
