---
title: "Deep Dive: fiber"
date: "2021-11-02"
tags: ["Deep Dive", "React"]
description: "Fiber 是什么"
---

## 概念

官方在 React 16 引出 Fiber 的概念，并在 2016 年由核心成员发表了一篇介绍 Fiber 架构的[文章](https://github.com/acdlite/react-fiber-architecture)。

> [非官方中文翻译](https://github.com/xxn520/react-fiber-architecture-cn)

在介绍中可以了解什么是 Fiber 架构，以及其中的一些技术名词，如 `child`, `sibling`, `return`, `pendingProps`, `memoizedProps` 等。我个人认为这些名词对于了解 Fiber 作用有限，但对于非英文母语的同学阅读源码可以起到一定程度的帮助。

## 理解

我认为 Fiber 是数据结构与功能函数组成的一种能够支持 React 特定功能，如可中断更新的架构。在 fiber 实例节点中，记录了该节点的所有信息，以及与其他节点的关系。React 通过这种数据结构达到了描述页面的目的，同时将动态信息保存在节点上，从而实现类似生命周期、Diff 更新等功能。

## 源码

### Fiber 类型定义

```ts
export type Fiber = {
  /** ⬇️作为静态数据结构的属性 */

  // FiberNode 组件类型 -> ReactWorkTags.js 如FunctionComponent, ClassComponent, HostComponent
  tag: WorkTag
  // unique key
  key: null | string
  // 约等于 type
  elementType: any
  // 异步加载的组件解析后的类型
  // FunctionComponent=function , ClassComponent = Class, HostComponent = div
  type: any
  // Node储存空间，通过 stateNode 绑定如 FiberNode 对应的 Dom、FiberRoot、ReactComponent 实例
  // DOM 组件对应 DOM 节点实例
  // ClassComponent 对应 Class 实例
  // FunctionComponent 没有实例，所以 stateNode 值为 null
  // state 更新了或 props 更新了均会更新到 stateNode 上
  stateNode: any

  /** ⬇️用于连接其他Fiber节点形成Fiber树 */

  // fiber 的 parent
  return: Fiber | null
  // fiber 的第一个子节点
  child: Fiber | null
  // fiber 的下一个兄弟节点
  sibling: Fiber | null
  index: number
  // fiber 的 ref
  ref: null | (((handle: mixed) => void) & { _stringRef: ?string }) | RefObject

  /** 动态工作单元 */
  // 即将到来的新 props，即 nextProps
  pendingProps: any
  // 上一次渲染完成后的 props，即当前的 props
  memoizedProps: any
  // fiber 对应的组件产生的 Update 会存在队列里
  updateQueue: UpdateQueue<any> | null
  // 上一次渲染处理之后的 state
  memoizedState: any
  // 一个列表，存储该Fiber依赖的contexts，events
  dependencies: Dependencies | null
  // mode有 ConcurrentMode 和 StrictMode
  mode: TypeOfMode // constant -> TypeOfMode

  /** Effect */
  flags: Flags
  subtreeFlags: Flags
  // diff 阶段标记的需要删除的节点
  deletions: Array<Fiber> | null
  // 单链表 用来快速查找下一个 effect
  nextEffect: Fiber | null
  // 第一个和最后一个 effect，
  firstEffect: Fiber | null
  lastEffect: Fiber | null
  // 调度优先级
  lanes: Lanes
  childLanes: Lanes
  // 在 fiber 树更新的过程中，都会有一个跟其对应的 fiber 镜像
  // 我们称他为`current <==> workInProgress`
  // 在渲染完成之后他们会交换位置
  alternate: Fiber | null
}
```

fiber 的 `tag` 等属性记录了该 fiber 的节点信息，然后通过 `return`, `child`, `sibling` 将各个 fiber 连接起来，形成了页面的节点树的结构。

在 fiber 的状态属性 `memoizedProps`, `memoizedState`, `updateQueue` 记录了节点当前的状态数据，从结构上看也是大量使用链表这种数据结构。

链表的数据结构在 Fiber 中使用的好处是，链表可以方便的在任意节点插入/删除，也可以很好的支持异步特性。同时，不会像数组一样需要大量连续的内存空间，对性能友好。
