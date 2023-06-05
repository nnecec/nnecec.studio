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
    hover: {
      scale: 1.2,
      boxShadow: '0 8px 16px 0px #fff6',
    },
    pressed: {
      scale: 0.8,
    },
    default: {
      scale: 1,
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
  const [layoutId, setLayoutId] = useState<string | null>(null)

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
              type="range"
              min="1"
              max="10"
              className="range"
              value={mass}
              onChange={e => setMass(e.target.value)}
            />
            <label htmlFor="spring-damping">Damping</label>
            <input
              type="range"
              min={0}
              max={5}
              step="0.10"
              className="range"
              value={damping}
              onChange={e => setDamping(e.target.value)}
            />
            <label htmlFor="spring-stiffness">Stiffness</label>
            <input
              type="range"
              min={1}
              max={500}
              value={stiffness}
              className="range"
              onChange={e => setStiffness(e.target.value)}
            />

            <motion.div
              key={deferredSpring}
              className="h-10 w-10 rounded bg-zinc-500"
              initial={{
                x: 0,
              }}
              animate={{ x: 120 }}
              transition={{
                type: 'spring',
                stiffness,
                mass,
                damping,
              }}
            />
          </div>

          <CodeBlock language="jsx">{springCodeString}</CodeBlock>
        </div>

        <div className="card bg-base-100 p-2 shadow-xl">
          <div className="flex flex-col gap-2">
            <div className="card-title">Tween</div>
            <label htmlFor="tween-type">Ease</label>
            <select
              id="tween-type"
              className="select w-full max-w-xs"
              value={tweenAnimation}
              onChange={event => {
                setTweenAnimation(event.target.value)
              }}
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
              key={tweenAnimation}
              className="h-10 w-10 rounded bg-zinc-500"
              initial={{
                x: 0,
              }}
              animate={{ x: 120 }}
              transition={{
                ease: tweenAnimation,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: 'reverse',
                repeatDelay: 0.5,
                duration: 1,
              }}
            />
            <CodeBlock language="jsx">{tweenCodeString}</CodeBlock>
          </div>
        </div>
        <div className="card bg-base-100 p-2 shadow-xl">
          <div className="flex flex-col gap-2">
            <div className="card-title">Inertia</div>
            <label htmlFor="tween-type">Velocity</label>
            <input
              type="range"
              min="0"
              max="100"
              value={velocity}
              className="range"
              onChange={e => setVelocity(e.target.value)}
            />

            <motion.div
              key={deferredInertia}
              className="h-10 w-10 rounded bg-zinc-500"
              initial={{
                x: 0,
              }}
              animate={{ x: 120 }}
              transition={{
                type: 'inertia',
                velocity,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: 'reverse',
              }}
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
              variants={variants}
              whileHover="hover"
              whileTap="pressed"
              className="h-10 w-full rounded border-none bg-zinc-500 outline-none"
              style={{
                zIndex: 1,
              }}
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
              <input
                type="checkbox"
                className="toggle"
                checked={layout}
                onChange={e => setLayout(e.target.checked)}
              />
            </label>

            <div className="flex justify-around">
              {['start', 'center', 'end'].map(pos => (
                <label className="label cursor-pointer" key={pos}>
                  <span className="label-text">{pos}</span>
                  <input
                    type="radio"
                    name="radio"
                    value={pos}
                    className="radio-primary radio"
                    checked={position === pos}
                    onChange={e => setPosition(e.target.value)}
                  />
                </label>
              ))}
            </div>

            <div className="grid w-full rounded border p-1">
              <motion.div
                className="h-10 w-10 rounded bg-zinc-500"
                layout={!!layout}
                style={{
                  justifySelf: position,
                }}
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
                position: 'relative',
                gap: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
              layoutRoot
            >
              {layoutIdList.map(id => (
                <motion.div
                  key={id}
                  layoutId={id}
                  className="rounded border bg-base-100 p-4 text-2xl"
                  onClick={() => setLayoutId(id)}
                  style={{
                    width: '100%',
                  }}
                >
                  <motion.h2 className="text-2xl">{id}</motion.h2>
                </motion.div>
              ))}

              <AnimatePresence>
                {layoutId && (
                  <motion.div
                    layoutId={layoutId}
                    className="rounded border bg-base-100 p-4 text-2xl"
                    onClick={() => setLayoutId(null)}
                    style={{
                      position: 'absolute',
                      inset: '0.5rem',
                    }}
                  >
                    <motion.h2 className="text-2xl">{layoutId}</motion.h2>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <CodeBlock language="jsx">{layoutFlexCodeString}</CodeBlock>
          </div>
        </div>
      </div>
    </div>
  )
}
