---
title: "Induction: Rust (WIP)"
date: "2021-08-17"
tags: ["Induction", "Rust"]
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
let mut a: i32 = -1;
a = 1;

let b = "hello";
let b = "world"; // ok
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

console.log(user1.email)

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

### 枚举

```ts
enum IpAddrKind {
  v4,
  v6,
}

const IP1 = IpAddrKind.v4
```

```rust
enum IpAddrKind {
  V4,
  V6,
}
let four = IpAddrKind::V4;

//
enum IpAddr {
  V4(u8, u8, u8, u8),
  V6(String),
}
let four = IpAddr::V4(String::from(127, 0, 0, 1));
let six = IpAddr::V6(String::from("::1"));
```

### 模块

```ts
//  导入 Result
import { Result } from "./utils/result"
import { Result as IoResult } from "./result2"

// 导入 模块
import * as fmt from "fmt"
```

```rust
// 绝对路径下的Result
mod crate::result;
// 相对路径下的Result
mod result2;

// 导入模块
use std::fmt;
```

### 数组

```ts
const nums1 = [1, 2, 3]
```

```rust
let mut nums = Vec::new();
nums.push(5);

let nums1 = vec![1, 2, 3];
let third: &i32 = &v[2];
for i in &mut v {
    *i += 50;
}

// 类型不同
enum SpreadsheetCell {
    Int(i32),
    Float(f64),
    Text(String),
}

let row = vec![
    SpreadsheetCell::Int(3),
    SpreadsheetCell::Text(String::from("blue")),
    SpreadsheetCell::Float(10.12),
];
```

### 字符串集合

```rust
let mut s = String::from("foo");
s.push_str("bar");

let s1 = String::from("Hello, ");
let s2 = String::from("world!");
let s3 = s1 + &s2; // s1 被移动了，不能继续使用

let s1 = String::from("tic");
let s2 = String::from("tac");
let s3 = String::from("toe");
let s = format!("{}-{}-{}", s1, s2, s3);


for c in "नमस्ते".chars() {
    println!("{}", c);
}

```

### Hash Map

```rust
// 构建
use std::collections::HashMap;

let mut scores = HashMap::new();
scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);
// or
let teams  = vec![String::from("Blue"), String::from("Yellow")];
let initial_scores = vec![10, 50];
let scores: HashMap<_, _> = teams.iter().zip(initial_scores.iter()).collect();

// 访问
let team_name = String::from("Blue");
let score = scores.get(&team_name);

// 遍历
for (key, value) in &scores {
    println!("{}: {}", key, value);
}

// 更新
scores.insert(String::from("Blue"), 25);
scores.entry(String::from("Blue")).or_insert(50); // 没有 Blue 值时更新为50
```

### 错误处理

类似 try..catch

```rust
use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let f = File::open("hello.txt");

    let f = match f {
        Ok(file) => file,
        Err(error) => match error.kind() {
            ErrorKind::NotFound => match File::create("hello.txt") {
                Ok(fc) => fc,
                Err(e) => panic!("Problem creating the file: {:?}", e),
            },
            other_error => panic!("Problem opening the file: {:?}", other_error),
        },
    };

    // or
    let f = File::open("hello.txt").unwrap(); // return OK value
    let f = File::open("hello.txt").expect("Failed to open hello.txt"); // return Err value
}
```

### 泛型

```rust

```

## Rust 特有

### 借用与所有权(ownership)

1. Rust 中的每一个值都有一个被称为其 所有者（owner）的变量。
2. 值在任一时刻有且只有一个所有者。
3. 当所有者（变量）离开作用域，这个值将被丢弃。

### 闭包
