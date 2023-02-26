---
title: '企业 Node.js BFF 应用基础架构'
date: '2022-09-19'
tags: ['Node.js']
description: '一个企业 Node.js BFF 应用应当具有哪些特性及能力？'
---

## 前言

当企业应用从 Java 提供接口 + 前端编写页面的模式向 Java 提供微服务 + 前端提供自己需要的接口 + 前端编写页面的模式转变时，这个 BFF 应用 需要具备一定能力之后，便可以逐步将新需求按照该模式开发了。本文则选择主要的应用能力做简单介绍。

## 基础架构

基础架构的代码，可以考虑抽象设计作为底层包提供给每个业务应用作为依赖使用，类似 egg 做的工作。本文将其命名为 `@cop/base`。

### 应用脚手架：Koa

我们选择了 Koa 作为应用最基本的 Web 框架。Koa 提供了非常基础的能力，如启动 http 服务，接受请求，处理请求后返回响应结果，并提供了中间件的能力从而给 Koa 带来非常灵活的拓展能力。

app 会在接受到请求后依次从上而下的调用中间件，在前一个中间件遇到 `await next()` 代码时，执行下一个中间件内的 `await next()` 之前的代码，从而实现了依次调用中间件的能力。当最后一个中间件`next()`执行完成，会开始处理响应，再从下而上的依次调用 `next()` 方法后面的代码。

在 `@cop/base` 中，提供方法 `createApp` 来创建应用。方法中实例化一个 `Koa`，对该实例进行通用配置，比如:

```ts
export const createApp = (options: Options) => {
  const app = new Koa()
  app
    // 针对业务报错 常见HTTP报错进行结构处理，返回给前端约定好的错误数据结构
    .use(normalizeErrors())
    // 暴露 ctx.logger 方法 并记录默认 context 数据
    .use(logger())
    // 提供 cors 配置
    .use(cors(options.cors))
    // 提供代理选项，在企业应用中代理到不同的测试环境、预发环境
    .use(createProxy(options.proxy))
    // 通用
    .use(bodyParser())
    // 提供给上层应用接入路由
    .use(options.router.routes())
    .use(options.router.allowMethods())
}
```

### 日志记录

日志是接口服务一个基本的能力。通过日志可以记录应用接受及发送的请求数据、应用出现错误时的数据等，为后期人工检查应用状况提供数据支持。

生态中有很多日志库，我们选择 `winston` 作为应用的 logger。通常日志库具备以下能力：

- 输出日志到多个端，如控制台、文件系统、http 请求等
- 多种日志分级，如 log(), error(), info()等
- 自动切割日志
- 高性能
- 可扩展，支持自定义日志格式

```ts
import { transports, createLogger, format } from 'winston'
const { combine, colorize, printf, timestamp } = format

export function logger(loggerOptions: LoggerOptions) {
  const appLogger = createLogger({
    format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
      printf(data => {
        const { message, timestamp, level } = data
        const threadName = '[main]'
        const stackInfo = '-'
        return `${timestamp} ${level.toUpperCase()} ${threadName} ${stackInfo} ${message}`
      }),
    ),
  })

  return async function (context: Context, next: Next) {
    context.logger = appLogger

    const startTime = Date.now()

    try {
      await next()
    } finally {
      // 打印请求信息， 通过 formatMessage 自定义格式
      const message = formatMessage({
        context,
        startTime,
      })
      appLogger.info(message)
    }
  }
}

// 组合日志信息
const formatMessage = (options): string => {
  const { context, startTime } = options

  const list = [
    /* remote */ context.ip || context.socket.remoteAddress,
    /* time */ `[${dayjs().format('DD/MMM/YYYY:HH:mm:ss +0800')}]`,
    /* host */ context.hostname,
    /* port */ 80,
    /* method */ context.method,
    /* path */ context.path,
    /* protocol */ context.protocol,
    /* params */ context.querystring,
    /* code */ context.response.status,
    /* size */ context.response.length,
    /* referer */ context.headers.referer,
    /* agent */ context.headers['user-agent'],
    /* real_ip */ context.headers['x-real-ip'] || '-',
    /* http_x_forwarded_for */ context.headers['x-forwarded-for'] || '-',
    /* request_time */ Date.now() - startTime,
  ]

  return list.join('||')
}
```

