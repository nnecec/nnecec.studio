---
title: "React 更新调度机制：Scheduler"
date: "2021-03-18"
tags: ["Deep Dive", "React"]
description: "React 如何控制不同优先级的调度"
---

## 概念

`Scheduler` 是 React 自己实现的在类似 `requestIdCallback` 执行时机去检查是否有更高优先级的任务被加入到了执行队列中。`Scheduler` 有一套自己的优先级机制，而 React 也有一套自己的优先级机制 `lane`，针对两者优先级机制的不同，在 React 中定义了两套机制优先级的映射关系。

### 时间切片

```ts
function workLoopConcurrent() {
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress);
  }
}

let frameInterval = 5;
function shouldYield() {
  const timeElapsed = getCurrentTime() - startTime;
  if (timeElapsed < frameInterval) {
    return false;
  }
  return true;
}
```

在 `react-dom` 中，当处于 `Concurrent` 模式中，通过 `shouldYield` 干预了 React 的渲染过程。在每 5ms 的渲染过程中，React 会暂停下来，给浏览器一个检查是否有更高优先级任务的机会。`shouldYield` 便是这个检查暂停的标记。该方法即实现了我们常说的 fiber 架构下的时间切片功能。

### 优先级调度

在[状态更新](/react/rerender)中，提到 React 的更新最后都通过 `scheduleUpdateOnFiber` 方法调度更新。在方法中调用了 `ensureRootIsScheduled` 

```ts
function ensureRootIsScheduled(root: FiberRoot, currentTime: number) {
  if (newCallbackPriority === SyncLane) {
    if (root.tag === LegacyRoot) {
      scheduleLegacySyncCallback(performSyncWorkOnRoot.bind(null, root));
    } else {
      scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root));
    }
    if (supportsMicrotasks) {
        scheduleMicrotask(flushSyncCallbacks);
    } else {
      scheduleCallback(ImmediateSchedulerPriority, flushSyncCallbacks);
    }
    newCallbackNode = null;
  } else {
    let schedulerPriorityLevel;
    switch (lanesToEventPriority(nextLanes)) {
      case DiscreteEventPriority:
        schedulerPriorityLevel = ImmediateSchedulerPriority;
        break;
      case ContinuousEventPriority:
        schedulerPriorityLevel = UserBlockingSchedulerPriority;
        break;
      case DefaultEventPriority:
        schedulerPriorityLevel = NormalSchedulerPriority;
        break;
      case IdleEventPriority:
        schedulerPriorityLevel = IdleSchedulerPriority;
        break;
      default:
        schedulerPriorityLevel = NormalSchedulerPriority;
        break;
    }
    newCallbackNode = scheduleCallback(
      schedulerPriorityLevel,
      performConcurrentWorkOnRoot.bind(null, root),
    );
  }
}
```

`ensureRootIsScheduled` 中通过 `scheduleCallback` 加上 React 优先级对应到 `scheduler` 优先级接入了 `scheduler` 的调度机制。

在 `Scheduler` 中有两个队列，储存了已过期任务和未过期任务，分别是 `taskQueue` 和 `timerQueue`。

在 `scheduleCallback` 方法中，根据不同的优先级设定不同的过期时间，并且根据当前是否过期，将任务加入到对应的队列。

