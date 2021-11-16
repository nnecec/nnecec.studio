---
title: "Deep Dive: Promise"
date: "2021-10-15"
tags: ["Deep Dive", "JavaScript"]
status: 1
description: "Promise API 及实现"
---

## 概念

- [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## API

### Promise Constructor

- 提供 thenable 的 原型方法 `then`，then 方法会返回 Promise
- 为 Promise 设置不可二次修改的内部状态，且仅有三种状态 `pending`, `fulfilled`, `rejected`
- 内部的 value，可以是 `undefined`, `thenable`, `promise`

```js
class Promise {
  constructor(resolver) {
    if (typeof resolver !== "function") {
      throw new TypeError("resolver must be a function")
    }

    this._state = internal.PENDING
    this._value = undefined
  }

  then(onFulfilled, onRejected) {
    // ...
  }
}
```

然后需要实现 Promise 构造函数的功能。我们会向构造函数传入一个接受 `resolve, reject` 作为参数的方法。

```js
class Promise {
  constructor(resolver) {
    // ...
    if (resolver !== internal.noop) {
      safelyResolveThenable(this, resolver)
    }
  }
}
```

### resolve, reject

如果传入 resolve 的是 Promise，则继续构建该 Promise。当是一个非 Promise 的值时，修改成对应的成功失败状态，并赋予该值。

```js
const resolve = function (self, value) {
  const result = tryCatch(getThen, value)
  if (result.status === "error") {
    return reject(self, result.value)
  }
  const thenable = result.value
  if (thenable) {
    safelyResolveThenable(self, value)
  } else {
    self._state = FULFILLED
    self._value = value
  }
  return self
}

const reject = function (self, error) {
  self._state = REJECTED
  self._value = error
  return self
}
```

到这里，基本走完了 Promise 的构造函数流程。其中有一个重要的实现 `safelyResolveThenable`。 `safelyResolveThenable` 通过 `try...catch` 执行了参数 resolver，并根据成功执行与否，执行对应的 `onSuccess` 或 `onError` 方法。但注意，方法内部声明了 `called` 变量。该变量为了实现 Promise 仅可以修改一次内部 `state` 状态。

```js
function safelyResolveThenable(self, resolver) {
  let called = false // 标记该promise是否被调用过
  function onError(value) {
    if (called) {
      return
    }
    called = true
    reject(self, value)
  }

  function onSuccess(value) {
    if (called) {
      return
    }
    called = true
    resolve(self, value)
  }

  function tryToUnwrap() {
    resolver(onSuccess, onError)
  }

  const result = tryCatch(tryToUnwrap)
  if (result.status === "error") {
    onError(result.value)
  }
}
```

### then

判断是一个合法 Promise 的方式

```js
const isPromise = promise => {
  return (
    promise &&
    (typeof promise === "object" || typeof promise === "function") &&
    typeof promise.then === "function"
  )
}
```

可见 `then` 是 Promise 中的一个重要实现。

`then` 接受 2 个方法，分别在成功、失败时调用。如果 Promise 是同步执行，则根据 `this._state` 执行对应的方法。那么，如果 Promise 的构造函数是异步的呢？

此时需要引入 `待执行队列` 这个概念。在声明 Promise 时，如果内部状态为 `pending`，那么所有的 `then` 注册方法，都会添加到 `this._subscribers` 队列。随后在 `resolve` 和 `reject` 方法中需要增加调用队列方法。

```js
function then(onFulfilled, onRejected) {
  const _promise = new this.constructor(internal.noop)
  if (this._state !== internal.PENDING) {
    const handler =
      this._state === internal.FULFILLED ? onFulfilled : onRejected
    internal.unwrap(_promise, handler, this._value)
  } else {
    this._subscribers.push(
      new SubscriberItem(_promise, onFulfilled, onRejected)
    )
  }
  return _promise
}
const resolve = function (self, value) {
  // ...
  if (thenable) {
    // ...
  } else {
    let i = 0
    const len = self._subscribers.length
    while (i < len) {
      self._subscribers[i].callFulfilled(value)
      i++
    }
  }
  // ...
}

const reject = function (self, error) {
  // ...
  let i = 0
  const len = self._subscribers.length
  while (i < len) {
    self._subscribers[i].callRejected(error)
    i++
  }
  // ...
}
```

### promise.catch, promise.finally

```js
class Promise {
  catch(onRejected) {
    return this.then(null, onRejected)
  }

  finally(callback) {
    if (typeof callback !== "function") {
      return this
    }

    const constructor = this.constructor

    return this.then(
      function (value) {
        constructor.resolve(callback()).then(function () {
          return value
        })
      },
      function (reason) {
        constructor.resolve(callback()).then(function () {
          throw reason
        })
      }
    )
  }
}
```

### Promise.resolve, Promise.reject

```js
Promise.resolve = function (value) {
  const Constructor = this
  if (value && typeof value === "object" && value.constructor === Constructor) {
    return value
  }
  const promise = new Constructor(internal.noop)
  return resolve(promise, value)
}
Promise.reject = function (reason) {
  const Constructor = this
  const promise = new Constructor(internal.noop)
  return reject(promise, reason)
}
```

### Promise.all, Promise.allSettled

`Promise.all()` 方法接收一个 promise 的 iterable 类型的输入，并且只返回一个 Promise 实例， 那个输入的所有 promise 的 resolve 回调的结果是一个数组。

当所有输入的 promise 的 resolve 回调都结束，或者输入的 iterable 里没有 promise 了，执行 resolve。当任何一个输入的 promise 的 reject 回调执行或者输入不合法的 promise 就会立即抛出错误，执行 reject。

```js
Promise.all = function (iterable) {
  const self = this
  // 如果参数不是数组则抛错
  if (!utils.isArray(iterable)) {
    return this.reject(new TypeError("parameter must be an array"))
  }

  const len = iterable.length

  let called = false
  // 如果参数长度为0 则说明为空数组
  if (!len) {
    return this.resolve([])
  }

  const values = new Array(len) // 最后输出的值
  let resolved = 0 // resolve 的数量
  let i = 0
  const promise = new this(internal.noop)

  function allResolver(value, i) {
    self.resolve(value).then(
      function (value) {
        values[i] = value
        if (++resolved === len && !called) {
          called = true
          internal.resolve(promise, values)
        }
      },
      function (error) {
        if (!called) {
          called = true
          internal.reject(promise, error)
        }
      }
    )
  }

  while (i++ < len) {
    allResolver(iterable[i], i)
  }
  return promise
}
```

`Promise.allSettled()` 方法返回一个在所有给定的 promise 都已经 fulfilled 或 rejected 后的 promise，并带有一个对象数组，每个对象表示对应的 promise 结果。

```js
function allSettled(iterable) {
  const self = this

  if (!utils.isArray(iterable)) {
    return this.reject(new TypeError("parameter must be an array"))
  }

  const len = iterable.length

  let called = false
  if (!len) {
    return this.resolve([])
  }

  const values = new Array(len) // 最后输出的值
  let settled = 0 // resolve 的数量
  let i = 0
  const promise = new this(internal.noop)

  function allResolver(value, i) {
    self.resolve(value).then(
      function (value) {
        values[i] = {
          status: "fulfilled",
          value,
        }
        if (++settled === len && !called) {
          called = true
          internal.resolve(promise, values)
        }
      },
      function (reason) {
        values[i] = {
          status: "rejected",
          reason,
        }
        if (++settled === len && !called) {
          called = true
          internal.resolve(promise, values)
        }
      }
    )
  }

  while (i++ < len) {
    allResolver(iterable[i], i)
  }
  return promise
}
```

### Promise.race

`Promise.race(iterable)` 方法返回一个 promise，一旦迭代器中的某个 promise 解决或拒绝，返回的 promise 就会解决或拒绝。在内部实现中，用 `called = false` 标记，当有一个 promise 解决或拒绝时，标记 `called = true`，并对内部 promise 调用 resolve/reject 跳出 race 方法。

```js
Promise.race = function (iterable) {
  const self = this
  if (!utils.isArray(iterable)) {
    return this.reject(new TypeError("parameter must be an array"))
  }

  const len = iterable.length

  let called = false
  if (!len) {
    return this.resolve([])
  }

  let i = 0
  const promise = new this(internal.noop)

  function resolver(value) {
    self.resolve(value).then(
      function (value) {
        if (!called) {
          called = true
          internal.resolve(promise, value)
        }
      },
      function (error) {
        if (!called) {
          called = true
          internal.reject(promise, error)
        }
      }
    )
  }

  while (i++ < len) {
    resolver(iterable[i])
  }
  return promise
}
```

### Promise.any(experiment)

- Promise A+ 规范 [中文](https://github.com/nnecec/imrich/blob/master/implementation/Promise/Promises%20A%2B规范.md) [英文](https://promisesaplus.com)
- [完整实现](https://github.com/nnecec/imrich/tree/master/implementation/Promise)