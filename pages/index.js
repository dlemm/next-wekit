import { createClient } from 'contentful'
import Head from 'next/head'
import Link from 'next/link'
import Stage from '../modules/m-stage/Stage'
import stageImage from '../public/images/coffee.jpg'
import styles from '../modules/m-stage/Stage.module.scss'

export default function Index(props) {
  const { allPages } = props

  return (
    <>
      <Head>
        <title>next weKit</title>
        <meta
          name="description"
          content="Proof-of-Concept: Incremental Static Regeneration and wekit data model"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stage
        headline="Incremental Static Regeneration"
        image={stageImage}
      />
      <ul className={styles.list}>
        {allPages.map((page) => (
          <li key={page.sys.id} className={styles.listItem}>
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
