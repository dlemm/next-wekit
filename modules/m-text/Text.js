const Text = (props) => {
  const { content } = props

  return (
    <>
      <h3>This is the M-Text module</h3>
      <p>The internal name in Contentful is {content.fields.internal_name} </p>
    </>
  )
}

export default Text
