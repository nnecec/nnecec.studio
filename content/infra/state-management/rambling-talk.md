---
title: "漫谈状态管理(WIP)"
date: "2021-11-30"
tags: ["state-management"]
description: "世界上的状态管理库连起来能不能绕地球一圈？"
---

## 背景

写进 [Flutter 状态管理官方文档](https://docs.flutter.dev/development/data-and-backend/state-mgmt/options) 里的状态管理库就多达十几个，而在 React 生态，可能有几十上百种各类状态管理库。那么状态管理是因何而生的呢？

伴随着 Angular, React, Vue 这三个框架的流行，MVVM 的模型思想被推广到前端开发的领域。在这个模型理念中，ViewModel 和 Model 成为了数据中心，页面依赖数据展示最终的效果，所以对于状态管理的需求大大增加。
