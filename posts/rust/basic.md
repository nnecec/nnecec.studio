---
title: 'Induction: Rust'
date: '2023-04-10'
tags: ['Induction', 'Rust']
description: '进入 Rust 的世界'
---

## 01 入门

- 使用 `curl https://sh.rustup.rs -sSf | sh` 命令安装 rust 工具集。
- 通过 `rustup update` 更新工具集。
- 通过 `rustc --version` 检查当前命令行版本。
- 安装工具集后，可以通过`rustup doc` 查看文档离线版。
- 使用 `cargo new` 创建一个 Rust 项目，在项目路径下可以执行 `cargo build` 编译，执行 `cargo run` 运行，执行 `cargo check` 检查是否有编译错误。
- 借助 Cargo 的包管理能力，可以向项目添加依赖，并在项目中引用。
  - 通过 `cargo doc --open` 可以查看依赖的文档。
- crate 和 package 都被称为“包”。crate 是 Rust 的最小编译单元，package 可能包含多个 crate，单个 crate 也是一个 package。

## 02 通用编程概念

### 变量

- 通过 `let` 声明的 Rust 的变量默认是不可变的，不能对不可变变量进行二次赋值。
- 通过为变量添加 `mut` 关键字可以使其可变。
- 通过 `const` 声明常量，通常约定使用下划线分隔的全大写字母来命名一个常量。
- Rust 中可以通过再次声明同名变量的方式，隐藏（shadow）之前已经声明的变量，以最后一次声明的变量为变量的值。
- 使用`_`开头的变量名，使 rust 忽略未使用变量的警告

```rust
fn main(){
    let x = 5;
    let x = x + 1;//6

    let mut x = 7;
    x = 8; // 8

    const M = 6;
}
```

### 数据类型

- 标量类型 scalar
  - 整数：u 代表无符号，i 代表有符号，usize 取决于运行的平台架构。Rust 对于整数字面量默认推导类型是 i32 ，它是运算最快的整数类型。
  - 浮点数：f32 f64
  - 布尔值：true, false
  - 字符(char 类型): 描述单个字符，使用单引号声明。
- 复合类型 compound
  - 元组：
    - 元素类型可以不同，长度固定，使用圆括号声明
    - 可以通过模式匹配解构元组 `let (x, y, z) = (500, 6, 3.5);`
    - 可以通过索引访问元组 `x.0`
  - 数组
    - 元素类型必须相同，长度固定，使用方括号声明
    - 如果想要声明相同元素的数组，可以 `let a = [3; 5]` 这样写。
    - 通过索引访问数组 `a[0]`
    - 访问数组超出索引范围时，会发生 panic

### 函数

- Rust 使用蛇形命名法规范函数和变量的命名，使用小写字母+下划线分隔单词
- 在函数签名中，必须显式声明参数类型
- Rust 中的语句（statement）指的是执行操作但不返回值的指令，表达式（expression）指的是会计算并产生一个值作为结果的指令。
- 有返回值的函数需要通过 `-> type` 声明类型。
- 表达式不加分号结尾会被当作返回值

### 注释

- 通过 `//` 添加代码注释

### 控制流

- if

  - if 的条件必须是 bool 类型

    ```rust
    fn main() {
        let number = if x > 5 {
            1
        } else {
            2
        }
    }
    ```

  - 如果使用条件赋值，if 必须返回同一种类型的值。

- loop
  - 使用 break 跳出 loop 循环
- while
- for

## 03 所有权

- 值被储存在栈和堆上会极大的影响语言的行为，存到栈上的数据必须已知且固定大小，编译期无法确定大小的数据会存到堆上。
- 每一个值都有一个对应的变量作为它的所有者
- 同一时间内，值有且仅有一个所有者
- 当所有者离开自己的作用域时，持有的值会被释放。Rust 在变量离开作用域时，调用 `drop` 函数释放内存。
- Rust 中对于堆内存值的复制都是复制浅拷贝，同时使上一份拷贝失效。使用术语：移动（move）更适合描述这种行为。
- 当真的需要复制的时候，调用`s1.clone()` 方法可以深拷贝
- 复制默认 copy 的类型有：整数、bool、char、浮点数、仅包含以上类型的元组

