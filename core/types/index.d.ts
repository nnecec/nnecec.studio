type Falsy = '' | 0 | false | null | undefined

interface Array<T> {
  filter<S extends T>(predicate: BooleanConstructor, thisArg?: any): Exclude<S, Falsy>[]
}

interface ReadonlyArray<T> {
  filter<S extends T>(predicate: BooleanConstructor, thisArg?: any): Exclude<S, Falsy>[]
}
