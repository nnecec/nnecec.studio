---
title: "@formily/reactive 源码解析"
date: "2021-12-23"
tags: ["Dive Deep"]
description: "从了解@formily/reactive源码洞悉reactive的原理"
---

## 前言

首先可以从[官方文档](https://reactive.formilyjs.org/zh-CN/guide)和[Formily 的 Reactive 的经验汇总](https://blog.fishedee.com/2021/07/13/Formily%E7%9A%84Reactive%E7%9A%84%E7%BB%8F%E9%AA%8C%E6%B1%87%E6%80%BB/)认识一下`@formily/reactive`，了解常规使用方法。作者在文档中其实概括了 reactive 的基本概念：

> reaction 在响应式编程模型中，它就相当于是可订阅对象的订阅者，它接收一个 tracker 函数，这个函数在执行的时候，如果函数内部有对 observable 对象中的某个属性进行读操作(依赖收集)，那当前 reaction 就会与该属性进行一个绑定(依赖追踪)，知道该属性在其他地方发生了写操作，就会触发 tracker 函数重复执行。

[可能是 MobX Plus 的响应式状态管理方案](https://zhuanlan.zhihu.com/p/369682733)这篇文章也写的很好，作者非常详细阐述了`@formily/reactive`的特点并与`mobx`进行了对比，可以带着这些特点去源码里看看是如何实现的。

## 基本流程解析

### 1. observable

`@formily/reactive` 中有几个出场率很高的全局变量：

- ProxyRaw: `{ProxyObj: Obj}` 映射，方便查找源数据
- RawProxy: `{Obj: ProxyObj}` 映射，方便查找 Proxy 数据
- RawNode: `{Obj: DataNode}` 映射，Node 上记录了 Raw 的路径、值等信息

变量的劫持都记录在这些全局变量中，所以我们需要保证同一个应用中，使用的是同一份 reactive 的代码。目前 yarn 安装 node_modules 其实是存在多个依赖版本的问题，就会导致预期外的情况发生。

首先检查 ProxyRaw 中有没有该值，如果有说明已经处理过了，可以直接返回。如果没有时，通过`buildDataTree`将该 obj 存入`RawNode`中。此时数据为：

```js
// RawNode
{
  [obj]: {
    target: undefined,
    key: undefined,
    value: obj
  }
}
```

对于 `PlainObject` 和 `Array` 类型，会再调用`createNormalProxy`，对于`Map`,`Set`类型会调用`createCollectionProxy`处理成 ProxyObj，否则直接返回。

在这两个创建方法中将`obj`通过`Proxy`生成`proxyObj`，存入`ProxyRaw`和`RawProxy`，并返回了`proxyObj`，此时内部数据为：

```js
// ProxyRaw
{
  [proxyObj]: obj
}
// RawProxy
{
  [obj]: [proxyObj]
}
```

所以我们通过`observable`将`obj`在内部进行了处理，存入`RowNode`中，并返回了`Proxy`处理后的`ProxyObj`。

### 2. observer(component)

结合实际使用来看，当声明`observable`之后，则会通过`observer`方法包装组件，使组件达到响应式的效果。

observer 接受`FunctionComponent`参数，对 React 组件进行了一些常规处理，如处理 forwardRef, displayName, 复制组件属性等。然后返回了通过`useObserver`包装的`FunctionComponent`。

```js
return useObserver(() => component(props), realOptions)
```

#### 2.1 useObserver(view, options)

这个方法算是比较关键的环节，它连接了 React 和 reactive 内部管理的数据，并追踪变化最终起到响应式更新的作用。

1. 组件初始化时，通过`Tracker`生成了 tracker 实例
2. 返回 `tracker.track` 包装的组件，通过该方法将当前组件加入追踪池
3. 在组件内部使用变量时，实际使用的是上一步被 Proxy 包装后的变量`ProxyObj`(我们后面再来看调用`new Proxy`时还做了什么)

### 3. Tracker

`Tracker`接受`scheduler`方法(可以理解为`forceUpdate`)和组件名称作为构造参数。

- \_scheduler 属性

  将更新视图的方法存到了`_scheduler`属性上，在 React 中默认为`forceUpdate`。

- track 方法

  在这个方法里，首先会先判断`ReactionStack`是否包含`this.track`，这一步是为了处理防止重复触发渲染的情况，每次触发 track 方法相当于重新渲染该组件。

  然后调用参数进行视图渲染，当进入渲染逻辑时，向`ReactionStack`添加`this.track`，从而标记该`track`正在执行，执行完成后移除。

### 4. baseHandlers, collectionHandlers

在这里回头看一下对于创建 Proxy 对象时，根据不同的原始类型调用不同的`handlers`(本文主要以 get/set 举例)

- baseHandlers

  - get

    当调用`get`时，说明该对象已经开始被使用，需要在后续的改动中响应它的变化(通过`bindTargetKeyWithCurrentReaction`)，同时在本次`get`中返回当前值。

    > 对`get`进行断点 debug 时，比如在访问数组时，会依次访问 `length`、各个序号的`key`

  - set

    当调用`set`时，将`target[key]`更新为`newValue`，同时检测是否有订阅该`key`的，有的话需要执行响应。

#### 4.1 bindTargetWitchReaction, runReactionsFromTarget

上面提到，在`get`方法中，通过`bindTargetKeyWithCurrentReaction`添加订阅，在该方法中，会获取当前执行的`track`方法中接受的参数`tracker`，同时将访问当前`key`的订阅行为记录到`reactionsMap[key] = tracker`存到到`RawReactionsMap[target]`。

这样会把`视图更新方法`与`对象的键`进行关联，提供给后面修改时，能直接找到视图的更新方法。

在`set`方法中，根据`target`获取`RawReactionsMap[target]`，再根据`key`获取`reactions`，便获得了之前加入到订阅中的所有`reactions`，其实就是`tracker[]`,然后循环调用`tracker._scheduler()`更新订阅该`target[key]`的所有视图。

在这里，可以修改`ProxyObj`的值，并且通过全局对象的记录快速获取视图更新方法，对所有视图进行更新。

## 其他常用 API

### define

### action

### autorun

### batch