### 引用与借用

- 在类型前使用 `&` 将变量标记为引用，允许在不获取所有权的情况下使用该值。
- 通过引用传递参数给函数的方法称为借用（borrowing），借用的值不允许修改。
- 通过`&mut String` 的类型声明，标记为可变引用。
- 对于同一变量，作用域只允许声明一个可变引用，不允许在存在不可变引用时创建可变引用。
- Rust 中不会存在悬垂引用的情况，即指针指向的内存地址，Rust 会保证引用被销毁后内存才会被释放。
- 切片（slice）：`let slice = &s[1..5]` 使 `slice` 保留了对 `s` 的不可变引用，

## 04 结构体 struct

```rust
struct User {
    email: String,
    username: String,
    active: bool,
    sign_in_count: u64,
}
let user1 = User {
    email: String::from("user2@example.com"),
    username: String::from("user2"),
    active: true,
    sign_in_count: 0,
}
let user2 = User {
    email: String::from("user2@example.com"),
    username: String::from("user2"),
    ..user1
}
```

- struct 的所有字段需要一致是可变的或不可变的。
- 支持字段初始化简写
- 支持 `..` 将未显式声明的字段展开复用
- 元组结构体无需声明字段。

### 方法

```rust
impl User {
    fn get_name(&self) {
        self.username
    }
}
```

- 定义在 struct 中，使用 `fn` 及方法名称声明，第一个参数永远是 `self`，通常一般定义为 `&self`。
- 在 struct 上下文中定义方法，需要将方法在 `impl` 中定义。
- 定义在 `impl` 中不需要定义 `self` 参数的函数称为关联函数，通过 `Rect::square()` 调用。
- 可以分布在多个同名 `impl` 中 定义

## 05 枚举与模式匹配

### 枚举

```rust
enum IpAddress {
    v4,
    v6
}

enum IpAddress {
    v4(String),
    v6(String),
    Color(i32, i32, i32)
}
```

- 通过 `enum` 声明枚举，枚举值可以直接声明，也可以附加其他类型的数据值。
- 枚举同样可以通过 `impl` 声明方法。
- Rust 中没有空值，但可以通过 `Option<T>` 的枚举值 `None` 实现类似空值的能力，同时 `Option<T>` 有值时的枚举类型是 `Some<T>`。

### match

```rust
fn value_in_cents(coin: Coin) -> u32 {
 match coin {
  Coin::Penny => {
   println!("Lucky penny!");
   1
        },
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
        _ => ()
    }
}
```

- `match` 会自上而下匹配模式
- 如果模式是一个枚举或 Option\<T\>，当匹配到这个模式时，同时会将值绑定
- `match` 必须处理所有的情况。当不需要罗列所有情况时，使用 `_` 作为通配符处理其他情况
- `if let` 用于简单控制流，类似于 `match` 只处理一种模式时的情况。

## 06 包、单元包及模块

- 包（package）：一个用于构建、测试并分享单元包的 Cargo 功能。
- 单元包（crate）：一个用于生成库或可执行文件的树形模块结构。
- 模块（module）及 use 关键字：它们被用于控制文件结构、作用域及路径的私有性。
- 路径（path）：一种用于命名条目的方法，这些条目包括结构体、函数和模块等。
- package 最多拥有一个库单元包，可以拥有任意个二进制单元包，至少包含一个单元包。将 src/main.rs 视作二进制单元包根节点且与包名称一致，将 src/lib.rs 视作库单元包根节点。
- 以 `mod` 定义了一个模块，模块中可以定义新的模块。
- Rust 中的函数、方法、struct、enum、mod、常量都是默认私有的。
- 通过 `pub` 可以标记为公有的。
- 通过绝对路径 `crate::count::one::one_to()` 从根节点或相对路径 `one::one_to()` 相对于当前文件访问模块，更倾向于使用绝对路径。
- 模块内子函数使用`super` 关键字如 `super::get_order()` 访问外层函数的方法。

  ```rust
  fn serve_order() {}
  mod back_of_house {
   fn fix_incorrect_order() {
    cook_order();
    super::serve_order();
   }

   fn cook_order() {}
  }
  ```

