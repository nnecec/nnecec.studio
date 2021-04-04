---
title: "Deep Dive: useState, useReducer"
date: "2021-03-18"
tags: ["Deep Dive", "React"]
description: "useState, useReducer 和它的一切。"
---

## 定义

你可以在[useState](https://reactjs.org/docs/hooks-reference.html#usestate)和[useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer)中看到 `useState` 和 `useReducer` 的说明。

我们不对文档已有的基本内容做说明，你可以访问官网查看基本说明。

`useState` 可以视为 `useReducer` 的语法糖，本质上都是返回了一个被储存的值，以及一个修改它的方法。

```js
const [count, setCount] = useState(0)
// 类似
const [count, dispatchCount] = useReducer(countReducer, 0)
```

在后面的源码分析中也可以看到， `useState` 相对于 `useReducer` 来说，是赋值了一个默认的 `reducer` 方法。

## cautions

- 每一次调用 `dispatch` 都会提交一次重新渲染。所以应当只把界面需要的 `state` 通过 `useState` 生成，仅需要储存的值可以使用 `useRef`保存。

## usages

## source code

mountState

updateState

