---
title: 'Hooks 源码：useTransition'
date: '2021-03-18'
tags: ['React']
description: 'useTransition 和它的一切。'
---

## 概念

你可以在[官方文档](https://beta.reactjs.org/apis/react/useTransition)中看到 `useTransition` 的介绍。

`useTransition` 返回了一个变量用于标记是否在 pending 状态，另一个方法用于标记函数执行优先级。当 `startTransition` 包装的方法 pending 完成后视图执行更新逻辑。

### 源码

