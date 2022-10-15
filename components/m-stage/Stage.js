const Stage = ({ headline }) => {
  return (
    <section className="m-stage">
      <div className="m-stage__inner">
        <div className="m-stage__headline">
          <h1 className="m-stage__title">{headline}</h1>
        </div>
      </div>
    </section>
  )
}

export default Stage
