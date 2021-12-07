---
title: "React 中的位运算"
date: "2021-12-07"
tags: ["Introduction", "React"]
description: "位运算在 React 中的实践"
---

## 位运算在 React 中的使用

在整个 React 源码中，都穿插了位运算的痕迹，以及 `ReactFiberLane.js` 文件中

## API 解读

### [按位与 &](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_AND)

> `&=`

对于两个二进制操作数的每个 bit，如果都为 1，则结果为 1，否则为 0。

```js
let currentStatus = 0b1011
let Processing = 0b0001

if ((currentStatus & Processing) /** 0b0001 */ === 0) {
  // processing
}
```

可以用来判断是否当前是否具备某种类型

### [按位或 |](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_OR)

> `|=`

对于两个二进制操作数的每个 bit，如果任一一个是 1，则结果为 1，如果都为 0，则结果为 0。

```js
let currentStatus = 0b0000
let Processing = 0b0001

currentStatus = currentStatus | Processing // 0b0001
```

可以用来将类型附加到变量

### [按位非 ~](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_NOT)

对一个二进制操作数的每个 bit，逐位进行取反操作（0、1 互换）。按位非运算时，任何数字 x 的运算结果都是-(x + 1)。例如，〜-5 运算结果为 4。

```js
let currentStatus = 0b1011
let Processing = 0b0001

currentStatus = currentStatus & ~Processing // 0b1010
```

可以与 `&` 结合用于剔除某个类型

## 应用

### 获取最高的优先级

```ts
export function getHighestPriorityLane(lanes: Lanes): Lane {
  return lanes & -lanes
}
```

对于 `-` 符号，由于 Int32 采用补码表示，所以`-lanes`可以看作： 按位非后加 1 ((~lanes)+1)。

### 是否包含优先级

```ts
export function includesSomeLane(a: Lanes | Lane, b: Lanes | Lane) {
  return (a & b) !== NoLanes
}

export function isSubsetOfLanes(set: Lanes, subset: Lanes | Lane) {
  return (set & subset) === subset
}

export function intersectLanes(a: Lanes | Lane, b: Lanes | Lane): Lanes {
  return a & b
}
```

### 合并/剥离优先级

```ts
export function mergeLanes(a: Lanes | Lane, b: Lanes | Lane): Lanes {
  return a | b
}

export function removeLanes(set: Lanes, subset: Lanes | Lane): Lanes {
  return set & ~subset
}
```

### 获取两者中更高的优先级

```ts
export function higherPriorityLane(a: Lane, b: Lane) {
  // This works because the bit ranges decrease in priority as you go left.
  return a !== NoLane && a < b ? a : b
}
```

## 其他位操作符

### [左移<<](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Left_shift)

左移操作符 (<<) 将第一个操作数向左移动指定位数，左边超出的位数将会被清除，右边将会补零。

```ts
const a = 5 // 00000000000000000000000000000101
const b = 2 // 00000000000000000000000000000010

console.log(a << b) // 00000000000000000000000000010100
// expected output: 20
```
