export type Post = {
  marp?: boolean
  slug?: string
  title?: string
  date?: string
  content?: any
  tags?: string[]
  description?: string
  excerpt?: string
  prev?: Post
  next?: Post
  headings?: Heading[]
}

export type Heading = {
  title: string
  id: string
  level: number
}
