---
title: 'React Redux 源码解析'
date: '2022-04-24'
tags: ['Deep Dive', 'React']
description: 'React Redux 源码解析'
---

> 当时版本：v8.0.1

首先是基于了解基本使用方式的程度，来看各个组件的源码，由于代码量比较大这里贴出官网的 [quick-start](https://react-redux.js.org/tutorials/quick-start)

## Provider

Provider 就是一个 `Context.Provider`，记录着 通过 createStore 创建的 store 以及 React Redux 中的 subscription。

```tsx
function Provider({ store, context, children, serverState }: ProviderProps<A>) {
  const contextValue = useMemo(() => {
    const subscription = createSubscription(store)
    return {
      store,
      subscription,
      getServerState: serverState ? () => serverState : undefined
    }
  }, [store, serverState])

  return <Context.Provider value={contextValue}>{children}</Context.Provider>
}
```

这样相当于在 React 全局环境中创建了 store。

在组件中使用 store 数据的时候有两种接入的方法：

1. 使用 `connect` 返回包装后的高阶组件
2. 在 `FunctionComponent` 内使用 `useSelector`, `useDispatch` 获取 `store` 及 `dispatch`

## connect

> 官方仍支持该 api 但更推荐开发者使用 hooks api

先了解一下[connect API](https://react-redux.js.org/api/connect)。

```ts
function connect(
  mapStateToProps?: Function,
  mapDispatchToProps?: Function | Object,
  mergeProps?: Function,
  options?: Object
) {}

// ...
connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(Component)
```

`connect(..)` 做了如下操作：

- 生成一个新的高阶组件(且称之为 `ConnectComponent`)
- 将 connect 第一个小括号内的参数作为配置提供给闭包方法 `wrapWithConnect`
- 返回 wrapWithConnect 作为 `connect()` 的返回值

`wrapWithConnect(Component)` 接受 Component 作为参数 做了如下操作：

- 获取 Provider 提供的 contextValue (同时也对没有通过 Context 而是通过 props 传递 store 的情况作了处理，本文跳过该逻辑)
- 生成 childPropSelector(用于从 store 筛选组件订阅的 state)
- useSyncExternalStore 将计算后的 `actualChildProps` 提供给 `ConnectComponent`
- 将 Component 的静态方法复制到新的组件上(hoist-non-react-statics 过滤 React 原生属性)

经过这些步骤，将 `Component` 包装成一个 订阅 store 的组件 `ConnectComponent`。

### 1. mapStateToProps, mapDispatchToProps

可能在实际中会编写如下代码：

```js
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.common.user,
    addressList: state.common.addressList,
    productList: state.product.list
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAddressList: () => dispatch(getAddressList()),
    getProductList: () => dispatch(getProductList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)
```

这些配置在 connect 会经过下列处理

```ts
const initMapStateToProps = match(
  mapStateToProps,
  defaultMapStateToPropsFactories,
  'mapStateToProps'
)!
```

第二个参数是方法数组 `factories` ，`match` 将第一个参数作为 `factories` 每个方法的参数进行调用，如果有返回值则直接返回计算结果。

> initMapStateToProps -> wrapMapToPropsFunc(mapStateToProps) -> initProxySelector

同理 `initMapDispatchToProps`, `initMergeProps` 也是 `initProxySelector`。

先把该环节跳过，后面会回头来看这个结果的作用。接下来进入到 `wrapWithConnect` 方法

### 2. wrapWithConnect

在 connect 中，主要的逻辑实现在这个 wrapWithConnect 方法中。该方法经过下列处理，返回了经过包装的 ConnectComponent 组件。

```ts
const wrapWithConnect: AdvancedComponentDecorator<
  TOwnProps,
  WrappedComponentProps
> = WrappedComponent => {
  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  const displayName = `Connect(${wrappedComponentName})`

  function ConnectFunction<TOwnProps>(props: ConnectProps & TOwnProps) {
    // ...
  }

  // 通过 ConnectFunction 生成 ConnectComponent
  const _Connect = React.memo(ConnectFunction)
  const Connect = _Connect as unknown as ConnectedComponent<
    typeof WrappedComponent,
    WrappedComponentProps
  >
  Connect.WrappedComponent = WrappedComponent
  Connect.displayName = ConnectFunction.displayName = displayName

  // 返回最终的组件
  if (forwardRef) {
    const _forwarded = React.forwardRef(function forwardConnectRef(props, ref) {
      return <Connect {...props} reactReduxForwardedRef={ref} />
    })

    const forwarded = _forwarded as ConnectedWrapperComponent
    forwarded.displayName = displayName
    forwarded.WrappedComponent = WrappedComponent
    return hoistStatics(forwarded, WrappedComponent)
  }

  return hoistStatics(Connect, WrappedComponent)
}
```

#### 3. ConnectFunction

```tsx
function ConnectFunction<TOwnProps>(props: ConnectProps & TOwnProps) {
  // 获取 Component 自己的 props，可能存在的 context 和 wrapWithConnect 提供的 ref
  const [propsContext, reactReduxForwardedRef, wrapperProps] = useMemo(() => {
    // ...
  }, [props])

  // 获取 contextValue
  const contextValue = useContext(ContextToUse)

  // 确认 store 来源是 context 还是 props

  const store: Store = contextValue!.store

  // 很长一段代码，为了根据订阅的 store 数据精确更新渲染组件
  // ...

  let actualChildProps: unknown

  try {
    // 将 第1个参数作为 useEffect 方法执行，第2个参数执行的结果为 actualChildProps
    actualChildProps = useSyncExternalStore(
      subscribeForReact,
      actualChildPropsSelector,
      actualChildPropsSelector
    )
  } catch (err) {}

  // 更新 childProps
  useIsomorphicLayoutEffect(() => {
    lastChildProps.current = actualChildProps
  })

  // 根据筛选后的 props 渲染组件
  const renderedWrappedComponent = useMemo(() => {
    return (
      <WrappedComponent {...actualChildProps} ref={reactReduxForwardedRef} />
    )
  }, [reactReduxForwardedRef, WrappedComponent, actualChildProps])

  const renderedChild = useMemo(() => {
    if (shouldHandleStateChanges) {
      return (
        <ContextToUse.Provider value={overriddenContextValue}>
          {renderedWrappedComponent}
        </ContextToUse.Provider>
      )
    }

    return renderedWrappedComponent
  }, [ContextToUse, renderedWrappedComponent, overriddenContextValue])

  return renderedChild
}
```

#### 3.1 Subscription

在 ConnectFunction 有一段关于 store 订阅数据的处理方法，下面逐一解读。

```ts
// 获取该组件的 selector
const childPropsSelector = useMemo(() => {
  return defaultSelectorFactory(store.dispatch, selectorFactoryOptions)
}, [store])

// selectorFactory.ts
// defaultSelectorFactory 就是 finalPropsSelectorFactory
export default function finalPropsSelectorFactory(
  dispatch: Dispatch<Action>,
  {
    initMapStateToProps,
    initMapDispatchToProps,
    initMergeProps,
    ...options
  }: SelectorFactoryOptions
) {
  const mapStateToProps = initMapStateToProps(dispatch, options)
  const mapDispatchToProps = initMapDispatchToProps(dispatch, options)
  const mergeProps = initMergeProps(dispatch, options)

  const selectorFactory = pureFinalPropsSelectorFactory

  return selectorFactory(
    mapStateToProps!,
    mapDispatchToProps,
    mergeProps,
    dispatch,
    options
  )
}
```

这里终于用上了之前生成的 `initMapStateToProps`, `initMapDispatchToProps` 等方法，其实就是返回了 `initProxySelector` 生成的 proxy，然后当作 selectorFactory 的参数进行调用。最终通过 selectorFactory 返回了 pureFinalPropsSelector。

pureFinalPropsSelector 则根据用户自定义的 mapStateToProps 过滤方法将 nextState 生成下一次更新时的 props 返回 (mapDispatchToProps 同理)。

```ts
// 生成 subscription 合并为 actualContextValue
const [subscription, notifyNestedSubs] = useMemo(() => {
  const subscription = createSubscription(
    store,
    didStoreComeFromProps ? undefined : contextValue!.subscription
  )
  const notifyNestedSubs = subscription.notifyNestedSubs.bind(subscription)

  return [subscription, notifyNestedSubs]
}, [store, didStoreComeFromProps, contextValue])

const overriddenContextValue = useMemo(() => {
  if (didStoreComeFromProps) {
    return contextValue!
  }

  return {
    ...contextValue,
    subscription
  } as ReactReduxContextValue
}, [didStoreComeFromProps, contextValue, subscription])

// 使用 useRef 记录数据
const lastChildProps = useRef<unknown>() //
const lastWrapperProps = useRef(wrapperProps) // ConnectComponent 上一次接收到的 props
const childPropsFromStoreUpdate = useRef<unknown>()
const renderIsScheduled = useRef(false)
const isProcessingDispatch = useRef(false)
const isMounted = useRef(false)
const latestSubscriptionCallbackError = useRef<Error>()

// 标记当前组件是否 mounted
useIsomorphicLayoutEffect(() => {
  isMounted.current = true
  return () => {
    isMounted.current = false
  }
}, [])

// 获取 childPropsSelector 该方法将会 合并 筛选后的 state 和 ownProps
const actualChildPropsSelector = usePureOnlyMemo(() => {
  const selector = () => {
    // 防止Redux更新错误的导致重新渲染
    return childPropsSelector(store.getState(), wrapperProps)
  }
  return selector
}, [store, wrapperProps])

const subscribeForReact = useMemo(() => {
  // reactListener 是 useSyncExternalStore 调用时提供， 类似 forceUpdate
  const subscribe = (reactListener: () => void) => {
    if (!subscription) {
      return () => {}
    }
    // 该方法比对前后 childProps 如果不一致则调用 reactListener 触发更新
    return subscribeUpdates(
      shouldHandleStateChanges,
      store,
      subscription,
      childPropsSelector,
      lastWrapperProps,
      lastChildProps,
      renderIsScheduled,
      isMounted,
      childPropsFromStoreUpdate,
      notifyNestedSubs,
      reactListener
    )
  }

  return subscribe
}, [subscription])
// ...
```

### createSubscription

在 [redux](/infra/state-management/redux) 中，我们知道， redux 通过 store.subscribe 添加订阅方法。

```ts
export function createSubscription(store: any, parentSub?: Subscription) {
  let unsubscribe: VoidFunc | undefined
  let listeners: ListenerCollection = nullListeners

  function notifyNestedSubs() {
    listeners.notify()
  }

  function handleChangeWrapper() {
    if (subscription.onStateChange) {
      subscription.onStateChange()
    }
  }

  function trySubscribe() {
    if (!unsubscribe) {
      unsubscribe = parentSub
        ? parentSub.addNestedSub(handleChangeWrapper)
        : store.subscribe(handleChangeWrapper)

      listeners = createListenerCollection()
    }
  }

  const subscription: Subscription = {
    addNestedSub,
    notifyNestedSubs,
    handleChangeWrapper,
    isSubscribed,
    trySubscribe,
    tryUnsubscribe,
    getListeners: () => listeners
  }

  return subscription
}
```

生成的 subscription 拥有 handleChangeWrapper , trySubscribe 方法。

在 connect 的过程中，会调用 context 上的 `subscription.addNestedSub` 向 context.subscription 添加监听方法。

在 `subscribeUpdates` 中组件的 `subscription.onStateChange` 被赋值为 `checkForUpdates`，并通过 `trySubscribe` 添加到监听方法中。

checkForUpdates 就是上文中提到的**检查前后 childProps 如果不一致则调用 `reactListener` 触发更新**。

当 store 发生变化时，会调用 subscription.notifyNestedSubs 触发所有 connect 组件检查是否需要更新 state。

## useSelector, useDispatch

所以在 `useSelector` 中利用 useContext 获取 store、subscription，通过 React18 提供的 `useSyncExternalStoreWithSelector` 获取组件订阅的部分 state 并返回。

`useDispatch` 则是通过 useContext 获取 store 直接返回 `store.dispatch`。([redux](/posts/infra/state-management/redux) 中介绍过 store 实例提供了 dispatch 方法)。

## 总结

> 在 ^8.0.0，可以看到 React Redux 利用 React18 提供的新的 hooks 方法：
>
> - useSyncExternalStore
> - useSyncExternalStoreWithSelector

React Redux 基于 Redux 提供的状态管理功能，在 React 生态下提供了：

1. Provider

   利用 Context 下发 store 实例及 subscription 实例。

2. connect

   利用高阶函数包装用户定义的组件，并且根据用户的配置的筛选方法，精确筛选 Context 中 store 需要的值作为 props 传入。

   React Redux 内部通过发布订阅方法，将组件的订阅方法添加到响应 store 变更的监听队列中。当 store 发生变更时，触发 connect 过的组件的订阅方法去对比两次生成的 `childProps` 是否发生了变化，如果前后的值不相等，则调用 React 提供的 `forceUpdate` 方法更新组件。

3. useSelector,useDispatch

   利用 Context 获取到 store 实例进行操作
