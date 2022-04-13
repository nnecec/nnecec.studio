---
title: "领域驱动设计在前端如何实践"
date: "2021-12-30"
tags: ["Design Pattern"]
description: "如何在前端项目中实践领域驱动设计"
---


## 概念

领域驱动设计（Domain-Driven-Design）是一种编程思想，过往主要由服务端实践该思想。那么前端如何实践该思想呢？

下文皆为笔者基于对 DDD 的理解编写的伪代码。

## 层次

对于一个业务模块将其文件结构按如下设置：

```
- pages
  - products
    - services
      - list.service.js
      - detail.service.js
    - detail.js
    - list.js
    - index.js
```

## 页面职能

在列表页面，通过 useContext 导入 list.service 中定义的领域模型，通过 query 获取领域中的 list 状态。

```ts
const product = useContext(productDomain)
const list = product.query.list
```

## 参考

1. [domain-driven-hexagon](https://github.com/Sairyss/domain-driven-hexagon)
2. [remesh](https://github.com/remesh-js/remesh)
