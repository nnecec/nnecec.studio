---
title: 'JSX 与 React'
date: '2022-04-23'
tags: ['React']
description: ''
---

## 概念

当编写一个 React 组件或应用时，首先就是新建一个 `app.jsx` 文件，并在文件中编写代码

```jsx
export const App = () => {
  return (
    <div className="title" style={{ color: 'red' }}>
      Hello World!
    </div>
  )
}
```

我们将包含这种代码的文件格式称之为 JSX。

JSX 用于描述 React 代码的 DOM 结构，代码结构与 HTML 类似，但又有很多不同，如支持内嵌 JavaScript 代码。

对于 React 来说，上述 JSX 代码由编译器编译为包含了 `createElement` 方法的代码产物：

```js
export const App = () => {
  return React.createElement(
    'div',
    {
      className: 'title',
      style: {
        color: 'red',
      },
    },
    'Hello World!',
  )
}
```

React 通过 JSX 中的 “HTML” 部分描述了页面的结构，同时通过 `createElement` 将其转换为 React 可以使用的数据结构。

## 源码

### createElement

React 通过该方法将描述页面的 JSX 信息，转录为 React 需要的静态节点信息。

这些信息包括了：组件类型（div, 或自定义组件)，组件的 Props 和 Ref ，和子节点信息。

```ts
export function createElement(type, config, children) {
  let propName

  // Reserved names are extracted
  const props = {}

  let key = null
  let ref = null
  let self = null
  let source = null

  if (config != null) {
    // 取出 props 中的这两个字段并单独处理 ref 和 key 字段
    if (hasValidRef(config)) {
      ref = config.ref
    }
    if (hasValidKey(config)) {
      key = '' + config.key
    }

    self = config.__self === undefined ? null : config.__self
    source = config.__source === undefined ? null : config.__source
    // 将剩余的 config 字段保存到 props 字段
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName]
      }
    }
  }

  // 从第三个参数开始，都是子节点信息，
  const childrenLength = arguments.length - 2
  if (childrenLength === 1) {
    props.children = children
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength)
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2]
    }
    props.children = childArray
  }

  // 获取 Component.defaultProps 作为默认值
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName]
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props)
}
```
