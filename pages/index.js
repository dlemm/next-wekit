import { createClient } from 'contentful'
import Head from 'next/head'
import Link from 'next/link'

export default function Index(props) {
  const { allPages } = props

  return (
    <>
      <Head>
        <title>next weKit</title>
        <meta
          name="description"
          content="Proof-of-Concept: Netlify On-Demand Builders vs SSG on a NextJS app "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>Incremental Static Regeneration</h2>
      <ul>
        {allPages.map((page) => (
          <li key={page.sys.id}>
            <Link href={page.fields.slug}>{page.fields.title}</Link>
          </li>
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
