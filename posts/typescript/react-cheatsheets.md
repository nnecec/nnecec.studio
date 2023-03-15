---
title: 'TypeScript × React'
date: '2023-03-15'
tags: ['TypeScript', 'React']
description: ''
---

## 前言

本文为 [typescript-cheatsheets/react: Cheatsheets for experienced React developers getting started with TypeScript](https://github.com/typescript-cheatsheets/react) 总结。

## Basic

- 优先使用 `interface` 声明组件 Props，用户可以在需要的时候轻易的拓展 Props。当 `interface` 满足不了或需要限制用户扩展的情况下，使用 type 声明。
- 不要在 Function Component 中使用 `React.FC<Props>`，直接设置 `(props: Props) => {}`。
- 不使用 `defaultProps`，通过解构赋值实现默认值设置。
- 鉴于 Class Component 的不再流行，本文不关心 Class Component 类型如何编写。
- Hooks

  - useState: 可以推导类型，但你仍可以声明类型 `useState<Post>({})`。
  - useEffect: 本身接受的返回值为函数或`undefined`，使用箭头函数简写时需注意是否返回了其他类型的返回值。
  - useRef: 当使用于 HTML 元素时，无需处理 null 的情况，如 `useRef<HTMLInputElement>(null)`。当用于保存值时，需处理其他类型的情况，如 `useRef<number | null>(null)`
  - 自定义 Hook: 当你参考 `useState` 实现的 `useTheme` 返回了 `[theme, setTheme]` 作为返回值时，类型系统会将返回值认为是包含了 `string` 和 `Dispatch<SetStateAction<string>>` 的数组，返回值的每一个子项都被认为可能是这两种类型之一，从而无法正确对应类型。你可以使用 const 断言返回值 `[theme, setTheme] as const` 或显示声明返回值类型 `[theme, setTheme] as [string, Dispatch<SetStateAction<string>>]` 来解决这个问题。建议返回值大于 2 个的自定义 Hooks 优先使用对象而不是数组。

- Context：如果没有默认值，需显式指定为 `null`，如 `createContext<User | null>(null)`。

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
