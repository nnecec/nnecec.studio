---
title: '黑话手册'
date: '2021-12-09'
tags: ['Introduction']
description: '这些看不明白的词都是什么？'
---

> sort by mood.

## IoC 控制反转, DI 依赖注入

- [了不起的 IoC 与 DI](https://segmentfault.com/a/1190000023650518)
- [深入浅出前端控制反转和依赖注入实现](https://juejin.cn/post/7046927021028409351)
- [依赖注入简介](https://github.com/ascoders/weekly/blob/master/%E5%89%8D%E6%B2%BF%E6%8A%80%E6%9C%AF/256.%E7%B2%BE%E8%AF%BB%E3%80%8A%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5%E7%AE%80%E4%BB%8B%E3%80%8B.md)

## DDD 领域驱动模型

- [Sairyss/domain-driven-hexagon: Guide on Domain-Driven Design, software architecture, design patterns, best practices etc. with code examples (github.com)](https://github.com/Sairyss/domain-driven-hexagon)
- [领域驱动设计在互联网业务开发中的实践 - 美团技术团队 (meituan.com)](https://tech.meituan.com/2017/12/22/ddd-in-practice.html)
- [用 DDD(领域驱动设计)和 ADT(代数数据类型)提升代码质量](https://mp.weixin.qq.com/s/UaJ56G_Vdx6__6ximfP47A)

## RPC

- [谁能用通俗的语言解释一下什么是 RPC 框架？](https://www.zhihu.com/question/25536695/answer/221638079)

## SOLID

- [面向对象编程的 SOLID 原则 (freecodecamp.org)](https://chinese.freecodecamp.org/news/solid-principles/)

## OOP, AOP

## [同构](https://www.zhihu.com/question/325952676)

同构：服务端渲染，将 html 返回到客户端再进行客户端渲染

## Cookie free, domain hash

- Cookie free

  启用和主站不同的域名来放置静态资源，减少不必要的 cookie 发送。

  按照普通设计，当网站 cookie 信息有 1 KB、网站首页共 150 个资源时，用户在请求过程中需要发送 150 KB 的 cookie 信息，在 512 Kbps 的常见上行带宽下，需要长达 3 秒左右才能全部发送完毕。 尽管这个过程可以和页面下载不同资源的时间并发，但毕竟对速度造成了影响。 而且这些信息在 js/css/images/flash 等静态资源上，几乎是没有任何必要的。

- 启用和主站不同的域名来放置静态资源，减少不必要的 cookie 发送

  由于浏览器对于单个域名的并发数限制，可以使用多个域名加大浏览器并发量

  将 css 放置在页面最上方应该是很自然的习惯，但第一个 css 内引入的图片下载是有可能堵塞后续的其他 js 的下载的。而在目前普遍过百的整页请求数的前提下，浏览器提供的仅仅数个并发，对于进行了良好优化甚至是前面有 CDN 的系统而言，是极大的性能瓶颈。 这也就衍生了 domain hash 技术来使用多个域名加大并发量（因为浏览器是基于 domain 的并发控制，而不是 page），不过过多的散布会导致 DNS 解析上付出额外的代价，所以一般也是控制在 2-4 之间。 这里常见的一个性能小坑是没有机制去确保 URL 的哈希一致性（即同一个静态资源应该被哈希到同一个域名下），而导致资源被多次下载。

## 句柄

可以理解为内核对象指针，或者内核对象标识或者内核对象引用，英文是 handle，本质是带有引用计数的智能指针，是操作系统内核资源的入口。

## RPC

[RPC是什么，看完你就知道了](https://zhuanlan.zhihu.com/p/187560185)

## DX

开发人员体验 Developer Experience (DX)
