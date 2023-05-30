import { ArrowLink } from '~/curation/components/arrow-link'

export default function HooksPage() {
  return (
    <div className="mb-0 grid grid-cols-2">
      <ArrowLink
        href="/curation/hooks/use-timer"
        title="useTimer"
        subtitle=" A timer with start, pause, restart method."
      />
      <ArrowLink
        href="/curation/hooks/use-offset-motion"
        title="useOffsetMotion"
        subtitle="A simple hook to motion element with X or Y."
      />
    </div>
  )
}