- 对于 模块、结构体 `pub` 标记的部分才会成为公有的，结构内部的字段或方法仍需要再次声明 `pub`。但枚举一旦声明公开，则所有枚举项都成为公开的。

```rust
use crate::front_of_house::hosting::add_to_waitlist;
use self::front_of_house::hosting;

use std::fmt::Result;
use std::io::Result as IoResult;

use std::{cmp::Ordering, io};
use std::io::{self, Write};
use std::io::*
```

- 路径过长会造成代码重复，使用 `use` 将路径导入作用域。指定相对路径时，需要使用 `self::` 开头
- 约定俗成的在 `use` 模块函数时引入函数的上一层，这样可以体现出是模块方法。引入 struct 或 enum 时，则直接 `use` 到目标。
- 使用 `as` 将引入的关键字进行重命名。
- 同样可以为 `use` 导入的关键字进行 `pub` 标记。
- 当需要 `use` 同一个包内的多个模块时，可以使用 `{}` 将同一大模块下的子模块合并。或使用 `*` 通配符导入所有子模块，但尽量谨慎使用。
- 可以将代码按照路径结构放到对应的文件中进行管理

## 07 集合类型

```rust
let v1: Vec<i32> = Vec::new();
let v2 = vec![1, 2, 3];

for i in &v {

}

for i in &mut v {
 *i += 50
}
```

- 通过 `Vec::new()` 创建新的 vector，或者通过宏 `vec!` 携带初始值声明，Rust 可以自动推导出类型。
- 对于可变 vector ，可以通过`.push()` 添加值
- 当发生所有权转移时销毁 vector 时也会销毁内部元素
- `v.get(2)` 会返回 `Option<&T>` 类型的值，另一种获取元素的方法 `&v[2]` 如果索引超出了边界则会直接触发 `panic`
- 无法在有对元素的引用时，修改 vec，违反了同一个作用域不能对同一份内存同时拥有可变引用和不可变引用。
- 可以通过 `for in` 遍历 vector。
- 可以通过 enum 使 vector 支持更多类型。

```rust
// 初始化方法
let mut s1 = String::new("initial contents");
let s2 = "initial contents".to_string();
// 添加字符
s1.push_str("bar")
// + 符号拼接
let s1 = String::from("Hello, ");
let s2 = String::from("world!");
let s3 = s1 + &s2; // 注意这里的s1已经被移动且再也不能被使用了
// 使用 format 拼接
let s = format!("{}-{}-{}", s1, s2, s3);
```

- `String::new()` 和 `"initial".to_string()` 两种初始化方式没有区别。
- 可以通过 `push_str` 添加字符串
- 可以通过 `+` 拼接字符串，或者通过 `format!()` 拼接，`format!` 不会获取所有权。
- 无法通过索引访问 String 类型的值
- 可以通过 `for c in "".chars() {}` 或 `for b in "".bytes()` 遍历字符串。

```rust
use std::collections::HashMap;

let mut scores = HashMap::new();
scores.insert(String::from("Blue"), 10);

// 通过 collect 初始化
let teams  = vec![String::from("Blue"), String::from("Yellow")];
let initial_scores = vec![10, 50];

let scores: HashMap<_, _> =
teams.iter().zip(initial_scores.iter()).collect();

// get
let team_name = String::from("Blue");
let score = scores.get(&team_name);

// 遍历
for (key, value) in &scores {

}
```

- 使用 `HashMap::new()` 创建 HashMap，或使用 `collect()` 初始化。
- HashMap 同样要求所有的键或所有的值拥有同一种类型。
- 对于有所有权的值来说，HashMap 会获取所有权。如果 insert 的是引用值，则需要保证引用有效。
- 可以使用`.get()` 方法，同样获取到了 `Option<&V>` 类型
- 可以使用 `for (key, value) in &h` 遍历。

