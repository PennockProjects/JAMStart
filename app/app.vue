<script setup>

const metaDefaults = {
  isProdEnv: process.env.NODE_ENV === "production",
  siteName: 'JAMStart',
  title: 'JMSTseoTitle',
  description: 'JMSTseoDescription',
  author: 'JMSTseoAuthor',
  creator: 'JMSTseoCreator',
  rootUrl: "https://JMSTsiteURL.com",
  robots: 'index, follow',
  copyright: '© [JMSTcopyrightYears] [JMSTcopyrightName]',
  ogType: 'article',
  imageRoot: '/images',
  image2x1: '/images/JMSTimage2x1.jpg',
  image2x1Width: 1200,
  image2x1Height: 600,
  image1x1: '/images/JMSTimage1x1.png',
  image1x1Width: 1024,
  image1x1Height: 1024,
  imageAlt: 'JAMStart Logo',
  twitterCard: 'summary_large_image',
  twitterSiteHandle: '@JMSTsiteHandleX',
  twitterCreatorHandle: '@JMSTcreateHandleX'
}

// allow children components readonly access to social defaults.
provide("metaDefaults", metaDefaults);

useHead({
  titleTemplate: (titleChunk) => {
    return (titleChunk && (titleChunk != metaDefaults.title)) ? `${titleChunk} - ${metaDefaults.title}` : metaDefaults.title;
  },
  htmlAttrs: {
    lang: 'en'
  },
  link: [
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
      href: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap',
      crossorigin: ''
    }
    // JMSTfont end default Font
  ]
})

// Setting Global SEO on each page
useSeoMeta({
  robots: metaDefaults.robots,
  copyright: metaDefaults.copyright
})

</script>

<!-- Use NuxtLayout -->
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<!-- Global Styles -->
<!-- JMSTfont replace 'Open Sans' with your Google Font pre-connected global font-family name -->
<style>
body {
  font-family: 'Rubik', sans-serif;
}
/* Most global classes are found at 'app/assets/css/main.css' */

</style>