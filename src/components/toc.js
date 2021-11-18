export const Toc = (props) => {
  const { toc } = props
  return (
    <nav
      dangerouslySetInnerHTML={{ __html: toc }}
      className="anchors p-8"
    />
  )
}