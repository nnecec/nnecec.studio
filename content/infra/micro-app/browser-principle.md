---
title: '微前端技术点探秘'
date: '2022-01-12'
tags: ['Introduction']
description: '探索微前端技术点的实现原理'
---

## 前言

微前端目前有几个可选用的框架：

- [single-spa](https://github.com/single-spa/single-spa)
- [qiankun](https://github.com/umijs/qiankun)
- [garfish](https://github.com/modern-js-dev/garfish)
- [micro-app](https://github.com/micro-zoe/micro-app)
- [icestarck](https://github.com/ice-lab/icestark)

本文将借助现有的文章及源码对微前端的特性技术点做技术总结。

## 技术点

### 异步加载多个应用

实现方式：

1. 通过劫持路由实现对路由的控制，从而控制子应用展示
2. 通过 WebComponent 将子应用视为一个组件

#### 劫持路由

该方法由 single-spa 提出，qiankun 和 garfish 都参考了该实现。在主应用配置子应用配置，将主应用的某个路由如 `/user` 配置指向 `https://user.example.com`。当激活路由时，通过 fetch 地址获取目标地址的 HTML 进行解析。

### 沙箱隔离

1. 将 window 通过 Proxy 包装生成新的 ProxyWindow 提供给子应用，激活应用时将 global 指向新的 ProxyWindow
2. ShadowDOM 原生提供了沙箱能力

### 父子通信机制

1. 通过 window 设置全局变量
2. 通过 window 实现发布订阅模式
