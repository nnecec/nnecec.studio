import type { Metadata } from 'next'

import { WavingHand } from '~/libs/components/home/waving-hand'
import { HoverText } from '~/libs/ui/hover-text'

export const metadata: Metadata = {
  title: 'Home',
}

export default function Page() {
  return (
    <section className="-mt-header flex h-screen items-center pt-header font-bold">
      <h1 className="max-w-5xl text-5xl md:text-8xl">
        <WavingHand />
        <br />
        Hi, I&apos;m nnecec.
        <span className="text-4xl opacity-90 md:text-6xl">
          This is my blog about the understanding of{' '}
          <HoverText color="#FFE70B">JavaScript</HoverText>,{' '}
          <HoverText color="rgb(20,158,202)">React</HoverText> and more.
        </span>
      </h1>
    </section>
  )
}
