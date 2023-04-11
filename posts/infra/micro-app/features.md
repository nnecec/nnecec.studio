---
title: '微前端技术点探秘'
date: '2023-04-12'
tags: ['Introduction']
description: '探索微前端技术点的实现原理'
---

## 前言

微前端目前有几个可选用的框架：

- [single-spa](https://github.com/single-spa/single-spa)
  - 劫持路由匹配子应用
  - 子应用需要配置 bootstrap、mount、unmount 接入主引用
  - 需要修改子应用代码
  - [Why Not Iframe](https://www.yuque.com/kuitos/gky7yw/gesexv)
- [qiankun](https://github.com/umijs/qiankun)
  - 基于 single-spa
  - 增强沙箱能力
- [garfish](https://github.com/modern-js-dev/garfish)
- [micro-app](https://github.com/micro-zoe/micro-app)
  - 通过 CustomElement 结合自定义的 ShadowDom，将微前端封装成一个类 WebComponent 组件
  - 子应用需要支持跨域访问，需要配置 BaseRoute
- [icestarck](https://github.com/ice-lab/icestark)
- [wujie](https://github.com/Tencent/wujie)
  - iframe 天然的 JavaScript 沙箱机制完美隔离
  - 劫持 iframe 的 history.pushState 和 history.replaceState 与主应用 url 同步，以解决 iframe 刷新丢失 url 状态的问题
  - WebComponents 实现样式隔离
  - 通过 window.parent ，EventBus，或 props 注入实现通信
- [EMP](https://github.com/efoxTeam/emp)
  - Module Federation

本文将借助现有的文章及源码对微前端的特性技术点做技术总结。

## 技术点

### 异步加载多个应用

实现方式：

1. 通过劫持路由实现对路由的控制，从而控制子应用展示

   该方法由 single-spa 提出，qiankun 和 garfish 都参考了该实现。在主应用配置子应用配置，将主应用的某个路由如 `/user` 配置指向 `https://user.example.com`。当激活路由时，通过 fetch 地址获取目标地址的 HTML 进行解析。

1. 通过 WebComponent 将子应用视为一个组件

### 沙箱隔离

1. 将 window 通过 Proxy 包装生成新的 ProxyWindow 提供给子应用，激活应用时将 global 指向新的 ProxyWindow
2. 通过 [使用 shadow DOM](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_shadow_DOM) 提供沙箱能力
3. [\<iframe> - HTML（超文本标记语言）](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) 提供了天然的 JavaScript 沙箱机制

### 样式隔离

1. 通过 Shadow DOM 提供隔离能力
2. 各项目编译产物 class 增加前缀 prefix，或者是 CSSModule 方案

### 父子通信机制

1. 通过 window 设置全局变量
2. 通过 window 实现发布订阅模式
3. 通过 iframe 的 window.frames 和 window.parent 获取父子应用实例进行通信
4. 借助 [CustomEvent()](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent/CustomEvent) 实现自定义事件