```rust
use std::collections::HashMap;

let mut scores = HashMap::new();

scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Blue"), 25);

scores.entry(String::from("Blue")).or_insert(50);
let score = scores.entry(String::from("Blue")).or_insert(60);
*score += 1
```

- 通过 `insert` 同一个 key 覆盖值，通过 `.entry()` 返回 Entry 类型枚举检查是否已有值。

## 08 错误处理

- 不可恢复错误 `panic!` 会导致程序中断

```rust
let f = File::open("hello.txt");

let f = match f {
 Ok(file) => file,
 Err(error) => {
  panic!("There was a problem opening the file: {:?}", error)
 },
}
// 返回错误
match f.read_to_string(&mut s) {
 Ok(_) => Ok(s),
 Err(e) => Err(e),
}
```

- 使用 `match` 处理可恢复错误 `Result<T, E>`
- 使用 `unwrap` 在正确时返回值，错误时默认调用 `panic!` 。 `expect` 与 `unwrap` 功能类似，但可以带上一段错误提示信息。
- 使用 `Err(e)` 包装将错误返回给用户自由处理，使用 `?` 运算符可以简写。`?` 如果遇到错误会提前结束这个函数，并返回 Err 类型给调用者。如果正确则继续向下执行。`?` 只能用于处理返回 Result 的函数

## 09 泛型

```rust
// struct 范型
struct Point<T> { x: T, y: T, }
// enum 泛型
enum Result<T, E> { Ok(T), Err(E), }
// fn 泛型
impl<T> Point<T> { fn x(&self) -> &T { &self.x } }
```

- 可以在函数、struct、enum 使用泛型
- Rust 通过在编译时进行泛型代码的  **单态化**（_monomorphization_）来保证效率。单态化是一个通过填充编译时使用的具体类型，将通用代码转换为特定代码的过程，使得使用泛型类型参数的代码相比使用具体类型并没有任何速度上的损失。

### trait

```rust
pub trait Summary {
  fn summarize(&self) -> String;

  // 提供默认实现
  fn summarize_author(&self) -> String {
    format!("(Read more from {}...)", self.summarize())
  }
}

struct NewsArticle {}

// 通过 impl 在 struct 中实现 trait
impl Summary for NewsArticle {
  fn summarize(&self) -> String {
    format!("{}, by {} ({})", self.headline, self.author, self.location)
  }
}
// trait 作为参数
pub fn notify(item: impl Summary) {
    println!("Breaking news! {}", item.summarize());
}
// trait bound
pub fn notify<T: Summary>(item1: T, item2: T) {
    println!("Breaking news! {}", item.summarize());
}
// 多个 trait
fn some_function<T: Display + Clone, U: Clone + Debug>(t: T, u: U) -> i32 {
// 效果相同
fn some_function<T, U>(t: T, u: U) -> i32
  where T: Display + Clone, U: Clone + Debug
{

// 返回 trait 类型
fn returns_summarizable() -> impl Summary {

// 实现了 Display 和 PartialOrd 的 Pair 才有 cmp_display 方法
impl<T: Display + PartialOrd> Pair<T> {
   fn cmp_display(&self) {}
}
```

- trait 类似 TypeScript 的 interfact
- 作为参数的 `impl Trait` 是 trait bound 的语法糖

### 生命周期

- Rust 中每一个引用都有其生命周期。
- 借用检查器保证借用是有效的。
- 泛型生命周期参数可以定义引用间的关系以便借用检查器可以进行分析。

```rust
&i32        // 引用
&'a i32     // 带有显式生命周期的引用
&'a mut i32 // 带有显式生命周期的可变引用

// 通过生命周期标注 拥有相同的生命周期
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
// struct 生命周期标注
struct ImportantExcerpt<'a> {
  part: &'a str,
}

// 方法定义中的 生命周期标注
impl<'a> ImportantExcerpt<'a> {
    fn level(&self) -> i32 {
        3
    }
}
```

