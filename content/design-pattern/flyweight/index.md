---
title: "Design Pattern: Flyweight"
date: "2021-09-08"
tags: ["Design Pattern"]
description: "9. 享元模式"
---

## 定义

享元（flyweight）模式是一种用于性能优化的模式，“fly”在这里是苍蝇的意思，意为蝇量级。享元模式的核心是运用共享技术来有效支持大量细粒度的对象。

享元模式要求将对象的属性划分为内部状态与外部状态（状态在这里通常指属性）。享元模式的目标是尽量减少共享对象的数量，关于如何划分内部状态和外部状态，下面的几条经验提供了一些指引。

- 内部状态存储于对象内部。
- 内部状态可以被一些对象共享。
- 内部状态独立于具体的场景，通常不会改变。
-  外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享。

## 现实案例

1. 假设有个内衣工厂，目前的产品有 50 种男式内衣和 50 种女士内衣，为了推销产品，工厂决定生产一些塑料模特来穿上他们的内衣拍成广告照片。 正常情况下需要 50 个男模特和 50 个女模特，然后让他们每人分别穿上一件内衣来拍照。现在一共有 50 种男内衣和 50 种女内衣，所以一共会产生 100 个对象。如果将来生产了 10000 种内衣，那这个程序可能会因为存在如此多的对象已经提前崩溃。
2. 一款简单的游戏： 玩家们在地图上移动并相互射击。 你决定实现一个真实的粒子系统， 并将其作为游戏的特色。 大量的子弹、 导弹和爆炸弹片会在整个地图上穿行， 为玩家提供紧张刺激的游戏体验。开发完成后，发现游戏总是会在电脑上运行几分钟后崩溃。 在研究了几个小时的调试消息记录后， 你发现导致游戏崩溃的原因是内存容量不足。真正的问题与粒子系统有关。 每个粒子 （一颗子弹、 一枚导弹或一块弹片） 都由包含完整数据的独立对象来表示。 当玩家在游戏中鏖战进入高潮后的某一时刻， 游戏将无法在剩余内存中载入新建粒子， 于是程序就崩溃了。

享元模式带来的好处很大程度上取决于如何使用以及何时使用，一般来说，以下情况发生时便可以使用享元模式。

- 一个程序中使用了大量的相似对象。
- 由于使用了大量对象，造成很大的内存开销。
- 对象的大多数状态都可以变为外部状态。
- 剥离出对象的外部状态之后，可以用相对较少的共享对象取代大量对象。

## 解决方案

1. 将需要改写为享元的类成员变量拆分为两个部分：

   - 内在状态： 包含不变的、 可在许多对象中重复使用的数据的成员变量。
   - 外在状态： 包含每个对象各自不同的情景数据的成员变量

2. 保留类中表示内在状态的成员变量， 并将其属性设置为不可修改。 这些变量仅可在构造函数中获得初始数值。
3. 找到所有使用外在状态成员变量的方法， 为在方法中所用的每个成员变量新建一个参数， 并使用该参数代替成员变量。
4. 你可以有选择地创建工厂类来管理享元缓存池， 它负责在新建享元时检查已有的享元。 如果选择使用工厂， 客户端就只能通过工厂来请求享元， 它们需要将享元的内在状态作为参数传递给工厂。
5. 客户端必须存储和计算外在状态 （情景） 的数值， 因为只有这样才能调用享元对象的方法。 为了使用方便， 外在状态和引用享元的成员变量可以移动到单独的情景类中。

## 优缺点

优点

- 如果程序中有很多相似对象， 那么你将可以节省大量内存。

缺点

你可能需要牺牲执行速度来换取内存， 因为他人每次调用享元方法时都需要重新计算部分情景数据。
代码会变得更加复杂。 团队中的新成员总是会问： ​ “为什么要像这样拆分一个实体的状态？”。

## 代码实现

### 内衣工厂模型拍照

