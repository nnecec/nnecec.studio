---
title: 'React 的 Reconciliation 阶段'
date: '2022-03-16'
tags: ['React']
description: 'reconciliation 阶段做了哪些事情'
---

## 概述

React 将 [reconciliation](https://reactjs.org/docs/reconciliation.html) 称为一种算法，该算法的目的是利用上一次页面结果找出最小变动需要的操作，以此完成高性能更新页面的功能。可以理解为 React 将借助 Diff 算法计算出需要变更的节点的过程称为 `reconciliation`。

## 源码

我认为从 `beginWork` 开始，React 开始进入 `reconciliation` 的阶段。因为在这个方法开始出现判断是否可复用 `oldFiber` 的方法。

React 通过 `workLoopConcurrent` 或 `workLoopSync` 调用 `performUnitOfWork - beginWork` 的调用顺序，按照 `父-子-子兄弟-父` 的顺序从根节点深度优先遍历所有节点，对所有节点进行渲染、更新，再返回处理父节点。

React 的 mount 和 update 都会经过 reconciliation 阶段，React 通过判断 current 是否为 null 来区分是哪个阶段。在 mount 阶段，跳过判断是否能复用节点的逻辑，直接进入对应构建子节点的环节，而 update 阶段，会先判断能否复用当前节点。

### beginWork

```ts
function beginWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
): Fiber | null {
  let updateLanes = workInProgress.lanes

  if (current !== null) {
    const oldProps = current.memoizedProps
    const newProps = workInProgress.pendingProps

    if (oldProps !== newProps || hasLegacyContextChanged()) {
      didReceiveUpdate = true
    } else if (!includesSomeLane(renderLanes, updateLanes)) {
      didReceiveUpdate = false
      switch (
        workInProgress.tag
        // ...
      ) {
      }
      return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes)
    } else {
      if ((current.flags & ForceUpdateForLegacySuspense) !== NoFlags) {
        didReceiveUpdate = true
      } else {
        didReceiveUpdate = false
      }
    }
  } else {
    didReceiveUpdate = false
  }

  workInProgress.lanes = NoLanes

  switch (
    workInProgress.tag
    // ...根据 tag 调度更新
  ) {
  }
}
```

在 `beginWork` 中，如果当前是 `update` 阶段的话，

如果 `props` 没有变更，且`Context` 没有变更，且当前调度的 fiber 更新优先级与本次更新优先级不一致时，会进入 `bailoutOnAlreadyFinishedWork` 逻辑。

### bailoutOnAlreadyFinishedWork

```ts
function bailoutOnAlreadyFinishedWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
): Fiber | null {
  // ...
  cloneChildFibers(current, workInProgress)
  return workInProgress.child
}
```

在这个方法里，可以复用 oldFiber，遍历 oldFiber 的所有下层 child 并复制到 `workInProgress.child` ，完成复用。

### reconcileChildren

当处于 mount 阶段或 update 阶段不满足复用 oldFiber 的策略时，会根据 `tag` 进行不同的处理逻辑，但最后都会通过 `reconcileChildren` 构建新的 fiber 节点。

```ts
export function reconcileChildren(
  current: Fiber | null,
  workInProgress: Fiber,
  nextChildren: any,
  renderLanes: Lanes
) {
  if (current === null) {
    workInProgress.child = mountChildFibers(
      workInProgress,
      null,
      nextChildren,
      renderLanes
    )
  } else {
    workInProgress.child = reconcileChildFibers(
      workInProgress,
      current.child,
      nextChildren,
      renderLanes
    )
  }
}

export const reconcileChildFibers = ChildReconciler(true)
export const mountChildFibers = ChildReconciler(false)
```

### ChildReconciler

`reconcileChildren` 方法根据 `mount` 和 `update` 的阶段不同，调用 `ChildReconciler` 时传入不同的 `shouldTrackSideEffects`。

> 在 `mount` 阶段，构建对应的 fiber 节点即可。
> 在 `update` 阶段，需要经过 [Diff 算法](/react/diff) 复用能够复用的节点，不能复用再创建新节点。

对于 `update` 阶段来说，会在 `reconciliation` 阶段对需要更新、新增、删除的节点打上标记，等到 `commit` 阶段才会执行。而 `mount` 阶段则不需要标记 `effect`。

`reconcileChildFibers` 是根据 `newChild` 的数据类型，如`object`, `string`, `number`，及节点类型，如 `REACT_ELEMENT_TYPE`, `REACT_PORTAL_TYPE`进行不同的处理。

通过 `ChildReconciler` 返回了 `reconcileChildFibers`，不论走哪个逻辑，最终 `reconcileChildFibers` 会构建新的 fiber 节点并更新 `workInProgress.child`，作为本次 `beginWork` 的返回值，并作为下次`performUnitOfWork`执行时`workInProgress`的传参。

```ts
function reconcileChildFibers(
  returnFiber: Fiber,
  currentFirstChild: Fiber | null,
  newChild: any,
  lanes: Lanes
): Fiber | null {
  if (typeof newChild === "object" && newChild !== null) {
    switch (newChild.$$typeof) {
      case REACT_ELEMENT_TYPE:
        return ..
      case REACT_PORTAL_TYPE:
        return ..
      case REACT_LAZY_TYPE:
        if (enableLazyElements) {

          return ..
        }
    }

    if (isArray(newChild)) {
      return ..
    }

    if (getIteratorFn(newChild)) {
      return ..
    }
  }

  if (typeof newChild === "string" || typeof newChild === "number") {
    return ..
    )
  }

  // Remaining cases are all treated as empty.
  return deleteRemainingChildren(returnFiber, currentFirstChild)
}
```

### completeWork

对于 HostComponent ，React 将 DOM 节点的 props 提供给 DOM 元素，并通过 DOM 的方法如`document.createElement`构建 DOM 节点，将属性设置给 DOM 节点完成节点的构建工作。

在由子节点依次执行 completeWork 到根节点后，完成 reconciliation 阶段。
