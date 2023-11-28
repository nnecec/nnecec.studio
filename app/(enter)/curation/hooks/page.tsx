import { ArrowLink } from '~/curation/components/arrow-link'

export default function HooksPage() {
  return (
    <div className="mb-0 grid grid-cols-2">
      <ArrowLink
        href="/curation/hooks/use-timer"
        subtitle=" A timer with start, pause, restart method."
        title="useTimer"
      />
      <ArrowLink
        href="/curation/hooks/use-offset-motion"
        subtitle="A simple hook to motion element with X or Y."
        title="useOffsetMotion"
      />
      <ArrowLink href="/curation/hooks/use-interval" subtitle="A countdown button with motion." title="useInterval" />
    </div>
  )
}
