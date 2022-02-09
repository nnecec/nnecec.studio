type PostType = {
  slug: string
  title: string
  date: string
  ogImage: {
    url: string
  }
  content: string
  tags?: string[]
  description?: string
  excerpt?: string
}

export default PostType
