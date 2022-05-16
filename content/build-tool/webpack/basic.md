---
title: 'Webpack 简明指南'
date: '2022-05-12'
tags: ['Introduction', 'Webpack']
description: '了解 Webpack 的基本原理及特性实现'
---

## Webpack 工作流程

1. 解析用户配置，与默认配置合并成最终配置 config
2. 初始化 compiler 和 compilation
3. 将 plugins 注册到 compiler 上，在构建过程中，根据不同的钩子触发插件方法
4. 获取 config 的入口属性 entry
5. 根据 entry 读取对应的入口文件(buildModules)
6. 根据文件类型调用对应的 loader 进行编译
7. 检查文件中是否有依赖模块，如果有，递归调用 buildModules
8. 上述构建结果存入 compiler.modules 中构建依赖关系图(dependencyGraph)
9. 当所有文件执行完成后，将结果写入到出口文件夹中(output)

## Webpack 特性是如何实现的

### 建立依赖关系图

通过声明的入口文件进行 ast 解析，并在解析过程中遇到 `importDeclaration` 时，即意味着遇到了一份新的依赖，将依赖的信息添加到 dependencies 中。从而得到这份入口文件的内容，以及与该入口相关的依赖信息。

接着递归按照类似的方式来处理依赖，将每一份依赖当作一个新的入口继续处理下去，从而得到了全部的模块信息，以及模块相关的依赖关系，构成依赖关系图。

最终利用这些信息，生成输出文件的内容，写入输出地址。

代码实现可以参考 [github/minipack](https://github.com/ronami/minipack)，代码解读可以参考[github/imrich/minipack](https://github.com/nnecec/imrich/blob/master/source-code/minipack/README.md)

### 钩子与插件

### ast 与 loader
