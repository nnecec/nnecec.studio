import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import dayjs from 'dayjs'
import { Post } from 'types/post'

type Field = keyof Post

const postsDirectory = join(process.cwd(), 'content')

export function getPostSlugs(directoryPath: string) {
  const slugs: string[] = []

  function map(directoryPath: string, baseURL: string = '') {
    const files = fs.readdirSync(directoryPath)
    files.forEach(file => {
      if (!/(^|\/)\.[^/.]/g.test(file)) {
        const filePath = join(directoryPath, file)
        const stats = fs.statSync(filePath)
        const slug = `${baseURL}/${file}`
        if (stats.isDirectory()) {
          map(filePath, slug)
        } else if (stats.isFile()) {
          slugs.push(slug)
        }
      }
    })
  }

  map(directoryPath)
  return slugs
}

export function getPosts(slug: string, fields: Field[] = []) {
  if (slug.endsWith('.md')) {
    return getPost(slug.replace(/\.md$/, ''), fields)
  }
  return undefined
}

export function getAllPosts(fields: Field[] = []) {
  const slugs = getPostSlugs(postsDirectory)
  const posts = slugs
    .map(slug => getPosts(slug, fields))
    .filter(Boolean)
    .sort((post1, post2) =>
      dayjs(post1!.date).isAfter(dayjs(post2!.date)) ? -1 : 1
    )
  return posts
}

export function getPost(slug: string, fields: Field[] = []) {
  const fullPath = join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items: Partial<Post> = {}

  fields.forEach(field => {
    if (field === 'slug') {
      items[field] = slug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })
  return items
}
