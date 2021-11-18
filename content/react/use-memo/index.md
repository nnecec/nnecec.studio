---
title: "Hooks 源码：useMemo"
date: "2021-07-16"
tags: ["Deep Dive", "React"]
description: "useMemo 和它的一切。"
---

## 定义

你可以在[官方文档](https://reactjs.org/docs/hooks-reference.html#usememo)中看到 `useMemo` 的说明。

`useMemo` 与 `useCallback` 类似，`useCallback` 返回了方法，而 `useMemo` 返回了方法的执行结果。

## 源码

```ts
function mountMemo<T>(
  nextCreate: () => T,
  deps: Array<mixed> | void | null
): T {
  const hook = mountWorkInProgressHook()
  const nextDeps = deps === undefined ? null : deps
  const nextValue = nextCreate()
  hook.memoizedState = [nextValue, nextDeps]
  return nextValue
}

function updateMemo<T>(
  nextCreate: () => T,
  deps: Array<mixed> | void | null
): T {
  const hook = updateWorkInProgressHook()
  const nextDeps = deps === undefined ? null : deps
  const prevState = hook.memoizedState
  if (prevState !== null) {
    // Assume these are defined. If they're not, areHookInputsEqual will warn.
    if (nextDeps !== null) {
      const prevDeps: Array<mixed> | null = prevState[1]
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        return prevState[0]
      }
    }
  }
  const nextValue = nextCreate()
  hook.memoizedState = [nextValue, nextDeps]
  return nextValue
}
```

可以看出来 React 中 `useMemo` 的实现相对是比较简单的，在 `mount` 阶段调用第一个参数方法生成计算结果，并缓存到 `fiber.memoizedState` 上。在 `update` 阶段，对比是否有 `deps` 且 `deps` 是否变化，如果没有变化则使用缓存的值，如果变化了则重新计算。

## 用法

其实类似 `useCallback`，同样不应该将简单的变量声明用 `useMemo` 包装，这样反而会使性能变差。对于复杂的变量计算，使用 `useMemo` 包装是一个更好的选择。
