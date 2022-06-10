---
marp: true
title: '如何阅读 ECMA 标准'
date: '2022-06-10'
tags: ['JavaScript']
description: '通过例子了解如何阅读 ECMAScript 规范'
---

# 如何阅读 ECMA 规范

---

## 前言

---

## 约定

Algorithm Conventions

1. Algorithm Steps
2. Abstract Operations
3. List & Record
4. Internal slots & Internal methods
5. Completion Record

<!-- This is presenter note. You can write down notes through HTML comment. -->

---

### Algorithm Steps

规范通过[5.2 Algorithm Conventions](https://tc39.es/ecma262/#sec-algorithm-conventions)描述算法的逻辑，

1. Top-level step
   a. Substep.
   b. Substep.
   1. Subsubstep.
      1. Subsubsubstep
         1. Subsubsubsubstep
            1. Subsubsubsubsubstep

例： [Number 规范](https://tc39.es/ecma262/#sec-number-constructor-number-value)

---

### Abstract Operations

在写代码时，如果遇到一些重复性的逻辑，通常会将需要复用的代码抽象成一个新的函数，这样只需要在多个地方调用这一个函数就可以了。

在 ECMAScript 规范中，也有很多重复性的逻辑，为了解决这种抽象逻辑的需求，规范使用一种叫 **Abstract Operation 抽象操作** 的概念，它将需要复用的逻辑单独抽出来，形成一套步骤，当规范的任何地方需要使用它时，再执行这个抽象操作即可。

---

> #### Abstract Operations
>
> These operations are not a part of the ECMAScript language; they are defined here solely to aid the specification of the semantics of the ECMAScript language. Other, more specialized abstract operations are defined throughout this specification.
>
> 这些操作不是 ECMAScript 语言的一部分；在这里定义它们只是为了帮助规范 ECMAScript 语言的语义。其他更专业的抽象操作在本规范中定义。

---

### List 和 Record

> https://tc39.es/ecma262/#sec-list-and-record-specification-type

List: « 1, 2 »
Record: { [[Field1]]: 42, [[Field2]]: false, [[Field3]]: empty }

---

### [[]]

通常含义有以下三种情况:

1. Record fields: 上一篇中的 Record，类似对象 Key-Value，指对象的某个[[Key]]的值
2. Internal slots: 用于在对象上记录状态、数据。

   > eg. https://tc39.es/ecma262/#sec-properties-of-the-number-constructor

3. Internal methods: 是规范用来定义对象自身的行为逻辑的一种算法。

   > eg. Return ? O.[[Get]](P, O).

---

#### Abstract Operations 例子 和 [[]] 例子

1. https://tc39.es/ecma262/#sec-tostring
2. https://tc39.es/ecma262/#sec-isarray
3. https://tc39.es/ecma262/#sec-get-o-p
4. https://tc39.es/ecma262/#sec-iteratorvalue

---

### Completion Record

- 结束发生的完成类型 [[Type]]: normal，break，continue，return，throw
- 如果 [[Type]] 是 normal, return, throw, 则通过 [[Value]] 记录是生成正常值或者抛出的异常值，否则就是 empty。
- 如果 [[Type]] 是 break, continue, 可以选择性的提供 [[Target]] 表明控制流要转移的目标 label。

---

假设有一个叫做 AbstractOp 的操作步骤，往往规范会描述：

1. 令 result 为 AbstractOp() 的结果。
2. 如果 result 是 abrupt completion，则直接返回 result。
3. 读取 result.[[Value]] 的值，赋值给 result。

---

规范将上述逻辑用[ReturnIfAbrupt](https://tc39.es/ecma262/#sec-returnifabrupt)简写。表达上述含义，即：

如果是 abrupt completion 就直接返回它，若是 normal completion 就取出其中的 [[Value]]」。

执行抽象操作会生成 Completion Record，因此也就相当于是 `ReturnIfAbrupt(AbstractOp())`。

---

规范提供了更简单的写法 `? AbstractOp()` 等价于 `ReturnIfAbrupt(AbstractOp())`。

同时也提供了 `! AbstractOp()`，意思是拿到的结果一定不是 abrupt completion。类似 TypeScript 中的 !

---

## 例子

1. typeof
2. Number()
3. Number.prototype.valueOf()

---

### Number.NaN

---

## 参考

1. [ECMAScript® Specification](https://tc39.es/ecma262/)
   - [中文](https://ecma262.docschina.org/)
2. [How to Read the ECMAScript Specification](https://timothygu.me/es-howto/)
3. [ECMAScript 阅读指南（二）](https://zhuanlan.zhihu.com/p/262265857)
