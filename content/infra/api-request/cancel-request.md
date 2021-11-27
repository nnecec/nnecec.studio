---
title: "如何取消请求？"
date: "2021-11-27"
tags: ["Introduction"]
description: "利用 JavaScript 或 React 实现(类似)取消请求的能力"
---

## JavaScript

### 1. AbortController

> [MDN: AbortController](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController)
> 主流浏览器均已实现

```js
const controller = new AbortController()
const signal = controller.signal

requestButton.addEventListener("click", fetchData)
abortButton.addEventListener("click", function () {
  controller.abort()
  console.log("Request aborted")
})
```

### 2. 定制一个 CancelablePromise

> 类似 axios 取消的实现

```ts
export type CancelablePromise<T> = Promise<T> & { cancel: () => void }

export function makeCancelable<T>(promise: Promise<T>): CancelablePromise<T> {
  let cancel = () => {}

  const wrappedPromise: any = new Promise((resolve, reject) => {
    cancel = () => {
      resolve = null
      reject = null
    }

    promise.then(
      val => {
        if (resolve) resolve(val)
      },
      error => {
        if (reject) reject(error)
      }
    )
  })

  wrappedPromise.cancel = cancel
  return wrappedPromise as CancelablePromise<T>
}

const fetchData = makeCancelable(fetch(url))

requestButton.addEventListener("click", fetchData)
cancelButton.addEventListener("click", function () {
  fetchData.cancel()
})
```

### 3. XMLHttpRequest

```js
var xhr = new XMLHttpRequest()
xhr.open("GET", "https://developer.mozilla.org/", true)

function fetchData() {
  xhr.send()
}

requestButton.addEventListener("click", fetchData)
cancelButton.addEventListener("click", function () {
  fetchData.cancel()
})
```

## React

### 1. 利用标记及 useEffect 的闭包能力

切换页面时，

```jsx
function App() {
  const [currentPage, setCurrentPage] = useState(0)
  const [data, setData] = useState(null)
  useEffect(() => {
    let isAbort = false
    fetchData(currentPage).then(response => {
      if (!isAbort) {
        setData(response.data)
      }
    })
    return () => {
      isAbort = true
    }
  }, [currentPage])

  return (
    <div>
      <RequestButton onClick={page => setCurrentPage(page)}>
        Request
      </RequestButton>
      <List data={data} />
    </div>
  )
}
```
