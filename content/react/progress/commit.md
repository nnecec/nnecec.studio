---
title: "Process of React: commit"
date: "2021-07-23"
tags: ["React"]
description: "commit 阶段源码详解"
---

## commitRoot

React 的 `commit` 阶段入口方法就是 `commitRoot`，具体实现在 `commitRootImpl`

## main process

```ts
function commitRootImpl(root, renderPriorityLevel) {
  do {
    flushPassiveEffects()
  } while (rootWithPendingPassiveEffects !== null)

  // 处理 root属性，优先级等

  // 异步调度 useEffect
  if (
    (finishedWork.subtreeFlags & PassiveMask) !== NoFlags ||
    (finishedWork.flags & PassiveMask) !== NoFlags
  ) {
    if (!rootDoesHavePassiveEffects) {
      rootDoesHavePassiveEffects = true
      scheduleCallback(NormalSchedulerPriority, () => {
        flushPassiveEffects()
        return null
      })
    }
  }

  // commit 关键方法
  if (subtreeHasEffects || rootHasEffect) {
    // 1. before mutation (mutation 可以理解为 DOM操作)
    const shouldFireAfterActiveInstanceBlur = commitBeforeMutationEffects(
      root,
      finishedWork
    )

    // 2. commit mutation
    commitMutationEffects(root, finishedWork, lanes)

    // 3. commit layout
    commitLayoutEffects(finishedWork, root, lanes)

    // 4. paint page
    requestPaint()
  } else {
    root.current = finishedWork
  }

  // 设置 rootWithPendingPassiveEffects
  if (rootDoesHavePassiveEffects) {
    rootDoesHavePassiveEffects = false
    rootWithPendingPassiveEffects = root
    pendingPassiveEffectsLanes = lanes
  }

  // 调度更新中触发的更新
  ensureRootIsScheduled(root, now())
  return null
}
```

## commitBeforeMutationEffects

调用 ClassComponent 的 `getSnapshotBeforeUpdate` 生命周期方法

## commitMutationEffects

- 遍历`deletions`，卸载需要删除的节点

  对于 Host 类型节点，调用 DOM 删除节点的方法。对于 ClassComponent，调用 `componentWillUnmount` 方法。对于各种有 `ref` 的组件，重置 `ref`

- 新增/更新节点

  对于标记了 `Placement` 或 `Update` 的节点，进行新增或更新。

## commitLayoutEffects

- 调用 ClassComponent 的 `componentDidMount` 或 `componentDidUpdate`
- 同步调度 `useLayoutEffect` 的销毁函数和创建函数

## rootDoesHavePassiveEffects

在有 `PassiveMask` 标记的情况下，`rootDoesHavePassiveEffects` 被设置为 `true`。并且在重绘页面后，对 `rootDoesHavePassiveEffects` 进行检查，如果为 `true`，则将 `rootWithPendingPassiveEffects` 赋值 `root`。在 `before mutation` 阶段，通过 `scheduleCallback` 异步调度了 `flushPassiveEffects`，所以在同步的渲染处理完成后，会进行异步 `useEffect` 的调度，经过调度后，最后同样会执行到 `commit` 阶段，此时 `rootWithPendingPassiveEffects` 判断为 `true`，则

## flushPassiveEffects

在 `commitRootImpl` 开头，有一个 `do` 循环调用 `flushPassiveEffects`。不过先看一下前置条件 `rootWithPendingPassiveEffects !== null`，在该文件中搜索 `rootWithPendingPassiveEffects` 发现只有在 `commitRootImpl` 最后执行了赋值操作 `rootWithPendingPassiveEffects = root`，所以 `commit` 阶段会先跳过该方法。

```ts
function flushPassiveEffectsImpl() {
  commitPassiveUnmountEffects(root.current)
  commitPassiveMountEffects(root, root.current)

  flushSyncCallbacks()

  return true
}
```

`commitPassiveUnmountEffects` 方法从根节点开始遍历，对要删除的节点，以及标记了 `HookHasEffect` 的节点调用 `effect.destroy` 方法。

`commitPassiveMountEffects` 方法从根节点开始遍历，对标记了`HookHasEffect` 的节点调用 `effect` 的生成方法。

`flushSyncCallbacks` 如果存在同步任务提前执行，不需要等待下次事件循环的宏任务。
