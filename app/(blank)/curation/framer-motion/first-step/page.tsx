'use client'

import { useDeferredValue, useState } from 'react'
import { motion } from 'framer-motion'

import { CodeBlock } from '~/core/ui/code-block'

export default function FirstStep() {
  const [tweenAnimation, setTweenAnimation] = useState('easeInOut')
  const [mass, setMass] = useState(3)
  const [damping, setDamping] = useState(1)
  const [velocity, setVelocity] = useState(50)
  const [stiffness, setStiffness] = useState(100)

  const deferredSpring = useDeferredValue(`${mass}${stiffness}${damping}`)
  const deferredInertia = useDeferredValue(`${velocity}`)

  const springCodeString = `<motion.div
    ...
    transition={{
      type: 'spring',
      stiffness: ${stiffness},
      mass: ${mass},
      damping: ${damping},
    }}
  />
  `

  const tweenCodeString = `<motion.div
  ...
  transition={{
    type: 'tween',
    ease: '${tweenAnimation}',
    duration: 2,
    ...
  }}
  />
  `

  const inertiaCodeString = `<motion.div
    ...
    transition={{
      type: 'inertia',
      velocity: ${velocity},
    }}
  />


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
    </div>
  )
}
