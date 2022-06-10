---
title: 'designable 技术总结'
date: '2022-01-24'
tags: ['Source code']
description: 'designable'
---

作者在[直播](https://www.bilibili.com/video/BV1kq4y137fP)中，非常详细的解读了 Designable 的源码，本文是根据视频内容以及对源码的理解做个小结。

## 状态管理

Core 的入口，将 Core 赋值 `globalThis.Designable.Core = Core`，Designable 将所有编辑器状态通过 globalThis 储存了下来。

作者认为 Core 应当与框架无关，且在 Designable 应用中，数据源、鼠标位置、拖拽对象等又有非常重要，需要记录当前状态，所以将 Core 中涉及的状态通过 globalThis 记录。

在 @designable/react 中则通过 React 的 Context 储存状态，并提供对应的 hooks 获取状态。

## 事件驱动

Designable 由事件驱动，所有的用户操作都通过事件发布，然后由具体功能订阅并实现具体逻辑。

在 Core 中 drivers 中的方法负责注册事件订阅，如鼠标事件、键盘事件，并计算与之相关的数据。

比如在 DragDropDriver 中，在初始化时会添加对 mousedown 的监听，在 mousedown 中会添加 mousemove, mouseup 等监听，并计算当前的 dragging, moveEvent, onMouseDownAt, startEvent 更新给 GlobalState，并通过事件发出 GlobalState 等数据。

events 负责定义事件名称及内部数据。

事件驱动的核心实现在 `@designable/shared/event` 中，在基础的发布订阅模式之上，作者增加了许多在低代码编辑器场景下的特殊逻辑。

## Drag Drop

在 mousedown 事件计算出需要拖动的目标对象，在 mousemove 事件计算偏移量，并有一些复杂判断，如偏移量超过 x 时认为需要拖动该元素，拖动时需要根据容器以及拖动元素的位置计算。

## 工作区
