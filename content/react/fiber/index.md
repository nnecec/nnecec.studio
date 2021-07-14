---
title: "Deep Dive: fiber"
date: "2021-07-14"
tags: ["Deep Dive", "React"]
description: "你了解的 Fiber，也可能不了解。"
---

## 概念

官方在 React 16 引出 Fiber 的概念，并在 2016 年由核心成员发表了一篇介绍 Fiber 架构的[文章](https://github.com/acdlite/react-fiber-architecture)。

> [非官方中文翻译](https://github.com/xxn520/react-fiber-architecture-cn)

在介绍中可以了解什么是 Fiber 架构，以及其中的一些技术名词，如 `child`, `sibling`, `return`, `pendingProps`, `memoizedProps` 等。我个人认为这些名词对于了解 Fiber 作用有限，但对于非英文母语的同学阅读源码可以起到一定程度的帮助。

