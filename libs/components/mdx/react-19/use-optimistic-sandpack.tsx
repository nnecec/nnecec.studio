'use client'
import { Sandpack } from '~/libs/ui'

const CODE = `
import { useState, useRef, useOptimistic, useTransition } from "react"

async function fetchLike({ data, forceFail }) {
  if (forceFail) {
    await new Promise((_, reject) => setTimeout(() => reject('something wrong'), 1000))
  }
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return data
}

const Like = ({ checked, onClick, showLoading = false }) => {
  const [isPending, startTransition] = useTransition()
  const [optimisticLike, setOptimisticLike] = useOptimistic(checked, (state, newValue) => newValue)

  function handleClick() {
    startTransition(() => {
      setOptimisticLike(!optimisticLike)
      return onClick(!optimisticLike)
    })
  }

  return (
    <div>
      <button onClick={handleClick}>
        {optimisticLike ? "❤️" : "🤍"}
      </button>
      {isPending && showLoading && <div>Saving...</div>}
    </div>
  )
}

export default function App() {
  const [like, setLike] = useState(false)
  const [forceFail, setForceFail] = useState(false)
  const [showLoading, setShowLoading] = useState(false)

  function handleClick(data) {
    return fetchLike({ data, forceFail })
      .then(data => setLike(data))
      .catch(error => console.log(error))
  }

  return <div>
    <label>
      <input type="checkbox" checked={forceFail} onChange={e => setForceFail(e.target.checked)}/>
      force failed
    </label>
    <label>
      <input type="checkbox" checked={showLoading} onChange={e => setShowLoading(e.target.checked)}/>
      show loading
    </label>
    <Like checked={like} onClick={handleClick} showLoading={showLoading}/>
  </div>
}
`

export default function UseOptimisticSandpack() {
  return (
    <div>
      <Sandpack
        dependencies={{
          react: '^19.0.0-rc.0',
          'react-dom': '^19.0.0-rc.0',
        }}
        files={{
          'App.js': CODE,
        }}
      />
    </div>
  )
}
