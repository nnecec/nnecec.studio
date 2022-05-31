---
title: 'React 优先级控制：Lane'
date: '2021-08-15'
tags: ['React']
description: 'React 异步渲染中的优先级'
---

## 概念

React 早期的实现中使用了 `expirationTime` 用作标记优先级，后来切换到了 `lane`，开发者在[pull request](https://github.com/facebook/react/pull/18796)中解释了相关的差别。

同时，也有开发者对 React 团队没解释清楚的地方发起了[提问](https://github.com/facebook/react/issues/19804)。

> [Before Lanes](https://codesandbox.io/s/usetransition-stop-reacting-passed-props-updates-p9k1b)
>
> [After Lanes](https://codesandbox.io/s/usetransition-stop-reacting-passed-props-updates-zoqm2)

在例子中可以看出 `lane` 作为处理优先级的架构优势

`lane` 直译为“赛道”，给任务部署在不同的赛道则拥有了不同的优先级。

在 `ReactFiberLane` 中定义了基于二进制的多个优先级变量，以及基于这些优先级变量的多个方法。

## 源码

在[触发更新](/react/rerender)的几种方法的源码里，可以看到获取 `lane` 都是通过 `requestUpdateLane(fiber)` 获得本次更新的 `lane`。

```ts
export function requestUpdateLane(fiber: Fiber): Lane {
  const mode = fiber.mode;
  if ((mode & ConcurrentMode) === NoMode) {
    return (SyncLane: Lane);
  }

  const isTransition = requestCurrentTransition() !== NoTransition;
  if (isTransition) {
    if (currentEventTransitionLane === NoLane) {
      currentEventTransitionLane = claimNextTransitionLane();
    }
    return currentEventTransitionLane;
  }

  const updateLane: Lane = (getCurrentUpdatePriority(): any);
  if (updateLane !== NoLane) {
    return updateLane;
  }

  // 根据不同的环境 对不同事件定义了不同的优先级，如 浏览器环境在 react-dom/src/events/ReactDOMEventListener.js 定义了 click 等事件的优先级
  const eventLane: Lane = (getCurrentEventPriority(): any);
  return eventLane;
}
```

在获取到 `lane` 后，会给本次[创建的 update](/react/rerender)标记上该 `lane`，这样就对不同情况下创建的 `update` 标记了不同的优先级。

在接下来通过 `scheduleUpdateOnFiber` 方法调用 [Scheduler](/react/scheduler) 进入由调度器控制的调度工作。

在更新过程中有两种 `lane`，一种是创建 `update` 时的优先级，被标记在 fiber 上，另一种称为 `renderLanes` ，通过 `getNextLanes` 方法返回当前渲染会处理的最高优先级的更新 `lane`。

当 `renderLanes` 包括 `updateLane` 则认为该 `update` 在本次更新中满足优先级应该被处理。
