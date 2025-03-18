import { defineContentConfig, defineCollection, z } from '@nuxt/content'
// import { asSitemapCollection } from '@nuxtjs/sitemap/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      source: '**',
      type: 'page',
      // JAMStart custom Markdown Frontmatter Schema
      schema: z.object({
        dateCreated: z.date()
      })
    })
  },
})