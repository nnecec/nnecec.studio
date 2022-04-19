---
title: 'Vite简明指南'
date: '2022-03-30'
tags: ['Deep Dive', 'Vite']
description: '了解Vite特性及关键源码解读'
---

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

### 通过 ESM 实现快速的模块化加载 JavaScript 文件

`vite dev` 通过 node 的 http/https/http2 根据配置创建了一个 server，通过 ws 创建了一个 websocketServer，通过 chokidar 监听根节点下的文件改动等事件。

`container.buildStart({})` 调用 buildStart 并且调用 所有插件的 buildStart 方法。

`initOptimizer` 依赖预构建

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

  在该方法中处理 `GET /` 的情况，加载 index.html。在开发环境，会遍历 index.html 添加开发环境的代码，如 hmr 的功能。
