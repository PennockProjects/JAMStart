// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: {name: 'page', mode: 'out-in'}
  },

  colorMode: {
    classSuffix: ''
  },

  compatibilityDate: '2024-08-13',

  content: {
    markdown: {
      anchorLinks: false,
      remarkPlugins: ['remark-unwrap-images']
    },
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: 'min-light',
        // Theme used if `html.dark`
        dark: 'min-dark',
        // Theme used if `html.sepia`
        // sepia: 'monokai'
      },
      langs: [ 
        'json', 'js', 'typescript', 'html', 'css', 'vue', 'shell', 'mdc', 'markdown', 'yaml',
        'asm', 'c', 'cpp', 'python', 'reg', 'terraform']
    }
  },

  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    "@nuxt/content",
    "@nuxt/image",
    '@stefanobartoletti/nuxt-social-share'
  ],

  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  },

  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },

  socialShare: {
    baseUrl: 'https://pennockprojects.com'
  }
})