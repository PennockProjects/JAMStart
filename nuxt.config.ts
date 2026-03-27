import pkg from './package.json';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/sitemap', // <-- Must be after @nuxtjs/sitemap
    "@nuxt/content", 
    '@nuxtjs/color-mode', 
    '@nuxtjs/mdc',
    '@nuxtjs/tailwindcss', 
    '@stefanobartoletti/nuxt-social-share', 
    '@nuxt/scripts'
  ],

  app: {
    pageTransition: {name: 'page', mode: 'out-in'}
  },

  colorMode: {
    classSuffix: ''
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
            'json', 'js', 'typescript', 'ts', 'html', 'css', 'vue', 'shell', 'mdc', 'markdown', 'yaml',
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

  css: ['~/assets/css/main.css'],

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

  runtimeConfig: {
    public: {
      version: pkg.version,
      nuxtVersion: pkg.dependencies['nuxt'],
      nuxtContentVersion: pkg.dependencies['@nuxt/content'],
      vueVersion: pkg.dependencies['vue']
    }
  },

  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },

  scripts: {
    registry: {
      cloudflareWebAnalytics: {
        token: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4'
      }
    }
  },

  site: { 
    url: 'https://JMSTprodURL',
    name: 'JMSTprodName'
  },

  sitemap: {
    zeroRuntime: true,
  },

  socialShare: {
    baseUrl: 'https://JMSTprodURL'
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ]
    }
  }
})