- 生命周期标注并不改变任何引用的生命周期的长短，生命周期标注描述了多个引用生命周期相互的关系。通过生命周期标注可以让 Rust 知道哪些变量属于同一生命周期。
- 被编码进 Rust 引用分析的模式被称为  **生命周期省略规则**（_lifetime elision rules_），如果 Rust 在明确遵守这些规则的前提下变量的生命周期仍然是模棱两可的话，它不会猜测剩余引用的生命周期应该是什么。
- 函数或方法的参数的生命周期被称为  **输入生命周期**（_input lifetimes_），而返回值的生命周期被称为  **输出生命周期**（_output lifetimes_）。
  - 编译器采用三条规则来判断引用何时不需要明确的标注
  1.  每一个是引用的参数都有它自己的生命周期参数
  2.  如果只有一个输入生命周期参数，那么它被赋予所有输出生命周期参数：`fn foo<'a>(x: &'a i32) -> &'a i32`。
  3.  如果方法有多个输入生命周期参数并且其中一个参数是  `&self`  或  `&mut self`，说明是个对象的方法(method)，那么所有输出生命周期参数被赋予  `self`  的生命周期。
- 静态生命周期 `'static` ，其生命周期能存活于整个程序期间。

## 测试

```rust
fn main() {}
  #[cfg(test)] // 标注为测试函数
  mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}

```

- `assert!` 宏接受 true 则通过测试，反之 接受 false 则失败
- 使用 `assert_eq!` 测试相等， `assert_ne!` 测试不相等。
- `assert!` 宏第二个参数可以传递报错信息。
- 通过 `#[should_panic]` 属性标注函数应该 panic，通过 `#[should_panic(expect = "error message")]` 提示 panic 信息。
- `Result<T, E>` 也可以用于测试函数正确、失败
- 通过 `cargo test` 运行测试， `cargo test [命令行参数] -- [二进制文件参数]`
- `cargo test -- --show-output` 显示代码打印内容
- `cargo test i_am_fn_name` 测试单个函数，`cargo test i_am` 测试 `i_am` 开头的函数
- 通过 `#[ignore]` 标记忽略测试该函数，再通过 `cargo test -- --ignored` 可以忽略标记了 ignore 的函数。
- 通过属性标注 `#[cfg(test)]` 标注函数，只在 `cargo test` 执行函数。
- 在 tests 目录下编写集成测试，Rust 将 test/common/mod.rs 文件规则不当作测试文件。
- 只有 src/lib.rs 的库 crate 才可以创建集成测试。

## 10 迭代器与闭包

### 闭包

```rust
let example_closure = |x| x;

let expensive_closure = |num| {
  // ...
    num
};

// 结合泛型声明闭包 T
struct Cacher<T>
    where T: Fn(u32) -> u32
{
    calculation: T,
    value: Option<u32>,
}
// 实现 Cacher ，当访问 cacher.value 时才会执行闭包计算并缓存到 value 属性上
impl<T> Cacher<T>
    where T: Fn(u32) -> u32
{
    fn new(calculation: T) -> Cacher<T> {
        Cacher {
            calculation,
            value: None,
        }
    }

    fn value(&mut self, arg: u32) -> u32 {
        match self.value {
            Some(v) => v,
            None => {
                let v = (self.calculation)(arg);
                self.value = Some(v);
                v
            },
        }
    }
}
```

- 使用 `|a|` 定义闭包。
- 可以不显式声明类型，但需要保持上下文类型推断一致。
- 结合`Fn` , `FnMut` , `FnOnce` trait 和 泛型在 struct 中使用闭包
- 闭包会捕获其被定义的作用域的变量，使用 move 会强制闭包获取使用环境的所有权。

### 迭代器

```rust
pub trait Iterator {
    type Item;
    fn next(&mut self) -> Option<Self::Item>;
}
```

