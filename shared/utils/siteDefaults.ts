import type { UseSeoMetaInput } from '@unhead/vue'

// DEFAULTS SECTION

// Define the type for the default SEO metadata
export type SiteDefaults = {
  siteCopyright: string
  siteName: string
  siteProductionUrl: string
  title: string
  title_og_brand: string
  title_x_brand: string
  description: string
  author: string
  imageLandscape: string
  imagePortrait: string
  imageSquare: string
  imageAlt: string
  ogType: UseSeoMetaInput['ogType']
  ogAuthoredType: UseSeoMetaInput['ogType']
  robots: string
  rootUrl: string
  twitterCard: UseSeoMetaInput['twitterCard']
  twitterSiteHandle: string
  twitterCreatorHandle: string
}

// Static data that doesn't need to be reactive can just be stored in a simple exported object, such as this defaults object for SEO metadata. This allows us to easily import and use these defaults in any page component or utility function, such as the setSEO function which merges page frontmatter with these defaults to create the final head and SEO metadata for each page.
export const siteDefaults: SiteDefaults = {
  siteName: 'JAMStart',
  siteProductionUrl: 'https://JMSTprodURL',
  siteCopyright: '© 2024-2026 Pennock Projects',
  title: 'JMSTdefaultTitle',
  title_og_brand: 'JMSTOgBrand - ',
  title_x_brand: 'JMSTTwitterBrand - ',
  description: 'JMSTdefaultDescription',
  author: 'JMSTdefaultAuthor',
  imageLandscape: '/images/JMSTimageLandscape.png',
  imageSquare: '/images/JMSTimageSquare.png',
  imagePortrait: '/images/JMSTimagePortrait.jpg',
  imageAlt: 'JAMStart Logo',
  ogType: 'website', // Default ogType is 'website', but if the page has an author, we will use ogAuthoredType, i.e. 'article' instead. This is handled in the setSEO function.
  ogAuthoredType: 'article',
  // Social share sites prefer images to have full URLs, so we can use the rootUrl to construct full image URLs for Open Graph and Twitter Card images. The rootUrl is set to the production site URL when running in production, and an empty string when running in development so that we can use relative image paths for local development and testing.
  rootUrl: import.meta.env.PROD ? "https://JMSTsiteURL.com" : "",
  robots: 'index, follow',
  twitterCard: 'summary_large_image',
  twitterSiteHandle: '@JMSTsiteHandleX',
  twitterCreatorHandle: '@JMSTcreatorHandleX'
}

// Define the type for the default SEO metadata
export type HeadDefaults = {
  htmlAttrs: Record<string, string>
  links: Array<Record<string, string>>
  meta: Array<Record<string, string>>
}


export const headDefaults: HeadDefaults = {
  // Global head defaults - these are used in `nuxt.config.ts` `app.head` configuration, mostly for global meta tags and link tags that are used across the site, such as the favicon and Google Fonts link tags.
  htmlAttrs: {
    lang: 'en',
  },
  links: [
    // The various favicons
    // translate html link elements to objects.
    // for example an html link element:
    //      <link rel="shortcut icon" href="/favicon.ico" />
    // becomes:
    //      { rel: 'shortcut icon', href: '/favicon.ico' }

    // JMSTfavIcon start favicons
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      type: 'image/png',
      href: '/apple-touch-icon.png'
    },
    {
      rel: 'icon',
      sizes: '32x32',
      type: 'image/png',
      href: '/favicon-32x32.png'
    },
    {
      rel: 'icon',
      sizes: '16x16',
      type: 'image/png',
      href: '/favicon-16x16.png'
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest'
    },
    // JMSTfavIcon end favicons

    // Preconnect to Google Fonts
    // preconnect helps speed up font loading.
    // If you would like to use a different Google Font,
    // go to https://fonts.google.com/, select your font,
    // and then click on "Embed" to get the appropriate link tags.
    // Replace the following two link objects with the ones provided by Google Fonts.
    // Make sure to keep the 'preconnect' link for best performance.

    // JMSTfont start default Font
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: ''
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap',
      crossorigin: ''
    }
    // JMSTfont end default Font
  ],
  meta: [
    {
      name: 'robots',
      content: 'index, follow'
    },
    {
      name: 'copyright',
      content: siteDefaults.siteCopyright
    }
  ]
}

