---
title: 'Vite 原理简析'
date: '2022-07-12'
tags: ['Introduction', 'Vite']
description: '了解 vite 主要功能源码'
---

## 源码简析

### 文件结构

```
./src
├── client # 客户端运行时WEB SOCKET以及HMR相关的代码
│   ├── client.ts
│   ├── env.ts
│   ├── overlay.ts
│   └── tsconfig.json
└── node # 本地服务器相关代码
    ├── server
    ├── build.ts # 生产环境rollup build代码
    ├── certificate.ts
    ├── cli.ts # cli，入口
    ├── config.ts
    ├── constants.ts
    ├── http.ts
    ├── importGlob.ts
    ├── index.ts # 导出出口
    ├── logger.ts
    ├── packages.ts
    ├── plugin.ts
    ├── preview.ts # build构建后，在预览模式下启动Vite Server，以模拟生产部署
    ├── tsconfig.json
    └── utils.ts
```

### 通过 ESM 实现模块化加载

`vite dev` 通过 node 的 http/https/http2 根据配置创建了一个 server，通过 ws 创建了一个 websocketServer，通过 chokidar 监听根节点下的文件改动等事件。

`container.buildStart({})` 调用 buildStart 并触发所有插件的 buildStart 方法。

`initOptimizer` 依赖预构建。

通过 `server.listen()` 启动本地服务，

#### `initOptimizer` 依赖预构建

读取缓存文件夹（默认为 node_modules/.vite）中的 `_metadata.json`。如果缓存可用，且 hash 值没有发生变更，则将缓存加载到 metadata 对象中，返回赋值给 cachedMetadata 直接提供给 vite 使用。

Vite 通过 `getDepHash` 方法计算 hash 值，影响 hash 值计算的因素有：

- lockfile
- vite.config: mode, root, define, resolve, build.target, plugins, optimizeDeps 等相关配置

如果没有预构建缓存可用，则需要首次预构建。

vite 通过扫描根目录下的所有 .html 文件或根据用户配置 `optimizeDeps.entries`和`rollupOptions.input` 获取入口找到所有的 script 标签。通过入口获取关联的依赖<sup>todo</sup>

然后根据依赖，使用 esbuild 预构建依赖，写入缓存文件夹，并生成 `_metadata.json`。

#### 加载 ESM 资源

在 `createServer` 方法中，通过中间件接入了：

- transformMiddleware

  处理资源请求，如 JS, CSS, JS 中的 import 等。

  - 如果 url 是 '/'或 'favicon.ico' 跳出该方法。
  - 如果是 `/@fs/`, `/@vite/client`,`/@vite/env`，会将该前缀替换掉，回调 `resolveId` 插件方法，

    1. 调用 pluginContainer.resolveId 的过程中会遇到 aliasPlugin 插件的钩子，执行名称替换，最终替换成 vite/dist/client/client.mjs
    2. 继续将改写过的路径传给下一个插件，最终进入 resolvePlugin 插件的 tryNodeResolve 函数，最终解析获得该文件的 id 为/Users/xxoo/.nvm/versions/node/v16.13.1/lib/node_modules/vite/dist/client/client.mjs
    3. 最终通过 pluginContainer.load 获取加载本地文件，然后通过 pluginContainer.transform 进行代码转换，将转换后的代码通过 send 方法发送给浏览器

  - 如果是 /src/main.tsx

    1. 通过 resolveId 钩子函数，将/src/main.tsx 映射到本地文件系统
    2. 调用 load 钩子函数，加载本地文件到内存中
    3. 通过 vite:react-babel 插件，将 jsx 语法进行转换，转换成 js 代码
    4. 通过 vite:esbuild 插件，进行代码格式化
    5. 通过 vite:import-analysis 插件，将代码中所有的 import 内容，转换成对应的本地文件，方便后续直接请求
    6. 返回结果

- indexHtmlMiddleware

  在该方法中处理 `GET /` 的情况，加载 index.html。在开发环境，会遍历 index.html 添加开发环境的代码，如 HMR 的功能。

### HMR

通过 chokidar 监听根节点下的文件改动，当发生改动时触发 `change` 事件，对于 package.json 有特殊处理，对于常规文件则进入 HRM 的逻辑。

- 如果是 vite 配置文件，或 .env 文件发生变化，会重启 dev 服务
- 如果是 html 文件发送编号，会刷新页面
- 如果是其他文件，则进入普通更新逻辑。vite 会提供与变更文件相关联的所有关联文件，遍历文件，检查文件是否需要重刷页面。如果都符合热更新逻辑，则将文件信息添加到 updates 队列中，通过 ws 发送给客户端。

在创建本地服务时，vite 会向客户端注入 `vite/src/client.js` 的代码，在 `handleMessage` 方法中可以有对 socket 消息的处理

- 对于 link 标签，获取页面中的 link 进行 href 更新替换
- 对于 js 文件，获取新的 js 代码，通过 Promise 使用异步的方式添加到任务队列中。

## 总结

Vite 主要通过浏览器原生支持 ESModule 的特性，实现快速更新页面资源的功能。

Vite 会将依赖统一转化为 ESModule 格式，并将零碎文件合成一个大文件以减少资源请求次数。

在开发环境，Vite 会直接启动本地服务器，当浏览器发起资源请求时，Vite 对请求进行拦截。当请求发现携带@开头的特殊路径时，会对其特殊处理。其他请求会被认为是普通静态资源请求。

热更新实现首先依赖 Vite 对 index.html 进行处理，添加了响应 socket 通信的代码，从而实现了资源热更新的能力。

在生产环境，Vite 仍需要通过 Rollup 将资源打包。

## 参考

1. [vite](https://github.com/vitejs/vite)
