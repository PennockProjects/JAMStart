// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/sitemap',
    "@nuxt/content",    // <-- Must be after @nuxtjs/sitemap
    '@nuxtjs/color-mode',
    '@nuxtjs/mdc',
    '@nuxtjs/tailwindcss',
    '@stefanobartoletti/nuxt-social-share',
    'nuxt-cloudflare-analytics'
  ],

  app: {
    pageTransition: {name: 'page', mode: 'out-in'}
  },

  colorMode: {
    classSuffix: ''
  },

  cloudflareAnalytics: {
    token: 'putYourAnalyticsKeyHere',
  },

  compatibilityDate: '2024-12-16',

  content: {
    build: {
      markdown: {
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
            'asm', 'c', 'cpp', 'python', 'reg', 'terraform'
          ]
        },
        remarkPlugins: {
          'remark-unwrap-images': {}
        },
        toc: {
          depth: 3,
        }        
      }
    },
    renderer: {
      anchorLinks: false
    }
  },

  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4
  },

  nitro: {
    prerender: {
      autoSubfolderIndex: false,
      crawlLinks: true,
      routes: ['/sitemap.xml', '/', '/about', '/contact', '/privacy', '/terms']
    }
  },

  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },

  site: { 
    url: 'https://placeholder.jamstart.com',
    name: 'JAMStart'
  },

  socialShare: {
    baseUrl: 'https://placeholder.jamstart.com'
  }
})
