---
title: "Deep Dive: redux, react-redux"
date: "2021-10-12"
tags: ["Deep Dive", "React", "state-management"]
description: "redux 和 react-redux 的源码解读"
---

## Redux

先了解一下基本的使用方法。

```js
import { createStore } from "redux"

function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case "counter/incremented":
      return { value: state.value + 1 }
    case "counter/decremented":
      return { value: state.value - 1 }
    default:
      return state
  }
}
s

let store = createStore(counterReducer, applyMiddleware(logger))

store.subscribe(() => console.log(store.getState()))

store.dispatch({ type: "counter/incremented" }) // {value: 1}
store.dispatch({ type: "counter/incremented" }) // {value: 2}
store.dispatch({ type: "counter/decremented" }) // {value: 1}
```

### createStore(reducer, preloadedState, enhancer)

`createStore()`可以算做创建一个`store`并持有整个`store tree`。该方法返回了一个具有下列方法的对象

```js
{
  dispatch: dispatch as Dispatch<A>,
  subscribe,
  getState,
  replaceReducer,
}
```

#### store.dispatch(action)

`dispatch` 首先判断了 `action` 的合法性，并通过 `currentReducer(currentState, action)` 计算出最新的 `state`。并获取 `listeners` 对其依次进行调用以通知监听者。

#### store.subscribe(listener)

在 `dispatch` 中提到的 `listeners` 则是通过 `subscribe` 添加到 store 实例中的。`subscribe` 首先判断了 `listener` 参数的合法性，然后直接 `push` 到 `listeners` 数组中，并返回了 `unsubscribe` 的方法。

#### store.getState()

返回当前的 state 树

### middleware

Redux 接入第三方插件的方式是通过 `applyMiddleware` 方法。如果有 `enhancer`，则 `createStore` 直接返回

```js
enhancer(createStore)(reducer, preloadedState)
```

再来看一下 `applyMiddleware` 的源码。`applyMiddleware` 拦截了 `createStore` 并在自己的内部调用 `createStore` 生成 store，同时根据 `middlewares` 改写 `store.dispatch` 方法。

### compose

在 middleware 一节中，改写 `store.dispatch` 是通过 `compose` 方法，将传入的 `middleware` 和原始 `store.dispatch` 一起生成一个新的方法。

先看一个 middleware 的示例

```js
function logger({ getState }) {
  return next => action => {
    console.log("will dispatch", action)
    const returnValue = next(action)
    console.log("state after dispatch", getState())
    return returnValue
  }
}
```

首先 middleware 在 applyMiddleware 方法中，被第一次调用

```js
const middlewareAPI = {
  getState: store.getState,
  dispatch: (action, ...args) => dispatch(action, ...args),
}
const chain = middlewares.map(middleware => middleware(middlewareAPI))
dispatch = compose(...chain)(store.dispatch)
```

通过这次调用，`compose` 接受的方法则都变成了

```
next => action => {
  // whatever
}
```

所以在 `compose` 方法中

```js
export default function compose(...funcs) {
  return funcs.reduce(
    (a, b) =>
      (...args: any) =>
        a(b(...args))
  )
}
```

对于 a 来说，`next` 则为 b 方法。所以 middleware 通过内部的 next 达到了链式调用的目的。最后一个 `middleware` 的 `next` 则为 `store.dispatch`。

### combineReducers

在 `createStore` 中接受一个 reducer 参数，而在现实应用中，往往不太可能将所有的 reducer 放到一起。`redux`提供了 `combineReducers` 方法，从而将多个分散的 reducer 组合在一起，并提供给 `createStore` 使用。如`combineReducers({potato: potatoReducer, tomato: tomatoReducer})`。

在调用 `dispatch` 时，`combineReducers` 通过遍历获取 reducers 的键名 key 和 对应的 reducer，计算出 state 并赋值给 `rootState[key]`，从而达到合并多个 reducers 的目的。

### bindActionCreators

[API](https://redux.js.org/api/bindactioncreators)

## React Redux

首先仍然是了解一下基本使用方式，由于代码量比较大这里贴出[quick-start](https://react-redux.js.org/tutorials/quick-start)

### Provider

首先要提供给 `Provider` 一个合法的 store 实例，Provider 是一个 `Context.Provider`，其值为

```js
{
  store, subscription
}
```

store 是传给 Provider 的 `store props`，`subscription` 则通过 `createSubscription(store)` 方法生成。

### connect

[API](https://react-redux.js.org/api/connect)

