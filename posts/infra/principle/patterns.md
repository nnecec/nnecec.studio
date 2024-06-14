---
title: 'patterns.dev 笔记'
date: '2023-11-29'
tags: ['Introduction']
description: ''
---

> https://www.patterns.dev/

## 设计模式

### Singleton Pattern 单例模式

通过全局变量控制类只会被实力化一次，且通过 `Object.freeze` 使实例对象不可变。

```js
let instance
class Counter {
  constructor() {
    if (instance) {
      return
    }
    instance = this
  }
}

const counter = new Counter()
export default Object.freeze(counter)
```

### Observer Pattern 观察者模式

通过观察者将需要监听的方法添加到事件队列，并在触发时依次调用观察者方法。

```js
class Observable {
  constructor() {
    this.observers = []
  }
  subscribe(func) {
    this.observers.push(func)
  }
  unsubscribe(func) {
    this.observers = this.observers.filter(observer => observer !== func)
  }
  notify(data) {
    this.observers.forEach(observer => observer(data))
  }
}
```

### Proxy Pattern 代理模式

通过与代理对象交互，实现通用的属性或方法抽象。如代理了对象的 `get` , `set` 方法实现值变化时的日志打印功能。

```js
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${obj[prop]}`)
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`)
    obj[prop] = value
    return true
  },
})
```

### Factory Pattern 工厂模式

通过工厂方法生成对象，如初始化用户信息、生成基本配置等。

```js
const createUser = ({ firstName, lastName, email }) => ({
  firstName,
  lastName,
  email,
  fullName() {
    return `${this.firstName} ${this.lastName}`
  },
})
```

### Mediator/Middleware Pattern 调解器/中间件模式

通过中介对象，处理多个对象之间的交互需求。Express.js 的中间件、聊天室应用中的聊天室都是这种模式的体现。

## 性能模式

### Dynamic Import 动态导入

### Bundle Splitting
