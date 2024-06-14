'use client'
import { Sandpack } from '~/libs/ui'

const CODE = `
import { use, useState, Suspense } from 'react'

function fetchData(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: id,
        name: 'name' + id,
      })
    }, 1000)
  })
}

function fetchBio() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        bio: 'bio' + Math.random(),
      })
    }, 1000)
  })
}

function UserInfo ({ id }) {
  const data = use(fetchData(id))

  return <div>
    <h5>User Info</h5>
    <p>User {data.id}: {data.name}</p>
  </div>
}

function BioInfo ({ id }) {
  const [value, setValue] = useState('')
  const data = use(fetchBio())

  return <div>
    <p>Bio: {data.bio}</p>
    <button onClick={() => setValue(Math.random())}>Generate a bio</button>
  </div>
}

export default function App() {
  const [value, setValue] = useState('')

  return <div>
    <label>
      UserId:
      <input value={value} onChange={e => setValue(e.target.value)} />
    </label>
    <Suspense fallback={<div>Loading...</div>}>
      <UserInfo id={value} />
      <Suspense fallback={<div>Loading bio...</div>}>
        <BioInfo id={value} />
      </Suspense>
    </Suspense>
  </div>
}
`

export default function UseSandpack() {
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
