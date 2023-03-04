import dayjs from 'dayjs'
import matter from 'gray-matter'
import fs from 'node:fs'
import { join } from 'node:path'

import type { Post } from '~/types/post'

const postsDirectory = join(process.cwd(), 'posts')

export function getPostSlugs(directoryPath: string) {
  const slugs: string[] = []

  function map(directoryPath: string, baseURL = '') {
    const files = fs.readdirSync(directoryPath)
    for (const file of files) {
      if (!/(^|\/)\.[^./]/g.test(file)) {
        const filePath = join(directoryPath, file)
        const stats = fs.statSync(filePath)
        const slug = `${baseURL}/${file}`
        if (stats.isDirectory()) {
          map(filePath, slug)
        } else if (stats.isFile()) {
          slugs.push(slug)
        }
      }
    }
  }

  map(directoryPath)
  return slugs
}

export function getPosts(slug: string) {
  if (slug.endsWith('.md')) {
    return getPost(slug.replace(/\.md$/, ''))
  }
}

export function getAllPosts(tag?: string) {
  const slugs = getPostSlugs(postsDirectory)

  const tags: string[] = []

  const posts = slugs
    .map(slug => {
      const data = getPosts(slug)
      if (data?.tags) {
        tags.push(...data.tags)
      }

      if (tag) {
        if (data?.tags?.includes(tag)) {
          return data
        }
        return null
      }
      return data
    })
    .filter(Boolean)
    .sort((post1, post2) =>
      dayjs(post1.date).isAfter(dayjs(post2.date)) ? -1 : 1,
    )
  return {
    posts,
    tags: [...new Set(tags)].sort((a, b) => a.localeCompare(b)),
  }
}

export function getPost(slug: string): Post {
  const fullPath = join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const item: Post = {
    ...data,
    slug,
    content,
  }
  return item
}
