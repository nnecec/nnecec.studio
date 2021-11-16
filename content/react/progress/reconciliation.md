---
title: "Process of React: reconciliation"
date: "2021-11-02"
tags: ["React"]
description: "reconciliation 阶段做了哪些事情"
---

## 概述

React 将 [reconciliation](https://reactjs.org/docs/reconciliation.html) 称为一种算法，该算法的目的是利用上一次页面结果找出最小变动需要的操作，以此完成高性能更新页面的功能。可以理解为 React 将借助 Diff 算法计算出需要变更的节点的过程称为 `reconciliation`。

## 源码

我认为从 `beginWork` 开始，React 开始进入 `reconciliation` 的阶段。因为在这个方法开始出现判断是否可复用 `oldFiber` 的方法。

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

当不满足复用 oldFiber 的策略时，会根据 `tag` 进行不同的处理逻辑，但最后都会通过 `reconcileChildren` 构建新的 fiber 节点。

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
