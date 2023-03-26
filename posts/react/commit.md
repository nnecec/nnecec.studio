---
title: "React 的 Commit 阶段"
date: "2021-07-23"
tags: ["React"]
description: "React 的 commit 阶段详解"
---

## 概述

在 commit 阶段，React 已经经过 `reconciliation` 确定了所有节点的信息，并将遍历所有节点，处理任务、调度更新，将最终结果渲染(mutation)到页面上。

## 源码

React 的commit 阶段入口方法是 commitRoot，该方法将保存当前调度优先级，并使用 `currentUpdatePriority = syncLane` 执行 `commitRootImpl`，具体实现在 `commitRootImpl` 方法中。

### commitRootImpl

```ts
function commitRootImpl(root, renderPriorityLevel) {
  // 第一次进入 rootWithPendingPassiveEffects = null 跳过循环
  do {
    flushPassiveEffects();
  } while (rootWithPendingPassiveEffects !== null);

  // 处理 root属性，优先级等

  // 如果 rootFiber 有 Passive 标记，则说明有 useEffect 需要异步调度
  if (
    (finishedWork.subtreeFlags & PassiveMask) !== NoFlags ||
    (finishedWork.flags & PassiveMask) !== NoFlags
  ) {
    if (!rootDoesHavePassiveEffects) {
      rootDoesHavePassiveEffects = true;
      scheduleCallback(NormalSchedulerPriority, () => {
        flushPassiveEffects();
        return null;
      });
    }
  }

  // commit 主要方法
  // 在有副作用时，意味着页面发生了变更，需要执行重新渲染的过程
  if (subtreeHasEffects || rootHasEffect) {
    // 1. before mutation (mutation 可以理解为 DOM操作)
    commitBeforeMutationEffects(root, finishedWork);

    // 2. commit mutation
    commitMutationEffects(root, finishedWork, lanes);

    // 将 root.current 指向 workInProgress 树
    root.current = finishedWork;

    // 3. commit layout
    commitLayoutEffects(finishedWork, root, lanes);

    // 4. paint page
    requestPaint();
  } else {
    root.current = finishedWork;
  }

  // 已经异步调度useEffect, 重置 rootWithPendingPassiveEffects 变量
  if (rootDoesHavePassiveEffects) {
    rootDoesHavePassiveEffects = false;
    rootWithPendingPassiveEffects = root;
    pendingPassiveEffectsLanes = lanes;
  }

  // 调度更新中触发的更新
  ensureRootIsScheduled(root, now());
  return null;
}
```

#### commitBeforeMutationEffects

- 调用 ClassComponent 的 `getSnapshotBeforeUpdate` 生命周期方法
- 处理 focus 和 blur

#### commitMutationEffects

1. 遍历 fiber.deletions，卸载需要删除的节点

   - 对于 Host 类型节点，调用 DOM 删除节点的方法。
   - 判断是否需要重置文本节点
   - 对于 ClassComponent，调用 `componentWillUnmount` 方法。对于各种有 `ref` 的组件，重置 `ref`
   - 对于 FunctionComponent，执行 `useLayoutEffect` 返回的 `destroy` 方法。

2. 新增/更新节点

   对于标记了 `Placement` 或 `Update` 的节点，通过 `ReactFiberHostConfig` 调用当前渲染平台，如 DOM API 进行插入或更新

   - Placement: 新增节点
     查找节点的父节点或兄弟节点，通过 `parent.appendChild` 或 `sibling.insertBefore` 插入节点。删除 Placement 的标记。
   - Update: 更新节点

     > useEffect 对应的标记为 `HookPassive`，useLayoutEffect 对应的标记为 `HookLayout`， 两者同时拥有 `HookHasEffect` 标记。

     对于 FunctionComponent 调用 useLayoutEffect 的 destroy 函数。对于 HostComponent 调用原生 API 更新属性

#### commitLayoutEffects

- 同步调度所有子节点 `useLayoutEffect` 的 `create` 函数并保存生成的 `destroy` 函数
- 调用 ClassComponent 的 `componentDidMount` 或 `componentDidUpdate` 生命周期方法，同步执行 `this.setState` 的第二个参数 callback
- 对于 HostRoot， ReactDOM.render 的第三个参数

#### requestPaint

标记 `needsPaint` 为 `true`，在下个循环 React 会重绘页面。

### 其他主要工具方法

#### rootDoesHavePassiveEffects

在有 `PassiveMask` (useEffect)标记的情况下，`rootDoesHavePassiveEffects` 被设置为 `true`。

并且在重绘页面后，对 `rootDoesHavePassiveEffects` 进行检查，如果为 `true`，则将 `rootWithPendingPassiveEffects` 赋值为当前 `root`。

在 `commitBeforeMutationEffects` 阶段之前，通过 `scheduleCallback` 异步调度了 `flushPassiveEffects`

```ts
scheduleCallback(NormalSchedulerPriority, () => {
  flushPassiveEffects();
  return null;
});
```

所以在同步的渲染处理完成后，会进行异步 `useEffect` 的调度，经过调度后，最后同样会执行到 `commit` 阶段，此时 `rootWithPendingPassiveEffects` 判断为 `true`，则在 `commitRootImpl` 的开头有一个 `do` 循环，需要条件 `rootWithPendingPassiveEffects !== null`，此时满足条件进入循环。

该逻辑是为了处理在 `commit` 过程中，出现了新的调度，则需要把新产生的副作用处理完。

#### flushPassiveEffects

通过这个方法调度 useEffect 执行。

```ts
function flushPassiveEffectsImpl() {
  commitPassiveUnmountEffects(root.current);
  commitPassiveMountEffects(root, root.current);
  flushSyncCallbacks();

  return true;
}
```

`commitPassiveUnmountEffects` 方法从根节点开始遍历，对要删除的节点，以及标记了 `HookHasEffect` 的节点调用 `effect.destroy` 方法。

`commitPassiveMountEffects` 方法从根节点开始遍历，对标记了`HookHasEffect` 的节点调用 `effect` 的生成方法。

`flushSyncCallbacks` 如果存在同步任务立即执行，不需要等待下次事件循环的宏任务。
