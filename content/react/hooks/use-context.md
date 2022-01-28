---
title: "Hooks 源码：useContext"
date: "2021-07-16"
tags: ["Deep Dive", "React"]
description: "createContext 生成了什么，useContext 是如何监听 Context 里的值的。"
---

## 概念

你可以在[官方文档](https://reactjs.org/docs/hooks-reference.html#usecontext)中看到 `useContext` 的说明。

`useContext` 作为 `basic hooks` 相对于另外两位： `useState` 和 `useEffect` 使用频率应该低了很多。

在使用 `useContext` 时，你可能对于 [Context](https://reactjs.org/docs/context.html) 也要有所了解。

## 源码

```ts
export function readContext<T>(context: ReactContext<T>): T {
  const value = isPrimaryRenderer
    ? context._currentValue
    : context._currentValue2;

  if (lastFullyObservedContext === context) {
  } else {
    const contextItem = {
      context: ((context: any): ReactContext<mixed>),
      memoizedValue: value,
      next: null,
    };

    if (lastContextDependency === null) {
      lastContextDependency = contextItem;
      currentlyRenderingFiber.dependencies = {
        lanes: NoLanes,
        firstContext: contextItem,
      };
    } else {
      lastContextDependency = lastContextDependency.next = contextItem;
    }
  }
  return value;
}
```

在 `renderWithHooks` 方法中，`useContext`  其实就是 `readContext` 方法。在开始调度当前 fiber (`beginWork`)时，会  执行 `prepareToReadContext` 执行初始化操作： `lastFullyObservedContext = null`。

> 由于该初始化操作，导致使用同一个 Context，将其多个 Provider 嵌套，内部的 useContext 依然读取的是最近的一份 Provider 上的数据。[demo](https://codesandbox.io/s/react-usecontext-nested-omynj)

然后将 fiber 中的 `useContext` 依次执行挂载到 `lastContextDependency` 链表上，并将 `fiber.dependencies` 指向链表第一个节点。

```ts
function updateContextProvider(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
) {
  // ...

  if (oldProps !== null) {
    const oldValue = oldProps.value
    if (is(oldValue, newValue)) {
      if (
        oldProps.children === newProps.children &&
        !hasLegacyContextChanged()
      ) {
        return bailoutOnAlreadyFinishedWork(
          current,
          workInProgress,
          renderLanes
        )
      }
    } else {
      propagateContextChange(workInProgress, context, renderLanes)
    }
  }
}
```

当 `Context.Provider` 这个类型的 fiber 的 `oldProps.value !== newProps.value` 即 `value` 发生变更，即被认为需要更新后，在对 `beginWork - updateContextProvider` 情况的处理方法 `propagateContextChange` 中，从产生更新的 `Context.Provider` 开始，遍历其内部所有 fiber 节点，检查 `fiber.dependencies` 依赖链表是否与该 `Context` 相等。如果相等，则将该 fiber 进行调度更新。

> 也验证一个 Context 的特点： 子节点中只使用了 Provider 上的部分值，也会导致 Provider 上的 value 发生变化，从而导致所有订阅 Context 的子节点重新渲染。

### Context 是什么

```ts
export function createContext<T>(defaultValue: T): ReactContext<T> {
  const context: ReactContext<T> = {
    $$typeof: REACT_CONTEXT_TYPE,
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    _threadCount: 0,
    // These are circular
    Provider: (null: any),
    Consumer: (null: any),
  };

  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context,
  };
  context.Consumer = context;

  return context;
}
```
