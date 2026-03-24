import { EditorialCapabilities } from './editorial-capabilities'
import { EditorialContact } from './editorial-contact'
import { EditorialHero } from './editorial-hero'
import { EditorialNotes } from './editorial-notes'

export function AboutEditorialPage() {
  return (
    <div className="-mt-header pb-16 md:pb-24">
      <EditorialHero />

      <div className="page-bleed relative overflow-hidden border-b border-black/8 bg-[#fcfaf4] dark:border-white/10 dark:bg-[#0c0c0e]">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_0%,rgba(250,204,21,0.12),transparent_28%),linear-gradient(180deg,rgba(255,250,241,0.95),rgba(255,255,255,0.98))] dark:bg-[radial-gradient(circle_at_15%_0%,rgba(250,204,21,0.08),transparent_30%),linear-gradient(180deg,rgba(22,22,24,0.94),rgba(10,10,12,1))]" />
        <div className="container relative px-4 sm:px-6 lg:px-8">
          <div className="border-x border-black/8 bg-white/38 backdrop-blur-[2px] dark:border-white/10 dark:bg-white/[0.015]">
            <EditorialCapabilities />

            <EditorialNotes />

            <EditorialContact />
          </div>
        </div>
      </div>
    </div>
  )
}
