<script setup>

const metaDefaults = {
  isProdEnv: process.env.NODE_ENV === "production",
  siteName: 'JAMStart',
  title: 'JAMStart',
  description: 'JAMStart is a template for a Nuxt.js Static Site Generated with Markdown content',
  author: 'JAMStart Author Name',
  creator: 'JAMStart',
  rootUrl: "https://placeholder.jamstart.com",
  robots: 'index, follow',
  copyright: '© 2025 JAMStart',
  ogType: 'article',
  imageRoot: '/images',
  image2x1: '/images/PennockProjectsFB.jpg',
  image2x1Width: 1200,
  image2x1Height: 600,
  image1x1: '/images/PennockProjectsLogo.png',
  image1x1Width: 800,
  image1x1Height: 800,
  imageAlt: 'JAMStart Logo',
  twitterCard: 'summary_large_image',
  twitterSiteHandle: '@SiteXJAMStartHandle',
  twitterCreatorHandle: '@AuthorXJAMStartHandle'
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
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
      crossorigin: ''
    }
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
<style>
body {
  font-family: 'Roboto';
}

/* text and background for light and dark modes */
body {
  @apply bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300
}

/* alert colors */
.info {
  @apply inline-block px-5 py-1 bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-blue-200 border-t-4 border-blue-500
}

.danger {
  @apply inline-block px-5 py-1 bg-red-100 dark:bg-red-700 text-red-700 dark:text-red-200 border-t-4 border-red-500
}

.warn {
  @apply inline-block px-5 py-1 bg-yellow-100 dark:bg-yellow-700 text-yellow-700 dark:text-yellow-200 border-t-4 border-yellow-500
}

.success { 
  @apply inline-block px-5 py-1 bg-green-100 dark:bg-green-700 text-green-700 dark:text-green-200 border-t-4 border-green-500
}



/* code block remove last extraneous line  */
.prose code::before, .prose code::after {
  content: "";
}

/* code blocks styling for font  */
.prose code:not(pre *) {
  @apply px-1.5 py-1 m-0 rounded
}

/* code blocks styling for light modes  */
.prose code {
  @apply text-black dark:text-white font-mono
}

/* line numbers in code blocks  */
code {
  counter-reset: step;
  counter-increment: step 0;
}

code .line::before {
  content: counter(step);
  counter-increment: step;
  width: 1rem;
  margin-right: 1.5rem;
  display: inline-block;
  text-align: right;
  @apply text-gray-300 dark:text-gray-500
}

/* Page Transitions */
.page-enter-active {
  animation: bounce-in .7s;
}

.page-leave-active {
  animation: bounce-out .5s;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(0);
  }
}
</style>