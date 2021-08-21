---
title: "Intro: Rust"
date: "2021-08-17"
tags: ["Intro", "Rust"]
description: "从前端开发者的视角进入 Rust 的世界"
---

## 学习资料

- [Rust 程序设计语言 简体中文版](https://kaisery.github.io/trpl-zh-cn/title-page.html)
- [通过例子学 Rust 中文版](https://rustwiki.org/zh-CN/rust-by-example/index.html)

## 对比

### 声明变量

```ts
// TypeScript
const MAX: number = 10000
let a: number = 0
a = 1

let b = "hello"
let b = "world" // error
```

```rust
// Rust
const MAX: u32 = 10000;
let mut a: i32 = 0;
a = 1;

let b = "hello";
let b = "world"; // it's ok
```

### 条件语句与循环

```ts

```

### 类型

> https://doc.rust-lang.org/reference/types.html

| 类型/语言 | Rust                                                                | TypeScript                                               |
| --------- | ------------------------------------------------------------------- | -------------------------------------------------------- |
| 整型      | i8, i16, i32, i64, i128, isize <br/> u8, u16, u32, u64, u128, usize | number, bigInt                                           |
| 浮点型    | f8, f16, f32, f64, f128                                             | number                                                   |
| 布尔值    | bool                                                                | boolean                                                  |
| 字符串    | str                                                                 | string                                                   |
| 元组类型  | (i32, f64, u8)                                                      | -                                                        |
| 数组类型  | [i32; 5]                                                            | number[]                                                 |
| 函数      | fn say_name(name: &str, count: i8) -> &str {}                       | function sayName(name: string, count: number): string {} |
| never     | !                                                                   | never                                                    |

### 所有权

### struct(class/interface)

声明类似 TypeScript 中的 `interface`，使用类似 JavaScript 中的 `Object`

```ts
// TypeScript
interface User {
  username: string
  email: string
  sign_in_count: number
  active: boolean
  say_name: () => string
}

const user1: User = {
  email: "someone@example.com",
  username: "someusername123",
  active: true,
  sign_in_count: 1,
}

console.log(user.email)

const user2: User = {
  ...user1,
  email: "another@example.com",
  username: "anotherusername567",
}

user1.say_name = () => {
  return this.username
}
```

```rust
// Rust
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}

let user1 = User {
    email: String::from("someone@example.com"),
    username: String::from("someusername123"),
    active: true,
    sign_in_count: 1,
};

println!("{}", user.email);

let user2 = User {
    email: String::from("another@example.com"),
    username: String::from("anotherusername567"),
    ..user1
};

impl User {
    fn say_name(&self) -> &str {
        self.username
    }
}

println!("{:?}",user1.say_name());

```

### 控制台打印信息

```ts
let rect1 = new Rectangle({ width: 30, height: 50 })
console.log(rect1)
```

```rust
#[derive(Debug)]
let rect1 = Rectangle { width: 30, height: 50 };
println!("rect1 is {:?}", rect1);
```
