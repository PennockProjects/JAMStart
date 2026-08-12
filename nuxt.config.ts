import pkg from './package.json';
import { defineNuxtConfig } from 'nuxt/config';
import { siteDefaults, headDefaults } from './shared/utils/siteDefaults';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/sitemap', // <-- Must be before @nuxtjs/content
    "@nuxt/content",
    '@nuxt/eslint',
    '@nuxt/scripts',
    '@nuxtjs/color-mode',
    '@nuxtjs/mdc',
    '@nuxtjs/tailwindcss',
    '@stefanobartoletti/nuxt-social-share',
  ],

  app: {
    pageTransition: {name: 'page', mode: 'out-in'},
    head: {
      htmlAttrs: headDefaults.htmlAttrs,
      link: headDefaults.links,
      meta: headDefaults.meta,
    }
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
            'asm', 'c', 'cpp', 'css', 'html', 'js', 'json', 'markdown', 'mdc', 'python', 'reg', 'shell', 'terraform', 'ts', 'typescript', 'vue', 'yaml'
          ]
        },
        remarkPlugins: {
          'remark-unwrap-images': {}
        },
        toc: {
          depth: 2,
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
      crawlLinks: true
    }
  },

  $production: {
    scripts: {
      registry: {
        cloudflareWebAnalytics: {
          token: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4',
          trigger: 'onNuxtReady',
          proxy: false,
          bundle: false
        }
      }
    },
  },

  router: {
    options: {
      scrollBehaviorType: 'smooth'
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

  site: { 
    url: siteDefaults.siteProductionUrl,
    name: siteDefaults.siteName,
  },

  sitemap: {
    zeroRuntime: true,
  },

  socialShare: {
    baseUrl: siteDefaults.siteProductionUrl
  },

  sourcemap: {
    client: true
  },

  vite: {
    optimizeDeps: {
      include: [
        'remark-unwrap-images',
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'zod'
      ]
    }
  }
})