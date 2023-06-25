import fs from 'node:fs/promises'
import { join } from 'node:path'

import dayjs from 'dayjs'
import matter from 'gray-matter'

import type { Post } from '~/core/types/post'

const postsDirectory = join(process.cwd(), 'posts')

export async function getPostSlugs(directoryPath: string) {
  const slugs: string[] = []

  async function map(directoryPath: string, baseURL = '') {
    const files = await fs.readdir(directoryPath)
    for (const file of files) {
      if (!/(^|\/)\.[^./]/g.test(file)) {
        const filePath = join(directoryPath, file)
        const stats = await fs.stat(filePath)
        const slug = `${baseURL}/${file}`
        if (stats.isDirectory()) {
          map(filePath, slug)
        } else if (stats.isFile() && slug.endsWith('.md')) {
          slugs.push(slug.replace(/\.md$/, ''))
        }
      }
    }
  }

  await map(directoryPath)
  return slugs
}

export async function getAllPosts(tag?: string): Promise<{ posts: Post[]; tags: string[] }> {
  const slugs = await getPostSlugs(postsDirectory)
  const tags: string[] = []

  const posts: Post[] = []
  for (const slug of slugs) {
    const post = await getPost(slug)
    if (post?.tags) {
      tags.push(...post.tags)
    }
    if (tag) {
      if (post.tags?.includes(tag)) {
        posts.push(post)
      }
    } else {
      posts.push(post)
    }
  }

  return {
    posts: posts.sort((post1, post2) => (dayjs(post1.date).isAfter(dayjs(post2.date)) ? -1 : 1)),
    tags: [...new Set(tags)].sort((a, b) => a.localeCompare(b)),
  }
}

export async function getPost(slug: string): Promise<Post> {
  const fullPath = join(postsDirectory, `${slug}.md`)
  const fileContents = await fs.readFile(fullPath, 'utf8')
  const { content, data } = matter(fileContents)
  const item: Post = {
    ...data,
    content,
    originContent: fileContents,
    slug,
  }
  return item
}
