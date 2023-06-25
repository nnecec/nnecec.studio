---
title: '如何搭建可维护的组件库'
date: '2023-03-17'
tags: ['Introduction']
description: ''
---

## 前言

业界目前有很多组件库的建设方案，从代码到文档都有很多现成的工具可以使用。本文将介绍建设组件库需要的技术点，并提供合适的示例。

### 1. 适合的代码组织方案

首先，在搭建组件库之前，应当明确一个大致的组件路线。因为基础组件已经有了很多优秀的开源库可以选用，大多数企业组件库都是基于某一开源组件库进一步开发需要满足自身需求的组件库。

对于这一类的企业业务组件库，不推荐用 monorepo 的组织方式，主要原因如下：

- 单个组件的代码量较少
- 维护单个包及在业务代码中更新依赖更方便、清晰
- 组件可以共享依赖、工具方法
- 内部组件层级更扁平化，而 monorepo 更适合层级化的依赖结构
- ESM 原生支持 Tree-shaking，不需要考虑代码冗余

对于多端的业务组件库，倒是适合通过 monorepo 的方式组织代码，如下面这种结构

```text
- ui
  - mobile
  - laptop
  - utils
```

由于移动端和桌面端的样式和用户操作逻辑往往差异比较大，将移动和 PC 的页面逻辑单独实现，通用方法共用，通过 monorepo 的方式组织可以更方便的共用代码，并将代码合理的分类管理。

在 monorepo 的技术选型方面，可以参考 [monorepo.tools](https://monorepo.tools/) 对 monorepo 的概念及技术框架有比较详细的说明。

### 2. 构建方案

在构建这个技术分支上，可供选择的成熟工具有很多，并且不断有新的工具出现。常见的有：

- webpack
- rollup
- tsc
- vite

新兴的构建工具有：

- esbuild
- swc
- turbopack

### 3. 使用 TypeScript

基于 TypeScript 实现组件库，是现代组件库逐渐形成的默认开发语言。通过 TypeScript 强化类型提示及开发时的报错提示，并对 API 进行约束，提供了良好的开发体验。

### 4. 样式方案

样式方案发展经历了 CSS, Less/SCSS, CSS Module, CSS-in-JS, Atomic CSS 等等。如今每个方案仍然有各自适合的场景。

2022 年流行起来一股 Headless UI 风潮，组件库只提供功能，样式由用户编写。个人认为这是未来的一个趋势，类似 Radix UI 默认只提供了组件的能力，也提供了样式代码供用户拷贝到自己的项目中使用。

NextUI v2 的重构则同样不提供样式代码，但基于 TailwindCSS 提供了样式类，内部通过 `tailwind-variants` 将 class 集成到组件上。

近期非常流行的 shadcn/ui 则基于 radix-ui 提供逻辑能力，自己实现组件样式。它甚至不提供 npm 包，只是提供模版代码让开发者复制到自己的项目中，但这样的设计个人认为非常棒！

### 5. 代码组织

一般一个组件由源代码、单元测试、文档、Demo 及样式构成。

```text
├── src
│   ├── components
│   │   └── User
│   │       ├── user.test.tsx
│   │       ├── user.stories.tsx
│   │       ├── user.tsx
│   │       ├── index.css
│   │       ├── types.tsx
│   │       └── index.ts
│   ├── types
│   └── utils
└── package.json
```

如果是 monorepo 的组织方式，往往一个组件作为一个 package，如果组件数量比较大的情况下，也可以有一个 main package 去中转所有的 sub package。这样用户只需要安装这一个 main package 就可以了，并且在 Tree Shaking 的能力下不会对产物体积产生影响。

```text
├── packages
│   ├── business
│   │   └── package.json
│   ├── base
│   │   └── package.json
│   ├── order
│   │   └── package.json
│   ├── main
│   │   ├── index.ts
│   │   └── package.json
│   └── utils
│       └── package.json
│
└── package.json
```

```ts
// main/index.ts
export * from '@n/business'
export * from '@n/order'
export * from '@n/utils'
```

### 文档

- storybook
- nextra

### 单元测试

使用 Jest 编写组件的单元测试，根据组件库的具体落地情况，可能需要添加 `@testing-library/react`, `@testing-library/react-hooks`, `@testing-library/user-event`, `@testing-library/jest-dom` 等来支持不同的需求。

编写单元测试不难但是繁琐，有的代码逻辑不知道怎么编写，可能就需要去开源仓库找符合自己需求的示例参考。

但编写单元测试的逻辑，是相对统一的：

- 明确需要测试的组件功能，从开发者转变到使用者的思维来衡量需要编写的用例
- 每一份 test 只用于测试单一功能点
- 测试内容一般包括：是否正确接受并处理了预期参数、渲染是否正确（是否有关键节点，或快照对比）、用户操作是否符合设定逻辑、边缘情况（如使用预期外的参数）是否处理
