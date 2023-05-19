---
title: 'TypeScript 类型编程基础'
date: '2023-05-11'
tags: ['Induction', 'TypeScript']
description: 'TypeScript 类型不仅可以声明类型，也能描述任何可计算逻辑，比如循环、条件判断、计算等语言能力。对此，称之为类型编程。'
---

## 概念基础

这些概念都是对于类型安全的设定

- 协变（Covariant）：只在同一个方向；

  比如 Dog 是 Animal 的子类型，子类型可以赋值给父类型的情况称为协变。

  ```ts
  type Animal = { age: number }
  type Dog = { name: string; age: number }

  const d: Dog = { age: 1, name: 'didi' }
  const a: Animal = { age: 2 }
  const c: Dog = a // error! 父类型不可以给子类型赋值
  const e: Animal = d // ok! 子类型的值可以赋值给父类型
  ```

- 逆变（Contravariant）：只在相反的方向；

  与协变相反，例如函数参数具有逆变性质，父类型可以赋值给子类型的情况称为逆变。

  ```ts
  type PA = (p: Animal) => void
  type PD = (p: Dog) => void
  let pa: PA = (p: Dog) => {} // error! 子类型方法不可以赋值给父类型方法
  let pd: PD = (p: Animal) => {} // ok! 参数为父类型时，父类型方法可以赋值给子类型方法
  ```

- 双向协变（Bivariant）：包括同一个方向和不同方向；

  函数类型是双向协变，可以通过设置编译选项--strictFunctionTypes true 来保持函数的逆变性而关闭协变性。

- 不变（Invariant）：如果类型不完全相同，则它们是不兼容的。

  类型无父子关系时，类型不同不能互相赋值。

## 语句

### 条件判断: `A extends B ? True : False`

通过[条件判断](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)实现类似三元符的逻辑。

extends 在语言中是继承的意思，在类型使用中，A extends B 判断 A 是 B 的子类型时执行 true 逻辑，可以通过和三元符号组合实现类型判断的功能。

```ts
interface Animal {
  live(): void
}
interface Dog extends Animal {
  woof(): void
}

type Example1 = Dog extends Animal ? number : string
//   ^? type Example1 = number

type Example2 = RegExp extends Animal ? number : string
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

### 类型推断: `A extends infer B ? B : never`

结合 extends 和 infer 作为类型推断，可以实现类似 if 判断的逻辑

```ts
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type
type A = Flatten<number[]>
//   ^? type A = number
type B = Flatten<number>
//   ^? type B = number
```

用语言描述一下上面一段代码：Flatten 接受的 Type 是 Item 类型的数组吗？如果是， Flatten 就返回 Item 否则 返回 Type。

infer 是一个推断，我们不需要已知 infer 后面的具体类型，而是当作假设已知是 infer 后面的类型如何处理。

使用 infer 推导数组类型时，例如

```ts
// 类型推断 Last 时，不确定需要的是 '3' 还是 string 类型
type TheLast<Arr extends string[]> = Arr extends [...infer Rest, infer Last] ? `${Last}` : never // error!
type Num = TheLast<'1', '2', '3'>
```

所以在这种场景下需要增加类型收敛的处理

```ts
type TheLast<Arr extends string[]> = Arr extends [...infer Rest, infer Last]
  ? `${Last & string}`
  : never // success!

type TheLast<Arr extends string[]> = Arr extends [...infer Rest, infer Last]
  ? infer Last extends string
  : never // success! recommend!
```

### 截取字符串: `T extends Hello ${infer S} ? S : never`

结合类型推断与 \`\` 符号，可以截取字符串类型中符合规则的部分。

```ts
type GetHelloTo<T extends string> = T extends `Hello ${infer S}` ? S : never

type Target = GetHelloTo<'Hello World!'>
//     ^? type Target = 'World!'
```

有的时候我们需要截取符合某些规则的字符，可以忽略其他不相关的字符时：

```ts
type GetSecondStr<T extends string> = T extends `${string}_${infer Second}_${string}`
  ? Second
  : never

