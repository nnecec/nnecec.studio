'use client'
import { useRouter, useSearchParams } from 'next/navigation'

export const TagPicker = ({ tags }: { tags: string[] }) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const tag = searchParams.get('tag') ?? ''

  return (
    <select
      onChange={e => {
        const value = e.target.value
        value === '' ? router.replace(`/posts`) : router.replace(`/posts?tag=${e.target.value}`)
      }}
      className="block w-full max-w-xs border-separate rounded-lg border bg-background p-2.5 text-sm text-foreground"
      value={tag}
    >
      <option value=""># All</option>
      {tags.map(tag => (
        <option key={tag} value={tag}>
          # {tag}
        </option>
      ))}
    </select>
  )
}
