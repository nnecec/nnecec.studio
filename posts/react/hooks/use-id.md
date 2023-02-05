---
title: 'Hooks 源码：useId'
date: '2022-12-07'
tags: ['React']
description: 'useId 和它的一切。'
---

## 概念

你可以在[官方文档](https://beta.reactjs.org/apis/react/useId)中看到 `useId` 的介绍。

### 源码

```ts
function mountId(): string {
  const hook = mountWorkInProgressHook();

  const root = ((getWorkInProgressRoot(): any): FiberRoot);
  // identifierPrefix 是 createRoot 的配置之一
  const identifierPrefix = root.identifierPrefix;

  let id;
  if (getIsHydrating()) {
    const treeId = getTreeId();
    id = ':' + identifierPrefix + 'R' + treeId;
    const localId = localIdCounter++;
    if (localId > 0) {
      id += 'H' + localId.toString(32);
    }

    id += ':';
  } else {
    const globalClientId = globalClientIdCounter++;
    id = ':' + identifierPrefix + 'r' + globalClientId.toString(32) + ':';
  }

  hook.memoizedState = id;
  return id;
}
```

客户端渲染通过 `globalClientIdCounter` 累加来生成 id。在文档的 《Why is useId better than an incrementing counter? 》 中，解释道使用 `useId` 是为了解决服务端渲染中，服务端执行代码的顺序可能与客户端接收到代码再执行的顺序不同，导致 hydrate 后 ID 不一致。

在 SSR 中，localId 作为当前应用的内部自增 ID 使用，主要用于标记当前执行组件内 useId 的序号，在 workLoop 结束都会重置为 0。

通过 `getTreeId` 生成唯一 ID，treeId 是从根节点到当前组件节点的编号，通过算法生成，节点的层级结构不论在 SSR 还是 CSR 都是一致的，所以计算出来的 ID 也是一致的。React 团队在[这里](https://github.com/facebook/react/pull/22644)阐述了 ID 生成算法。

<!-- TODO: 算法解读（算法好复杂看不懂） -->

```ts
function updateId(): string {
  const hook = updateWorkInProgressHook()
  const id: string = hook.memoizedState
  return id
}
```

更新阶段就是简单的获取缓存的 ID。
