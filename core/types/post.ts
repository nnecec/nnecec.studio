export type Post = {
  content: string
  date?: string
  description?: string
  excerpt?: string
  headings?: Heading[]
  marp?: boolean
  next?: Post
  originContent: string
  prev?: Post
  slug?: string
  status?: number
  tags?: string[]
  title?: string
}

export type Heading = {
  id: string
  level: number
  title: string
}
