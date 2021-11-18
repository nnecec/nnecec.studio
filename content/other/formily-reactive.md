---
title: "@formily/reactive 源码"
date: "2021-10-18"
tags: ["Dive Deep"]
description: "@formily/reactive 源码解读"
---

## observable

value -> RawNode.set(value, new DataNode(target, key, value)) -> new Proxy() -> 

## observer(component)

observer 通过 `useObserver` 包装了 Component，返回 NewComponent

```js
return useObserver(() => component(props), realOptions)
```

`hoistNonReactStatics`  将 React 的静态属性复制到 NewComponent。

通过 Track 收集依赖，并下发到 observer 的 component 。

## useObserver(view, options)

调用 reactive 包中的 `Tracker`

## Tracker

track ReactionStack

