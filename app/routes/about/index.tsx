import { Contact, Intro, Tech } from '~/components/about'
import { Header } from '~/components/layout/header'

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