- Rust 中的迭代器是 lazy 的，使用迭代器之前代码并没有执行迭代器逻辑。
- 迭代器实现了名为 `Iterator` 的 trait， `next` 是唯一被要求定义的方法。`next` 一次返回迭代器中的一个值 `Some<T>` ，结束时返回 `None`
- `next`  调用中得到的值是 vector 的不可变引用
- **迭代器适配器**（_iterator adaptors_），他们允许我们将当前迭代器变为不同类型的迭代器，迭代器适配器是惰性的，而这里我们需要消费迭代器。
- 实现 Iterator trait 可以实现自定义迭代器。

## 11 智能指针

- 智能指针基于 struct 实现，并实现了  `Deref`  和  `Drop` trait。

```rust
enum List {
    Cons(i32, List),
    Nil,
}

let list = Cons(1, Cons(2, Cons(3, Nil))); // error! 因为不知道需要分配多大的内存

let list = Cons(1,
  Box::new(Cons(2,
    Box::new(Cons(3,
      Box::new(Nil)))))); // pass！
```

- `Box<T>` 将数据储存在堆上，更适合用于递归类型的数据场景。
- 当需要使用引用的具体值时，需要通过解引用 `*y` 完成。

```rust
use std::ops::Deref;

struct MyBox<T>(T);

impl<T> Deref for MyBox<T> {
    type Target = T;

    fn deref(&self) -> &T {
        &self.0
    }
}
```

- 自定义类型需要通过 `Deref` trait 实现，实现了 `Deref` 的函数可以通过解引用强制转换的能力转换值的类型并返回。
  - 当  `T: Deref<Target=U>` ：从  `&T`  到  `&U`。
  - 当  `T: Deref<Target=U>` ：从  `&mut T`  到  `&U`。
  - 当  `T: DerefMut<Target=U>` ：从  `&mut T`  到  `&mut U`。

```rust
struct CustomSmartPointer {
    data: String,
}

impl Drop for CustomSmartPointer {
    fn drop(&mut self) {
        println!("Dropping CustomSmartPointer with data `{}`!", self.data);
    }
}

fn main() {
    let c = CustomSmartPointer { data: String::from("some data") };
    println!("CustomSmartPointer created.");
    drop(c);
    println!("CustomSmartPointer dropped before the end of main.");
}
```

- 在值离开作用域时，可以通过实现 `Drop` trait 来执行一些代码。
- 使用 `std::mem::drop` 可以提前清理值。
- 在单线程场景中，通过 `Rc<T>` 分配多所有权，`Rc::new()` 创建引用，`Rc::clone()` 复制引用，当引用计数为 0 时会清理内存并处罚 `Drop` 。
- 通过 `Rc<T>` 和 `RefCell<T>` 可能使引用计数到不了 0，从而创建循环引用。

## 12 并发

- 通过 `thread::spawn` 创建新线程，返回值可以通过 `.join()` 方法等待所有线程结束。
- 通过 move 转移所有权。

- 通过 `sync::mpsc::channel` 创建新通道，返回了新元组`(tx, rx)` 分别是发送端和接受端。
- `tx.send()`  函数获取其参数的所有权并移动这个值归接收者所有。
- `tx.clone()` 可以返回新的发送者， `mpsc` 的是 mutiple producer 的缩写可以有多个发送者。

```rust
use std::sync::Mutex;

fn main() {
    let m = Mutex::new(5);
    {
        let mut num = m.lock().unwrap();
        *num = 6;
    }
    println!("m = {:?}", m);
}
```

- 通过 `Mutex::new()` 创建互斥器，用  `lock`  方法获取锁，以访问互斥器中的数据。这个调用会阻塞当前线程。

## 13 面向对象编程

## 14 模式和匹配

## 15 高级特征

## Reference

- [Rust 程序设计语言 简体中文版](https://rustwiki.org/zh-CN/book)
- [通过例子学 Rust 中文版](https://rustwiki.org/zh-CN/rust-by-example/index.html)
