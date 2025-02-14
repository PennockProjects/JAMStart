---
title: NuxtContent SEO and Social Metadata
ogTitle: NuxtContent SEO and Open Graph Metadata
twitterTitle: NuxtContent SEO and X/Twitter Metadata
description: How to implement a method for specifying NuxtContent front-matter variables in each Markdown document and generating static-site custom and specific SEO, Open Graph, and X/Twitter social metadata.
ogDescription: How to implement a method for specifying NuxtContent front-matter variables in each Markdown document and generating static-site custom and specific SEO and Open Graph (and X/Twitter) social metadata.
twitterDescription: How to implement a method for specifying NuxtContent front-matter variables in each Markdown document and generating static-site custom and specific SEO and X/Twitter (and Open Graph) social metadata.
topic: Metadata
format: How-to
keywords:
  - NuxtContent
  - Vue_js
  - Nuxt_js
  - Metadata
  - YAML
  - Front_Matter
  - SEO
  - SocialShare
  - OpenGraph
isToc: true
createDate: 2024-10-29
createAuthor: John Pennock
image: /images/metadata/MetadataCircuit.jpg
imageAlt: A circuit with a large chip labeled 'metadata'
---

## Intro

The goal of the custom metadata for NuxtContent SEO and Social sharing is to enable content authors to write a new blog post or article in a single Markdown `.md` file that contained all the appropriate metadata images and data for SEO and social sharing. Each blog or article created would automatically get common and article specific metadata so that it will look inviting in search results and on social media. The method applies to [Nuxt.js](https://nuxt.com){:target="_blank"} [NuxtContent module](https://content.nuxt.com/){:target="_blank"} Markdown authored pages. 

Further, [social share buttons](https://nuxt.com/modules/nuxt-social-share){:target="_blank"} would automatically be generated for each blog or article.  A reader could copy/paste the url by hand or using the social share buttons to include in their social media post.

The essential pattern
1. In `app.vue` 
    - create a `metaDefaults` data structure
    - `useHead()` to set SEO icons
    - `useSeoMeta()` to set global SEO Metadata values
    - use `provide()` to allow children components access to the `metaDefaults`
2. In the page `.vue` file (I used the convenient catchall `[...slug].vue`) in the `<script setup>` section 
  - use `inject()` to get `metaDefaults` from `app.vue`
  - use NuxtContent `queryContent()` to get the current page `front-matter variables`
  - Combine the `metaDefaults` with the page `front-matter variables`
  - `useSeoMeta()` to create custom meta tags for that page
3. Each article or post `.md` file uses front-matter variables naming convention to get automatic SEO and Social metadata tagging


## Global Setup

### metaDefaults
The first item in `app.vue` of the `<script setup>` is to establish a constant Plain Old JavaScript Object (`POJO`) called `metaDefaults` which contains default values when not overridden by the `Front-matter vars` of the NuxtContent markdown page.  And then use the [`provide` vue method](https://vuejs.org/guide/components/provide-inject) so that children components can use them.

```js
const metaDefaults = {
  siteName: 'Pennock Projects',
  title: 'Pennock Projects',
  description: 'Pennock Projects is a software engineering blog about website and mobile applications, front end frameworks, backend API services, databases, and AI architecture by John Pennock',
  keywords: ['blog'],
  author: 'John Pennock',
  rootUrl: "https://pennockprojects.com",
  robots: 'index, follow',
  copyright: '© 2024 by John Pennock',
  ogType: 'article',
  imageRoot: '/images',
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

// allow children components readonly access to metadata defaults.
provide("metaDefaults", metaDefaults);
```

### Global Metadata
A second item in `app.vue` setup was to use [`useHead()` composable](https://nuxt.com/docs/api/composables/use-head) and [`useSeoMeta()` composable](https://nuxt.com/docs/api/composables/use-seo-meta) to set common metadata for all pages.  For example, I set the favicons, robots and copyright metadata here.

Use a site like [favicon.io](https://favicon.io/) to create favicons and web manifest files.


```js
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
```

## Page `.vue` System

### Metadata Defaults and Page
On each page you would use the [vue inject method](https://vuejs.org/guide/components/provide-inject) to get the `metaDefaults` from `app.vue` and [NuxtContent queryContent method](https://content.nuxt.com/composables/query-content) to obtain the page's markdown front-matter variables

```js
const route = useRoute()
const metaDefaults = inject("metaDefaults");

const { data } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
let doc = data.value || {}
```

### Page Specific Metadata
Next I combine the defaults with the page-specific front-matter variables and use the [useSeoMeta() composable](https://nuxt.com/docs/api/composables/use-seo-meta) a second time (the first time in `app.vue` setup).

```js
let oTitle = (doc.ogTitle || doc.title)
let xTitle = (doc.xTitle || doc.title)
let xImage = doc.xImage || doc.image || metaDefaults.image2x1
let keywords = doc && doc.keywords && Array.isArray(doc.keywords) ? metaDefaults.keywords.concat(doc.keywords) : metaDefaults.keywords.concat([]);

let seoInput = {}
seoInput.author = doc.createAuthor || metaDefaults.author
seoInput.keywords = keywords.toString()
seoInput.ogTitle = (oTitle && oTitle != metaDefaults.title) ? `${metaDefaults.title} ${oTitle}` : metaDefaults.title
seoInput.xTitle = (xTitle && xTitle != metaDefaults.title) ? `${metaDefaults.title} ${xTitle}` : metaDefaults.title
seoInput.ogDescription = doc.ogDescription || doc.description || metaDefaults.description
seoInput.xDescription = doc.xDescription || doc.description || metaDefaults.description
seoInput.ogImage = doc.ogImage || doc.image || metaDefaults.image2x1
seoInput.ogImageAlt = doc.ogImageAlt || doc.imageAlt || metaDefaults.imageAlt
// Note: X/Twitter will not show the static image unless the static non-js version has a full url.
seoInput.xImage = metaDefaults.rootUrl + xImage
seoInput.xImageAlt  = doc.xImageAlt || doc.imageAlt || metaDefaults.imageAlt
seoInput.ogUrl = metaDefaults.rootUrl + doc._path 
seoInput.xCard = doc.xCard || metaDefaults.twitterCard
seoInput.xCreatorHandle = doc.xCreatorHandle || metaDefaults.twitterCreatorHandle

// Canonical is in the head and not meta tags
useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: metaDefaults.rootUrl + route.path,
    },
  ],
}))

// Set the metadata for this page
useSeoMeta({
  author: seoInput.author,
  keywords: seoInput.keywords,
  ogType: metaDefaults.ogType,
  ogTitle: seoInput.ogTitle,
  ogDescription: seoInput.ogDescription,
  ogImage: seoInput.ogImage,
  ogImageAlt: seoInput.ogImageAlt,
  ogSiteName: metaDefaults.siteName,
  ogUrl: seoInput.ogUrl,
  twitterTitle: seoInput.xTitle,
  twitterDescription: seoInput.xDescription,
  twitterImage: seoInput.xImage,
  twitterImageAlt: seoInput.xImageAlt,
  twitterCard: seoInput.xCard,
  twitterSite: metaDefaults.twitterSiteHandle,
  twitterCreator: seoInput.xCreatorHandle
})
```

Typically, you might want to extract this snippet into a utility function, but for my purposes since I used `[...slug].vue` catchall file, which handles 99% of my pages, I didn't need to.

### Social Share Buttons
Since each page has custom metadata, I also wanted convenience buttons to quickly share the page on social media. [Stefano Bartoletti Nuxt Social Share module](https://nuxt.com/modules/nuxt-social-share) was a good and easy as following the instructions to add the module. Then add the component into the page template.

```vue
<template>
/<!-- snip -->
  <SocialShare
    v-for="network in ['facebook', 'x', 'linkedin', 'email']"
    :key="network"
    :label="false"
    :network="network"
    :styled="true"
  />
<!-- snip -->
</template>
```
## Page `.md` Usage

### Base Metadata Variables

The basic set of front-matter variables that each `.md` page should contain.

| Variable key | HTML element                          | Purpose                     |
|:------------:|:-------------------------------------:|:---------------------------:|
| title        | `<title></title>`                     |  NuxtContent metadata       |
| description  | `name="description"`                  |  NuxtContent metadata       |
| createAuthor | `name="author"`                       |  SEO metadata               |
| image        | `property="og:image"` `name="twitter:image"` | Social metadata      |
| imageAlt     | `property="og:image:alt"` `name="twitter:image:alt"` | Social metadata |

### Base App Variables
| Variable key | Key Values                  | description                                     |
|:-------------:|:--------------------------:|:-----------------------------------------------:|
| createDate    | YYYY-MM-DD                 | used in blog and articles                       |
| isToc         | `true` or `false`(default) | whether page will have a table of contents      |
| isManualImage | `true` or `false`(default) | whether page will manually insert article image |
| topic         | string                     | defines what topic this page is under           |
| format        | "List/Code/Cheat Sheet/How-to/etc." | explains the organization and tone     |

### Base Template
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

### Extended Metadata Variables

The extended set of front-matter variables that each `.md` page could contain.

| Variable key  | HTML element                 | Purpose                    |
|:-------------:|:----------------------------:|:--------------------------:|
| editDate      | N/A                          | a date for article updated |
| editAuthor    | N/A                          | editor who updated article |
| keywords      | `name="keywords"`            | SEO metadata               |
| ogTitle       | `property="og:title"`        | FB/Open Graph metadata     |
| ogDescription | `property="og:description"`  | FB/Open Graph metadata     |
| ogImage       | `property="og:image"`        | FB/Open Graph metadata     |
| ogImageAlt    | `property="og:image:alt"`    | FB/Open Graph metadata     |
| xTitle        | `name="twitter:title"`       | X/Twitter metadata         |
| xDescription  | `name="twitter:description"` | X/Twitter metadata         |
| xImage        | `name="twitter:image"`       | X/Twitter metadata         |
| xImageAlt     | `name="twitter:image:alt"`   | X/Twitter metadata         |
| xCard         | `name="twitter:card"`        | X/Twitter metadata         |
| xCreatorHandle | `name="twitter:creator"`    | X/Twitter metadata         |

The variables that start with `og` or `x` that are for 'title', 'description', 'image', and 'imageAlt' are for overriding the base variable when you what something specific for either Open Graph/Facebook or X/Twitter metadata. For example, you could create a custom title, description, and image for X/Twitter if you set these.  Normally all of the metadata are set to the same value from the base variables.

There are a lot more variables available for [useSeoMeta()](https://github.com/harlan-zw/zhead/blob/main/packages/zhead/src/metaFlat.ts#L1035), but these are the ones illustrated here.

### Extended App Variables
| Variable key | Format            | description           |
|:------------:|:-----------------:|:---------------------:|
| version      | Major.Minor (X.X) | for version tracking  |

### Extended Template

```yaml
---
title: Template Title
description: "The Templates's description"
topic: General
format: "'List' 'Code' 'Cheat Sheet' 'How-to' 'Article'"
keywords:
  - NuxtContent
  - Vue_js
  - Nuxt_js
  - Metadata
  - SEO
  - SocialShare
  - OpenGraph
isToc: true
version: 1.0  #optional for tracking
createDate: 2024-05-03 10:00:00
createAuthor: Template Article Author
editDate: 2024-05-03 10:00:00  # optional for when updated, createDate is required
editAuthor: Template Article Editor # optional, for second author
image: Template Image Link, ideally 2x1
imageAlt: Template Image Alt Text description
ogTitle: Template Open Graph Title
ogDescription: Template Open Graph Description
ogImage: Template Open Graph Image Link - ideally 1200 x 630
ogImageAlt: Template Open Graph Image Alt - use only if 'imageAlt' not sufficient
xTitle: Template Twitter Title
xDescription: Template Twitter Description
xImage: Template Twitter Image Link - ideally 1200 x 600 for large card, or 800 x 800 square for summary
xImageAlt: Template Twitter Image Alt - use only if 'imageAlt' not sufficient
xCard: Template Twitter Card - 'summary' (default) or 'summary_large_image' 
xCreatorHandle: Template Twitter Creator handle, default @JohnPennock
---
```

### Direct Method

Using the method in this article, I intentionally defined a programmatic way to set the variables using custom variables names, but it is important to note that these values can be generated directly through the `head:` key in the front-matter-variables directly without resort to using `useSeoMeta()` overtly.  see [SEO Metadata Cheat Sheet](/articles/metadata/metadatacheatsheet#direct)

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

### Front-matter Variables
- [Docs for front-matter variables](https://content.nuxt.com/usage/markdown#front-matter){target="_blank"}
- [YAML syntax](https://en.wikipedia.org/wiki/YAML){target="_blank"}

#### SEO Title and Description
- [special front-matter variable 'title'](https://content.nuxt.com/usage/markdown#native-parameters) the `<title></title>` element will be set automagically.  
- You can also use the [`titleTemplate`](https://nuxt.com/docs/getting-started/seo-meta#title-template) member of the `useHead()` composable. This title will also be used in the tab title.
- [special front-matter variable 'description'](https://content.nuxt.com/usage/markdown#native-parameters) the `<meta>` SEO element will be set automagically.

#### Front-matter Injection
Front-matter variables declared at the top can be symbolically inserted into the Markdown content by using `{{ <variable key> }}`.  For example, if you have a front-matter variable defined as `name: "Mohonri Moriancumur"` you could inject it in the body with `{{ name }}`.  This would insert the full name `Mohonri Moriancumur` everywhere you did this.

## HTML Output Example
```html
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" type="image/png" href="/apple-touch-icon.png">
<link rel="icon" sizes="32x32" type="image/png" href="/favicon-32x32.png">
<link rel="icon" sizes="16x16" type="image/png" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="robots" content="index, follow">
<meta name="copyright" content="© 2024 by John Pennock">
<link rel="canonical" href="https://pennockprojects.com/">
<meta name="author" content="John Pennock">
<title>Pennock Projects</title>
<meta name="description" content="John Pennock's software development blog and portfolio">
<meta property="og:title" content="Pennock Projects">
<meta property="og:description" content="John Pennock's software development blog and portfolio">
<meta property="og:image" content="/images/PennockProjectsFB.jpg">
<meta property="og:image:alt" content="Pennock Projects Logo">
<meta property="og:site_name" content="Pennock Projects">
<meta property="og:url" content="https://pennockprojects.com/">
<meta property="og:type" content="article">
<meta name="twitter:title" content="Pennock Projects">
<meta name="twitter:description" content="John Pennock's software development blog and portfolio">
<meta name="twitter:image" content="https://pennockprojects.com/images/PennockProjectsFB.jpg">
<meta name="twitter:image:alt" content="Pennock Projects Logo">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@PennockProjects">
<meta name="twitter:creator" content="@JohnPennock"></head>
```
