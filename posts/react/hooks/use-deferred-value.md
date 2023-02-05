---
title: 'Hooks 源码：useDeferredValue'
date: '2021-04-01'
tags: ['React']
description: 'useDeferredValue 和它的一切。'
---

## 定义

deferred 字面意思是“推迟的，延期的”，[官方文档](https://beta.reactjs.org/apis/react/useDeferredValue)中有相关介绍。

该方法将获取值的优先级推迟到`高优先级更新`之后，再执行 `deferredValue` 关联的更新。

## 源码
