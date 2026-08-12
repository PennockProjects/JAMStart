import { defineContentConfig, defineCollection} from '@nuxt/content'
import { defineSitemapSchema } from '@nuxtjs/sitemap/content'
import { PageSchema } from './shared/utils/contentDataSchema'

// Add our queryable frontmatter variables to the sitemap schema
const PageSchemaSitemap = PageSchema.extend({
  sitemap: defineSitemapSchema({
    name: 'content',
  })
})

const collectionConfig = {
      type: 'page',
      source: {
        include: '**'
      },
      schema: PageSchemaSitemap,
    }
if(import.meta.env.PROD) {
  collectionConfig.source.exclude = ['**/_*.md']  // 👈 Excludes any markdown file starting with an underscore in prod
}

export default defineContentConfig({
  collections: {
    content: defineCollection(collectionConfig),
  },
})