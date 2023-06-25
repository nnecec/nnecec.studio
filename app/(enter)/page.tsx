/* eslint-disable react/no-unescaped-entities */

import { WavingHand } from '~/core/components/home/waving-hand'
import { HoverText } from '~/core/ui/hover-text'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
}

export default function Page() {
  return (
    <section className="-mt-header flex h-screen items-center pt-header">
      <h1 className="max-w-5xl text-5xl md:text-8xl">
        <WavingHand />
        <br />
        Hi, I'm nnecec.
        <span className="text-4xl opacity-70 md:text-6xl">
          This is my blog about the understanding of{' '}
          <HoverText className="bg-[#FFE70B]">JavaScript</HoverText>,{' '}
          <HoverText className="bg-[rgb(20,158,202)]">React</HoverText> and more.
        </span>
      </h1>
    </section>
  )
}