这样就定义好了默认的日志格式及内容，并为 context 提供了 logger 方法。

### 错误处理

通常将错误处理放到中间件靠前的位置，通过 `try..catch` 将后续的中间件包裹，从而实现错误处理的能力。同时可以预设几种错误类型，提供给业务应用使用，当抛出预设错误类型后，进入预设的错误处理逻辑。

```ts
const errors = () => {
  return async (ctx: Context, next: Next) => {
    try {
      await next()
    } catch (err) {
      const level = err.level || 'error'
      const log = ctx.logger[level] || ctx.logger.error

      ctx.logger.error(`${err.message}: ${err.stack || ''}`)

      log(`[${err.traceId}]:${err.message} | ${stackMsg} | ${reasonMsg}`)

      // 处理各种报错情况
      if (err instanceof joi.ValidationError) {
        e.status = 400
      } else {
        ctx.body = {
          success: false,
          msg: '服务器发生错误，请稍后再试',
          data: null,
        }
        ctx.status = 500
      }
    }
  }
}
```

### 代理

### 路由

## 监控

监控独立于业务应用之外，如独立生成另一个 Koa 实例，在该实例中接入监控能力。

### 探针

探针其实就是提供了几个约定的接口给容器调用，从而判断应用健康运行。

```ts
const app = new Koa()
const actuator = new Koa()

const actuatorRouter = new Router({
  prefix: '/actuator',
})

actuatorRouter.get('/health/readiness', getReadiness)
actuatorRouter.get('/health', healthCheck)
actuatorRouter.post('/probes/readiness', changeStatus)
actuatorRouter.get('/metrics', prometheus)
actuatorRouter.get('/prometheus', prometheus)

actuator
  .use(errors())
  .use(bodyParser())
  .use(actuatorRouter.routes())
  .use(actuatorRouter.allowedMethods())

actuator.listen(8888)
```

### 性能监控

通过性能监控，我们可以了解应用占用的资源情况。比如 CPU 使用率、内存占用、事件循环、请求量，往往监控会伴随图形化界面如 Grafana 使查看数据时更清晰。

- 通过跟踪 CPU 负载和使用情况，你可以发现哪些进程是 CPU 密集型的。然后，你就可以通过创建子进程或分叉来解决任何潜在的风险，以减少瓶颈。
- 通过监测内存占用，可以防止内存泄漏发生，要监控释放的内存、进程 堆大小和进程堆的使用。
- Node.js 进程之所以快，是因为它的事件是用事件循环异步执行的，并防止请求相互阻塞--因此是非阻塞 I/O。在主线程之外处理的请求会作为响应回来。然而，某些进程可能会导致事件循环滞后，如长期运行的同步事件和每个单一循环任务的递增。请确保监测事件处理速度和整个循环延迟的平均速度。

性能监控又是一个庞大的选题，我们主要了解如何将 prometheus 监控接入应用。在 Node.js 中使用 `prom-client` 作为 prometheus 的 js sdk。

```ts
import { collectDefaultMetrics, register } from 'prom-client'

collectDefaultMetrics({ register })

const app = new Koa()
```

## 业务

### Restful API 及路由设计

通过 koa/router 将业务需求按模块划分，每个模块有自己的

- router: 负责 Restful API 路由，在每个具体的 route 中，可能会先通过 joi 校验参数合法性，通过验证后再调用 controller
- controller: 提供给 route 调用，主要进行数据格式处理、整合
- service: 在 BFF 应用中主要用来将 controller 处理后的参数传给微服务调用。在全栈应用中，往往还需要接入数据库调用数据库方法。
