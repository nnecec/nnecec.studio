import { EditorialCapabilities } from "./editorial-capabilities"
import { EditorialContact } from "./editorial-contact"
import { EditorialHero } from "./editorial-hero"
import { EditorialNotes } from "./editorial-notes"

export function AboutEditorialPage() {
  return (
    <div className="-mt-header pb-16 md:pb-24">
      <EditorialHero />

      <div className="page-bleed relative overflow-hidden">
        <div className="absolute inset-0 -z-20" />
        <div className="container relative px-4 sm:px-6 lg:px-8">
          <div className="border border-black/10 backdrop-blur-[2px] dark:border-white/12">
            <EditorialCapabilities />

            <EditorialNotes />

            <EditorialContact />
          </div>
        </div>
      </div>
    </div>
  )
}