type Target = GetSecondStr<'Hello World_ME_!'>
//     ^? type Target = 'ME'
```

### 循环/递归：`type Recursive<T, U> = T extends U ? T : Recursive<T, U>`

### 数字及操作数字: `T['length']`

当需要计算数字时，只能通过向数组中添加或减少数组元素，并通过 T[\'length\'] 的方式获取数字类型

```ts
type PlusOne<T extends number, O extends any[] = []> = O['length'] extends T
  ? [...O, unknown]['length']
  : PlusOne<T, [...O, unknown]>

type Result = PlusOne<5>
//    ^? type Result = 6
```

## 常用关键字

### 获取类型的键并以 | 连接返回: keyof

[keyof](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html) 类似 Object.keys 将对象的 key 提取出来并以 `|` 连接

```ts
type Point = { x: number; y: string }
type P = keyof Point

type Arrayish = { [n: number]: unknown }
type A = keyof Arrayish
//   ^? type A = number

type Mapish = { [k: string]: boolean }
type M = keyof Mapish
//   ^? type A = string | number
```

并且 TypeScript 可以通过下标获取类型值

```ts
type X = Point['x']
//   ^? type V = number

type V = Point[P]
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
}

interface Person {
  name: string
  age: number
  location: string
}

type LazyPerson = Getters<Person>
//    ^? type LazyPerson = {
//         getName: () => string;
//         getAge: () => number;
//         getLocation: () => string;
//       }
```

### new

构造器和函数的区别是，构造器是用于创建对象的，所以可以被 new。通过 new 判断是否是构造函数。

```ts
type GetInstanceType<ConstructorType> = ConstructorType extends new (
  ...args: any
) => infer InstanceType
  ? InstanceType
  : any
```

### readonly

通过 readonly 将 interface 的键标记为只读。通过 -readonly 将 interface 的键标记为可变。

通过 ? 将 interface 的键标记为可选。通过 -? 将 interface 的键标记为必填。

```ts
type ToReadonly<T> = {
  readonly [K in keyof T]: T[K]
}
type ToMutable<T> = {
  -readonly [K in keyof T]: T[K]
}
type ToPartial<T> = {
  [K in keyof T]?: T[K]
}
type ToRequired<T> = {
  [K in keyof T]-?: T[K]
}
```

### as const

使 TS 的类型推导变为字面量常量

```ts
type C = [1, 2] as const
//   ^? = [1, 2]
type N = [1, 2]
//   ^? = number[]
```

## 组合技术

### 递归

利用声明的类型自身可以实现递归的能力。

例如 `TrimLeft` 每次取出第一个判断类型是否是空字符，如果是则继续对剩余的字符调用 `TrimLeft` 。

```ts
type TrimLeft<S extends string> = S extends `${infer First}${infer Rest}`
  ? First extends ' ' | '\n' | '\t'
    ? TrimLeft<Rest>
    : S
  : S
```

### 分布式条件类型

当类型参数为联合类型，并且在条件类型左边直接引用该类型参数的时候，TypeScript 会把每一个元素单独传入来做类型运算，最后再合并成联合类型，这种语法叫做分布式条件类型。

```ts
type Union = 'a' | 'b' | 'c'
type str = `x${Union}`
//    ^? = 'xa' | 'xb' | 'xc'
```

## 其他

### 判断 any

any 类型与任何类型的交叉都是 any，也就是 1 & any 结果是 any。

```ts
export type IsAny<T> = 0 extends 1 & T ? true : false
```

### 判断 never

```ts
type IsNever<T> = [T] extends [never] ? true : false
```

### 判断 tuple

tuple 的 length 是数字字面量，而数组的 length 是 number

```ts
type t = [1, 2, 3]['length']
//   ^? = 3
type a = number[]['length']
//   ^? = number

type IsTuple<T> = T extends readonly any[] ? (number extends T['length'] ? false : true) : false
```
