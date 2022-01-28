import cls from 'classnames'

export const Toc = props => {
  const { toc, className } = props
  return (
    <nav
      dangerouslySetInnerHTML={{ __html: toc }}
      className={cls(className, 'anchors')}
    />
  )
}
