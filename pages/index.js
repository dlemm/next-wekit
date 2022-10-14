import { fetchGraphQL } from '../lib/api'
import { getAllPages } from '../lib/api'

export default function Index({ preview, allPosts }) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)

  console.log(allPosts)
  return (
    <>
      <h2>Test</h2>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = (await getAllPages(preview)) ?? []
  return {
    props: { preview, allPosts },
  }
}