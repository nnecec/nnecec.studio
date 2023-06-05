import { ArrowLink } from '~/curation/components/arrow-link'

export default function Home() {
  return (
    <div className="mb-0 grid grid-cols-2">
      <ArrowLink href="/curation/hooks" title="hooks" subtitle="React hooks collection." />
      <ArrowLink href="/curation/framer-motion" title="framer motion" subtitle="Framer motion collection." />
    </div>
  )
}
