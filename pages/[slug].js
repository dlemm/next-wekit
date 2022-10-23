import { createClient } from 'contentful'
import ModuleRenderer from '../components/moduleRenderer/ModuleRenderer'

export default function Page(props) {
  const { page } = props
  return (
    <>
      <h1>this is the {page.fields.title} page</h1>
      <p>The following modules are rendered via a module renderer that allowes dynamic content on the pages.</p>
      {page?.fields?.content && page.fields.content.map((module) => (
        <ModuleRenderer key={module.sys.id} module={module} />
      ))}
    </>
  )
}

export async function getStaticPaths() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    environment: process.env.CONTENTFUL_ENVIRONMENT_ID,
  })

  const pages = await client.getEntries({
    content_type: 't-page',
  })

  const { items } = pages
  const paths = items.length && items?.map((page) => ({
    params: { slug: page.fields.slug },
  }))

  // return { paths, fallback: false }
  return { paths, fallback: false }
}

export async function getStaticProps(context) {
  const { slug } = context.params
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    environment: process.env.CONTENTFUL_ENVIRONMENT_ID,
  })

  // get all Pages
  const pageBySlug = await client.getEntries({
    content_type: 't-page',
    'fields.slug': slug,
  })

  const page = pageBySlug?.items[0] || null

  return {
    props: {
      page: page,
    },
    revalidate: 10,
  }
}
