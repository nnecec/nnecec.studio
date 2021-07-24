---
title: "Deep Dive: useEffect"
date: "2021-07-23"
tags: ["Deep Dive", "React"]
description: "useEffect 和它的一切。"
---

## 定义

你可以在[官方文档](https://reactjs.org/docs/hooks-reference.html#useeffect)中看到 `useEffect` 的说明。

## 源码

### 生成 effect

```ts
function mountEffect(
  create: () => (() => void) | void,
  deps: Array<mixed> | void | null
): void {
  return mountEffectImpl(
    PassiveEffect | PassiveStaticEffect,
    HookPassive,
    create,
    deps
  )
}
function mountEffectImpl(fiberFlags, hookFlags, create, deps): void {
  const hook = mountWorkInProgressHook()
  const nextDeps = deps === undefined ? null : deps
  currentlyRenderingFiber.flags |= fiberFlags
  hook.memoizedState = pushEffect(
    HookHasEffect | hookFlags,
    create,
    undefined,
    nextDeps
  )
}
```

在 `mount` 阶段，通过 `pushEffect` 添加该 `effect` 到 `updateQueue` 中。

注意 `useEffect` 被标记了 `HookPassive` 和 `HookHasEffect` 。

```ts
function updateEffect(
  create: () => (() => void) | void,
  deps: Array<mixed> | void | null
): void {
  return updateEffectImpl(PassiveEffect, HookPassive, create, deps)
}

function updateEffectImpl(fiberFlags, hookFlags, create, deps): void {
  const hook = updateWorkInProgressHook()
  const nextDeps = deps === undefined ? null : deps
  let destroy = undefined

  if (currentHook !== null) {
    const prevEffect = currentHook.memoizedState
    destroy = prevEffect.destroy
    if (nextDeps !== null) {
      const prevDeps = prevEffect.deps
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        hook.memoizedState = pushEffect(hookFlags, create, destroy, nextDeps)
        return
      }
    }
  }

  currentlyRenderingFiber.flags |= fiberFlags

  hook.memoizedState = pushEffect(
    HookHasEffect | hookFlags,
    create,
    destroy,
    nextDeps
  )
}
```

在 `update` 阶段，类似 [useCallback](/react/use-callback) 会检查依赖是否变更来决定是否更新缓存的方法。可以看到`update` 阶段比 `mount` 阶段多了 `destroy` 参数，`destroy` 参数是为了在不需要更新时，保留来自于上一个 `effect` 方法的 `destroy`。如果需要更新，在更新的同时也会打上 `HookHasEffect` 标记。

```ts
function pushEffect(tag, create, destroy, deps) {
  const effect: Effect = {
    tag,
    create,
    destroy,
    deps,
    // Circular
    next: (null: any),
  };
  let componentUpdateQueue: null | FunctionComponentUpdateQueue = (currentlyRenderingFiber.updateQueue: any);
  if (componentUpdateQueue === null) {
    componentUpdateQueue = createFunctionComponentUpdateQueue();
    currentlyRenderingFiber.updateQueue = (componentUpdateQueue: any);
    componentUpdateQueue.lastEffect = effect.next = effect;
  } else {
    const lastEffect = componentUpdateQueue.lastEffect;
    if (lastEffect === null) {
      componentUpdateQueue.lastEffect = effect.next = effect;
    } else {
      const firstEffect = lastEffect.next;
      lastEffect.next = effect;
      effect.next = firstEffect;
      componentUpdateQueue.lastEffect = effect;
    }
  }
  return effect;
}
```

### 调用 effect

上一步，通过 `useEffect` 生成了一份 `Effect` 实例并将其挂载在 fiber 上。接下来就是在 commit 阶段调用 fiber 上的 `effect`。

在[官方介绍](https://zh-hans.reactjs.org/docs/hooks-reference.html#useeffect)中提到

> 赋值给 useEffect 的函数会在组件渲染到屏幕之后执行。默认情况下，effect 将在每轮渲染结束后执行，但你可以选择让它 在只有某些值改变的时候才执行。

从[commit阶段](/react/progress/commit)的分析可以看出，对于 `useEffect` ，React 会在页面重绘后对其进行调用。

