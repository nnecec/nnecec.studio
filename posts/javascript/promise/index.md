---
title: 'Promise 完全解析'
date: '2023-05-08'
tags: ['JavaScript']
description: 'Promise API 解读及如何实现'
---

## 概念

- [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Promise 主要用于解决异步编程场景的痛点。在 Promise 之前，异步编程主要靠回调函数来实现。

Promise 拥有 3 种状态：

- pending
- fulfilled
- rejected

初始状态为 pending，当发生状态转移后，则状态不会再被修改。

`then` `catch` `finally` 方法都会获取上下文的执行结果，根据成功或失败进入不同的回调方法，并返回一个新生成的 promise，这个 promise 的结果根据回调方法的执行成功与否决定。

Promise 还有几个静态方法：

- Promise.all：相当于内部有一个计数器，当所有 promises 执行成功后返回所有成功结果的集合，如果有一个失败，则立即进入失败的逻辑并传递这个失败信息给回调。
- Promise.resolve/Promise.reject

  Promise.reject 直接返回 rejected 状态的 Promise 实例。

  但对于 Promise.resolve 有以下几个情况：

  1. 无参数：返回 resolved 状态的 Promise 对象
  2. 普通数据对象： 返回 resolved 状态的 Promise 对象
  3. 一个 Promise 实例：直接返回当前实例
  4. 一个 thenable 对象(thenable 对象指的是具有 then 方法的对象) ：转为 Promise 对象，并立即执行 thenable 对象的 then 方法。

     ```js
     // 1.
     Promise.resolve().then(
       function (value) {
         console.log(value) // undefined
       },
       function (value) {
         // 不会被调用
       },
     )
     // 2.
     Promise.resolve('Success').then(
       function (value) {
         console.log(value) // "Success"
       },
       function (value) {
         // 不会被调用
       },
     )
     // 3.
     var original = Promise.resolve(33)
     var cast = Promise.resolve(original)
     cast.then(function (value) {
       console.log('value: ' + value)
     })
     console.log('original === cast ? ' + (original === cast))
     /*
      *  打印顺序如下，这里有一个同步异步先后执行的区别
      *  original === cast ? true
      *  value: 33
      */

     // 4.
     var p1 = Promise.resolve({
       then: function (onFulfill, onReject) {
         onFulfill('fulfilled!')
       },
     })
     console.log(p1 instanceof Promise) // true，这是一个 Promise 对象

     p1.then(
       function (v) {
         console.log(v) // 输出"fulfilled!"
       },
       function (e) {
         // 不会被调用
       },
     )
     ```

  - Promise.race 内部创建了一个新的 Promise，在构造函数中把传入的所有 promises 循环调用，并在 then 方法中调用新 Promise 的 resolve 和 rejected， 当获得第一个 promise 执行结果时则等于新的 Promise 获得了状态变更。

## 核心实现

### Constructor 实现

- 初始化 Promise 内部的不可二次修改的内部状态 state，且仅有三种状态 `pending`, `fulfilled`, `rejected`
- 初始化内部初始值 value，初始为 undefined，可以是 `undefined`, `thenable`, `promise`
- 实现 Promise 构造函数接受参数的功能。我们会向构造函数传入一个接受 `resolve, reject` 作为参数的方法 `resolver`。

```js
class Promise {
  constructor(resolver) {
    if (typeof resolver !== 'function') {
      throw new TypeError('resolver must be a function')
    }

    this._state = internal.PENDING
    this._value = undefined

    // 代表不是由 Promise 内部创建，由用户调用
    if (resolver !== internal.noop) {
      safelyResolveThenable(this, resolver)
    }
  }
}
```

#### safelyResolveThenable

`safelyResolveThenable` 通过 `try...catch` 执行了参数构造方法 resolver，并根据成功执行与否，执行对应的 `onSuccess` 或 `onError` 方法，分别调用内部 resolve 和 reject 处理构造函数接受的 resolver 方法。

此处注意方法内部声明了 `called` 变量。该变量为了实现 Promise 仅可以修改一次内部 `state` 状态。使用 called 标记后，在构造函数多次调用 resolve/reject 都会被拦截。

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
  if (result.status === 'error') {
    onError(result.value)
  }
}
```

#### 内部 resolve, reject 实现

- 如果 resolver 传入 resolve 的是 Promise，则通过 safelyResolveThenable 继续执行该 promise。
- 当是一个非 Promise 的值时，修改成对应的状态，并为 value 赋予该值。

```js
// ver 1.0
const resolve = function (self, value) {
  const result = tryCatch(getThen, value) // 通过 try..catch 执行 then(onFulfilled(value), onRejected(value))
  if (result.status === 'error') {
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

以上，通过构造函数声明了一个 Promise 实例，并返回。同时，Promise 实例可以通过 `then` 方法来调用成功或失败的回调方法。

### then

如下是判断一个合法 Promise 的方式

```js
const isPromise = promise => {
  return (
    promise &&
    (typeof promise === 'object' || typeof promise === 'function') &&
    typeof promise.then === 'function'
  )
}
```

通过判断 then 是否是方法来判断是不是一个 promise，由此可见 `then` 是 Promise 中的一个重要实现。

`then` 接受 2 个方法参数，分别在成功、失败时调用。

此时需要引入 `待执行队列` 这个概念。在声明 Promise 时，如果内部状态为 `pending`，那么所有的 `then` 注册方法，都会添加到待执行队列。随后状态变更后，在 `resolve` 和 `reject` 方法中需要增加调用队列方法。

```js
function then(onFulfilled, onRejected) {
  // 构造一个新的 promise 用于 then 返回新的 Promise 实例
  const _promise = new this.constructor(internal.noop)
  if (this._state !== PENDING) {
    // 根据非 pending 状态决定回调策略
    const handler = this._state === FULFILLED ? onFulfilled : onRejected
    // unwrap 是异步执行方法，稍后介绍
    internal.unwrap(_promise, handler, this._value)
  } else {
    // 如果是 pending 状态，将 then 携带的方法添加到待执行队列中
    this._subscribers.push(new SubscriberItem(_promise, onFulfilled, onRejected))
  }
  return _promise
}
```

#### SubscriberItem

添加待执行任务项时，会判断是否有处理成功/失败的方法。

假设当前 then 序号为 p1，如果 p1 提供了处理函数，则 p1 的后续待执行任务的 promise 上下文实例会变成 p1 创建的 promise。

假设 p1 没有提供处理 onRejected 的函数，则后续的待执行任务的 promise 上下文还是 p1 执行时的 promise 上下文。

```js
class SubscriberItem {
  constructor(promise, onFulfilled, onRejected) {
    this.promise = promise

    if (utils.isFunction(onFulfilled)) {
      this.onFulfilled = onFulfilled
      this.callFulfilled = this.otherCallFulfilled
    }
    if (utils.isFunction(onRejected)) {
      this.onRejected = onRejected
      this.callRejected = this.otherCallRejected
    }
  }

  callFulfilled(value) {
    internal.resolve(this.promise, value)
  }

  otherCallFulfilled(value) {
    internal.unwrap(this.promise, this.onFulfilled, value)
  }

  callRejected(value) {
    internal.reject(this.promise, value)
  }

  otherCallRejected(value) {
    internal.unwrap(this.promise, this.onRejected, value)
  }
}
```

通过 then 方法向 Promise 实例中添加了待执行队列的子项目后，当构造函数内的异步方法执行完后，需要根据状态执行待执行队列中任务对应的 onFulfilled/onRejected 回调。

```js
// 在 resolve/reject 中添加调用 待执行队列 中方法的实现
const resolve = function (self, value) {
  // ...ver 1.0

  // 如果 then 成功且有返回值
  const thenable = result.value

  if (thenable) {
    safelyResolveThenable(self, thenable)
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
  const length_ = self._subscribers.length
  while (i < length_) {
    self._subscribers[i].callRejected(error)
    i++
  }
  return self
}
```

#### 实现异步执行 then 方法

在时间循环中，我们知道 JavaScript 的执行 按照 `macro script - micro script - macro script` 的顺序循环执行，对于 Promise 的构造方法来说是在 macro script 中同步执行的，对于 then 携带的回调方法则是在下一个 micro script 的循环中执行。

在我们的实现中，resolve 中的 callFulfilled 和 reject 中的 callRejected 都会异步执行，执行时都是通过 unwrap 执行对应的 onFulfilled/onRejected 回调。

并且为回调返回值再次调用 then 中新生成的 promise 对应的 resolve/reject，从而形成 then 链。

```js
/**
 * promise: promise 上下文实例
 * func: 根据状态传入 onFulfilled / onRejected 方法
 * value: 给func方法的值参数
 *
 */
function unwrap(promise, func, value) {
  // 需要环境支持 immediate 或 使用 setTimeout 降级
  immediate(function () {
    let returnValue
    try {
      returnValue = func(value) // 对当前 then 中的值调用 resolver 方法获得 returnValue
    } catch (error) {
      return reject(promise, error)
    }

    // 如果返回值 与 promise 一样，则说明 promise 返回了自身，不允许返回自身所以报错
    if (returnValue === promise) {
      reject(promise, new TypeError('Cannot resolve promise with itself'))
    } else {
      resolve(promise, returnValue)
    }
  })
}
```

## 其他方法

### .catch(), .finally()

promise.catch() 相当于只传入了 onRejected 方法，在 rejected 状态下才会执行 catch 回调。reject 的错误会一直沿 then 链向后传递，直到被 onRejected 捕获。

promise.finally() 相当于 onFulfilled/onRejected 传入了同一个方法，这样等于成功、失败都会执行。

```js
class Promise {
  // ...

  catch(onRejected) {
    return this.then(null, onRejected)
  }

  finally(callback) {
    if (typeof callback !== 'function') {
      return this
    }

    const constructor = this.constructor

    return this.then(
      function (value) {
        // 这段代码是为了满足标准设计，对于 finally 返回的 promise , Promise.resolve(promise) 仍然会把finally 上一次的 then 结果带过来
        return constructor.resolve(callback()).then(function () {
          return value
        })
      },
      function (reason) {
        // 同理 抛出错误
        return constructor.resolve(callback()).then(function () {
          throw reason
        })
      },
    )
  }
}
```

### Promise.resolve(), Promise.reject()

Promise.resolve()/Promise.reject() 相当于调用内部的 resolve/reject 实现，直接设置状态为 FULFILLED/REJECTED，并且可以支持 then 链式调用。

```js
Promise.resolve = function (value) {
  const Constructor = this
  if (value && typeof value === 'object' && value.constructor === Constructor) {
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

### Promise.all(), Promise.allSettled()

Promise.all 方法接收一个 promise 的 iterable 类型的输入，resolve 回调的结果是一个数组。

在内部构造一个 Promise 实例 `pp` 用于返回。

依次 resolve 传入的 promise 数组，并在 then.onFulfilled 方法中将 count+1，当 count === promises.length 时，意味着所有的 promise 都 resolved 了，调用之前构造的 pp.resolve(value[])

当任何一个输入的 promise 进入 reject 回调执行或者输入不合法的 promise 就会立即抛出错误，执行 pp.reject(error)。

```js
Promise.all = function (iterable) {
  const self = this
  // 如果参数不是数组则抛错
  if (!utils.isArray(iterable)) {
    return this.reject(new TypeError('parameter must be an array'))
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
      },
    )
  }

  while (i++ < len) {
    allResolver(iterable[i], i)
  }
  return promise
}
```

Promise.allSettled 与 Promise.all 类似，同样需要对内部已执行的 promise 计数。

由于规范定义方法返回一个在所有给定的 promise 都已经 fulfilled 或 rejected 后的 promise，并带有一个对象数组，每个对象表示对应的 promise 结果。

保存下来每一个 promise 的结果，并根据成功/失败标记该位置的 value.status，以及对应的值/错误 value.value，最后通过 pp.resolve(value[]) 返回所有 promise 的执行结果。

```js
function allSettled(iterable) {
  const self = this

  if (!utils.isArray(iterable)) {
    return this.reject(new TypeError('parameter must be an array'))
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
          status: 'fulfilled',
          value,
        }
        if (++settled === len && !called) {
          called = true
          internal.resolve(promise, values)
        }
      },
      function (reason) {
        values[i] = {
          status: 'rejected',
          reason,
        }
        if (++settled === len && !called) {
          called = true
          internal.resolve(promise, values)
        }
      },
    )
  }

  while (i++ < len) {
    allResolver(iterable[i], i)
  }
  return promise
}
```

### Promise.race

`Promise.race(iterable)` 方法构造一个 Promise 实例 `pp`，一旦传入的 promises 中的某个 promise 解决或拒绝，就会立即执行 `pp.resolve(value)/pp.reject(error)`。

```js
Promise.race = function (iterable) {
  const self = this
  if (!utils.isArray(iterable)) {
    return this.reject(new TypeError('parameter must be an array'))
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
      },
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
