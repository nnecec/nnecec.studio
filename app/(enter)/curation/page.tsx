import { ArrowLink } from '~/curation/components/arrow-link'

export default function Home() {
  return (
    <div className="mb-0 grid grid-cols-2">
      <ArrowLink href="/curation/hooks" subtitle="React hooks collection." title="hooks" />
      <ArrowLink href="/curation/framer-motion" subtitle="Framer motion collection." title="framer motion" />
    </div>
  )
}
