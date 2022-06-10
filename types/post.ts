export type Post = {
  marp?: boolean
  slug?: string
  title?: string
  date?: string
  content?: string
  tags?: string[]
  description?: string
  excerpt?: string
  prev?: Post
  next?: Post
}
