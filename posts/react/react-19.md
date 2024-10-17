---
title: '从 React 19 重新理解 React 设计理念'
date: '2024-06-05'
tags: ['React']
description:
  'React Team 在2024年4月25日发布了《React 19 RC》文章，文章中介绍了 React 19 的更新内容，结合 React
  的编程理念让我们来看看 React 希望开发者如何理解界面渲染。'
---

## 参考

- [Algebraic Effects for the Rest of Us](https://overreacted.io/algebraic-effects-for-the-rest-of-us/)
- [React 19 RC – React](https://react.dev/blog/2024/04/25/react-19)
- [React Compiler – React](https://react.dev/learn/react-compiler)
- [Basic Theoretical Concepts](https://github.com/reactjs/react-basic)
- [聊聊代数效应](https://mongkii.com/blog/2021-05-08-talk-about-algebraic-effects)。
- [A description of React's new core algorithm, React Fiber](https://github.com/acdlite/react-fiber-architecture)

> 本文通过基于 React 的设计思想并结合 React 19 新 API 的设计，来加强对 React 编程哲学的理解。

## React 设计思想

先回到 React 被设计的起源，让我们看看 React 是如何构想并设计的。

React 在 2016 年 3 月 29 日发布的
[Basic Theoretical Concepts (React 基本理念)](https://github.com/reactjs/react-basic) 文章中阐述过
React 的设计思想及应该具备的特性。

React 认为 UI 是一种数据的函数式表达，它应该具备变换（通过对象的数据结构描述 HTML 节点）、抽象（将通
用的 UI 抽象成组件）、缓存、组合（将抽象的组件组合到一起）等等特性：

> The core premise for React is that UIs are simply a projection of data into a different form of
> data. The same input gives the same output. A simple pure function.
>
> _设计 React 的核心前提是认为 UI 只是把数据通过映射关系变换成另一种形式的数据。同样的输入必会有同样
> 的输出。这恰好就是纯函数。_

在 React 基本能力稳定的前提下，React 19 对如下这部分能力进行了重新的思考和设计，并提供了更符合开发者
直觉或者更易用的 API。

- 状态（State）
- 缓存（Memoization）
- 缓存映射（Memoization Map）
- 代数效应（Algebraic Effects）

---

### 状态（State）

对于**状态（State）**，React 的理解是 UI 不只是对服务端数据或业务逻辑状态的表达。实际中也是单个渲染
组件内部使用的临时状态的表达，即我们开发中常用的组件内创建的状态。

例如，在一个 text field 中输入，此时不一定要将打字过程中的状态提供到其他页面或组件。在 React 倾向于
数据模型不可变的情况下，对于这种无需共享和保存的本地状态，React 提供了状态（State）的概念。

在当前的版本中，开发者可以通过 `useState` 或 `useReducer` 实现 State 的创建、更新和 UI 表达。

React 19 中提供了新的两个与状态（State）相关的 API： `useOptimistic` 和 `useActionState`

#### `useOptimistic`

`useOptimistic` 接受一个预设结果是成功的更新函数，在操作等待期间以成功的乐观状态更新状态，并在等待操
作完成后使用实际结果更新状态。 `updateOptimistic` 本质上利用了 React 的优先级调度更新，所以需要在
transition 或 form 的 action 上下文中被调用。

<UseOptimisticSandpack />

#### `useActionState`

一般使用原生 form 可能需要创建 3 个状态：

1. 用于获取输入值的状态
2. 用于处理挂起的状态
3. 用于处理错误的状态

React 提供了一个 `useActionState` hook，它根据开发者定义的函数的执行结果更新状态，并返回状态、action
方法和 pending 状态。

```js
import { useActionState } from 'react'

async function action(currentState, formData) {
  const res = await fetch('https://example.com/', {
    method: 'POST',
    body: formData,
  })

  const result = res.json() // or a message

  return result // 页面需要的 state
}

function MyComponent() {
  const [state, action, isPending] = useActionState(action, initialState)
  // ...
  return <form action={action}>{/* ... */}</form>
}
```

### 缓存（Memoization）和 缓存映射（Memoization Map）

对于纯函数，使用相同的参数一次次调用特别浪费资源。我们可以创建一个函数的 memorized 版本，用来追踪最
新的参数和执行结果。这样如果我们继续使用同样的值，就不需要反复执行它了。React 认为这就是缓存
（Memoization）的概念。

先回顾一下在 React 19 之前，开发者是如何实现缓存（Memoization）的能力。

React 认为一个组件不需要重新调度渲染的判断条件是：

1. 接受的 props 没有发生变化（父组件中没有影响该组件的状态）
2. 节点类型没有发生变化。例如 `<div>` 变成了 `<p>` 则认为发生了节点类型变化。
3. 该组件内部 state 没有更新产生。

要达到这些条件需要将子组件 memo，并保证传递给组件的 props 和 组件内的 state 没有发生改变。往往需要借
助 React 的这些 API：

- `memo`
- `useCallback`
- `useMemo`
- `useRef`

在开发中，往往很难精细的控制好每个 API 的正确使用，同时造成了极大的心智负担。但现在开发者不再需要用
人工控制缓存的手段来优化 React 的渲染性能了，全新的 React Compiler 可以自动实现缓存 (Memoization)能
力：

> The compiler uses its knowledge of JavaScript and React’s rules to automatically memoize values or
> groups of values within your components and hooks. If it detects breakages of the rules, it will
> automatically skip over just those components or hooks, and continue safely compiling other code.
>
> _compiler 利用其对 JavaScript 和 React 规则的了解，在您的组件和 hooks 内自动缓存值或一组值。如果发
> 现缓存规则不可用，它将自动跳过那些组件或钩子，并继续安全地编译其他代码。_

[React Compiler](https://playground.react.dev/) 利用 babel 编译插件的能力，将原始代码进行了一次转
换。React 会在组件顶层通过 `useMemoCacheIdentifier` 初始化一个有预期长度的缓存映射，并依次检查符合缓
存策略规则的变量或函数。遍历组件内的变量或函数，检查缓存条件是否成立并依次设置/获取缓存值。

<div class="md:flex gap-3 md:-mx-24">

```js
// 原始代码
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(count + 1)
  }

  return <button onClick={handleClick}>Pressed{count}times</button>
}
```

```js
// React Compiler 编译后的代码
function Counter() {
  const $ = _c(5)

  const [count, setCount] = useState(0)
  let t0

  if ($[0] !== count) {
    t0 = function handleClick() {
      setCount(count + 1)
    }

    $[0] = count
    $[1] = t0
  } else {
    t0 = $[1]
  }

  const handleClick = t0
  let t1

  if ($[2] !== handleClick || $[3] !== count) {
    t1 = <button onClick={handleClick}>Pressed {count} times</button>
    $[2] = handleClick
    $[3] = count
    $[4] = t1
  } else {
    t1 = $[4]
  }

  return t1
}
```

</div>

### 代数效应（Algebraic Effects）

Dan 在
[Algebraic Effects for the Rest of Us — overreacted.io](https://overreacted.io/algebraic-effects-for-the-rest-of-us/)
文章中，详细解释了什么是代数效应。

在编程语境中，代数效应指的是
[「将程序执行的操作像代数一样，代入到另一块操作中」](https://mongkii.com/blog/2021-05-08-talk-about-algebraic-effects)。

Algebraic Effects 优点：

1. 避免了使用类似 [Generator](https://github.com/facebook/react/issues/7942) 或 async/await 导致对调用函
   数的污染
2. 简单易用的跨层级调用，避免由外而内参数的层层传递

```js {2,11-17}
const getUserName = userId => {
  const user = perform({ userId }) // 等待外层的注入依赖执行完回传
  return user.name
}

const print = () => {
  const userName = getUserName(123)
  console.log(userName)
}

try {
  const userName = print()
} handle (effect) {
  fetchUser(effect.userId).then(res =>{
    resume res.data; // 继续执行 perform 之后的逻辑
  })
}

const fetchUser = async userId => {
  const user = await axios.get(`/api/user/${userId}`).then(res => res.data)
  return user
}
```

在理解的代数效应大致的概念后，回到 React 践行代数效应理念的实现上，可以在 React 这些特性上看到代数效
应的影子。

1. 例如 `useState`：函数组件本身并没有能力保存 state 的状态，但每次使用时都能拿到一个 stateful 的
   值，这就是因为在调用 useState 时进行了中断，将效应抛出给 React 处理，由它获取到 state 值后，代入
   回组件函数使用。

2. 类似 `try..handle` 的设计，Suspense 可以接收到内部组件的 loading 状态并处理 fallback 内容。

   ```jsx
   const App = () => {
     return (
       <Suspense fallback={<Loading />}>
         <UserInfo />
         <OrderInfo>
           <ProductInfo />
         </OrderInfo>
       </Suspense>
     )
   }
   ```

3. useContext 具备跨层级传递数据的能力，不需要在组件之间通过参数传递数据。

在 React 19 中提供了新的 [use](https://react.dev/reference/react/use) API，这不是一个 hook 而是一个
API。它可以在条件语句中使用，既可以接受 `Context` 获取 context 值，也可以接受 `Promise` 获取异步数据
且不像 `async/await` 一样具有传染性。

<UseSandpack />

#### `useFormStatus`

useFormStatus 是一个 hook，它会提供父层级表单的状态信息。

```js
import { useFormStatus } from 'react-dom'
import action from './actions'

function Submit() {
  const { pending, data, method, action } = useFormStatus()
  return <button disabled={pending}>Submit</button>
}

export default function App() {
  return (
    <form action={action}>
      <Submit />
    </form>
  )
}
```

---

## 可中断更新

在之前的代数效应章节中提到了代数效应的一个能力：中断当前程序，去执行另一个指定的效应（effects）。

为了实现渲染的可中断能力，React 16 提出了 Fiber 的概念，并在
[A description of React's new core algorithm, React Fiber](https://github.com/acdlite/react-fiber-architecture)
文章中对 Fiber 架构设计做出了非常详细的解读。

React 19 提供了稳定的优先级控制方法

- useDeferredValue
- useTransition

#### useDeferredValue

<UseDeferredValueSandpack/>

#### useTransition

Demo

React 默认用户操作具有较高优先级，并且提供的都是降低优先级的方法。那么如何执行更高优先级的任务？

flushSync

---

## 其他变更

1. 支持 `use client` & `use server` 指令
2. ref 成为了 props 中的一员，不再需要 forwardRef 来转发 ref 参数。同时 ref 支持返回一个方法作为清理
   函数，所以不能这样写了 `ref={current => (instance = current)}`。useRef 必须提供一个参数。
3. 废弃 Context.Provider 的用法，支持直接使用 `<SomeContext />`
