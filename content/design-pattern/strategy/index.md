---
title: "Design Pattern: Strategy 策略模式"
date: "2021-09-06"
tags: ["Design Pattern"]
description: "策略模式"
---

## 定义

策略模式的定义是：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。

## 场景

很多公司的年终奖是根据员工的工资基数和年底绩效情况来发放的。例如，绩效为 S 的人年终奖有 4 倍工资，绩效为 A 的人年终奖有 3 倍工资，而绩效为 B 的人年终奖是 2 倍工资。假设财务部要求我们提供一段代码，来方便他们计算员工的年终奖。

又比如在现实中，很多时候也有多种途径到达同一个目的地。比如我们要去某个地方旅游，可以根据具体的实际情况来选择出行的线路。如果没有时间但是不在乎钱，可以选择坐飞机。如果没有钱，可以选择坐大巴或者火车。有私家车的人可能会倾向于自驾，喜欢骑行的人可以选择骑自行车。

## 解决方案

- 从上下文类中找出修改频率较高的算法 （也可能是用于在运行时选择某个算法变体的复杂条件运算符）。
- 声明该算法所有变体的通用策略接口。
- 将算法逐一抽取到各自的类中， 它们都必须实现策略接口。
- 在上下文类中添加一个成员变量用于保存对于策略对象的引用。 然后提供设置器以修改该成员变量。 上下文仅可通过策略接口同策略对象进行交互， 如有需要还可定义一个接口来让策略访问其数据。
- 客户端必须将上下文类与相应策略进行关联， 使上下文可以预期的方式完成其主要工作。

## 优缺点

优点

- 你可以在运行时切换对象内的算法。
- 你可以将算法的实现和使用算法的代码隔离开来。
- 策略模式利用组合、委托和多态等技术和思想，可以有效地避免多重条件选择语句。
- 开闭原则。 你无需对上下文进行修改就能够引入新的策略。

缺点

- 如果你的算法极少发生改变， 那么没有任何理由引入新的类和接口。 使用该模式只会让程序过于复杂。
- 客户端必须知晓策略间的不同——它需要选择合适的策略。
- 许多现代编程语言支持函数类型功能， 允许你在一组匿名函数中实现不同版本的算法。 这样， 你使用这些函数的方式就和使用策略对象时完全相同， 无需借助额外的类和接口来保持代码简洁。

## 代码实现

### 发放奖金

```js
const strategies = {
  S: function (salary) {
    return salary * 4
  },
  A: function (salary) {
    return salary * 3
  },
  B: function (salary) {
    return salary * 2
  },
}
const calculateBonus = (level, salary) => {
  return strategies[level](salary)
}

// 评分为 A , 月薪为 5000 的年终奖
calculateBonus("A", 5000)
```

### 表单校验

```js
const strategies = {
  isNonEmpty: (value, errorMsg) => {
    // 不为空
    if (value === "") {
      return errorMsg
    }
  },
  minLength: (value, length, errorMsg) => {
    // 限制最小长度
    if (value.length < length) {
      return errorMsg
    }
  },
  isMobile: (value, errorMsg) => {
    // 手机号码格式
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errorMsg
    }
  },
}

class Validator {
  constructor() {
    this.cache = [] // 保存校验规则
  }

  add(dom, rule, errorMsg) {
    var self = this
    for (var i = 0, rule; (rule = rules[i++]); ) {
      ;(function (rule) {
        var strategyAry = rule.strategy.split(":")
        var errorMsg = rule.errorMsg

        self.cache.push(function () {
          var strategy = strategyAry.shift()
          strategyAry.unshift(dom.value)
          strategyAry.push(errorMsg)
          return strategies[strategy].apply(dom, strategyAry)
        })
      })(rule)
    }
  }

  start() {
    for (var i = 0, validatorFunc; (validatorFunc = this.cache[i++]); ) {
      var errorMsg = validatorFunc()
      if (errorMsg) {
        return errorMsg
      }
    }
  }
}

var validate = function () {
  var validator = new Validator() // 创建一个validator对象

  validator.add(registerForm.userName, [
    {
      strategy: "isNonEmpty",
      errorMsg: "用户名不能为空",
    },
    {
      strategy: "minLength:6",
      errorMsg: "用户名长度不能小于10位",
    },
  ])

  validator.add(registerForm.password, [
    {
      strategy: "minLength:6",
      errorMsg: "密码长度不能小于6位",
    },
  ])

  validator.add(registerForm.phoneNumber, [
    {
      strategy: "isMobile",
      errorMsg: "手机号码格式不正确",
    },
  ])

  var errorMsg = validator.start()
  return errorMsg
}

var registerForm = document.getElementById("registerForm")
registerForm.onsubmit = function () {
  var errorMsg = validate() // 如果errorMsg有确切的返回值，说明未通过校验
  if (errorMsg) {
    alert(errorMsg)
    return false // 阻止表单提交
  }
}
```
