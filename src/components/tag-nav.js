import { Tag } from './tag'

export const TagNavigation = (props) => {
  const { tags } = props
  return (
    <nav
      className="anchors p-8"
    >
      <ul>
        {
          tags.map(({ tag }) => <li>
            <p><a href="/">{tag}</a></p>
          </li>)
        }
      </ul>
    </nav>
  )
}