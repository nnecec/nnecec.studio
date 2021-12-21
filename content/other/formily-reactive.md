---
title: "@formily/reactive 源码解析"
date: "2021-12-21"
tags: ["Dive Deep"]
description: "从了解@formily/reactive源码洞悉reactive的原理"
---

## 前言

首先从[官方文档](https://reactive.formilyjs.org/zh-CN/guide)认识一下`@formily/reactive`，了解基本使用的方法。

> reaction 在响应式编程模型中，它就相当于是可订阅对象的订阅者，它接收一个 tracker 函数，这个函数在执行的时候，如果函数内部有对 observable 对象中的某个属性进行读操作(依赖收集)，那当前 reaction 就会与该属性进行一个绑定(依赖追踪)，知道该属性在其他地方发生了写操作，就会触发 tracker 函数重复执行。

## 基本流程解析

### 1. observable

如果在 ProxyRaw 中没有值时，通过`buildDataTree`初始化该 `observable(obj)`，存入`RawNode`中。此时数据为：

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

对于 `PlainObject` 和 `Array` 类型，会再调用`createNormalProxy`，对于`Map`,`Set`类型会调用`createCollectionProxy`。否则直接返回

将`obj`通过`Proxy`生成`proxyObj`，存入`ProxyRaw`和`RawProxy`，并返回了`proxyObj`，此时内部数据为：

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

所以我们通过`observable`将 obj 在内部进行了处理，并返回了 Proxy 处理后的 obj。

### 2. observer(component)

结合实际使用来看，当声明`observable`之后，则会通过`observer`方法包装组件，使组件达到响应式的效果。

observer 接受`FunctionComponent`参数，内部返回了被`useObserver`包装的`FunctionComponent`。

```js
return useObserver(() => component(props), realOptions)
```

#### 2.1 useObserver(view, options)

这个方法算是比较关键的环节，它连接了 React 和 reactive 内部管理的数据，并追踪变化最终起到响应式更新的作用。

1. 组件加载时，通过 Tracker 生成了 tracker 实例
2. 通过 tracker 的`track`方法将当前组件加入追踪池
3. 在组件内部使用变量时，此时使用的变量是之前被 Proxy 包装后的变量。我们回头看一下调用`new Proxy`时做了什么。

### 3. Tracker

`Tracker`接受`scheduler`方法(可以理解为`forceUpdate`)和组件名称作为构造参数。

- \_scheduler 属性
  将更新的方法存到了`_scheduler`属性上，在 React 中默认为`forceUpdate`。

- track 方法
  在这个方法里，将试图将会先判断`ReactionStack`是否包含`this.track`，这一步是为了处理防止重复触发渲染的情况，每次出发 track 方法相当于重新渲染该组件。

  当进入渲染逻辑时，向`ReactionStack`添加`this.track`，从而标记该`track`正在执行，执行完成后移除。

### 4. baseHandlers, collectionHandlers

对于创建 Proxy 对象时，根据不同的原始类型调用不同的`handlers`(本文主要以 get/set 举例)

- baseHandlers

  - get
    当调用`get`时，说明该对象已经被使用，需要在后续的改动中响应它的变化(通过`bindTargetKeyWithCurrentReaction`)，同时在本次`get`中返回当前值。

    > 对`get`进行断点 debug 时，比如在访问数组时，会依次访问 `length`、各个序号的`key`

  - set
    当调用`set`时，将`target[key]`更新为`newValue`，同时检测是否已存在该`key`，有的话需要执行响应。

#### 4.1 bindTargetWitchReaction, runReactionsFromTarget

上面提到，在`get`方法中，通过`bindTargetKeyWithCurrentReaction`添加订阅，在该方法中，会获取当前执行的`track`方法中接受的参数`tracker`，同时将访问当前`key`的订阅行为记录到`reactionsMap[key] = tracker`存到到`RawReactionsMap[target]`。

在`set`方法中，根据`target`获取`RawReactionsMap[target]`，再根据`key`获取`reactions`，便获得了之前加入到订阅中的所有`reactions`，其实就是`tracker[]`,然后循环调用`tracker._scheduler()`更新订阅该`target[key]`的所有视图。

## 其他常用 API

### define

### action

### autorun

### batch
