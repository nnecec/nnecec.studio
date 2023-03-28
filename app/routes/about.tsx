import { Contact, Intro, Tech } from '~/components/about'
import { Header } from '~/components/layout/header'
import { UI } from '~/utils/constants'

const Resume = () => {
  return (
    <div>
      <Header />
      <section className={`mt-[-${UI.headerHeight}px]`}>
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
