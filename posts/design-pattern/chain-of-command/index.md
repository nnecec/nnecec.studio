---
title: "Design Pattern: Chain of Command"
date: "2021-09-09"
tags: ["Pattern"]
description: "10. 职责链模式"
---

## 定义

职责链模式的定义是：使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系，将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。

## 现实案例

- 如果早高峰能顺利挤上公交车的话，那么估计这一天都会过得很开心。因为公交车上人实在太多了，经常上车后却找不到售票员在哪，所以只好把两块钱硬币往前面递。除非你运气够好，站在你前面的第一个人就是售票员，否则，你的硬币通常要在 N 个人手上传递，才能最终到达售票员的手里。
- 中学时代的期末考试，如果你平时不太老实，考试时就会被安排在第一个位置。遇到不会答的题目，就把题目编号写在小纸条上往后传递，坐在后面的同学如果也不会答，他就会把这张小纸条继续递给他后面的人。

## 解决方案

1. 声明处理者接口并描述请求处理方法的签名。

   确定客户端如何将请求数据传递给方法。 最灵活的方式是将请求转换为对象， 然后将其以参数的形式传递给处理函数。

2. 为了在具体处理者中消除重复的样本代码， 你可以根据处理者接口创建抽象处理者基类。

   该类需要有一个成员变量来存储指向链上下个处理者的引用。 你可以将其设置为不可变类。 但如果你打算在运行时对链进行改变， 则需要定义一个设定方法来修改引用成员变量的值。

   为了使用方便， 你还可以实现处理方法的默认行为。 如果还有剩余对象， 该方法会将请求传递给下个对象。 具体处理者还能够通过调用父对象的方法来使用这一行为。

3. 依次创建具体处理者子类并实现其处理方法。 每个处理者在接收到请求后都必须做出两个决定：

   - 是否自行处理这个请求。
   - 是否将该请求沿着链进行传递。

4. 客户端可以自行组装链， 或者从其他对象处获得预先组装好的链。 在后一种情况下， 你必须实现工厂类以根据配置或环境设置来创建链。

5. 客户端可以触发链中的任意处理者， 而不仅仅是第一个。 请求将通过链进行传递， 直至某个处理者拒绝继续传递， 或者请求到达链尾。

6. 由于链的动态性， 客户端需要准备好处理以下情况：

   - 链中可能只有单个链接。
   - 部分请求可能无法到达链尾。
   - 其他请求可能直到链尾都未被处理。

## 优缺点

优点

- 你可以控制请求处理的顺序。解耦了请求发送者和 N 个接收者之间的复杂关系。
- _单一职责原则_。 你可对发起操作和执行操作的类进行解耦。
- _开闭原则_。 你可以在不更改现有代码的情况下在程序中新增处理者。

缺点

- 部分请求可能未被处理。

## 代码实现

### 预定与优惠券使用

```js
var Chain = function (fn) {
  this.fn = fn
  this.successor = null
}
Chain.prototype.setNextSuccessor = function (successor) {
  return (this.successor = successor)
}
Chain.prototype.passRequest = function () {
  var ret = this.fn.apply(this, arguments)
  if (ret === "nextSuccessor") {
    return (
      this.successor &&
      this.successor.passRequest.apply(this.successor, arguments)
    )
  }
  return ret
}

var order500 = function (orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log("500元定金预购，得到100优惠券")
  } else {
    return "nextSuccessor" // 我不知道下一个节点是谁，反正把请求往后面传递
  }
}

var order200 = function (orderType, pay, stock) {
  if (orderType === 2 && pay === true) {
    console.log("200元定金预购，得到50优惠券")
  } else {
    return "nextSuccessor" // 我不知道下一个节点是谁，反正把请求往后面传递
  }
}

var orderNormal = function (orderType, pay, stock) {
  if (stock > 0) {
    console.log("普通购买，无优惠券")
  } else {
    console.log("手机库存不足")
  }
}

var chainOrder500 = new Chain(order500)
var chainOrder200 = new Chain(order200)
var chainOrderNormal = new Chain(orderNormal)

chainOrder500.setNextSuccessor(chainOrder200)
chainOrder200.setNextSuccessor(chainOrderNormal)

chainOrder500.passRequest(1, true, 500) // 输出：500元定金预购，得到100优惠券
chainOrder500.passRequest(2, true, 500) // 输出：200元定金预购，得到50优惠券
chainOrder500.passRequest(3, true, 500) // 输出：普通购买，无优惠券
chainOrder500.passRequest(1, false, 0) // 输出：手机库存不足”
```

### 异步传递

> redux middleware?

```js
Chain.prototype.next = function () {
  return (
    this.successor &&
    this.successor.passRequest.apply(this.successor, arguments)
  )
}
var fn2 = new Chain(function () {
  console.log(2)
  var self = this
  setTimeout(function () {
    self.next()
  }, 1000)
})
```
