import { createClient } from 'contentful'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONMENT_ID,
})

// get all Pages
export async function getAllPages() {
  const pages = await client.getEntries({
    content_type: 't-page',
  })
  const allPages = pages.items
  return allPages
}

export async function getPage(slug) {
  const page = await client.getEntries({
    content_type: 't-page',
    'fields.slug': slug,
  })
  return page
}