---
title: "Design Pattern: Iterator"
date: "2021-09-07"
tags: ["Design Pattern"]
description: "4. 迭代器模式"
---

## 定义

迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。迭代器模式可以把迭代的过程从业务逻辑中分离出来，在使用迭代器模式之后，即使不关心对象的内部构造，也可以按顺序访问其中的每个元素。

当前很多语言都内置了迭代器，如 JavaScript 中的 `for...of`, `Array.prototype.forEach`等。

## 场景

你计划在罗马游览数天， 参观所有主要的旅游景点。 但在到达目的地后， 你可能会浪费很多时间绕圈子， 甚至找不到罗马斗兽场在哪里。

或者你可以购买一款智能手机上的虚拟导游程序。 这款程序非常智能而且价格不贵， 你想在景点待多久都可以。

第三种选择是用部分旅行预算雇佣一位对城市了如指掌的当地向导。 向导能根据你的喜好来安排行程， 为你介绍每个景点并讲述许多激动人心的故事。 这样的旅行可能会更有趣， 但所需费用也会更高。

所有这些选择(自由漫步、 智能手机导航或真人向导)都是这个由众多罗马景点组成的集合的迭代器。

## 解决方案

1. 声明迭代器接口。 该接口必须提供至少一个方法来获取集合中的下个元素。 但为了使用方便， 你还可以添加一些其他方法， 例如获取前一个元素、 记录当前位置和判断迭代是否已结束。
2. 声明集合接口并描述一个获取迭代器的方法。 其返回值必须是迭代器接口。 如果你计划拥有多组不同的迭代器， 则可以声明多个类似的方法。
3. 为希望使用迭代器进行遍历的集合实现具体迭代器类。 迭代器对象必须与单个集合实体链接。 链接关系通常通过迭代器的构造函数建立。
4. 在你的集合类中实现集合接口。 其主要思想是针对特定集合为客户端代码提供创建迭代器的快捷方式。 集合对象必须将自身传递给迭代器的构造函数来创建两者之间的链接。
5. 检查客户端代码， 使用迭代器替代所有集合遍历代码。 每当客户端需要遍历集合元素时都会获取一个新的迭代器。

## 优缺点

优点

- 单一职责原则。 通过将体积庞大的遍历算法代码抽取为独立的类， 你可对客户端代码和集合进行整理。
- 开闭原则。 你可实现新型的集合和迭代器并将其传递给现有代码， 无需修改现有代码。
- 你可以并行遍历同一集合， 因为每个迭代器对象都包含其自身的遍历状态。
- 相似的， 你可以暂停遍历并在需要时继续。

缺点

- 如果你的程序只与简单的集合进行交互， 应用该模式可能会矫枉过正。
- 对于某些特殊集合， 使用迭代器可能比直接遍历的效率低。

## 代码实现

### 虚拟代理实现图片预加载

```js
var myImage = (function () {
  var imgNode = document.createElement("img")
  document.body.appendChild(imgNode)

  return {
    setSrc: function (src) {
      imgNode.src = src
    },
  }
})()

var proxyImage = (function () {
  var img = new Image()
  img.onload = function () {
    myImage.setSrc(this.src)
  }
  return {
    setSrc: function (src) {
      myImage.setSrc("file:// /C:/Users/svenzeng/Desktop/loading.gif")
      img.src = src
    },
  }
})()

proxyImage.setSrc("http:// imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg")
```

### 虚拟代理合并 HTTP 请求

```js
const synchronousFile = function (id) {
  console.log("开始同步文件，id为: " + id)
}

const proxySynchronousFile = (function () {
  const cache = [], // 保存一段时间内需要同步的ID
    timer // 定时器

  return function (id) {
    cache.push(id)
    if (timer) {
      // 保证不会覆盖已经启动的定时器
      return
    }

    timer = setTimeout(function () {
      synchronousFile(cache.join(",")) // 2秒后向本体发送需要同步的ID集合
      clearTimeout(timer) // 清空定时器
      timer = null
      cache.length = 0 // 清空ID集合
    }, 2000)
  }
})()

const checkbox = document.getElementsByTagName("input")

for (let i = 0, c; (c = checkbox[i++]); ) {
  c.onclick = function () {
    if (this.checked === true) {
      proxySynchronousFile(this.id)
    }
  }
}
```

### 缓存代理

```js
var mult = function () {
  console.log("开始计算乘积")
  var a = 1
  for (var i = 0, l = arguments.length; i < l; i++) {
    a = a * arguments[i]
  }
  return a
}

var proxyMult = (function () {
  var cache = {}
  return function () {
    var args = Array.prototype.join.call(arguments, ",")
    if (args in cache) {
      return cache[args]
    }
    return (cache[args] = mult.apply(this, arguments))
  }
})()

proxyMult(1, 2, 3, 4) // 输出：24
proxyMult(1, 2, 3, 4) // 输出：24
```

### 用高阶函数创建代理

```js
var mult = function () {
  var a = 1
  for (var i = 0, l = arguments.length; i < l; i++) {
    a = a * arguments[i]
  }
  return a
}
var plus = function () {
  var a = 0
  for (var i = 0, l = arguments.length; i < l; i++) {
    a = a + arguments[i]
  }
  return a
}
var createProxyFactory = function (fn) {
  var cache = {}
  return function () {
    var args = Array.prototype.join.call(arguments, ",")
    if (args in cache) {
      return cache[args]
    }
    return (cache[args] = fn.apply(this, arguments))
  }
}

var proxyMult = createProxyFactory(mult),
  proxyPlus = createProxyFactory(plus)

alert(proxyMult(1, 2, 3, 4)) // 输出：24
alert(proxyMult(1, 2, 3, 4)) // 输出：24
alert(proxyPlus(1, 2, 3, 4)) // 输出：10
alert(proxyPlus(1, 2, 3, 4)) // 输出：10
```
