import { defineContentConfig, defineCollection} from '@nuxt/content'
import { defineSitemapSchema } from '@nuxtjs/sitemap/content'
import { PageSchema } from './shared/utils/contentDataSchema'

// Add our queryable frontmatter variables to the sitemap schema
const PageSchemaSitemap = PageSchema.extend({
  sitemap: defineSitemapSchema({
    name: 'content',
  })
})

// Use Node.js process.env.NODE_ENV to determine if the environment is production or development when content.config is executed. Vite provides import.meta.env.MODE or import.meta.env.PROD for similar purposes in a Vite context.
const isProd = process.env.NODE_ENV === 'production';

console.log('environment:', isProd ? 'prod' : 'dev')

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: isProd 
        ? {
            include: '**',
            exclude: ['**/_*.md']
          }
        : {
          include: '**',
          },
      schema: PageSchemaSitemap,
    }),
  },
})