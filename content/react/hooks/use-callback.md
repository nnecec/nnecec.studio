---
title: "Hooks 源码：useCallback"
date: "2021-07-13"
tags: ["Deep Dive", "React"]
description: "useCallback 和它的一切。"
---

## 定义

你可以在[官方文档](https://reactjs.org/docs/hooks-reference.html#usecallback)中看到 `useCallback` 的说明。

`useCallback` 与 `useMemo` 类似，`useCallback` 返回了方法，而 `useMemo` 返回了方法的执行结果。

## 源码

在我们对[hooks](/react/hooks)的解读中，解释了 hooks 的状态是如何记录并获取的。

```ts
function mountCallback<T>(callback: T, deps: Array<mixed> | void | null): T {
  const hook = mountWorkInProgressHook()
  const nextDeps = deps === undefined ? null : deps
  hook.memoizedState = [callback, nextDeps]
  return callback
}

function updateCallback<T>(callback: T, deps: Array<mixed> | void | null): T {
  const hook = updateWorkInProgressHook()
  const nextDeps = deps === undefined ? null : deps
  const prevState = hook.memoizedState
  if (prevState !== null) {
    if (nextDeps !== null) {
      const prevDeps: Array<mixed> | null = prevState[1]
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        return prevState[0]
      }
    }
  }
  hook.memoizedState = [callback, nextDeps]
  return callback
}

function areHookInputsEqual(
  nextDeps: Array<mixed>,
  prevDeps: Array<mixed> | null
) {
  if (prevDeps === null) {
    return false
  }
  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (is(nextDeps[i], prevDeps[i])) {
      continue
    }
    return false
  }
  return true
}
```

`useCallback` 的实现相对比较简单，在 `mount` 阶段，将方法和依赖储存在 `hook.memoizedState` 上。在 `update` 阶段，如果存在依赖，则遍历依赖数组使用 `Object.is` 进行一个个对比，如果有不同的则更新之前已经储存的缓存，如果依赖都没有发生变更，则复用缓存里的方法。

## 现实案例

### 什么时候使用 `useCallback`

由于 `useCallback` 缓存了 function ，所以可能使开发者认为：使用缓存保存 function 可以优化性能。于是，在 `FunctionalComponent` 中，大量使用 `useCallback` 包裹声明的 function 。

其实，在[Hooks FAQ](https://reactjs.org/docs/hooks-faq.html#are-hooks-slow-because-of-creating-functions-in-render)中，官方提到在 `FunctionalComponent` 中创建 function 在几乎大多数场景下，不会对代码性能产生影响。根据[这篇文章](https://zhuanlan.zhihu.com/p/56975681)，并且如果使用 `useCallback` 生成方法，由于既要生成 inline function，又要通过 `useCallback` 返回新的方法，反而可能会性能差上一点。

那么，在什么情况下，应该使用 `useCallback` 呢？

- 当方法需要传递给子组件，如果不使用 `useCallback` 缓存，相当于每次都是声明了一个新的 function，对于子组件来说，这个方法的变更会导致 `props` 发生变更。所以为了优化不必要的渲染，使用 `useCallback` 储存需要向子组件传递的方法。

   ```js
   function App() {
     const [title, setTitle] = useState("title")

     const sayTitle = useCallback(() => {
       console.log(title)
     }, [title])

     return <Button onClick={sayTitle}>say</Button>
   }
   ```

- 当我们在使用 `Button` 组件时，同样也是向 `onClick` 方法传递了一个 `function`。在这种情况下，如果只有一个 `Button`，那使用 `function` 或 `useCallback` 声明整体性能差别不大。但如果给一个长列表使用，那么对于重新渲染的性能 `useCallback` 要优于 `function` 直接声明。

> 在 [TestUseCallback](https://debug-react.vercel.app/test-use-callback)中，使用 React DevTool - Profiler 可以看到重新渲染的耗时对比。

### 意料之外的 `useCallback`

为什么说“意料之外”？

我们使用 `useCallback`，本质上是希望它能够缓存方法，但是 `useCallback` 有第二个参数: `deps`。`deps` 的变更同样会导致 function 缓存失效，那么如果 `deps` 总是变化，缓存就一直无法起作用了。

```js
function App() {
  const [title, setTitle] = useState("title")

  const sayTitle = useCallback(() => {
    console.log(title)
  }, [title])

  return (
    <div>
      <Input onChange={value => setTitle(value)} />
      <Button onClick={sayTitle}>say</Button>
    </div>
  )
}
```

在上例中，由于 `Input` 不断修改 `title` 导致 `sayTitle` 一直在被更新，从而导致“意料之外”的缓存失效。如果从 `deps` 中移除 `title`，又会导致 `useCallback` 的方法无法获取最新的 `title`。

不过看起来，`sayTitle` 如果不添加依赖，仍然可以获取 `title`，但为什么获取不到最新的 `title` 了呢？

当通过 `useCallback` 缓存了一个方法，这个方法形成了闭包并保持了对外部变量的引用。我们通过 `setTitle` 修改了 `title`，但缓存的方法内引用的 `title` 仍是指向旧的那份内存地址。

```js
function useState() {
  let count = 0
  const increment = () => {
    count += 1
    console.log(count) // increment console.log
  }

  return [count, increment]
}

function useCallback(fn) {
  return () => fn()
}

function app() {
  const [count, increment] = useState()

  const callback = useCallback(() => {
    console.log(count)
  })

  return {
    increment,
    callback,
  }
}

const { increment, callback } = app()

callback() // 0
increment() // 1
callback() // 0
```

上面我们用类似 React API 的方式实现了一个闭包的例子。可以看得出方法如果缓存，则一直保持声明时对外部变量的引用，行为与[闭包](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)一致。

### 使用“不变”的依赖来解决 `useCallback` 无法按预期缓存的问题

#### 使用 `useRef`

在[Hooks FAQ](https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback)中给出了，需要设置依赖又需要设置缓存时的解决方案。

```js
function App() {
  const [title, setTitle] = useState("title")
  const inputRef = useRef("")

  const sayTitle = useCallback(() => {
    console.log(inputRef.current)
  }, [inputRef])

  useEffect(() => {
    inputRef.current = title
  }, [title])

  return (
    <div>
      <Input onChange={value => setTitle(value)} />
      <Button onClick={sayTitle}>say</Button>
    </div>
  )
}
```

该方法通过 `useRef` 生成了 `ref`，将 `ref` 传递给 `useCallback` 来保持 `deps` 的不变，并在 `useEffect` 中保持 `ref` 与 `title` 的同步。

```js
function useRefCallback(fn, dependencies) {
  const ref = useRef(() => {
    throw new Error("Cannot call an event handler while rendering.")
  })

  useEffect(() => {
    ref.current = fn
  }, [fn, ...dependencies])

  return useCallback(() => {
    const fn = ref.current
    return fn()
  }, [ref])
}

function App() {
  const [title, setTitle] = useState("title")

  const sayTitle = useRefCallback(() => {
    console.log(title)
  }, [title])

  return (
    <div>
      <Input onChange={value => setTitle(value)} />
      <Button onClick={sayTitle}>say</Button>
    </div>
  )
}
```

#### 使用 `useReducer` 的 `dispatch`

官方还提到了一种使用[useReducer 生成 dispatch](https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down)的方案来传递方法，并且由于 `dispatch` 的“不变”性，向子组件传递的 `dispatch` 不会导致子组件渲染。

我们可以在[`useReducer` 的 `update` 阶段的源码可以看到如何获取 `dispatch` 的](/react/hooks/use-state-reducer)：

```ts
// ...
const dispatch: Dispatch<A> = (queue.dispatch: any);
return [hook.memoizedState, dispatch];
// ...
```

在 `update` 阶段，从 fiber 上获取了之前缓存的 `dispatch`，所以 `dispatch` 是不会发生变化的。
