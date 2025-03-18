// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    // '@nuxtjs/sitemap',
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
    token: 'fbd0a13f6db34e2aa3f50a6b20bd174a',
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

  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },

  runtimeConfig: {
    // Keys within public, will be also exposed to the client-side
    public: {
      vuePdfViewerLicenseKey: '20f433a9-1401-4652-a6cc-7a9d909f13e1'
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
