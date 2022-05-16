---
title: 'React SyntheticEvent'
date: '2022-01-27'
tags: ['Deep Dive', 'React']
description: '合成事件'
---

> React 17.0.2

React 在[文档](https://zh-hans.reactjs.org/docs/handling-events.html)中提到：

> SyntheticEvent 实例将被传递给你的事件处理函数，它是浏览器的原生事件的跨浏览器包装器。

在 React 中，并不像 DOM 一样在各个节点上注册事件，而是在根节点监听事件。然后通过事件捕获、事件冒泡的机制响应事件回调方法。

针对合成事件的处理可以理解为两个阶段：

1. 在根节点 fiberRoot 上添加事件监听
2. 在节点上触发事件

## 在根节点上添加事件监听

在构建 fiberRoot 时通过 `listenToAllSupportedEvents` 为 fiberRoot 添加事件监听，同时对部分特殊事件有特别的处理逻辑。

```js
function createRootImpl(
  container: Container,
  tag: RootTag,
  options: void | RootOptions
) {
  // 对根节点添加监听事件
  listenToAllSupportedEvents(rootContainerElement)
  return root
}

function listenToAllSupportedEvents(rootContainerElement: EventTarget) {
  if (!(rootContainerElement: any)[listeningMarker]) {
    ;(rootContainerElement: any)[listeningMarker] = true

    allNativeEvents.forEach(domEventName => {
      if (domEventName !== 'selectionchange') {
        if (!nonDelegatedEvents.has(domEventName)) {
          listenToNativeEvent(domEventName, false, rootContainerElement)
        }
        // listenToNativeEvent 是对 addEventListener 的封装
        // 可以理解为 addEventListener
        listenToNativeEvent(domEventName, true, rootContainerElement)
      }
    })
  }
}
```

而绑定到事件的回调函数，根据事件优先级的不同设置不同的回调函数(默认为 dispatchEvent)，并返回作为 listener 绑定到根节点上。

```ts
// listenToNativeEvent -> addTrappedEventListener
function addTrappedEventListener(
  targetContainer: EventTarget,
  domEventName: DOMEventName,
  eventSystemFlags: EventSystemFlags,
  isCapturePhaseListener: boolean,
  isDeferredListenerForLegacyFBSupport?: boolean
) {
  // 生成响应函数
  let listener = createEventListenerWrapperWithPriority(
    targetContainer,
    domEventName,
    eventSystemFlags
  )

  // 给 target 添加监听方法，并返回取消监听方法
  unsubscribeListener = addEventBubbleListener(
    targetContainer,
    domEventName,
    listener
  )
}
```

ReactDOM 会在初始化的时候，调用各种 EventPlugin.registerEvents 来注册当前环境（如浏览器）应该处理的事件名称。

```js
SimpleEventPlugin.registerEvents()
EnterLeaveEventPlugin.registerEvents()
ChangeEventPlugin.registerEvents()
SelectEventPlugin.registerEvents()
BeforeInputEventPlugin.registerEvents()
```

经过处理后的 registrationNameDependencies 记录了当前环境 SyntheticEvent 对应的 NativeEvent 映射关系。

```js
registrationNameDependencies = {
  // ...
  onChange: [
    'change',
    'click',
    'focusin',
    'focusout',
    'input',
    'keydown',
    'keyup',
    'selectionchange'
  ],
  onChangeCapture: [
    'change',
    'click',
    'focusin',
    'focusout',
    'input',
    'keydown',
    'keyup',
    'selectionchange'
  ],
  onClick: ['click'],
  onClickCapture: ['click']
  // ...
}
```

## 设置监听后，触发事件

经过 listenToAllSupportedEvents 方法处理后，可以支持任何在根节点内触发的被当前运行环境支持的事件。以 `click` 事件为例整体流程如下：

```
1. 触发 click 事件，冒泡到根节点调用绑定的方法 dispatchEvent
2. 通过 dispatchEventForPluginEventSystem 获取目标 DOM
3. 通过 extractEvents 生成事件队列 listeners
4. 获取触发本次事件的 fiber 节点并依次查找直到根节点
   获取每个节点上的 onClick 方法并添加到 dispatchQueue 队列
5. 遍历 dispatchQueue 队列，依次调用各自的 onClick 方法
```

### dispatchEvent

dispatchEvent 中有个 findInstanceBlockingEvent 方法，目的是在有多个 Root 节点的应用中，将一个 Root 内触发的事件拦截在该 Root 中不再往上冒泡。

dispatchEventForPluginEventSystem 中的 mainLoop 方法？

dispatchEventsForPlugins 通过 `nativeEvent.target || nativeEvent.srcElement` 获取事件触发的 DOM 节点，由于我们以 click 事件为例，click 对应的 dispatchEvent 会对应到 `SimpleEventPlugin.extractEvents`。该方法根据 domEventName 获取对应的合成事件类，如 click 对应为 `SyntheticMouseEvent` 类，并构建实例 event。

同时，会一直遍历到根结点，检查该事件影响到的节点是否有对应的 reactEventName 属性，如 click 对应的 onClick 属性，将所有的节点及 reactEventName 记录到 listeners，一起添加到 dispatchQueue 中

```ts
const listeners = accumulateSinglePhaseListeners()
if (listeners.length > 0) {
  const event = new SyntheticEventCtor()
  dispatchQueue.push({ event, listeners })
}
```

然后调用 processDispatchQueue 遍历 dispatchQueue 队列，对 listeners 依次调用。
