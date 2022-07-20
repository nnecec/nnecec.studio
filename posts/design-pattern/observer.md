---
title: 'Design Pattern: Observer'
date: '2021-09-07'
tags: ['Design Pattern']
description: '5. 观察者模式'
---

## 定义

发布—订阅模式又叫观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。在 JavaScript 开发中，我们一般用事件模型来替代传统的发布—订阅模式。

## 现实案例

小明最近看上了一套房子，到了售楼处之后才被告知，该楼盘的房子早已售罄。好在销售员告诉小明，不久后还有一些尾盘推出，开发商正在办理相关手续，手续办好后便可以购买。但到底是什么时候，目前还没有人能够知道。

于是小明记下了售楼处的电话，以后每天都会打电话过去询问是不是已经到了购买时间。除了小明，还有小红、小强、小龙也会每天向售楼处咨询这个问题。一个星期过后，销售员决定辞职，因为厌倦了每天回答 1000 个相同内容的电话。

当然现实中没有这么笨的销售公司，实际上故事是这样的：小明离开之前，把电话号码留在了售楼处。销售员答应他，新楼盘一推出就马上发信息通知小明。小红、小强和小龙也是一样，他们的电话号码都被记在售楼处，销售员会翻开花名册，遍历上面的电话号码，依次发送一条短信来通知他们。

## 优缺点

优点

- 符合关注点分离和单一职责。
- 你可以在运行时建立对象之间的联系。

缺点

- 订阅者的通知顺序是随机的（不可指定的）。
- 当观察者变得非常复杂时，性能会严重下降。

## 代码实现

### 通用的发布订阅模式

> https://github.com/developit/mitt

```js
function observable() {
  const all = new Map()

  return {
    on(type, handler) {
      const handlers = all.get(type)

      if (handlers) {
        handlers.push(handler)
      } else {
        all.set(type, [handler])
      }
    },
    off(type, handler) {
      const handlers = all.get(type)

      if (handlers) {
        if (handler) {
          handlers.splice(handlers.indexOf(handler), 1)
        } else {
          all.set(type, [])
        }
      }
    },
    emit(type, params) {
      const handlers = all.get(type)

      if (handlers) {
        for (let handler of handlers) {
          handler.call(null, params)
        }
      }
      const noTypeHandlers = all.get('*') // 响应无需提供 type 的订阅
      if (noTypeHandlers) {
        for (let handler of handlers) {
          handler.call(null, type, params)
        }
      }
    }
  }
}
```

### 网站登陆后刷新个人信息、购物车信息、消息列表

如果将刷新方法写在请求返回的回调函数里，当遇到新增需要刷新的模块时，需要导入模块并修改回调函数。如果使用发布订阅模式，则仅需要发出事件，在新增模块内订阅事件即可。

```js
// before
requestLogin().then(data => {
  messageList.refresh()
  cartList.refresh()
  userInfo.refresh()
})

// after
requestLogin().then(data => {
  emitter.emit('loginSuccess')
})

messageList.on('loginSuccess')
cartList.on('loginSuccess')
userInfo.on('loginSuccess')
// ...
```

### 必须先订阅再发布吗？

但是这只是理想的状况，因为异步的原因，我们不能保证 ajax 请求返回的时间，有时候它返回得比较快，而此时用户导航模块的代码还没有加载好（还没有订阅相应事件），特别是在用了一些模块化惰性加载的技术后，这是很可能发生的事情。也许我们还需要一个方案，使得我们的发布—订阅对象拥有先发布后订阅的能力。

为了满足这个需求，我们要建立一个存放离线事件的堆栈，当事件发布的时候，如果此时还没有订阅者来订阅这个事件，我们暂时把发布事件的动作包裹在一个函数里，这些包装函数将被存入堆栈中，等到终于有对象来订阅此事件的时候，我们将遍历堆栈并且依次执行这些包装函数，也就是重新发布里面的事件。当然离线事件的生命周期只有一次，就像 QQ 的未读消息只会被重新阅读一次，所以刚才的操作我们只能进行一次。