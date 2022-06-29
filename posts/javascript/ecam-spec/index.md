---
marp: true
title: '如何阅读 ECMA 标准'
date: '2022-06-10'
tags: ['JavaScript']
description: '通过例子了解如何阅读 ECMAScript 规范'
---

# 如何阅读 ECMA 规范

<!--

本次分享的主题是，如何阅读ECMA规范。

-->

---

## 前言

查询 JavaScript 语言某个 API 或特性

- 搜索引擎
- MDN

MDN 关于[JavaScript 参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/About#%E5%93%AA%E9%87%8C%E6%9F%A5%E6%89%BE_javascript_%E4%BF%A1%E6%81%AF)的介绍中提及：

> JavaScript 核心语言特性的文档 (绝大部分基于 ECMAScript )

<!--
大多数开发者包括我在内，想要查询一个 API 或者语言特性，可能会在搜索引擎里搜索，如果有别的语言也有同样的API，还会在搜索条件里加个 js。搜索结果往往是介绍 API的使用方法，以及文章作者个人总结的使用经验。

或者去 MDN 搜索，MDN 在我看来更像是一个语言文档。

在 MDN JavaScript 【关于该参考】的介绍中，提到绝大部分 JavaScript 核心语言特性基于 ECMAScript。所以 ECMAScript 规范理论上也是 MDN 文档的基础。

所以一个 JavaScript开发者 如果需要在该领域长期发展，同样需要具备阅读规范的能力，而不是仅仅查阅他人总结归纳的知识。
-->

---

## 阅读规范前的准备

1. Algorithm Steps 算法步骤
2. Abstract Operations 抽象操作
3. Internal slots & Internal methods 内部槽 内部方法
4. List & Record
5. Completion Record
6. Expression

<!--

规范是语言的定义，不是语言的具体实现。为了描述的方便，以及抽象相似特性等目的，规范主要有这几种常见的算法约定和语法。

总的来说，在规范中阅读这些章节是非常简单的。 然而，规范使用了大量的简写去组织文档，这些简写对于刚接触规范的人来说还是有一些障碍的。

接下来将会介绍主要的几种规范内的特定语义，以帮助更好的阅读规范。

-->

---

### 1. Algorithm Steps

通常使用带编号的列表来指定算法的步骤。

算法步骤可以细分为多个连续的子步骤。子步骤需要用缩进表示，可以进一步被划分成缩进的子步骤。

```
1. Top-level step
   a. Substep.
   b. Substep.
      i. Subsubstep.
         1. Assert: Conclusion
            a. Subsubsubsubstep
               i. Subsubsubsubsubstep
```

<!--
算法步骤可以理解为描述算法的执行步骤，上一步骤完成后，会进入下一步骤。步骤中间可能会有子步骤。

有的步骤会以 Assert 开头，意思是显示的断言 Assert 后的条件成立
-->

---

例：[Number 规范](https://tc39.es/ecma262/#sec-number-constructor-number-value)

1. 通过步骤 1 计算出数字化后的 value
2. 如果 value 没有提供，则值为 +0
3. 如果没有使用 new，则返回 n
4. 否则，生成新的对象 O，将 O 的内部属性设置为 n，返回 O

<!--
先不看这些特殊的符号背后的含义

可以看到如果 Number 没有传参数的话，会返回一个 +0， 可以通过 Object.is 验证
-->

---

### 2. Abstract Operations

规范使用一种叫 **Abstract Operation 抽象操作** 的概念，它将需要复用的逻辑单独抽出来，形成一套可复用的步骤。

> These operations are not a part of the ECMAScript language; they are defined here solely to aid the specification of the semantics of the ECMAScript language.
>
> 这些操作不是 ECMAScript 语言的一部分；在这里定义它们只是为了帮助规范 ECMAScript 语言的语义。

<!--
像我们平时在写代码时，如果遇到一些重复性的逻辑，通常会将需要复用的代码抽象成一个新的函数，这样只需要在需要调用的方调用这一个函数就可以了。

在 ECMAScript 规范中，也有很多重复性的逻辑，为了解决这种抽象逻辑的需求，

规范使用一种叫抽象操作的概念，它将需要复用的逻辑单独抽出来，形成一套步骤，当规范的任何地方需要使用它时，再执行这个抽象操作即可。

抽象操作不是语言的一部分，定义抽象操作只是为了规范 ECMAScript 语言的语义，使可复用的逻辑只需要定义一次，简化规范的说明，起到简洁高效的说明作用。
-->

---

例：[ToNumeric](https://tc39.es/ecma262/#sec-tonumeric)

1. 如果 value 是 BigInt，则返回 BigInt 的数值
2. 否则，交给 ToNumber 处理

例：[toNumber](https://tc39.es/ecma262/#sec-tonumber)

1. 将参数按照表格对应的情况进行转换

<!--

比如上一节中的 Number 规范中的第一步， toToNumeric 就是一个 抽象操作。可以通过点击它，跳转到定义的位置，并且在标题也可以查看那些地方引用了这个操作。

比如 toNumber 操作定义了如何转换参数，这样在Math的一些数字转化的方法中，只要引用 ToNumber 就可以实现描述转换规则的规范。
-->

---

### 3. [Internal slots, Internal methods](https://tc39.es/ecma262/#sec-object-internal-methods-and-internal-slots)

O.[[V]] 通常用于以下三种情况:

1. Record fields: 类似 Key-Value 对象
2. Internal slots: 存在于对象上，用于记录状态、数据。

   > 例：Set O.[[NumberData]] to n.

3. Internal methods: 存在于对象上，定义自身的行为逻辑的一种算法。

   > 例：Return ? O.[[Get]](P, O).

<!--
在 Number 规范中可以看到第五条 Set O.[[NumberData]] to n.

用两个方括号包裹的变量，这个在规范中一般指代三种情况

1. 是访问常量对象的属性
2. 是获取对象的内部状态
3. 是调用对象的内部方法

规范定义了这三种概念，但基于前端开发有一定经验的前提下，我个人感觉就是类似取对象的值或者方法，还是比较好理解的。

Internal Method 和 Internal Slot 都是规范内部的概念，也不能通过 JS 来访问、调用它们。对于 JS 语言实现来说，规范也不要求具体实现的逻辑、步骤、算法和规范的 Internal Method 一模一样，它仅要求实现表现出来的特性、结果和规范一致即可。
-->

---

### 4. [List 和 Record](https://tc39.es/ecma262/#sec-list-and-record-specification-type)

- List: `« 1, 2 »`
- Record: `{ [[Field1]]: 42, [[Field2]]: false, [[Field3]]: empty }`
  - Completion Record:
    > { [[Type]]: continue, [[Value]]: empty, [[Target]]: empty }.
  - Reference Record
    > { [[Base]]: unresolvable, [[ReferencedName]]: name, [[Strict]]: strict, [[ThisValue]]: empty }
  - Environment Record

<!--
List 和 Record 类似 JavaScript 中的 Array 和 Object 概念，表示 List 数组 和 Record 对象。

使用类似对象字面量的语法来表示一个 Record 值
-->

---

### 5. 特定的 Record: [Completion Record](https://tc39.es/ecma262/#sec-completion-record-specification-type)

有如下字段

- [[Type]]
- [[Value]]
- [[Target]]

字段的说明：

- 结束发生的完成类型 [[Type]]: normal，break，continue，return，throw
- 如果 [[Type]] 是 normal, return, throw, 则通过 [[Value]] 记录是生成正常值或者抛出的异常值，否则就是 empty
- 如果 [[Type]] 是 break, continue, 可以选择性的提供 [[Target]] 表明控制流要转移的目标 label

<!--
上一节提到 Record 时，有几个常见的特殊 Record。

Completion Record 用来解释运行时数据和控制流传播的 Record，如执行非局部转移控制语句(break，continue，return 和 throw)的行为。

它有 3个 field 记录状态，分别是 Type Value Target。
-->

---

假设有一个叫做 AbstractOp 的抽象操作，需要获取操作结果 result，往往规范会这样描述：

1. 令 completionRecordResult 为 AbstractOp() 的结果
2. 如果 completionRecordResult 是 abrupt completion，则直接返回 result
3. 读取 completionRecordResult.[[Value]] 的值，赋值给 result

<!--
假设有一个会返回 Completion Record 叫做 AbstractOp 的抽象操作，需要获取操作结果 result，往往规范会这样描述：

接下来这段我感觉跟 try..catch 逻辑比较类似

1. 令 completionRecordResult 为 AbstractOp() 的结果
2. 如果 completionRecordResult 是 abrupt completion，则直接返回 result。这里的 result 就是 completion record, 包含了错误信息和完成状态
3. 如果不是 abrupt completion，则提取 [[Value]] 提供给 result
-->

---

规范将上述逻辑用[ReturnIfAbrupt](https://tc39.es/ecma262/#sec-returnifabrupt)简写。表达上述含义，即：

如果是 abrupt completion 就直接返回它，若是 normal completion 就取出其中的 [[Value]]」。

执行抽象操作会生成 Completion Record，因此也就相当于是 `ReturnIfAbrupt(AbstractOp())`。

---

规范提供了更简单的写法

- `? AbstractOp()` 等价于 `ReturnIfAbrupt(AbstractOp())`
- `! AbstractOp()`，断言拿到的结果一定不是 abrupt completion。类似 TypeScript 中的 !

<!--
问号+操作 表示如果这个操作结果是 abrupt completion，则在 ? doAbstractOperation() 这个位置把 abrupt completion 返回；如果操作结果是 normal completion，则提取它内部的 [[Value]] 出来，作为整个 ? doAbstractOperation() 结果。

叹号+操作 表示简写标记「!」和「?」有点类似，唯一的区别在于它是一个隐式断言，它断言此处执行的逻辑永远不会出现 abrupt completion，永远只会拿到 normal completion。
-->

---

### 6. Expression

---

## 总结

1. ECMA 规范是语言的定义，不是语言的具体实现。
2. 规范通过 Abstract Operations 抽象类似的功能，通过 Algorithm Steps 阐述一条规范细则的逻辑步骤
3. 规范内的数据通过 List 和 Record 表示，并且有一些特殊的 Record 以帮助规范处理常见的特殊场景

---

## 案例

1. [从 ECMAScript 规范解读 this](https://github.com/mqyqingfeng/Blog/issues/7)
2. [typeof](https://tc39.es/ecma262/#sec-typeof-operator)
3. [at()](https://tc39.es/ecma262/#sec-array.prototype.at)
4. [Arrow Function](https://tc39.es/ecma262/#sec-arrow-function-definitions)

<!--
从一个操作符——typeof， 一个API——Array.prototype.at()，一个概念——剪头函数 入手，来看一下阅读规范的整个流程

这里有一篇大佬的文章，介绍如果从规范看 this，里面介绍了一些之前提到的概念，比如 Record、Abstract Operation 等，里面提到的我就不再赘述了。

后面三条，是我自己尝试利用了解的一些东西，去看规范的实践。

在 this 这篇文章里，介绍一下 Reference Record，GetValue
-->

---

### typeof

UnaryExpression : typeof UnaryExpression

1. 使 val 等于 UnaryExpression 的执行结果
2. 如果 val 是 Reference Record ([知乎](https://www.zhihu.com/question/31911373))，判断其[[base]]如果是 unresolved，返回 undefined
3. 否则，使 val 等于 ? GetValue(val)
   1. 这里跳过 val 不是 Reference Record 的话，直接返回值
   2. 否则，通过 V.[[ReferencedName]] 获取值
4. 如果 Type(val) 是 Object，并且 val 有 [[IsHTMLDDA]] 属性，返回 "undefined"（仅有 document.all 包含 [[IsHTMLDDA]]。）
5. 按照表格返回 val 对应的 type 类型

---

### at(index)

1. 使 O 等于 ToObject(this)
2. 获取 O 的长度 len
3. 使 relativeIndex 等于 index 数字格式化
4. 如果 relativeIndex 大于等于 0 则 k 等于 relativeIndex，否则 k 等于 len+relativeIndex
5. 如果 k < 0 或 k ≥ len，返回 undefined
6. 返回 Get(O, ToString(k))，即 O.[[Get]](K, O)
   - [[[Get]]](https://tc39.es/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots-get-p-receiver)
   - 获取对象对应键的值(并会沿着原型链向上查找)
   - 如果是 undefined 则返回
   - 否则，返回 [[Value]]

---

### Arrow Function

<!--

-->

---

## 参考

1. [ECMAScript® Specification](https://tc39.es/ecma262/)
   - [中文](https://ecma262.docschina.org/)
2. [How to Read the ECMAScript Specification](https://timothygu.me/es-howto/)
3. [ECMAScript 阅读指南（二）](https://zhuanlan.zhihu.com/p/262265857)
