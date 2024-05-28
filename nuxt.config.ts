// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: {name: 'page', mode: 'out-in'}
  },
  colorMode: {
    classSuffix: ''
  },
  content: {
    markdown: {
      anchorLinks: false
    },
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: 'min-light',
        // Theme used if `html.dark`
        dark: 'min-dark',
        // Theme used if `html.sepia`
        // sepia: 'monokai'
      }
    }
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    "@nuxt/content",
    "@nuxt/image"
  ],
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  }
})