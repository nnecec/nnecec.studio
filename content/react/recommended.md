---
title: '【目录】React source code'
date: '2021-11-02'
tags: ['Introduction', 'React']
description: '深入 React 源码阅读推荐'
---

## 目录

1. [Fiber](/posts/react/fiber): 了解 Fiber 结构
2. [reconciliation](/posts/react/progress/reconciliation): React 调度更新任务的阶段
3. [commit](/posts/react/progress/commit): 当调度完成后，React 进入更新页面的阶段
4. [rerender](/posts/react/rerender): 触发 React 的更新，将更新渲染到页面
5. [scheduler](/posts/react/scheduler): 在 reconciliation 之前的 scheduler 阶段，如何实现优先级调度
6. [hooks](/posts/react/hooks): React Hooks 简要入门

### 延伸阅读

1. [diff](/posts/react/diff/index): React Diff 源码解读
2. [synthetic-event](/posts/react/synthetic-event): React 合成事件实现
3. [lane](/posts/react/lane): React 如何实现优先级策略
4. [位运算](/posts/react/bitwise-operators): 位运算在 React 中的实践
5. hooks
   1. [useState, useReducer](/posts/react/hooks/use-state-reducer)
   2. [useMemo](/posts/react/hooks/use-memo)
   3. [useCallback](/posts/react/hooks/use-callback)
   4. [useRef](/posts/react/hooks/use-ref)
   5. [useEffect](/posts/react/hooks/use-effect)
   6. [useContext](/posts/react/hooks/use-context)
   7. [useTransition](/posts/react/hooks/use-transition)

## React 生态

- [Redux](/posts/react/redux)

## 参考

1. [React 官方文档](https://zh-hans.reactjs.org/)
2. [React 技术揭秘](https://react.iamkasong.com/)
