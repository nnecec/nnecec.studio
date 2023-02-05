---
title: "Design Pattern: Proxy"
date: "2021-09-06"
tags: ["Pattern"]
description: "3. 代理模式"
---

## 定义

代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问。

面向对象设计的原则——单一职责原则。

单一职责原则指的是，就一个类（通常也包括对象和函数等）而言，应该仅有一个引起它变化的原因。如果一个对象承担了多项职责，就意味着这个对象将变得巨大，引起它变化的原因可能会有多个。面向对象设计鼓励将行为分布到细粒度的对象之中，如果一个对象承担的职责过多，等于把这些职责耦合到了一起，这种耦合会导致脆弱和低内聚的设计。当变化发生时，设计可能会遭到意外的破坏。

分离每个方法的职责，也更利于代码的维护。

## 现实案例

代理模式是一种非常有意义的模式，在生活中可以找到很多代理模式的场景。比如，明星都有经纪人作为代理。如果想请明星来办一场商业演出，只能联系他的经纪人。经纪人会把商业演出的细节和报酬都谈好之后，再把合同交给明星签。

代理模式的关键是，当客户不方便直接访问一个对象或者不满足需要的时候，提供一个替身对象来控制对这个对象的访问，客户实际上访问的是替身对象。替身对象对请求做出一些处理之后，再把请求转交给本体对象。

另一例，信用卡是银行账户的代理， 银行账户则是一大捆现金的代理。 它们都实现了同样的接口， 均可用于进行支付。 消费者会非常满意， 因为不必随身携带大量现金； 商店老板同样会十分高兴， 因为交易收入能以电子化的方式进入商店的银行账户中， 无需担心存款时出现现金丢失或被抢劫的情况。

## 解决方案

- 如果没有现成的服务接口， 你就需要创建一个接口来实现代理和服务对象的可交换性。 从服务类中抽取接口并非总是可行的， 因为你需要对服务的所有客户端进行修改， 让它们使用接口。 备选计划是将代理作为服务类的子类， 这样代理就能继承服务的所有接口了。
- 创建代理类， 其中必须包含一个存储指向服务的引用的成员变量。 通常情况下， 代理负责创建服务并对其整个生命周期进行管理。 在一些特殊情况下， 客户端会通过构造函数将服务传递给代理。
- 根据需求实现代理方法。 在大部分情况下， 代理在完成一些任务后应将工作委派给服务对象。
- 可以考虑新建一个构建方法来判断客户端可获取的是代理还是实际服务。 你可以在代理类中创建一个简单的静态方法， 也可以创建一个完整的工厂方法。
- 可以考虑为服务对象实现延迟初始化。

## 优缺点

优点

- 你可以在客户端毫无察觉的情况下控制服务对象。
- 如果客户端对服务对象的生命周期没有特殊要求， 你可以对生命周期进行管理。
- 即使服务对象还未准备好或不存在， 代理也可以正常工作。
- 开闭原则。 你可以在不对服务或客户端做出修改的情况下创建新代理。

缺点

- 代码可能会变得复杂， 因为需要新建许多类。
- 服务响应可能会延迟。

## 代码实现

### 虚拟代理实现图片预加载

```js
var myImage = (function () {
  var imgNode = document.createElement("img")
  document.body.appendChild(imgNode)

  return {
    setSrc: function (src) {
      imgNode.src = src
    }
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
    }
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
