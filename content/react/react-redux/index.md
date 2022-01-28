---
title: "React Redux 源码解析"
date: "2021-11-25"
tags: ["Deep Dive", "React"]
description: "React Redux 源码解析"
---

> 当时版本：v8.0.0-beta

首先是基于了解基本使用方式的程度，来看各个组件的源码，由于代码量比较大这里贴出官网的 [quick-start](https://react-redux.js.org/tutorials/quick-start)

## Provider

首先要提供给 `Provider` 一个合法的 store 实例，Provider 是一个 `Context.Provider`，`props` 上的 `store` 值为

```jsx
// value 属性存储的值
{
  store,
  subscription,
}
```

`store` 是传给 `Provider` 的 `store props`，`subscription` 则通过 `createSubscription(store)` 方法生成。

在 `Provider` 内使用 `Redux` 数据的组件有两种接入的方法：

1. 使用 `connect` 返回包装后的高阶组件
2. 在 `FunctionComponent` 内使用 `useSelector`, `useDispatch` 获取 `store` 及 `dispatch`

## connect

> https://github.com/reduxjs/react-redux/blob/449b84c668/src/components/connect.tsx#L461

先了解一下 `connect` 的[API](https://react-redux.js.org/api/connect)。

```ts
function connect(
  mapStateToProps?,
  mapDispatchToProps?,
  mergeProps?,
  options?
) {}

connect(mapState, null, mergeProps, options)(Component)
```

`connect()(Component)` 对包裹的 `Component` 做了如下操作：

- 生成一个新的组件
- 将第一个小括号内的配置作为参数提供给 `connect` 返回的闭包方法 `wrapWithConnect`
- `wrapWithConnect` 将计算后的 `actualChildProps` 提供给 `WrappedComponent`
- 将 Component 的静态方法复制到新的组件上(hoist-non-react-statics 过滤 React 原生属性)

经过这些步骤，将被 `connect` 的 `Component` 包装成一个 订阅 `store` 的 `NewComponent`。

### mapStateToProps, mapDispatchToProps

在业务中我们常写这样的代码：

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

这些配置在 `connect` 会经过下列处理

```ts
const initMapStateToProps = match(
  mapStateToProps,
  defaultMapStateToPropsFactories,
  "mapStateToProps"
)!
```

第二个参数是方法数组 `factories` ，`match` 将第一个参数作为 `factories` 每个方法的参数进行调用，如果有返回值则直接返回计算结果。

> initMapStateToProps -> factories[1](mapStateToProps) -> whenMapStateToPropsIsFunction(mapStateToProps) -> initProxySelector

同理 `initMapDispatchToProps`, `initMergeProps` 最后也是被赋值为 `initProxySelector`。

先把该环节跳过，后面会回头来看这个结果的作用。接下来进入到 `wrapWithConnect` 方法

### wrapWithConnect

在 connect 中，主要的逻辑实现在这个 `wrapWithConnect` 方法中。

该方法经过下列处理，返回了经过包装的 `ConnectFunction` 组件，`ConnectFunction` 的组件实现是用户定义的 `Component`，但 `ConnectFunction` 中最终混入了 `Connect` 的逻辑以完成订阅 `store` 的功能。

```ts
const wrapWithConnect: AdvancedComponentDecorator<
  TOwnProps,
  WrappedComponentProps
> = WrappedComponent => {
  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || "Component"
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

#### ConnectFunction

```ts
function ConnectFunction<TOwnProps>(props: ConnectProps & TOwnProps) {
  // 获取 Component 自己的 props，可能存在的 context 和 wrapWithConnect 提供的 ref
  const [propsContext, reactReduxForwardedRef, wrapperProps] = useMemo(() => {
    // ...
  }, [props])

  // 如果该节点是 Context.Consumer 使用该 Context
  const ContextToUse: ReactReduxContextInstance = useMemo(() => {
    // ...
  }, [propsContext, Context])

  // 获取 contextValue
  const contextValue = useContext(ContextToUse)

  // 确认 store 来源
  const didStoreComeFromProps =
    Boolean(props.store) &&
    Boolean(props.store!.getState) &&
    Boolean(props.store!.dispatch)
  const didStoreComeFromContext =
    Boolean(contextValue) && Boolean(contextValue!.store)
  const store: Store = didStoreComeFromProps
    ? props.store!
    : contextValue!.store

  // 根据订阅的 store 数据精确更新渲染组件
  // ...

  let actualChildProps: unknown

  try {
    // 将 第1个参数作为 useEffect 方法执行，第2个参数执行的结果为 actualChildProps
    actualChildProps = useSyncExternalStore(
      subscribeForReact,
      actualChildPropsSelector,
      actualChildPropsSelector
    )
  } catch (err) {
    if (latestSubscriptionCallbackError.current) {
      ;(
        err as Error
      ).message += `\nThe error may be correlated with this previous error:\n${latestSubscriptionCallbackError.current.stack}\n\n`
    }

    throw err
  }

  useIsomorphicLayoutEffect(() => {
    latestSubscriptionCallbackError.current = undefined
    childPropsFromStoreUpdate.current = undefined
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

### Subscription

在 ConnectFunction 有一段关于 store 订阅数据的处理方法，下面逐一解读。

```ts
// ...
const childPropsSelector = useMemo(() => {
  return defaultSelectorFactory(store.dispatch, selectorFactoryOptions)
}, [store])

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

这里终于用上了之前生成的 initMapStateToProps, initMapDispatchToProps(initProxySelector) 等方法，其实就是返回了 initProxySelector 生成的 proxy，然后当作 selectorFactory 的参数进行调用。最终通过 selectorFactory 返回了 pureFinalPropsSelector。

(pureFinalPropsSelector 则根据用户自定义的 mapStateToProps 将 store 中的 nextState 生成下一次更新时的 props 返回 (mapDispatchToProps 同理)。)

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
const lastWrapperProps = useRef(wrapperProps) // NewComponent 上一次接收到的 props
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

// 获取 childPropsSelector
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
    // 比对前后 childProps 如果不一致则调用 reactListener 触发更新
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

在 [redux](/infra/state-management/redux) 中，我们知道， redux 是通过 `store.subscribe` 添加订阅的。

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

生成的 `subscription` 拥有 `handleChangeWrapper` , `trySubscribe`。

在 `subscribeUpdates` 中 `trySubscribe` 被赋值为 `checkForUpdates`， 这个方法就是上文中提到的**检查前后 childProps 如果不一致则调用 `reactListener` 触发更新**。

## useSelector, useDispatch

在 `Provider` 和 `connect` 方法中，使用的都是内部 `ReactReduxContext` 或同一个外部传入的 `context`，所以在 `useSelector` 中很自然要利用这个 `Context` 获取 `store`，并根据配置获取精确的值。

`useDispatch` 则是通过 `useStore` 获取 `store`，然后直接返回 `store.dispatch`。([redux](/infra/state-management/redux) 中介绍过 store 的能力)

## 总结

React Redux 基于 Redux 提供的状态管理功能，在 React 生态下提供了：

- Provider： 利用 Context 下发 store 数据
- connect: 利用高阶函数包装用户定义的组件，并且根据用户的配置，精确筛选 Context 中 store 需要的值作为 props 传入。在该方法中，利用了 `store.subscribe` 向 store 添加了状态变更的订阅，在 store 发生变更时，触发 connect 的订阅方法去对比两次生成的 `childProps` 是否发生了变化，如果前后的值不相等则触发 React 提供的 `forceUpdate` 方法更新组件。
- useSelector,useDispatch: 利用 Context 获取到 store 进行操作。

> 在 v8.0 中，可以看到 React Redux 利用 React@18 提供的新的 hooks 方法：
>
> - useSyncExternalStore
> - useSyncExternalStoreWithSelector
