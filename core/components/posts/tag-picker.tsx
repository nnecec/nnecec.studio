'use client'
import { useSearchParams, useRouter } from 'next/navigation'

export const TagPicker = ({ tags }: { tags: string[] }) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const tag = searchParams.get('tag') ?? ''

  return (
    <select
      className="select-primary select w-full max-w-xs"
      value={tag}
      onChange={e => {
        const value = e.target.value
        console.log(value)
        value === '' ? router.replace(`/posts`) : router.replace(`/posts?tag=${e.target.value}`)
      }}
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
