---
title: "Hooks 源码：useState, useReducer"
date: "2021-03-18"
tags: ["Deep Dive", "React"]
description: "useState, useReducer 和它的一切。"
---

## 定义

你可以在[useState](https://reactjs.org/docs/hooks-reference.html#usestate)和[useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer)中看到 `useState` 和 `useReducer` 的说明。

我不对文档已有的基本内容做说明，你可以访问官网查看官方的说明。

`useState` 可以视为 `useReducer` 的语法糖，本质上都是返回了一个被储存的值，以及一个修改它的方法。

```js
const [count, setCount] = useState(0)
// 类似
const [count, dispatchCount] = useReducer(countReducer, 0)
```

在后面的源码分析中也可以看到， `useState` 相对于 `useReducer` 来说，是赋值了一个默认的 `reducer` 方法。

通过 `useState` 以及 `useReducer` 返回的 `setState` 方法，可以设置 `state` 的值，并触发刷新。在其他的 `hooks` 中, `useRef` 也可以起到储存值的作用，但不同的是，`useRef` 不会触发页面的重新渲染。

## 源码

在我们对[hooks](/react/hooks/basic)的解读中，解释了 hooks 的状态是如何记录并获取的。

在看这部分源码前，我们带着几个问题：

- 为什么说 `useState` 是 `useReducer` 的语法糖
- 为什么通过 `setState` 方法更新值才会触发渲染

### `mount` 阶段

```ts
function mountState<S>(
  initialState: (() => S) | S,
): [S, Dispatch<BasicStateAction<S>>] {
  const hook = mountWorkInProgressHook();
  if (typeof initialState === 'function') {
    initialState = initialState();
  }
  hook.memoizedState = hook.baseState = initialState;
  const queue = (hook.queue = {
    pending: null,
    interleaved: null,
    lanes: NoLanes,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: (initialState: any),
  });
  const dispatch: Dispatch<
    BasicStateAction<S>,
  > = (queue.dispatch = (dispatchAction.bind(
    null,
    currentlyRenderingFiber,
    queue,
  ): any));
  return [hook.memoizedState, dispatch];
}

function basicStateReducer<S>(state: S, action: BasicStateAction<S>): S {
  // $FlowFixMe: Flow doesn't like mixed types
  return typeof action === 'function' ? action(state) : action;
}

function mountReducer<S, I, A>(
  reducer: (S, A) => S,
  initialArg: I,
  init?: I => S,
): [S, Dispatch<A>] {
  const hook = mountWorkInProgressHook();
  let initialState;
  if (init !== undefined) {
    initialState = init(initialArg);
  } else {
    initialState = ((initialArg: any): S);
  }
  hook.memoizedState = hook.baseState = initialState;
  const queue = (hook.queue = {
    pending: null,
    interleaved: null,
    lanes: NoLanes,
    dispatch: null,
    lastRenderedReducer: reducer,
    lastRenderedState: (initialState: any),
  });
  const dispatch: Dispatch<A> = (queue.dispatch = (dispatchAction.bind(
    null,
    currentlyRenderingFiber,
    queue,
  ): any));
  return [hook.memoizedState, dispatch];
}
```

对比 `mountState` 和 `mountReducer` 可以看到，区别仅仅是 `计算 initialState` 和 `reducer`。根据 `useState` 的文档，它的参数是一个值或者方法，在源码的处理中，遇到值则直接返回，遇到方法则返回执行结果。

对于 <使用 useReducer 实现 useState> 这种问题，可以给出如下答案:

>

```ts
function useMyState(initialState) {
  const reducer = ((state, action) =
    typeof action === "function" ? action(state) : action)
  return useReducer(reducer, initialState)
}
```

### `update` 阶段

```ts
function updateState<S>(
  initialState: (() => S) | S,
): [S, Dispatch<BasicStateAction<S>>] {
  return updateReducer(basicStateReducer, (initialState: any));
}

function updateReducer<S, I, A>(
  reducer: (S, A) => S,
  initialArg: I,
  init?: I => S,
): [S, Dispatch<A>] {
  const hook = updateWorkInProgressHook();
  const queue = hook.queue;

  queue.lastRenderedReducer = reducer;

  // 省略

  const dispatch: Dispatch<A> = (queue.dispatch: any);
  return [hook.memoizedState, dispatch];
}
```

先忽略对于有未处理的更新队列这种情况，对于 `useState` 和 `useReducer` 来说，两者都是获取了已经存在的 `hook.memoizedState` 和 `dispatch` 并返回。
