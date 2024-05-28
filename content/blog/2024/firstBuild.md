---
title: Site Build Notes
description: Developer notes from the sources used to build this site
publishedAt: 2024-05-06 12:00:00
isToc: true
---

## Resources
- Udemy course *Unlock Nuxt 3 & Vue Mastery: Build a Markdown Blog-Portfolio and Supabase Finance Tracker* [here](https://www.udemy.com/course/master-nuxt-full-stack-complete-guide/learn/lecture/40391596#overview)
  - [GitHub source final](https://github.com/piotr-jura-udemy/nuxt-course)
  - [Discord Channel Invite](https://discord.gg/8FejqttGrb)
- Blog design/dev (Next.js) inspiration [Guillermo Rauch](https://rauchg.com/)
- [Git Commands Cheat Sheet](https://www.fadocodecamp.com/posts/git-commands-cheat-sheet-for-beginners)
- [Markdown Cheat Sheet](https://markdownlivepreview.com/)
- [Markdown Extended Syntax](https://www.markdownguide.org/extended-syntax/)
- [Markdown Syntax Highlighting - GitHub](https://github.com/github-linguist/linguist/blob/master/lib/linguist/languages.yml)
- [Markdown NuxtContent Usage](https://content.nuxt.com/usage/markdown)
- My GitHub repo API `https://api.github.com/users/PennockProjects/repos`


#### Definitions
- Server Side Rendering - SSR - Server creates the html document then sends to client
- Client Side Rendering - CSR - Server sends scaffold html document, JavaScript runs, data fetched, document updated in the client browser
- Universal Render - (or dynamic rendering, or hydrated rendering, is both)
- Static Site Generation - SSG - Generate the site and upload the pre-rendered site to a static web hosting service
- Web Apps (SPAs) - single page app like Facebook, Twitter/X

## Nuxt 3

### Setup Nuxt Base

```shell
npx nuxi@latest init <project name>

```

#### Nuxt Config file

`nuxt.config.ts` default config file [docs](https://nuxt.com/docs/getting-started/configuration)

#### Nuxt Directories
- `public` - publicly available assets - icons, images, etc.
- `server` - server-side code
- `pages` - need to create your own - automatic generate routing based on pages folder
- `components` - all the components in your application - auto imported by nuxt from here
- `layouts` - common layouts like header, every-single page
- `composables` - small pieces of reusable code or components
- `content` - directory of markdown article files for Content Doc
- `content/components` - vue components used in content files
- `.nuxt`, `node_modules` - generative by nuxt and npm

#### Nuxt Routing
- it's automatic when you put the page in the `pages` directory, subdirs create route parameters
- use `<NuxtPage />` where you want to pages to appear based on route.  Typically this is in the `app.vue` file, within the `<NuxtLayout />` element
- add a routing page with a parameter you add `[]` to the filename!
- add the parameter name inside the brackets like `[...slug].vue`
- `slug` means where spaces are dash characters - blog post short name

#### Layout
There is a specific nuxt reference to layout here which about the hierarchal, a nuxt layout is about a group of pages with a family template, script, and style.   The actual spatial layout still governed by the html or a UI module with built-in layout features like a side menu.

- Nuxt uses the `layouts` directory by default and the file `default.vue`
- You wrap the `<NuxtPage />` with a `<NuxtLayout></NuxtLayout>` in `app.vue` like this.  The layout and page are dynamic
```html
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
```
You assign custom layouts for a page in the following three ways (using the custom `another.vue` layout in the examples)
1. override globally in the `<NuxtLayout :name="another"` element and name in `app.vue`
2. On the page in script setup use Nuxt `definePageMeta` with the name of the layout in the `layout` property, like this.
```js
definePageMeta({
  layout: 'another'
})
```
3. On a page you can dynamically update the layout by using `setPageLayout()` function with the name of the layout.vue slug, like this.
```js
function enableCustomLayout () {
  setPageLayout('another')
}
```

### Nuxt Modules
You can browse nuxt modules [here](https://nuxt.com/modules)
You install the nuxt specific package according to the instructions.
```shell
npm install --save-dev @nuxtjs/tailwindcss

added 104 packages, and audited 931 packages in 7s

184 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
PS C:\dev\mmnuxt>
```
You add the nuxt module to the `nuxt.config.ts` file
```js
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss'
  ]
})
```

Restarting the server the module should be enabled.  You can check in the vue dev tools under the modules section.

### Tailwind CSS in Nuxt
In a vue file you can use tailwind css classes in a vue style section.  The example that class `link` is a combination of `p-1` and `hover:bg-gray-200` tailwind classes.
```vue
<style scoped>
.link {
  @apply p-1 hover:bg-gray-200
}
</style>
```

### Components Directory
- auto-import from the default folder `components` which can be updated/customized if you don't like the default.
- when you have a compound name for a component the file name should `compound-name.vue` and the html reference would be `<CompoundName></CompoundName>`  but you can also just name the file `CompoundName.vue` which I feel is more clear convention.


### useHead useSeoMeta

#### Documentation
Nuxt supports the meta and headers in the nuxt config file from this [documentation](https://nuxt.com/docs/getting-started/seo-meta).  You can use the composables:
1. useHead
2. useSeoMeta

#### Auto titleTemplate
1. In `app.vue` add `useHeader()` with `titleTemplate`
```vue
<script setup>
useHead({
  // as a string,
  // where `%s` is replaced with the title
  titleTemplate: '%s - John Pennock',
})
// OR
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - John Pennock` : 'John Pennock';
  },
</script>
```
2. In each page (or maybe layout add SEO)
```vue
<script setup>
useHead({
  title: 'Main Page'
})
// or in the template section
<template>
  <Head>
    <Title>Main Page</Title>
  </Head>
</template>
</script>

```

#### SEO Social Post

You can use the `useSeoMeta` composable to customize a page for SEO or for linking to social media posts to specific pages.  Typically this should be in each page.
```vue
<script setup>
useSeoMeta({
  title: 'Main Page',
  description: 'John Pennock\'s portfolio main page',
  ogTitle: 'Main Page',
  ogDescription: '[og:description]',
  ogImage: '[og:image]',
  ogUrl: '[og:url]',
  twitterTitle: 'Main Page',
  twitterDescription: '[twitter:description]',
  twitterImage: '[twitter:image]',
  twitterCard: 'summary'
})

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png'
    }
  ]
})
</script>

```

### Data fetching
Nuxt has three built in data fetching methods
1. `useFetch` composable
2. `useAsyncData` composable
3. `$fetch`

Hydration is making a static page interactive in the browser.  You 'hydrate' a static page after the client javascript is run and document rerendered.

## Nuxt Content Doc 
The [Nuxt Content Doc](https://content.nuxt.com/components/content-doc) is a nuxt module that allows you to generate html content from markdown files.  Use in combination with tailwind typography to automatically 'upstyle' markdown documents to html.

- [Markdown Cheatsheet](https://markdownlivepreview.com/)
- [Markdown Extended Syntax](https://www.markdownguide.org/extended-syntax/)
- [Markdown Syntax Highlighting - Github](https://github.com/github-linguist/linguist/blob/master/lib/linguist/languages.yml)
- [Markdown NuxtContent Usage](https://content.nuxt.com/usage/markdown)


#### Intallation

Install Content Doc
```shell
npx nuxi@latest module add content
```

### Content Folder
The Content Doc module will automatically scan the `/content` folder in the source tree for markdown files and generate html for each.  In each pages .vue file you add a `<ContentDoc />` element within `<template></template>` element and it will automatically inject html generated from the markdown file there.  
The `/content` directory structure will match the `/pages` folder automatically, so a file at `/content/about.md` contents will be converted and injected into the `<ContentDoc />` in the `<template></template>` for the page at `/pages/about.vue`.  

#### Mapping Content to Different Pages
If you wish to change the mapping so you can specify which MD to include instead of the matching path, add a `path="{contentfolderpath}"` as a property to `<ContentDoc />`.  For example, to not dispaly `/content/about.md` in the `/pages/about.vue` page, you would add the following.

```vue
<ContentDoc path="/blog/2023/hello" />
```

which would pull the markdown content from the hello.md file at `/content/blog/2023/hello.md` instead of the default `/content/about.md`.

### Tailwind Typographic 
#### Tailwind Typographic Intallation

```shell
npm install -D @tailwindcss/typography
```

#### `<ContentDoc>` Element
Typically you would add the `<article></article>` element surrounding the `<ContentDoc />` element and add tailwind classes to the article element.  Tailwind, by default, will strip all the normal default html styling, i.e. an `<h1></h1>` element is not shown as large but default size. So instead you use a tailwind module called [tailwind typograhy](https://github.com/tailwindlabs/tailwindcss-typography?tab=readme-ov-file) which reasserts a very clean styling if you add the tailwind class class `prose` for light mode and `dark: prose-invert` for dark mode.

```vue
<template>
  <article class="prose dark:prose-invert">
    <ContentDoc />
  </article>
</template>
```

### Front Matter - Meta Tags
Front Matter is included in the MDC component and it can read [yaml](https://en.wikipedia.org/wiki/YAML) that is in the head of the markdown file and insert it into the header and meta tags.

In markdown it is set off at the top with `---` looks like:
```yaml
---
title: About
description: 'John Pennock's software development blog and portfolio'
--- 

```


### MDC
This is part of the Nuxt Content and allows for Markdown to support vue components.

