'use client'

import { useDeferredValue, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { CodeBlock } from '~/core/ui/code-block'

import type { Variants } from 'framer-motion'

const layoutIdList = ['banana', 'apple', 'strawberry']

export default function FirstStep() {
  const [tweenAnimation, setTweenAnimation] = useState('easeInOut')
  const [mass, setMass] = useState(3)
  const [damping, setDamping] = useState(1)
  const [velocity, setVelocity] = useState(50)
  const [stiffness, setStiffness] = useState(100)

  const deferredSpring = useDeferredValue(`${mass}${stiffness}${damping}`)
  const deferredInertia = useDeferredValue(`${velocity}`)

  const springCodeString = `
  <motion.div
    initial={{
      x: 0,
    }}
    animate={{ x: 120 }}
    transition={{
      type: 'spring',
      stiffness: ${stiffness},
      mass: ${mass},
      damping: ${damping},
    }}
  />
  `

  const tweenCodeString = `
  <motion.div
    initial={{
      x: 0,
    }}
    animate={{ x: 120 }}
    transition={{
      type: 'tween',
      ease: '${tweenAnimation}',
      repeat: Number.POSITIVE_INFINITY,
      repeatType: 'reverse',
      repeatDelay: 0.5,
      duration: 1,
    }}
  />
  `

  const inertiaCodeString = `
  <motion.div
    initial={{
      x: 0,
    }}
    animate={{ x: 120 }}
    transition={{
      type: 'inertia',
      velocity: ${velocity},
      repeat: Number.POSITIVE_INFINITY,
      repeatType: 'reverse',
    }}
  />
  `

  const variantsCodeString = `
  const variants: Variants = {
    hover: {
      scale: 1.5,
    },
    pressed: {
      scale: 0.5,
    },
    default: {
      scale: 1,
    },
  }
  <motion.button
    variants={variants}
    whileHover="hover"
    whileTap="pressed"
  >
    Click Me
  </motion.button>
  `

  const variants: Variants = {
    default: {
      scale: 1,
    },
    hover: {
      boxShadow: '0 8px 16px 0px #fff6',
      scale: 1.2,
    },
    pressed: {
      scale: 0.8,
    },
  }

  // Layout Animation
  const [position, setPosition] = useState('start')
  const [layout, setLayout] = useState(true)

  const layoutFlexCodeString = `
  <div className="grid">
    <motion.div
      layout={${layout}}
      style={{
        justifySelf: ${position},
      }}
    />
  </div>
  `

  // LayoutId
  const [layoutId, setLayoutId] = useState<null | string>(null)

  return (
    <div>
      <h1 className="my-3 text-3xl font-bold">Framer Motion - Basic</h1>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        <div className="card bg-base-100 p-2 shadow-xl">
          <div className="card-title">Spring</div>
          <div className="flex flex-col gap-2">
            <label htmlFor="spring-mass">Mass</label>
            <input
              id="spring-mass"
              max="10"
              min="1"
              onChange={(e: any) => setMass(e.target.value)}
              type="range"
              value={mass}
            />
            <label htmlFor="spring-damping">Damping</label>
            <input
              max={5}
              min={0}
              onChange={(e: any) => setDamping(e.target.value)}
              step="0.10"
              type="range"
              value={damping}
            />
            <label htmlFor="spring-stiffness">Stiffness</label>
            <input
              max={500}
              min={1}
              onChange={(e: any) => setStiffness(e.target.value)}
              type="range"
              value={stiffness}
            />

            <motion.div
              initial={{
                x: 0,
              }}
              transition={{
                damping,
                mass,
                stiffness,
                type: 'spring',
              }}
              animate={{ x: 120 }}
              className="h-10 w-10 rounded bg-zinc-500"
              key={deferredSpring}
            />
          </div>

          <CodeBlock language="jsx">{springCodeString}</CodeBlock>
        </div>

        <div className="card bg-base-100 p-2 shadow-xl">
          <div className="flex flex-col gap-2">
            <div className="card-title">Tween</div>
            <label htmlFor="tween-type">Ease</label>
            <select
              onChange={event => {
                setTweenAnimation(event.target.value)
              }}
              className="select w-full max-w-xs"
              id="tween-type"
              value={tweenAnimation}
            >
              <option value="linear">linear</option>
              <option value="easeIn">easeIn</option>
              <option value="easeOut">easeOut</option>
              <option value="easeInOut">easeInOut</option>
              <option value="circIn">circIn</option>
              <option value="circOut">circOut</option>
              <option value="circInOut">circInOut</option>
              <option value="backIn">backIn</option>
              <option value="backOut">backOut</option>
              <option value="backInOut">backInOut</option>
              <option value="anticipate">anticipate</option>
            </select>

            <motion.div
              initial={{
                x: 0,
              }}
              transition={{
                duration: 1,
                ease: tweenAnimation,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 0.5,
                repeatType: 'reverse',
              }}
              animate={{ x: 120 }}
              className="h-10 w-10 rounded bg-zinc-500"
              key={tweenAnimation}
            />
            <CodeBlock language="jsx">{tweenCodeString}</CodeBlock>
          </div>
        </div>
        <div className="card bg-base-100 p-2 shadow-xl">
          <div className="flex flex-col gap-2">
            <div className="card-title">Inertia</div>
            <label htmlFor="tween-type">Velocity</label>
            <input max="100" min="0" onChange={(e: any) => setVelocity(e.target.value)} type="range" value={velocity} />

            <motion.div
              initial={{
                x: 0,
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                repeatType: 'reverse',
                type: 'inertia',
                velocity,
              }}
              animate={{ x: 120 }}
              className="h-10 w-10 rounded bg-zinc-500"
              key={deferredInertia}
            />
            <CodeBlock language="jsx">{inertiaCodeString}</CodeBlock>
          </div>
        </div>
      </div>

      <h1 className="my-3 text-3xl font-bold">Framer Motion - Variants</h1>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        <div className="card bg-base-100 p-2 shadow-xl">
          <div className="flex flex-col gap-2">
            <motion.button
              style={{
                zIndex: 1,
              }}
              className="h-10 w-full rounded border-none bg-zinc-500 outline-none"
              variants={variants}
              whileHover="hover"
              whileTap="pressed"
            >
              Click Me
            </motion.button>

            <CodeBlock language="jsx">{variantsCodeString}</CodeBlock>
          </div>
        </div>
      </div>

      <h1 className="my-3 text-3xl font-bold">Framer Motion - Layout</h1>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        <div className="card bg-base-100 p-2 shadow-xl">
          <div className="flex flex-col gap-2">
            <div className="card-title">Basic layout</div>

            <label className="label cursor-pointer">
              <span className="label-text">Enable Layout Animation</span>
              <input checked={layout} className="toggle" onChange={e => setLayout(e.target.checked)} type="checkbox" />
            </label>

            <div className="flex justify-around">
              {['start', 'center', 'end'].map(pos => (
                <label className="label cursor-pointer" key={pos}>
                  <span className="label-text">{pos}</span>
                  <input
                    checked={position === pos}
                    className="radio-primary radio"
                    name="radio"
                    onChange={e => setPosition(e.target.value)}
                    type="radio"
                    value={pos}
                  />
                </label>
              ))}
            </div>

            <div className="grid w-full rounded border p-1">
              <motion.div
                style={{
                  justifySelf: position,
                }}
                className="h-10 w-10 rounded bg-zinc-500"
                layout={!!layout}
              />
            </div>

            <CodeBlock language="jsx">{layoutFlexCodeString}</CodeBlock>
          </div>
        </div>
        <div className="card bg-base-100 p-2 shadow-xl">
          <div className="flex flex-col">
            <div className="card-title">LayoutId</div>

            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                position: 'relative',
              }}
              layoutRoot
            >
              {layoutIdList.map(id => (
                <motion.div
                  style={{
                    width: '100%',
                  }}
                  className="bg-base-100 rounded border p-4 text-2xl"
                  key={id}
                  layoutId={id}
                  onClick={() => setLayoutId(id)}
                >
                  <motion.h2 className="text-2xl">{id}</motion.h2>
                </motion.div>
              ))}

              <AnimatePresence>
                {layoutId ? (
                  <motion.div
                    style={{
                      inset: '0.5rem',
                      position: 'absolute',
                    }}
                    className="bg-base-100 rounded border p-4 text-2xl"
                    layoutId={layoutId}
                    onClick={() => setLayoutId(null)}
                  >
                    <motion.h2 className="text-2xl">{layoutId}</motion.h2>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
            <CodeBlock language="jsx">{layoutFlexCodeString}</CodeBlock>
          </div>
        </div>
      </div>
    </div>
  )
}
