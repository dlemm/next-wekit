import { getAllPages, getPage } from '../lib/api'

const Page = ({ page }) => {
  const { items } = page
  const { fields } = items.length > 0 && items[0]
  return (
    <>
      <h2>{fields.title}</h2>
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
