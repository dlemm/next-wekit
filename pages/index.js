import { createClient } from 'contentful'

export default function Index(props) {
  const { allPages } = props

  return (
    <>
      <h2>Stale while revalidate Test</h2>
      <ul>
        {allPages.map((page) => (
          <li key={page.sys.id}>{page.fields.internal_name}</li>
        ))}
      </ul>
    </>
  )
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    environment: process.env.CONTENTFUL_ENVIRONMENT_ID,
  })

  // get all Pages
  const pages = await client.getEntries({
    content_type: 't-page',
  })
  const allPages = pages.items

  return {
    props: {
      allPages: allPages,
    },
    revalidate: 10,
  }
}
