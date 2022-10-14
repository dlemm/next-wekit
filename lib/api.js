const POST_GRAPHQL_FIELDS = `
slug
title
coverImage {
  url
}
date
author {
  name
  picture {
    url
  }
}
excerpt
content {
  json
  links {
    assets {
      block {
        sys {
          id
        }
        url
        description
      }
    }
  }
}
`

async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json())
}

function extractPost(fetchResponse) {
  return fetchResponse?.data?.postCollection?.items?.[0]
}

function extractPageEntries(fetchResponse) {
  console.log(fetchResponse)
  return fetchResponse?.data?.tPageCollection?.items
}

// export async function getPreviewPostBySlug(slug) {
//   const entry = await fetchGraphQL(
//     `query {
//       postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
//         items {
//           ${POST_GRAPHQL_FIELDS}
//         }
//       }
//     }`,
//     true
//   )
//   return extractPost(entry)
// }

// export async function getAllPostsWithSlug() {
//   const entries = await fetchGraphQL(
//     `query {
//       postCollection(where: { slug_exists: true }, order: date_DESC) {
//         items {
//           ${POST_GRAPHQL_FIELDS}
//         }
//       }
//     }`
//   )
//   return extractPostEntries(entries)
// }

export async function getAllPages() {
  const entries = await fetchGraphQL(
    `query {
       tPageCollection {
          total
          items {
            internalName
            title
            slug
            parentPage {
              __typename
            }
            seo {
              internalName
              title
              description
              shareImage {
                title
                description
                contentType
                fileName
                size
                url
                width
                height
              }
              noIndex
              noFollow
            }
          }
        }
      }`,
  )
  return extractPageEntries(entries)
}

// export async function getPostAndMorePosts(slug, preview) {
//   const entry = await fetchGraphQL(
//     `query {
//       postCollection(where: { slug: "${slug}" }, preview: ${
//       preview ? 'true' : 'false'
//     }, limit: 1) {
//         items {
//           ${POST_GRAPHQL_FIELDS}
//         }
//       }
//     }`,
//     preview
//   )
//   const entries = await fetchGraphQL(
//     `query {
//       postCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
//       preview ? 'true' : 'false'
//     }, limit: 2) {
//         items {
//           ${POST_GRAPHQL_FIELDS}
//         }
//       }
//     }`,
//     preview
//   )
//   return {
//     post: extractPost(entry),
//     morePosts: extractPostEntries(entries),
//   }
// }