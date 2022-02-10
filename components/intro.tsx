import Link from 'next/link'
import { Text, Tooltip, Button } from '@nextui-org/react'

const Intro = () => {
  return (
    <section className="px-6 sm:px-8 lg:flex lg:w-full lg:items-center lg:justify-between lg:gap-12">
      <div className="lg:mb-10 lg:w-1/2">
        <Text h1>
          Focused on <span className="text-yellow-400">JavaScript</span> and{' '}
          <span className="text-cyan-500">React</span>.
        </Text>
        <Tooltip content="Try to keep update.">
          <Link href="/posts" passHref>
            <Button as="a">Posts</Button>
          </Link>
        </Tooltip>
      </div>
      <div className="relative -mx-6 mt-6 overflow-hidden p-4 sm:-mx-8 sm:p-8 md:p-10 lg:mt-0 lg:h-[51rem] lg:w-1/2 lg:rounded-l-2xl lg:p-8"></div>
    </section>
  )
}

export default Intro
