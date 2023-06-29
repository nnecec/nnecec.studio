---
title: 'React 源码：Ref'
date: '2023-06-27'
tags: ['React']
description: '关于 Ref 的一切'
---

## 概念

官方文档在[Referencing Values with Refs](https://react.dev/learn/referencing-values-with-refs)介绍了如何使用 ref 保存数据，在[Manipulating the DOM with Refs](https://react.dev/learn/manipulating-the-dom-with-refs)介绍了如何使用 ref 引用 DOM 元素进行操作。

### 1. 使用 Ref 控制 DOM

通过 `createRef` 或 `useRef` 创建 ref 实例，将 ref 与 DOM 进行绑定获取 DOM 实例，或者与 ClassComponent 绑定获取组件实例。而由于 FunctionComponent 没有实例，ref 获取的是通过 `useImperativeHandle` 方法返回的值，或者通过 `forwardRef` 将 ref 转发到有 ref 的组件。

在 mount 过程中，访问 ref 获取到的是 null，在构建完成后，才能获取到对应的引用。通过 flushSync 可以解决部分无法立即获取 ref 的问题。

### 2. 使用 Ref 缓存值

当需要在组件内缓存某些值且这些值不需要渲染到页面上时，可以考虑通过 ref 存储。很多 hooks 通过 useRef 实现变量不变的特性，从而优化组件触发渲染的问题。

## 源码
