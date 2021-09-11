---
title: "Design Pattern: Command"
date: "2021-09-07"
tags: ["Design Pattern"]
description: "6. 命令模式"
---

## 定义

命令模式是最简单和优雅的模式之一，命令模式中的命令（command）指的是一个执行某些特定事情的指令。

## 现实案例

假设有一个快餐店，而我是该餐厅的点餐服务员，那么我一天的工作应该是这样的：当某位客人点餐或者打来订餐电话后，我会把他的需求都写在清单上，然后交给厨房，客人不用关心是哪些厨师帮他炒菜。我们餐厅还可以满足客人需要的定时服务，比如客人可能当前正在回家的路上，要求 1 个小时后才开始炒他的菜，只要订单还在，厨师就不会忘记。客人也可以很方便地打电话来撤销订单。另外如果有太多的客人点餐，厨房可以按照订单的顺序排队炒菜。

这些记录着订餐信息的清单，便是命令模式中的命令对象。

命令模式最常见的应用场景是：有时候需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是什么。此时希望用一种松耦合的方式来设计程序，使得请求发送者和请求接收者能够消除彼此之间的耦合关系。

拿订餐来说，客人需要向厨师发送请求，但是完全不知道这些厨师的名字和联系方式，也不知道厨师炒菜的方式和步骤。 命令模式把客人订餐的请求封装成 command 对象，也就是订餐中的订单对象。这个对象可以在程序中被四处传递，就像订单可以从服务员手中传到厨师的手中。这样一来，客人不需要知道厨师的名字，从而解开了请求调用者和请求接收者之间的耦合关系。

## 解决方案

1. 声明仅有一个执行方法的命令接口。
2. 抽取请求并使之成为实现命令接口的具体命令类。 每个类都必须有一组成员变量来保存请求参数和对于实际接收者对象的引用。 所有这些变量的数值都必须通过命令构造函数进行初始化。
3. 找到担任发送者职责的类。 在这些类中添加保存命令的成员变量。 发送者只能通过命令接口与其命令进行交互。 发送者自身通常并不创建命令对象， 而是通过客户端代码获取。
4. 修改发送者使其执行命令， 而非直接将请求发送给接收者。
5. 客户端必须按照以下顺序来初始化对象：

   - 创建接收者。
   - 创建命令， 如有需要可将其关联至接收者。
   - 创建发送者并将其与特定命令关联。

## 优缺点

优点

- 单一职责原则。 你可以解耦触发和执行操作的类。
- 开闭原则。 你可以在不修改已有客户端代码的情况下在程序中创建新的命令。
- 你可以实现撤销和恢复功能。
- 你可以实现操作的延迟执行。
- 你可以将一组简单命令组合成一个复杂命令。

缺点

- 代码可能会变得更加复杂， 因为你在发送者和接收者之间增加了一个全新的层次。

## 代码实现

### 菜单程序

```js
const setCommand = function( button, command ){
    button.onclick = function(){
        command.execute();
    }
};
var MenuBar = {
    refresh: function(){
        console.log( '刷新菜单目录' );
    }
};

var SubMenu = {
    add: function(){
        console.log( '增加子菜单' );
    },
    remove: function(){
        console.log( '删除子菜单' );
    }
};

class RefreshMenuBarCommand {
  constructor(receiver){
    this.receiver = receiver;
  }
  execute (){
    this.receiver.refresh();
};
class AddSubMenuCommand {
  constructor(receiver){
    this.receiver = receiver;
  }
  execute (){
    this.receiver.add();
};
class DelSubMenuCommand {
  constructor(receiver){
    this.receiver = receiver;
  }
  execute (){
    this.receiver.remove();
};

const refreshMenuBarCommand = new RefreshMenuBarCommand( MenuBar );
const addSubMenuCommand = new AddSubMenuCommand( SubMenu );
const delSubMenuCommand = new DelSubMenuCommand( SubMenu );

setCommand( button1, refreshMenuBarCommand );
setCommand( button2, addSubMenuCommand );
setCommand( button3, delSubMenuCommand );
```

### 撤销和重做

```js
class MoveCommand {
  constructor(receiver, pos) {
    this.receiver = receiver
    this.pos = pos
    this.oldPos = null
  }
  execute() {
    this.receiver.start("left", this.pos, 1000, "strongEaseOut")
    this.oldPos =
      this.receiver.dom.getBoundingClientRect()[this.receiver.propertyName]
    // 记录小球开始移动前的位置
  }
  undo() {
    const newPos = this.oldPos
    this.oldPos = this.pos
    this.receiver.start("left", newPos, 1000, "strongEaseOut")
    // 回到小球移动前记录的位置
  }
  redo() {
    this.receiver.start("left", this.oldPos, 1000, "strongEaseOut")
    // 回到小球移动前记录的位置
  }
}
let moveCommand

moveBtn.onclick = function () {
  var animate = new Animate(ball)
  moveCommand = new MoveCommand(animate, pos.value)
  moveCommand.execute()
}

undoBtn.onclick = function () {
  moveCommand.undo() // 撤销命令
}

redoBtn..onclick = function () {
  moveCommand.redo() // 撤销命令
}
```

命令队列，当前一个命令仍在执行时，后面新增的命令可以以队列的形式存储在实例中。在延时命令执行完成后，可以以发布订阅模式的方式通知队列执行下一个命令。

### 宏命令

```js
var closeDoorCommand = {
  execute: function () {
    console.log("关门")
  },
}

var openPcCommand = {
  execute: function () {
    console.log("开电脑")
  },
}

var openQQCommand = {
  execute: function () {
    console.log("登录QQ")
  },
}
var MacroCommand = function () {
  return {
    commandsList: [],
    add: function (command) {
      this.commandsList.push(command)
    },
    execute: function () {
      for (var i = 0, command; (command = this.commandsList[i++]); ) {
        command.execute()
      }
    },
  }
}

var macroCommand = MacroCommand()
macroCommand.add(closeDoorCommand)
macroCommand.add(openPcCommand)
macroCommand.add(openQQCommand)

macroCommand.execute()
```
