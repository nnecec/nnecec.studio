'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/libs/ui'

export const TagPicker = ({ tags }: { tags: string[] }) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const tag = searchParams.get('tag') ?? ''

  return (
    <Select
      onValueChange={value => (value === 'all' ? router.replace('/posts') : router.replace(`/posts?tag=${value}`))}
      value={tag}
    >
      <SelectTrigger className="w-[300px]">
        <SelectValue placeholder="# All" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all"># All</SelectItem>
        {tags.map(tag => (
          <SelectItem key={tag} value={tag}>
            # {tag}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