```js
// before
var Model = function (sex, underwear) {
  this.sex = sex
  this.underwear = underwear
}
Model.prototype.takePhoto = function () {
  console.log("sex= " + this.sex + " underwear=" + this.underwear)
}
for (var i = 1; i <= 50; i++) {
  var maleModel = new Model("male", "underwear" + i)
  maleModel.takePhoto()
}
for (var j = 1; j <= 50; j++) {
  var femaleModel = new Model("female", "underwear" + j)
  femaleModel.takePhoto()
}
// after
var Model = function (sex) {
  this.sex = sex
}
Model.prototype.takePhoto = function () {
  console.log("sex= " + this.sex + " underwear=" + this.underwear)
}
var maleModel = new Model("male"),
  femaleModel = new Model("female")
for (var i = 1; i <= 50; i++) {
  maleModel.underwear = "underwear" + i
  maleModel.takePhoto()
}
for (var j = 1; j <= 50; j++) {
  femaleModel.underwear = "underwear" + j
  femaleModel.takePhoto()
}
```

### 通用结构

```js
// before
var id = 0
window.startUpload = function (uploadType, files) {
  // uploadType区分是控件还是flash
  for (var i = 0, file; (file = files[i++]); ) {
    var uploadObj = new Upload(uploadType, file.fileName, file.fileSize)
    uploadObj.init(id++) // 给upload对象设置一个唯一的id
  }
}
var Upload = function (uploadType, fileName, fileSize) {
  this.uploadType = uploadType
  this.fileName = fileName
  this.fileSize = fileSize
  this.dom = null
}

Upload.prototype.init = function (id) {
  var that = this
  this.id = id
  this.dom = document.createElement("div")
  this.dom.innerHTML =
    "<span>文件名称:" +
    this.fileName +
    ", 文件大小: " +
    this.fileSize +
    "</span>" +
    '<button class="delFile">删除</button>'

  this.dom.querySelector(".delFile").onclick = function () {
    that.delFile()
  }
  document.body.appendChild(this.dom)
}
Upload.prototype.delFile = function () {
  if (this.fileSize < 3000) {
    return this.dom.parentNode.removeChild(this.dom)
  }

  if (window.confirm("确定要删除该文件吗? " + this.fileName)) {
    return this.dom.parentNode.removeChild(this.dom)
  }
}

// after
var id = 0
window.startUpload = function (uploadType, files) {
  for (var i = 0, file; (file = files[i++]); ) {
    var uploadObj = uploadManager.add(
      ++id,
      uploadType,
      file.fileName,
      file.fileSize
    )
  }
}

var uploadManager = (function () {
  var uploadDatabase = {}

  return {
    add: function (id, uploadType, fileName, fileSize) {
      var flyWeightObj = UploadFactory.create(uploadType)

      var dom = document.createElement("div")
      dom.innerHTML =
        "<span>文件名称:" +
        fileName +
        ", 文件大小: " +
        fileSize +
        "</span>" +
        '<button class="delFile">删除</button>'

      dom.querySelector(".delFile").onclick = function () {
        flyWeightObj.delFile(id)
      }

      document.body.appendChild(dom)

      uploadDatabase[id] = {
        fileName: fileName,
        fileSize: fileSize,
        dom: dom,
      }

      return flyWeightObj
    },
    setExternalState: function (id, flyWeightObj) {
      var uploadData = uploadDatabase[id]
      for (var i in uploadData) {
        flyWeightObj[i] = uploadData[i]
      }
    },
  }
})()
var UploadFactory = (function () {
  var createdFlyWeightObjs = {}

  return {
    create: function (uploadType) {
      if (createdFlyWeightObjs[uploadType]) {
        return createdFlyWeightObjs[uploadType]
      }

      return (createdFlyWeightObjs[uploadType] = new Upload(uploadType))
    },
  }
})()

var Upload = function (uploadType) {
  this.uploadType = uploadType
}
Upload.prototype.delFile = function (id) {
  uploadManager.setExternalState(id, this) // (1)

  if (this.fileSize < 3000) {
    return this.dom.parentNode.removeChild(this.dom)
  }

  if (window.confirm("确定要删除该文件吗? " + this.fileName)) {
    return this.dom.parentNode.removeChild(this.dom)
  }
}
```

### 对象池

> React 中的复用 fiber？
