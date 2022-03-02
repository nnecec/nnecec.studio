---
title: "TypeScript 类型编程基础"
date: "2022-02-18"
tags: ["Induction", "TypeScript"]
description: "TypeScript 类型不仅可以声明类型，也能描述任何可计算逻辑，比如循环、条件判断、计算等语言能力。对此，称之为类型编程。"
---

## 语句

### 条件判断: A extends B ? True : False

在 TypeScript 中可以通过[条件判断](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)区分类型进入哪个类型定义中，条件判断依赖 `extends` 关键字。

extends 在语言中是继承的意思，在类型使用中，extends既可以实现继承功能，也可以通过和三元符号组合实现类型判断的功能。

```ts
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}

type Example1 = Dog extends Animal ? number : string;
//   ^? type Example1 = number

type Example2 = RegExp extends Animal ? number : string;
//   ^? type Example2 = string
```

那么有哪些是 extends 判断结果为 true 呢？下列几种情况都是符合 extends 判断为 true 的：

```ts
'a' extends string
'a' extends 'a'
'a' extends 'a'|'b'
'HelloWorld' extends `Hello${string}`

2 extends number
2 extends 2
2 extends 2|3
```

可以看出来，extends 符合类型收敛的情况时判断为 true，对于类型兼容性的问题可以参考[该页面介绍](https://jkchao.github.io/typescript-book-chinese/typings/typeCompatibility.html#%E5%8F%98%E4%BD%93)。

### 类型推断: A extends infer B ? B : never

在涉及范型比较多的[题目](https://github.com/type-challenges/type-challenges)时，往往需要结合 extends 和 infer 作为类型推断的方式完成。

```ts
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type
type A = Flatten<number[]>
//   ^? type A = number
type B = Flatten<number>
//   ^? type B = number
```

用语言描述一下上面一段代码：Flatten 接受的 Type 是 Item 类型的数组吗？如果是， Flatten 就返回 Item 否则 返回 Type。

infer 是一个推断，我们不需要已知 infer 后面的具体类型，而是当作假设已知是 infer 后面的类型如何处理。

## 其他关键字

### 获取类型的键: keyof

[keyof](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html) 类似 Object.keys 将对象的 key 提取出来并以 `|` 连接

```ts
type Point = { x: number; y: string };
type P = keyof Point;

type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;
//   ^? type A = number

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;
//   ^? type A = string | number
```

并且 TypeScript 可以通过下标获取类型值

```ts
type X = Point["x"];
//   ^? type V = number

type V = Point[P];
//   ^? type V = number | string
```


### in

in 作用于通过 `|` 连接的类型，限制了类型所属的范围，往往和 keyof 一起使用。

```ts
type Pick<T, U extends keyof T> = { [K in U]: T[K] }
type Readonly<T> = { readonly [K in keyof T]: T[K] }
```

### as

```ts
type Getters<Type> = {
    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
};
 
interface Person {
    name: string;
    age: number;
    location: string;
}
 
type LazyPerson = Getters<Person>;
//    ^? type LazyPerson = {
//         getName: () => string;
//         getAge: () => number;
//         getLocation: () => string;
//       }
```
