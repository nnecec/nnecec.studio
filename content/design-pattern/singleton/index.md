---
title: "Design Pattern: Singleton"
date: "2021-09-06"
tags: ["Design Pattern"]
description: "1. 单例模式"
---

## 定义

单例模式的定义是：保证一个类仅有一个实例，并提供一个访问它的全局访问点。

## 现实案例

在 JavaScript 开发中，单例模式的用途同样非常广泛。试想一下，当我们单击登录按钮的时候，页面中会出现一个登录浮窗，而这个登录浮窗是唯一的，无论单击多少次登录按钮，这个浮窗都只会被创建一次，那么这个登录浮窗就适合用单例模式来创建。

## 解决方案

- 在类中添加一个私有静态成员变量用于保存单例实例。
- 声明一个公有静态构建方法用于获取单例实例。
- 在静态方法中实现"延迟初始化"。 该方法会在首次被调用时创建一个新对象， 并将其存储在静态成员变量中。 此后该方法每次被调用时都返回该实例。
- 将类的构造函数设为私有。 类的静态方法仍能调用构造函数， 但是其他对象不能调用。
- 检查客户端代码， 将对单例的构造函数的调用替换为对其静态构建方法的调用。

## 优缺点

优点

- 你可以保证一个类只有一个实例。
- 你获得了一个指向该实例的全局访问节点。
- 仅在首次请求单例对象时对其进行初始化。

缺点

- 违反了单一职责原则。 该模式同时解决了两个问题。
- 单例模式可能掩盖不良设计， 比如程序各组件之间相互了解过多等。
- 该模式在多线程环境下需要进行特殊处理， 避免多个线程多次创建单例对象。
- 单例的客户端代码单元测试可能会比较困难， 因为许多测试框架以基于继承的方式创建模拟对象。 由于单例类的构造函数是私有的， 而且绝大部分语言无法重写静态方法， 所以你需要想出仔细考虑模拟单例的方法。 要么干脆不编写测试代码， 或者不使用单例模式。

## 代码实现

### 不透明的单例模式

```js
class Singleton {
  constructor(name) {
    this.name = name
    this.instance = null
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new Singleton(name)
    }
    return this.instance
  }

  getName() {
    return this.name
  }
}

const inst = Singleton.getInstance()
```

### 透明的单例模式

```js
class Singleton {
  constructor(name) {
    this.name = name
    this.instance = null
  }

  getName() {
    return this.name
  }
}

var ProxySingleton = (function () {
  var instance
  return function (html) {
    if (!instance) {
      instance = new Singleton(html)
    }
    return instance
  }
})()

const inst = new ProxySingleton()
```

### 惰性单例

在用户操作该功能时，才创建该单例

```js
var createLoginLayer = function () {
  var div = document.createElement("div")
  div.innerHTML = "我是登录浮窗"
  div.style.display = "none"
  document.body.appendChild(div)
  return div
}

var getSingle = function (fn) {
  var result
  return function () {
    return result || (result = fn.apply(this, arguments))
  }
}

const createSingleLoginLayer = getSingle(createLoginLayer)
```
