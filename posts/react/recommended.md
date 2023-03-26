---
title: '【目录】React source code'
date: '2021-11-02'
tags: ['Introduction', 'React']
description: '深入 React 源码阅读推荐'
---

## 目录

### 流程

1. [jsx 与 React](/posts/react/jsx): 了解 JSX 与 React 的关系
2. [Fiber](/posts/react/fiber): 了解 Fiber 结构
3. [reconciliation](/posts/react/reconciliation): React 调度更新任务(首次构建也是一次更新）的阶段
4. [commit](/posts/react/commit): 当调度完成后，React 提交页面更新
5. [rerender](/posts/react/rerender): 触发 React 的更新，将更新渲染到页面
6. [scheduler](/posts/react/scheduler): 在更新阶段，如何实现优先级调度

### 技术实现

1. [diff](/posts/react/diff): React Diff 算法
2. [before you memo](/posts/react/before-you-memo): 进入 Diff 之前，React 如何判断节点可复用
3. [synthetic-event](/posts/react/synthetic-event): React 合成事件实现
4. [lane](/posts/react/lane): React 如何实现优先级策略
5. [位运算](/posts/react/bitwise-operator): 位运算在 React 中的实践
6. [hooks](/posts/react/hooks/basic): React Hooks 简要入门

   1. [useState, useReducer](/posts/react/hooks/use-state-reducer)
   2. [useMemo](/posts/react/hooks/use-memo)
   3. [useCallback](/posts/react/hooks/use-callback)
   4. [useRef](/posts/react/hooks/use-ref)
   5. [useEffect](/posts/react/hooks/use-effect)
   6. [useContext](/posts/react/hooks/use-context)
   7. [useTransition](/posts/react/hooks/use-transition)

## React 生态

- [redux](/posts/infra/state-management/redux)
- [react-redux](/posts/react/react-redux)

## 参考

1. [React 官方文档](https://react.dev/)
2. [React 技术揭秘](https://react.iamkasong.com/)
