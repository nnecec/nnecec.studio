---
title: '领域驱动设计在前端如何实践'
date: '2021-12-30'
tags: ['Design Pattern']
description: '如何在前端项目中实践领域驱动设计'
---

## 概念

领域驱动设计（Domain-Driven-Design）是一种编程思想，过往主要由服务端实践该思想。那么前端如何实践该思想呢？

下文皆为笔者基于对 DDD 的理解编写的伪代码。

## 层次

对于一个业务模块将其文件结构按如下设置：

```
- pages
  - products
    - services
      - list.service.js
      - detail.service.js
    - detail.js
    - list.js
    - index.js
```

## 页面职能

在列表页面，通过 useContext 导入 list.service 中定义的领域模型，通过 query 获取领域中的 list 状态。

对于绘制 UI 的文件，仅应该编写页面结构与样式并绑定与领域相关的状态和方法：

```tsx
export default function List () {
  const domain = useContext(productDomain)
  const list = useQuery(product.query.ListStateQuery)
  const page = useQuery(product.query.PageStateQuery)

  const handleChangePage = (page) => {
    domain.command.changePage(page)
  }

  return (
    <div>
      {list.map(item=> (
        <Item data={item}>
      ))}

      <Pagination value={page} onChange={handleChangePage}/>
    </div>
  )
}
```

## 创建领域

领域负责管理领域内的状态以及方法：

```ts
const productDomain = createDomain({
  name: 'productDomain',
  impl: domain => {
    const ListState = domain.state({
      name: 'product.ListState',
      default: []
    })
    const PageState = domain.state({
      name: 'product.Page',
      default: 0
    })

    const changePage = domain.command({
      name: 'product.refresh',
      impl: ({}, page: number) => {
        return PageState().new(page)
      }
    })

    return {
      query: {
        ListStateQuery: ListState.Query,
        PageStateQuery: PageState.Query
      },
      command: {
        changePage
      }
    }
  }
})
```

## 参考

1. [domain-driven-hexagon](https://github.com/Sairyss/domain-driven-hexagon)
2. [remesh](https://github.com/remesh-js/remesh)
3. [domain-driven-design/specification](https://github.com/domain-driven-design/specification)
