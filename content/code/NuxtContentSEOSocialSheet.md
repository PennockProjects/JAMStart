---
title: Front-matter Vars, SEO and Social Tags
description: Examples and templates for Nuxt.js NuxtContent Front-matter variables, HTML <head> tags for SEO, Twitter and open graph social posting
topic: NuxtContent
isToc: true
createDate: 2024-07-10 10:00:00
createAuthor: John Pennock
image: /images/TwitterPostWide.jpg
imageAlt: A mouse pointer hovering over a tweet button
---

Review [Front-matter Vars, SEO, and Social Tags Blog](/blog/2024/nuxtcontentseosocialblog) for a discussion about how these values are derived.

## Basic Front-matter Vars

The basic template for the markdown content front-matter key:value pairs.


```yaml
---
title: Template Title
description: "The Templates's description"
topic: General
isToc: true
createDate: 2024-05-03
createAuthor: Template Article Author in text, i.e. John Pennock
image: Social Image Link - ideally 1200 x 600 or 1200 x 630
imageAlt: Template Image Alt Text description
--- 
```

## Complete Front-matter Vars

The complete template for the markdown content front-matter key:value pairs.


```yaml
---
title: Template Title
description: "The Templates's description"
topic: General
isToc: true
version: 1.0  #optional for tracking
createDate: 2024-05-03 10:00:00
createAuthor: Template Article Author
createDate: 2024-05-03 10:00:00  # optional for when updated, createDate is required
createAuthor: Template Article Editor # optional, for second author
image: Template Image Link, ideally 2x1
imageAlt: Template Image Alt Text description
ogTitle: Template Open Graph Title
ogDescription: Template Open Graph Description
ogImage: Template Open Graph Image Link - ideally 1200 x 630
ogImageAlt: Template Open Graph Image Alt - use only if 'imageAlt' not sufficient
twitterTitle: Template Twitter Title
twitterDescription: Template Twitter Description
twitterImage: Template Twitter Image Link - ideally 1200 x 600 for large card, or 800 x 800 square for summary
twitterImageAlt: Template Twitter Image Alt - use only if 'imageAlt' not sufficient
twitterCard: Template Twitter Card - 'summary' (default) or 'summary_large_image' 
twitterCreatorHandle: Template Twitter Creator handle, default @JohnPennock
---
```

## `app.vue` Default Global and Social

[favicon.io - creation of favicons and webmanifest](https://favicon.io/)

```vue
<script setup>
const socialDefaults = {
  siteName: 'Pennock Projects',
  title: 'Pennock Projects',
  description: 'Pennock Projects is a software engineering blog about front end frameworks, backend services, databases, and AI architecture by John Pennock',
  rootUrl: "https://blog-mu-vert-29.vercel.app",
  robots: 'index, follow',
  copyright: '© 2024 by John Pennock',
  type: 'article',
  image2x1: '/images/PennockProjectsFB.jpg',
  image1x1: '/images/PennockProjectsLogo.png',
  imageAlt: 'Pennock Projects Logo',
  twitterCard: 'summary_large_image',
  twitterSite: '@PennockProjects',
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
```

## Page Dynamic SEO Social Tagging

This snippet shows steps necessary to dynamically update the header tags for this page.

```vue
<script setup>
const route = useRoute()
const socialDefaults = inject("socialDefaults");
const ogTitle = ref(socialDefaults.title)
const ogDescription = ref(socialDefaults.description)
const ogImage = ref(socialDefaults.image2x1)
const ogImageAlt = ref(socialDefaults.imageAlt)
const ogUrl = ref(socialDefaults.rootUrl)
const twitterTitle = ref(socialDefaults.title)
const twitterDescription = ref(socialDefaults.description)
const twitterImage = ref(socialDefaults.image2x1)
const twitterImageAlt = ref(socialDefaults.imageAlt)
const twitterCard = ref(socialDefaults.twitterCard)
const twitterCreatorHandle = ref(socialDefaults.twitterCreatorHandle)

// Canonical is in the head and not meta tags
useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: socialDefaults.rootUrl + route.path,
    },
  ],
}))


useSeoMeta({
  ogType: socialDefaults.type,
  ogTitle: () => ogTitle.value,
  ogDescription: () => ogDescription.value,
  ogImage: () => ogImage.value,
  ogImageAlt: () => ogImageAlt.value,
  ogSiteName: socialDefaults.siteName,
  ogUrl: () => ogUrl.value,
  twitterTitle: () => twitterTitle.value,
  twitterDescription: () => twitterDescription.value,
  twitterImage: () => twitterImage.value,
  twitterImageAlt: () => twitterImageAlt.value,
  twitterCard: () => twitterCard.value,
  twitterSite: socialDefaults.twitterSiteHandle,
  twitterCreator: () => twitterCreatorHandle.value
})

const onDocReady = (doc) => {
  let oTitle = (doc.ogTitle || doc.title)
  let xTitle = (doc.twitterTitle || doc.title)

  ogTitle.value =  oTitle && oTitle != socialDefaults.title ? `${socialDefaults.title} ${oTitle}` : socialDefaults.title
  ogDescription.value = doc.ogDescription || doc.description || socialDefaults.description
  ogImage.value = doc.ogImage || doc.image || socialDefaults.image2x1
  ogImageAlt.value = doc.ogImageAlt || doc.imageAlt || socialDefaults.imageAlt
  ogUrl.value = socialDefaults.rootUrl + doc._path 
  twitterTitle.value = xTitle && xTitle != socialDefaults.title ? `${socialDefaults.title} ${xTitle}` : socialDefaults.title
  twitterDescription.value = doc.twitterDescription || doc.description || socialDefaults.description
  twitterImage.value = doc.twitterImage || doc.image || socialDefaults.image2x1
  twitterImageAlt.value = doc.twitterImageAlt || doc.imageAlt || socialDefaults.imageAlt
  twitterCard.value = doc.twitterCard || socialDefaults.twitterCard
  twitterCreatorHandle.value = doc.twitterCreatorHandle || socialDefaults.twitterCreatorHandle
}
</script>

<template>
  <ContentDoc>
    <template v-slot="{ doc }">
      {{ onDocReady(doc)  }}
      <article class="mx-auto">
        {{ title }}
        <ContentRenderer :value="doc" />
      </article>
    </template>
  </ContentDoc>
</template>
```

## Direct Front-matter Vars
```yaml
---
head:
  meta:
    - name: 'keywords'
      content: 'blog, John Pennock'
    - name: 'robots'
      content: 'index, follow'
    - name: 'author'
      content: 'John Pennock'
    - name: 'copyright'
      content: '© 2024 John Pennock'
    - name: 'og:title'
      content: 'Pennock Projects Blog'
    - name: 'og:description'
      content: 'Pennock Projects is a blog about software engineering by John Pennock'
    - name: 'og:image'
      content: '/images/PennockProjectsLogo.png'
    - name: 'og:url'
      content: 'https://blog-git-master-john-pennocks-projects.vercel.app/'
    - name: 'twitter:title'
      content: 'Pennock Projects Blog'
    - name: 'twitter:description'
      content: 'Pennock Projects is a blog about software engineering by John Pennock'
    - name: 'twitter:image'
      content: '/images/PennockProjectsLogo.png'
    - name: 'twitter:card'  
      content: 'summary'
--- 
```

 
