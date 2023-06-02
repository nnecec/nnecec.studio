'use client'

import { useDeferredValue, useState } from 'react'
import { motion } from 'framer-motion'

import { CodeBlock } from '~/core/ui/code-block'

import type { Variants } from 'framer-motion'

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
      scale: 1.5,
      boxShadow: '0 8px 16px 0px #ffa0ae99',
    },
    pressed: {
      scale: 0.5,
    },
    default: {
      scale: 1,
    },
  }

  // Layout Animation
  const [position, setPosition] = useState('start')
  const [layout, setLayout] = useState(false)

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
              style={{
                background: 'linear-gradient(90deg,#ffa0ae 0%,#aacaef 75%)',
                height: '100px',
                width: '100px',
                borderRadius: '10px',
              }}
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
              style={{
                background: 'linear-gradient(90deg,#ffa0ae 0%,#aacaef 75%)',
                height: '100px',
                width: '100px',
                borderRadius: '10px',
              }}
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
              style={{
                background: 'linear-gradient(90deg, #ffa0ae 0%, #aacaef 75%)',
                height: '100px',
                width: '100px',
                borderRadius: '10px',
              }}
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
              style={{
                background: 'linear-gradient(90deg,#ffa0ae 0%,#aacaef 75%)',
                color: 'black',
                border: 'none',
                height: '50px',
                width: '200px',
                borderRadius: '10px',
                outline: 'none',
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
            <div className="card-title">Flex</div>
            <label htmlFor="tween-type">justice-items</label>

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

            <div className="grid w-full">
              <motion.div
                layout={!!layout}
                style={{
                  background: 'linear-gradient(90deg, #ffa0ae 0%, #aacaef 75%)',
                  height: '100px',
                  width: '100px',
                  borderRadius: '10px',
                  justifySelf: position,
                }}
              />
            </div>

            <CodeBlock language="jsx">{layoutFlexCodeString}</CodeBlock>
          </div>
        </div>
      </div>

      {/* <h1 className="my-3 text-3xl font-bold">Framer Motion - LayoutId</h1>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        <div className="card bg-base-100 p-2 shadow-xl">
          <div className="flex flex-col gap-2">
            <div className="card-title">Flex</div>
            <label htmlFor="tween-type">justice-items</label>

            <label className="label cursor-pointer">
              <span className="label-text">Enable Layout</span>
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

            <div className="grid w-full">
              <motion.div
                layout={!!layout}
                style={{
                  background: 'linear-gradient(90deg,#ffa0ae 0%,#aacaef 75%)',
                  height: '100px',
                  width: '100px',
                  borderRadius: '10px',
                  justifySelf: position,
                }}
              />
            </div>
            <CodeBlock language="jsx">{layoutFlexCodeString}</CodeBlock>
          </div>
        </div>
      </div> */}
    </div>
  )
}
