import { getAllPages, getPage, getEntryById } from '../../lib/api'
import Stage from '../../components/m-stage'
import ModuleRenderer from '../../components/moduleRenderer'

const Page = ({ page }) => {
  const { items } = page
  const { fields } = items.length > 0 && items[0]
  const { stage, content } = fields

  return (
    <>
      {stage && (
        <Stage headline={stage.fields.headline} layout={stage.fields.layout} />
      )}

      {content.map((module) => (
        <ModuleRenderer key={module.sys.id} {...{ module }} />
      ))}
    </>
  )
}

export async function getStaticPaths() {
  const pages = (await getAllPages()) ?? []
  const paths = pages.map((page) => ({
    params: { slug: page.fields.slug },
  }))

  return { paths: paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const page = (await getPage(params.slug)) ?? []

  return { props: { page } }
}

export default Page
