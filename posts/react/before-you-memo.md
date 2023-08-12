---
title: 'Before you memo() 的原理'
date: '2022-08-23'
tags: ['React']
description: ''
---

> 本文增加了对 https://overreacted.io/before-you-memo/ 的源码解释

## 原文总结

原始代码中 B 组件有重操作，在更新 A 组件时，导致了 B 的重新渲染，从而导致了页面卡顿。

在 before you memo 这篇文章中，作者提供了几个解决没有耦合的组件之间如何避免重复渲染的方法。

1. memo。使用 memo 包装组件，使组件进行浅比较，由于 A, B 组件之间无耦合关系，所以 B 的 Props 不会因上层状态改变而改变，从而避免了渲染。
2. move state down。如果状态仅与 A 组件有关，则将状态降低到 A 组件内部，这样修改 A 状态则不会影响 B 的渲染。
3. lift content up。将 B 通过 A 的 children 进行连接，虽然两者 DOM 结构耦合到了一起，但从代码来看，B 的 Props 来自于 A 和 B 的父组件，而 A 的状态变化不会影响父组件状态变化，从而不会导致 B 重新渲染。

## 有哪些优化 React 代码的手段？

1. 验证是否正在运行一个生产环境的构建。（开发环境构建会刻意地缓慢一些，极端情况下可能会慢一个数量级）
2. 验证是否将树中的状态放在了一个比实际所需更高的位置上。（例如，将输入框的 state 放到了集中的 store 里可能不是一个好主意）
3. 运行 React 开发者工具来检测是什么导致了二次渲染，以及在高开销的子树上包裹 memo()。（以及在需要的地方使用 useMemo()）

## 为什么

> React v18.2.0

在 React 的 reconciliation 阶段，beginWork 是调度节点更新的入口方法。在这个方法的开始，有一个对于可直接复用上一次渲染结果的判断。代码如下：

```js
function beginWork(current: Fiber | null, workInProgress: Fiber, renderLanes: Lanes): Fiber | null {
  const updateLanes = workInProgress.lanes

  if (current !== null) {
    const oldProps = current.memoizedProps
    const newProps = workInProgress.pendingProps

    if (oldProps !== newProps || hasLegacyContextChanged()) {
      didReceiveUpdate = true
    } else {
      const hasScheduledUpdateOrContext = checkScheduledUpdateOrContext(current, renderLanes)
      if (!hasScheduledUpdateOrContext && (workInProgress.flags & DidCapture) === NoFlags) {
        didReceiveUpdate = false
        // 该方法进入 bailoutOnAlreadyFinishedWork 逻辑
        return attemptEarlyBailoutIfNoScheduledUpdate(current, workInProgress, renderLanes)
      }
    }
  } else {
    didReceiveUpdate = false
  }

  // ... reconcileChildren
}
```

预设 `bailoutOnAlreadyFinishedWork` 是直接复用旧节点的的方法，可以看到进入该方法的判断条件：

1. oldProps === newProps
2. fiber 不包含与本次更新一致优先级的更新（检查 state 或 context）

当符合上述条件进入 bailout 逻辑，则不会重新调度节点，可以直接复用上一次渲染结果。明白这一点后，可以结合文章中的几种情况各种检查原因了。

### 原始代码

每一次 rerender 对于 `ExpensiveTree` 来说都是调用了 `React.createElement(ExpensiveTree, null))`。

```js
export function createElement(type, config, children) {
  let propName

  // Reserved names are extracted
  const props = {}

  // ...

  if (config !== null) {
    // ...
    props[propName] = config[propName]
  }

  // ...

  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props)
}
```

config 为 null，最后生成的 props 是 `{}`，由于 `{}==={}` 的判断结果是 `false`，所以`条件1: oldProps === newProps`不符合，无法进入 bailout 逻辑，会触发渲染。

### 使用 memo

`memo` 方法会将 `$$typeof` 标记为 `REACT_MEMO_TYPE`，在构建 fiber 过程中，会根据 `$$typeof` 将 tag 赋值为 `MemoComponent`。

在 `beginWork` 的条件里，其实是不符合 `条件1` 跳过了第一次的 bailout。

但在接下来 `reconcileChildren` 的阶段中，根据 `workInProgress.tag` 进入`updateMemoComponent`方法中，可以看到一个类似`beginWork`的过程：

```js
function updateMemoComponent() {
  if (current === null) {
    // ...
    return child
  }
  const hasScheduledUpdateOrContext = checkScheduledUpdateOrContext(current, renderLanes)
  if (!hasScheduledUpdateOrContext) {
    const prevProps = currentChild.memoizedProps
    let compare = Component.compare
    compare = compare !== null ? compare : shallowEqual
    if (compare(prevProps, nextProps) && current.ref === workInProgress.ref) {
      return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes)
    }
  }
  return newChild
}
```

同样检查是否有同一优先级的更新后，通过 `shallowEqual` 浅比较前后 props 如果没有变化则符合 bailout 条件。

> 浅比较：将对象的相同的 key 的值依次对比，而不是对象整个对比, 在浅比较的情况下 `{} === {}` 返回 true

### move state down

这种情况下，`ColorPicker`和`ExpensiveTree`已经分别属于两个组件了，修改 `ColorPicker` 不会影响到 `ExpensiveTree`，所以 `ExpensiveTree` 可以一直复用。

### lift content up

在 `LiftContentUp` 中，对于 `ExpensiveTree` 来说，它在 `ColorPicker` 中意味着是 `props.children`。

对于 `ColorPicker` 来说，它的 `props.children` 在 App 中 props 也没有改变。在 `setState` 也没有发生变化。

所以，在调度到 ExpensiveTree 也符合 bailout 的条件。

### bailout

我们最后来看一下 bailout 方法的实现，可以看到该方法最后通过复制节点完成了复用的能力。

```js
function bailoutOnAlreadyFinishedWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes,
): Fiber | null {
  if (!includesSomeLane(renderLanes, workInProgress.childLanes)) {
    return null
  }
  // 复用节点
  cloneChildFibers(current, workInProgress)
  return workInProgress.child
}
```

## Reference

1. [Before You memo()](https://overreacted.io/zh-hans/before-you-memo/)
2. https://juejin.cn/post/6886766652667461646
3. https://github.com/nnecec/before-you-memo
