import { SITE_CONFIG } from 'utils/constants'
import { Text, Avatar } from '@nextui-org/react'

const { author, description } = SITE_CONFIG

export const Bio = () => {
  return (
    <div className="flex justify-center gap-4 align-middle">
      <Avatar src="/assets/profile-pic.jpg" squared />
      <div>
        <Text size={12}>{author.name}</Text>
        <Text size={12}>{description}</Text>
      </div>
    </div>
  )
}
