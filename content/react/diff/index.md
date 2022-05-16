---
title: 'Virtual DOM 和 Diff 解读'
date: '2021-08-08'
tags: ['Deep Dive', 'React']
description: '理解 Virtual DOM 和 Diff 算法'
---

## 概念

Diff 算法是一套理论模型，为了查找出前一次是否有能够重复利用的节点。React 基于这种理论模型实现了一套 Diff 算法，而数据类型则是 Virtual DOM。

真正的 DOM 节点是由类似 `document.createElement` 生成的，而 Virtual DOM 则是 FiberNode 类的实例组成的节点树。

React 会在更新阶段，判断 bailout 失败后进入 Diff 算法的逻辑。当处理到 A 节点时，对 A 节点的 Diff 其实是将 A 提供给 Diff 算法，并从 A.child 节点开始与新的 children 比较。

## Diff 算法的策略

在[官方文档](https://zh-hans.reactjs.org/docs/reconciliation.html#the-diffing-algorithm)中，阐述了 React Diff 的策略。

一个 DOM 节点在某一时刻最多会有 4 个节点和他相关。

1. `current Fiber`。如果该 DOM 节点已在页面中，`current Fiber` 代表该 DOM 节点对应的 Fiber 节点。
2. `workInProgress Fiber`。如果该 DOM 节点将在本次更新中渲染到页面中，`workInProgress Fiber` 代表该 DOM 节点对应正在调度中的 Fiber 节点。
3. DOM 节点本身。
4. JSX 对象。ClassComponent 的 `render` 方法的返回结果，或 `FunctionComponent` 的调用结果。JSX 对象中包含描述 DOM 节点的信息。

Diff 算法的本质是对比 1 和 4，生成 2。

为了降低算法复杂度，React 的 Diff 算法会预设三个限制：

1. 只对同级兄弟元素进行 Diff。如果一个 `DOM` 节点在更新中跨越了层级，那么 React 认为变动节点的旧节点需要删除，不会尝试复用。
2. 两个不同类型的标签会产生出不同的节点树。如果元素由 `div` 变为 `p`，React 会销毁 `div` 及其子孙节点，并新建 `p` 及其子孙节点。
3. 通过 `key` 来标记，通常用于表明元素在同层级的类似元素中各自 key，用于发生同层级移动时的查找。

## 源码

Diff 获取到 fiber.child 并根据 typeof 返回的类型(object(array), string) 做不同处理。

```ts
function reconcileChildFibers(
  returnFiber: Fiber, // 父节点
  currentFirstChild: Fiber | null, // 当前父节点下的第一个 child
  newChild: any, // 即将更新的 children ，由jsx决定，如果是一个单节点则是object 如果是多个节点并列则是 Array<object
  lanes: Lanes
): Fiber | null {
  if (typeof newChild === 'object' && newChild !== null) {
    switch (newChild.$$typeof) {
      case REACT_ELEMENT_TYPE:
        return placeSingleChild(
          reconcileSingleElement(
            returnFiber,
            currentFirstChild,
            newChild,
            lanes
          )
        )
      case REACT_PORTAL_TYPE:
      case REACT_LAZY_TYPE:
    }

    if (isArray(newChild)) {
      return reconcileChildrenArray(
        returnFiber,
        currentFirstChild,
        newChild,
        lanes
      )
    }

    if (getIteratorFn(newChild)) {
      return reconcileChildrenIterator(
        returnFiber,
        currentFirstChild,
        newChild,
        lanes
      )
    }
  }

  if (
    (typeof newChild === 'string' && newChild !== '') ||
    typeof newChild === 'number'
  ) {
    return placeSingleChild(
      reconcileSingleTextNode(
        returnFiber,
        currentFirstChild,
        '' + newChild,
        lanes
      )
    )
  }

  // Remaining cases are all treated as empty.
  return deleteRemainingChildren(returnFiber, currentFirstChild)
}
```

### 对于 object 类型的 newChild 节点

```ts
function reconcileSingleElement(
  returnFiber: Fiber,
  currentFirstChild: Fiber | null,
  element: ReactElement,
  lanes: Lanes
): Fiber {
  const key = element.key
  let child = currentFirstChild
  while (child !== null) {
    if (child.key === key) {
      // 省略 REACT_FRAGMENT_TYPE
      const elementType = element.type
      if (child.elementType === elementType) {
        deleteRemainingChildren(returnFiber, child.sibling)
        const existing = useFiber(child, element.props)
        existing.ref = coerceRef(returnFiber, child, element)
        existing.return = returnFiber
        return existing
      }
      deleteRemainingChildren(returnFiber, child)
      break
    } else {
      deleteChild(returnFiber, child)
    }
    child = child.sibling
  }

  const created = createFiberFromElement(element, returnFiber.mode, lanes)
  created.ref = coerceRef(returnFiber, currentFirstChild, element)
  created.return = returnFiber
  return created
}
```

当新节点的类型是 `object` 时，该节点只能是 `ReactElement`，`ReactPortal`,`ReactLazyElement`类型。拿 `ReactElement` 举例来看吧。

从代码可以看出，React 通过先判断 `key` 是否相同（没有赋值的 `key` 值为 `null`）

- 如果 `key` 相同且 `type` 相同时，可以复用。
- 如果 `key` 相同但 `type` 不同时，无法复用。
- 如果 `key` 不同，说明还没找到对应的 `oldChild`，删除当前不符合的 `oldChild` 继续查找兄弟节点。

因为是单个节点 diff，当查找到可以复用的节点时，意味着剩下的兄弟节点都应当删除（如果不删除则意味着 newChild 应该是 array 数据类型）。通过 `deleteRemainingChildren` 删除多余的 `sibling` 节点。

### 对于 array 类型的节点

如果是 `array`，会进入 `reconcileChildrenArray` 的逻辑。

对于同级数组节点的变化有以下几种可能性：

- 节点类型及`key`没有变化，其他属性有更新，执行更新逻辑
- 节点新增、删除
- 节点发生移动

在 React 的实现中，会先开始一次对新 children 的遍历，优先处理节点更新的逻辑。将 newIdx 递增并检查 newChild 是否有可以利用的 oldChild 如果有则利用并将 old

```ts
let resultingFirstChild: Fiber | null = null // 返回 作为 return 的 child 属性(first child)
let previousNewFiber: Fiber | null = null // 中间变量连接上一个 newFiber 和 当前的 newFiber

let oldFiber = currentFirstChild
let lastPlacedIndex = 0 // 本次更新的 fiber 对应的 dom 需要插入的位置
let newIdx = 0 // newChildren 已经处理到哪个位置了
let nextOldFiber = null // 下一个供比对的 oldFiber
for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
  if (oldFiber.index > newIdx) {
    nextOldFiber = oldFiber
    oldFiber = null
  } else {
    nextOldFiber = oldFiber.sibling
  }
  // updateSlot 比较 oldFiber 和 newChild 的 key 是否相等，相等的话可以复用，不相等的话返回 null。
  const newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], lanes)
  // 由于 key 不同，不可复用，会跳出第一次循环
  if (newFiber === null) {
    if (oldFiber === null) {
      oldFiber = nextOldFiber
    }
    break
  }
  lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx) //
  if (previousNewFiber === null) {
    resultingFirstChild = newFiber
  } else {
    previousNewFiber.sibling = newFiber
  }
  previousNewFiber = newFiber
  oldFiber = nextOldFiber
}

function placeChild(
  newFiber: Fiber,
  lastPlacedIndex: number,
  newIndex: number
): number {
  newFiber.index = newIndex
  if (!shouldTrackSideEffects) {
    return lastPlacedIndex
  }
  // newFiber 的 旧节点
  const current = newFiber.alternate
  if (current !== null) {
    const oldIndex = current.index // abcd -> acdb
    if (oldIndex < lastPlacedIndex) {
      newFiber.flags |= Placement
      return lastPlacedIndex
    } else {
      // 当 newFibber 的新位置序号大于旧位置，则不需要移动
      return oldIndex
    }
  } else {
    newFiber.flags |= Placement
    return lastPlacedIndex
  }
}
```

> 从 `placeChild` 方法可以看出，减少将节点从后面移动到前面的操作可以提高性能。

第一次遍历的结束条件是：

1. 对应序号的 fiber key 不同，意味着该位置 节点发生了 新增/移动/删除，后续节点不可直接复用
2. oldChildren 和 newChildren 至少有一个遍历完成

当第一次遍历完成后有下列三种情况：

1. oldChildren 和 newChildren 都遍历完成

   这种情况下，我们会认为 Diff 已经完成

2. oldChildren 或 newChildren 之一遍历完成

   这种情况下，如果还剩下 oldChildren ，则将剩下的 oldChild 都删除。如果剩下 newChildren，则遍历剩余的 newChild 并创建新的 fiber，连接到第一次遍历结束的末尾

   ```ts
   // newChildren 遍历完成
   if (newIdx === newChildren.length) {
     deleteRemainingChildren(returnFiber, oldFiber)
     return resultingFirstChild
   }
   // oldChildren 遍历完成
   if (oldFiber === null) {
     for (; newIdx < newChildren.length; newIdx++) {
       const newFiber = createChild(returnFiber, newChildren[newIdx], lanes)
       if (newFiber === null) {
         continue
       }
       lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx)
       if (previousNewFiber === null) {
         resultingFirstChild = newFiber
       } else {
         previousNewFiber.sibling = newFiber
       }
       previousNewFiber = newFiber
     }
     return resultingFirstChild
   }
   ```

3. oldChildren 和 newChildren 都没有遍历完成，意味着 oldChildren 没有遍历完成，其中仍有可能可以利用的节点。

   ```ts
   // 将链表结构的 oldChildren 转化成 Map 的结构
   const existingChildren = mapRemainingChildren(returnFiber, oldFiber)

   for (; newIdx < newChildren.length; newIdx++) {
     // 构建 newFiber, 在 existingChildren 查找是否能有复用的 fiber。如果有则复用，没有则创建新 fiber
     const newFiber = updateFromMap(
       existingChildren,
       returnFiber,
       newIdx,
       newChildren[newIdx],
       lanes
     )
     if (newFiber !== null) {
       if (shouldTrackSideEffects) {
         // 有 alternate 意味着是通过复用生成的
         if (newFiber.alternate !== null) {
           // 删除对应的 oldChild
           existingChildren.delete(
             newFiber.key === null ? newIdx : newFiber.key
           )
         }
       }
       lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx)

       // 如果 previousNewFiber 为 null 说明第一个循环的第一个节点就跳出循环，需要设置 firstFiber
       if (previousNewFiber === null) {
         resultingFirstChild = newFiber
       } else {
         previousNewFiber.sibling = newFiber // 将 newFiber 接在上一个 newFiber 的 sibling 属性
       }
       previousNewFiber = newFiber // 更新 previousNewFiber
   }

   // 删除剩余没用的 oldChild
   if (shouldTrackSideEffects) {
     existingChildren.forEach(child => deleteChild(returnFiber, child))
   }

   return resultingFirstChild
   ```

   这种是最复杂的情况。意味着剩余的 oldChildren 中仍有可能提供给剩余 newChildren 复用的 fiber

   将 `oldChildren` 以 key/index 做键，fiber 做值，生成 `Map` 类型的 `existingChildren`。

   再遍历剩下的 `newChildren`，对比如果发现可以复用则可以添加到 `lastPlacedIndex`，只需要比较遍历到的可复用 `oldFiber` 在上次更新时是否也在 `lastPlacedIndex` 对应的 `oldFiber` 后面，就能知道两次更新中这两个节点的相对位置改变没有。

   ```js
   abcd -> acdb // 遍历新 children， a-c-d 标记不用改变 到 b 时标记移动

   abcd -> dabc // 遍历新 children, d 标记不用改变， a-b-c 标记移动
   ```

   如果前后顺序发生变化，则需要标记从前序移动到后序的节点，相对顺序没有变更的可直接复用。

### 对于 string/number 类型的节点

如果节点内仅有 string/number，如 `return 'text'` 这种写法。如果有 oldChild 类型相同都是文字节点的话，则都可以复用。

```ts
function reconcileSingleTextNode(
  returnFiber: Fiber,
  currentFirstChild: Fiber | null,
  textContent: string,
  lanes: Lanes
): Fiber {
  if (currentFirstChild !== null && currentFirstChild.tag === HostText) {
    deleteRemainingChildren(returnFiber, currentFirstChild.sibling)
    const existing = useFiber(currentFirstChild, textContent)
    existing.return = returnFiber
    return existing
  }
  deleteRemainingChildren(returnFiber, currentFirstChild)
  const created = createFiberFromText(textContent, returnFiber.mode, lanes)
  created.return = returnFiber
  return created
}
```

## 总结

React 通过 Diff 算法达到复用已经有的节点从而提高性能的目的。

React 对比 currentFiber 和 nextFiber 的 child 字段

- 当 child 是 object 且不是 array 时：只有 key 和 tag 类型一致可以复用，并且会删除兄弟节点
- 当 child 是 array 时。

  首先遍历新子节点数组，如果遇到相同位置 key 不同的情况或者新旧子节点数组有一方遍历结束，跳出第一次循环。
