---
title: 'React性能优化指南'
date: '2022-04-23'
tags: ['React']
description: 'React 函数式组件的性能优化的手段与相关原理'
---

## React

## React.memo

memo 使组件检查 props 是否发生变动的逻辑，由 `oldProps === newProps` 变为 `map(oldProps).prop === map(newProps).prop`。

这样对于 props 没有发生改变的组件，将不会像之前一样校验 props 时 `{} === {}` 进入 false 的逻辑。

## useState

## useRef

除了 ref 的标准用法，对于不需要显示到页面上，又需要作为变量暂时存储在内存中，可以使用 useRef 存储变量。

## useCallback 与 useMemo

由于 `function (){} !== function (){}` 所以需要对方法使用 useCallback 包装，对于某些引用类型变量使用 useMemo 包装。但对于这两个 API，存在闭包陷阱的问题。

什么是闭包陷阱？

## 使用 key 标记组件

## startTransition

在 React 支持 Concurrent 模式后，对于优先级低的方法开发者可以通过 startTransition 标记为低优先级。
