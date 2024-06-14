'use client'
import { Sandpack } from '~/libs/ui'

const CODE = `
import { memo, useState, useTransition, useDeferredValue } from "react"

const SlowList = memo(function SlowList({ text }) {
  let items = [];
  for (let i = 0; i < 250; i++) {
    items.push(<SlowItem key={i} text={text} />);
  }
  return (
    <ul className="items">
      {items}
    </ul>
  );
});

function SlowItem({ text }) {
  let startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }

  return (
    <li className="item">
      Value: {text}
    </li>
  )
}

export default function App() {
  const [enable, setEnable] = useState(false)
  const [value, setValue] = useState(0)
  const deferredValue = useDeferredValue(value)

  return <div>
    <label>
    Enable useDeferredValue
    <input type="checkbox" checked={enable} onChange={e => setEnable(e.target.checked)}/>
    </label>
    <div>
      <label>
        Input value:
        <input type="range" min="0" max="100" value={value} onChange={e => setValue(e.target.value)} />
      </label>
      <SlowList text={enable ? deferredValue : value} />
    </div>
  </div>
}
`

export default function UseDeferredValueSandpack() {
  return (
    <div>
      <Sandpack
        dependencies={{
          react: '^19.0.0-rc.0',
          'react-dom': '^19.0.0-rc.0',
        }}
        files={{
          'App.js': CODE,
          'sandbox.config.json': {
            code: `{ "infiniteLoopProtection": false }`,
            hidden: true,
          },
        }}
      />
    </div>
  )
}
