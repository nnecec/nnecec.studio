---
title: "Vite简明指南"
date: "2022-03-30"
tags: ["Deep Dive", "Vite"]
description: "了解Vite特性及关键源码解读"
---

### 依靠浏览器原生支持 ESM 实现快速的模块化加载 JavaScript 文件

`vite dev` 通过 node 的 http/https/http2 创建了一个 httpServer，通过 ws 创建了一个 websocketServer，通过 chokidar 监听根节点下的文件改动。

