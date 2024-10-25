<script setup>

const isProdEnv = process.env.NODE_ENV === "production";
if(!isProdEnv) {
  console.log("========> Development Environment <=============")
}

const socialDefaults = {
  isProdEnv,
  siteName: 'Pennock Projects',
  title: 'Pennock Projects',
  description: 'Pennock Projects is a software engineering blog about front end frameworks, backend services, databases, and AI architecture by John Pennock',
  author: 'John Pennock',
  rootUrl: "https://pennockprojects.com",
  robots: 'index, follow',
  copyright: '© 2024 by John Pennock',
  type: 'article',
  image2x1: '/images/PennockProjectsFB.jpg',
  image2x1Width: 1200,
  image2x1Height: 600,
  image1x1: '/images/PennockProjectsLogo.png',
  image1x1Width: 800,
  image1x1Height: 800,
  imageAlt: 'Pennock Projects Logo',
  twitterCard: 'summary_large_image',
  twitterSiteHandle: '@PennockProjects',
  twitterCreatorHandle: '@JohnPennock'
}


useHead({
  titleTemplate: (titleChunk) => {
    return (titleChunk && (titleChunk != socialDefaults.title)) ? `${titleChunk} - ${socialDefaults.title}` : socialDefaults.title;
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

// allow children components readonly access to social defaults.
provide("socialDefaults", socialDefaults);

// Setting Global SEO on each page
useSeoMeta({
  robots: socialDefaults.robots,
  copyright: socialDefaults.copyright
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

body {
  @apply bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300
}

.prose code::before, .prose code::after {
  content: "";
}

.prose code:not(pre *) {
  @apply px-1.5 py-1 m-0 rounded
}

.prose code {
  @apply text-black dark:text-white
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0.5;
  filter: grayscale(1);
}
</style>