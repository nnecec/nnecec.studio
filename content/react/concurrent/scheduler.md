---
title: 'React优先级调度：Scheduler'
date: '2022-01-16'
tags: ['Deep Dive', 'React']
description: 'React 如何控制不同优先级的调度'
---

## 优先级定义

React 可以通过 `ReactDOM.createRoot(rootNode).render(<App />)` 开启异步渲染，这是 React 在 React@16 之后耗费大量时间以及精力努力去达成的目标，具体可以在[Concurrent 模式介绍](https://zh-hans.reactjs.org/docs/concurrent-mode-intro.html)中了解 React 提出 Concurrent 的背景以及这种模式的概念。

Scheduler 是 React 自己实现的在类似 `requestIdleCallback` 执行时机去检查是否有更高优先级的任务被加入到了执行队列中，从而实现了异步渲染的概念。

不使用原生 requestIdleCallback 原因有：

- requestIdleCallback 浏览器支持程度差

Scheduler 有一套自己的优先级机制，而 React 也有一套自己的优先级机制 `lane`，针对两者优先级机制的不同，在 React 中定义了两套机制优先级的映射关系，以支持 React 使用 Scheduler 的调度机制。

```ts
// React
export const DiscreteEventPriority: EventPriority = SyncLane
export const ContinuousEventPriority: EventPriority = InputContinuousLane
export const DefaultEventPriority: EventPriority = DefaultLane
export const IdleEventPriority: EventPriority = IdleLane
let currentUpdatePriority: EventPriority = NoLane

// Scheduler
export const NoPriority = 0
export const ImmediatePriority = 1
export const UserBlockingPriority = 2
export const NormalPriority = 3
export const LowPriority = 4
export const IdlePriority = 5
```

在 React 中以 Lane 来表示优先级，而在 Scheduler 中以 `Priority` 表示优先级。

### 时间切片

当定义了优先级之后，React 需要增加时机去检查有没有更高优先级的任务出现，这也是 Scheduler 的主要任务。

```ts
function workLoopConcurrent() {
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress)
  }
}

let frameInterval = 5
function shouldYield() {
  const timeElapsed = getCurrentTime() - startTime
  if (timeElapsed < frameInterval) {
    return false
  }
  return true
}
```

当处于 `Concurrent` 渲染模式下，React 通过 `shouldYield` 干预了 React 的渲染过程。在每 5ms 的渲染过程中，React 会暂停 `performUnitOfWork`，给浏览器一个检查是否有更高优先级任务的机会。这个方法实现了常说的 fiber 架构下的`时间切片`功能，即停下正在执行的任务然后检查任务队列中是否有高优先级的任务以实现优先级调度。

### 优先级调度

在[状态更新](/posts/react_rerender)中，提到 React 的更新最后都通过 `scheduleUpdateOnFiber` 方法调度更新。在方法中调用了 `ensureRootIsScheduled`

```ts
function ensureRootIsScheduled(root: FiberRoot, currentTime: number) {
  if (newCallbackPriority === SyncLane) {
    if (root.tag === LegacyRoot) {
      scheduleLegacySyncCallback(performSyncWorkOnRoot.bind(null, root))
    } else {
      scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root))
    }
    if (supportsMicrotasks) {
      scheduleMicrotask(flushSyncCallbacks)
    } else {
      scheduleCallback(ImmediateSchedulerPriority, flushSyncCallbacks)
    }
    newCallbackNode = null
  } else {
    let schedulerPriorityLevel
    switch (lanesToEventPriority(nextLanes)) {
      case DiscreteEventPriority:
        schedulerPriorityLevel = ImmediateSchedulerPriority
        break
      case ContinuousEventPriority:
        schedulerPriorityLevel = UserBlockingSchedulerPriority
        break
      case DefaultEventPriority:
        schedulerPriorityLevel = NormalSchedulerPriority
        break
      case IdleEventPriority:
        schedulerPriorityLevel = IdleSchedulerPriority
        break
      default:
        schedulerPriorityLevel = NormalSchedulerPriority
        break
    }
    newCallbackNode = scheduleCallback(
      schedulerPriorityLevel,
      // 将 performConcurrentWorkOnRoot 作为 callback
      performConcurrentWorkOnRoot.bind(null, root)
    )
  }
}
```

`ensureRootIsScheduled` 中通过 React 优先级映射到 Scheduler 优先级，并通过 `scheduleCallback` 接入了 Scheduler 的调度机制。

### 任务队列

在拥有”时间切片“和”优先级调度“能力之后，Scheduler 将缓存当前任务执行状态，并选择任务队列中更高优先级的任务执行，然后在下一个时间切片恢复缓存的任务执行状态继续执行低优先级任务。在 Scheduler 中有两个队列，储存了已过期任务(taskQueue)和未过期任务(timerQueue)。scheduleCallback 根据不同的优先级设定不同的过期时间，并且根据当前是否过期，将任务加入到对应的队列。

scheduleCallback 根据不同优先级对应的过期间隔时间计算出最终过期时间，

```ts
function scheduleCallback(priorityLevel, callback, options) {
  var currentTime = getCurrentTime()
  //
  var startTime
  if (typeof options === 'object' && options !== null) {
    var delay = options.delay
    if (typeof delay === 'number' && delay > 0) {
      startTime = currentTime + delay
    }
  } else {
    startTime = currentTime
  }

  var timeout
  switch (
    priorityLevel
    // ... 返回优先级对应的 timeout
  ) {
  }

  var expirationTime = startTime + timeout
  var newTask = {
    // ..创建任务
  }

  // 还没有到执行时间
  if (startTime > currentTime) {
    newTask.sortIndex = startTime
    push(timerQueue, newTask)
    // 通过 setTimeout 定时执行
    requestHostTimeout(handleTimeout, startTime - currentTime)
  } else {
    newTask.sortIndex = expirationTime
    push(taskQueue, newTask)
    // flushWork 将执行依次取出最早的taskQueue任务执行，并执行任务通过 scheduleCallback 绑定的 callback 方法
    requestHostCallback(flushWork)
  }

  return newTask
}
```
