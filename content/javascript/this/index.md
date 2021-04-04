---
title: "Deep Dive: this"
date: "2021-04-04"
tags: ["Deep Dive", "JavaScript"]
description: "在 React 中，使用 this 需要注意它的指向问题。那么这种问题为什么会出现呢？"
---

## 1. 关于 this

在 React 中，通常在如下场景中使用 this:

```js
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
  }

  increment() {
    // ...
  }

  decrement() {
    // ...
  }

  render() {
    if (this.props.show) {
      return this.state.count
    }
    return null
  }
}
```

在这里，开发者理解的 `this` 通常指向的是由 `ClassComponent` 构建的组件实例。

在[Demo](https://codesandbox.io/s/quizzical-beaver-51zjr)中可以看到在 React 中创建 `ClassComponent` 并声明方法的几种情况。

可以看到，在没有显示绑定 `this` 的情况下报错了，打印 `this` 可以看到它指向的是全局对象 `window`。

在 [React 文档](https://zh-hans.reactjs.org/docs/handling-events.html)中关于方法的处理有提到：

> 你必须谨慎对待 JSX 回调函数中的 this，在 JavaScript 中，class 的方法默认不会绑定 this。如果你忘记绑定 this.handleClick 并把它传入了 onClick，当你调用这个函数的时候 this 的值为 undefined。这并不是 React 特有的行为；这其实与 JavaScript 函数工作原理有关。

> 如果觉得使用 bind 很麻烦，这里有两种方式可以解决。
>
> 1. 可以使用 class fields 正确的绑定回调函数。
> 2. 可以在回调中使用箭头函数。

所以在 React 中，使用 this 需要注意它的指向问题。

## 2. React 的合成事件

参见[Deep Dive: SyntheticEvent](/react/synthetic-event/)

在最后一步执行 `onClick` 绑定的方法时，传入的 `context` 是 `undefined`，所以如果不指定 `this` 则在事件回调函数中丢失了 `this` 的指向。

## 3. JavaScript 函数工作原理

在 JavaScript 中，`this` 有以下几种绑定方式：

1. 默认绑定
2. 隐式绑定
3. 显示绑定
4. 箭头函数

### 3.1 默认绑定

这条规则可以看作是无法应用其他规则时的默认规则。在默认绑定中，`this` 默认指向全局对象，如果使用严格模式(strict mode)，那么全局对象将无法使用默认绑定，因此 `this` 会绑定 到 `undefined`

### 3.2 隐式绑定

当函数引 用有上下文对象时，隐式绑定会把函数调用中的 `this` 绑定到这个上下文对象。例如：

```js
var obj = {
  a: 2,
  say() {
    console.log(this.a)
  },
}

obj.say() // 2 （隐式绑定）

var say = obj.say
say() // undefined （默认绑定）
```

### 3.3 显式绑定

- call/apply
- bind
- 手动传入上下文

### 3.4 new 绑定

使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。

1. 创建(或者说构造)一个全新的对象。
2. 这个新对象会被执行`[[Prototype]]`连接。
3. 这个新对象会绑定到函数调用的 `this`。
4. 如果函数没有返回其他对象，那么 `new` 表达式中的函数调用会自动返回这个新对象。

### 3.5 箭头函数

箭头函数不使用 `this` 的四种标准规则，而是根据外层(函数或者全局)作用域来决定 `this`。

## 小结

1. 由 `new` 调用?绑定到新创建的对象。
2. 由 `call` 或者 `apply`(或者 `bind`)调用?绑定到指定的对象。
3. 由上下文对象调用?绑定到那个上下文对象。
4. 默认:在严格模式下绑定到 `undefined`，否则绑定到全局对象。
