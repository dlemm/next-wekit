This is a [Next.js](https://nextjs.org/) project with the basic content model of the [wekit](https://www.wekit.dev/) in Contentful. It uses [Contentful's Delivery API](https://www.contentful.com/developers/docs/references/content-delivery-api/) to fetch the content and [Next.js's Static Generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended) to render the pages. This project is a POC for using Next.js with Contentful. In addition I'd like to test some Next features like [Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration).

## Getting Started

### Install dependencies

```bash
npm install
```
### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

In order to see the content you need to create a `.env` file in the root of the project and add the Contentful space ID and access tokens to it.

### Incremental Static Regeneration

To test the Incremental Static Regeneration feature run the development server or visit the [deployed version](https://nextjs-contentful-wekit.vercel.app/) and wait for 10 seconds. Then change the order of the modules on a page or the Internal name of a text module ( `/text-module` ). You should see the changes after 5 seconds or with a refresh of the page.


### Module renderer
In order to render the module based pages like it's used to be in the wekit setup I needed to have a module renderer that is reacting and dynamically stacking together the pages. It takes the `contentTypeId` of the module and renders the corresponding module located in the `components/modules` folder. 

### Building the pages
I've tried to work with GraphQL and also with the [contentful-ssg](https://www.npmjs.com/package/@jungvonmatt/contentful-ssg)-package but this given setup now seems to work more easy and straight forward.


### To Dos

- [] Develop working modules like text or stage that is using data from Contenful
- [] Add more features that are already implemented in the wekit
- [] Add more modules
- [] Add more pages
- [] Add tests
- [] Add more documentation
- [] Test some Next.js 13 features