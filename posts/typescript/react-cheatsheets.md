---
title: 'TypeScript × React'
date: '2023-03-15'
tags: ['TypeScript', 'React']
description: ''
---

## Props

- 优先使用 `interface` 声明组件 Props，用户可以在需要的时候轻易的拓展 Props。当 `interface` 满足不了或需要限制用户扩展的情况下，使用 type 声明。
- 不要在 Function Component 中使用 `React.FC<Props>`，直接设置 `(props: Props) => {}`。
- 不使用 `defaultProps`，通过解构赋值实现默认值设置。

## Hooks

- useState: 可以推导类型，但你仍可以声明类型 `useState<Post>({})`。
- useEffect: 本身接受的返回值为函数或`undefined`，使用箭头函数简写时需注意是否返回了其他类型的返回值。
- useRef: 当使用于 HTML 元素时，无需处理 null 的情况，如 `useRef<HTMLInputElement>(null)`。当用于保存值时，需处理其他类型的情况，如 `useRef<number | null>(null)`
- 自定义 Hook: 当你参考 `useState` 实现的 `useTheme` 返回了 `[theme, setTheme]` 作为返回值时，类型系统会将返回值认为是包含了 `string` 和 `Dispatch<SetStateAction<string>>` 的数组，返回值的每一个子项都被认为可能是这两种类型之一，从而无法正确对应类型。你可以使用 const 断言返回值 `[theme, setTheme] as const` 或显示声明返回值类型 `[theme, setTheme] as [string, Dispatch<SetStateAction<string>>]` 来解决这个问题。建议返回值大于 2 个的自定义 Hooks 优先使用对象而不是数组。

## Context

如果没有默认值，需显式指定为 `null`，如 `createContext<User | null>(null)`。

当类型可能为 `null` 时，可通过判断是否为 null 进行使用。或提供一个抽象的 `useUser` 并在方法中进行处理。或明确不会为 `null` : `createContext<User>(null!)`

```ts
const useUser = () => {
  const currentUser = useContext(CurrentUserContext)

  if (!currentUser) {
    throw new Error('useUser has to be used within <CurrentUserContext.Provider>')
  }

  return currentUser
}
```

## Event

- 内联写法可以自动推导出方法类型: `onClick={e => {}}`
- 如果单独声明了方法，需要显示的指定事件类型

  ```ts
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ text: e.currentTarget.value })
  }
  // or
  const onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    this.setState({ text: e.currentTarget.value })
  }
  ```

- 如果不关心具体的事件类型，则可以直接指定为 SyntheticEvent

  ```ts
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
  }
  ```

## Ref

## 常见技巧

### Union Types and Type Guarding

通过联合类型组合类型，通过类型守卫去推断不同的类型

```ts
interface Admin {
  role: string
}
interface User {
  email: string
}

// Method 1: use `in` keyword
function redirect(user: Admin | User) {
  if ('role' in user) {
    // use the `in` operator for typeguards since TS 2.7+
    routeToAdminPage(user.role)
  } else {
    routeToHomePage(user.email)
  }
}

function isAdmin(user: Admin | User): user is Admin {
  return (user as any).role !== undefined
}
```

### Type Assertion

使用 `!` 断言非空 ，使用 `as` 断言类型。

### Intersection Types

使用交叉类型组合复用类型

```ts
type BaseProps = {
  className?: string
  style?: React.CSSProperties
  name: string // used in both
}
type DogProps = {
  tailsCount: number
}
type HumanProps = {
  handsCount: number
}
export const Human = (props: BaseProps & HumanProps) => {}
export const Dog = (props: BaseProps & DogProps) => {}
```

### Inferred Types

通过 typeof 获取类型

```ts
const [state, setState] = useState({
  foo: 1,
  bar: 2,
})

const someMethod = (obj: typeof state) => {

}

export function App = (props: Props) => {}

type P = React.ComponentProps<typeof App> // get Props
```

通过 ReturnType 获取返回类型，通过 Parameters 获取参数类型。

### 处理不存在的类型

使用 `declare module 'MODULE_MANE'` 来拓展第三方依赖中不满足使用的类型。

```ts
declare module '*.png'

import * as logo from './logo.png'
```

## tsconfig

相对于常规 TypeScript 在 React 项目中你可能需要显示配置下列配置

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "jsx": "react-jsx",
    "typeRoots": ["./typings", "./node_modules/@types"]
  }
}
```

## Reference

- [typescript-cheatsheets/react: Cheatsheets for experienced React developers getting started with TypeScript](https://github.com/typescript-cheatsheets/react)
