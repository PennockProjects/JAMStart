---
title: Site Build Notes
description: Developer notes about building and modules used to build this site
topic: Development
isToc: true
version: 1.2
createDate: 2024-05-06 
createAuthor: John Pennock
editDate: 2024-09-25 
editAuthor: John Pennock
image: '/images/constructionsite.jpg'
imageAlt: A large building construction site
---

::figure-caption
![A large building construction site](/images/constructionsite.jpg)
#caption
An actual photo showing how the Pennock Projects website was built
::

We will discuss how the general components and modules used to build this site.

## Resources
I started with the excellent Udemy course by Piotr Jura [Unlock Nuxt 3 & Vue Mastery: Build a Markdown Blog-Portfolio and Supabase Finance Tracker here](https://www.udemy.com/course/master-nuxt-full-stack-complete-guide/learn/lecture/40391596#overview) and studied the [GitHub source final](https://github.com/piotr-jura-udemy/nuxt-course) and then like all developers before me, I built from there.

#### Definitions
- *Server Side Rendering - SSR* - Server runs the JavaScript, fetches data, modifies the HTML document *before* sending to the browser to render.
- *Client Side Rendering - CSR* - Server sends the HTML scaffold document and the JavaScript to the browser. The browser runs the JavaScript, fetches data, and renders the updated HTML document.
- *Universal Render* - (aka dynamic rendering, or hydrated rendering) is both SSR and CSR.
- *Static Site Generation - SSG* - Generate the site and upload the pre-rendered site to a static web hosting service
- *Web Apps/Single Page Apps (SPA)* - single page app like Facebook, Twitter/X
- *Hydration* is making a static page interactive in the browser.  You 'hydrate' a static page, when the client JavaScript is run and document re-rendered.

## Nuxt 3

### Setup Nuxt Project

```shell
npx nuxi@latest init <project name>

```

#### Nuxt Config file

`nuxt.config.ts` default config file [docs](https://nuxt.com/docs/getting-started/configuration)

#### Nuxt Directories
- `public` - publicly available assets - icons, images, etc.
- `server` - server-side code
- `pages` - Website page components
- `components` - all the components in your application - auto imported by Nuxt from here
- `components/content` - Vue components used in content files
- `layouts` - common layouts like header, every-single page
- `composables` - small pieces of reusable code or components
- `content` - blog, code, and ops markdown article files
- `.nuxt`, `node_modules` - generative by Nuxt and NPM

#### Nuxt Routing
- A route is created automatically for each page in the `pages` directory. A subdirectory will add a level to the route parameter.
- Use `<NuxtPage />` where you want to pages to appear based on route. Typically, this is in the `app.vue` file, within the `<NuxtLayout />` element
- Add a routing page with a parameter you add `[]` to the filename!
- Add the parameter name inside the brackets like `[...slug].vue`
- `slug` means where spaces are dash characters - blog post short name

#### Layout
A page can belong to a Nuxt Layout which contains the hierarchical structure. This gives all the pages for the Nuxt Layout a common template, script, and style.

- Nuxt uses the `layouts` directory by default and the file `default.vue`
- You wrap the `<NuxtPage />` with a `<NuxtLayout></NuxtLayout>` in `app.vue` like this.  The layout and page are dynamic
```html
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
```
You assign custom layouts for a page in the following three ways (using the custom `another.vue` layout in the `code` directory)
1. override globally in the `<NuxtLayout :name="another"` element and name in `app.vue`
2. On the page in script setup use Nuxt `definePageMeta` with the name of the layout in the `layout` property, like this.
```js
definePageMeta({
  layout: 'another'
})
```
3. On a page you can dynamically update the layout by using `setPageLayout()` function with the name of the layout Vue router slug, like this.
```js
function enableCustomLayout () {
  setPageLayout('another')
}
```

### Nuxt Modules
You can browse Nuxt modules [here](https://nuxt.com/modules). You install a Nuxt specific package according to the instructions.

### Components Directory
The default folder for components is `/components`, but that can be updated/customized.

### Component Names
When a component has a compound name you can either name the file as either
- `compound-name.vue` or
- `CompoundName.vue` (my preferred)
In either case, when coding the component in the `<template></template>` section of a page the reference would be `<CompoundName></CompoundName>`

### Data fetching
Nuxt has three built in data fetching methods
1. `useFetch` composable
2. `useAsyncData` composable
3. `$fetch`

## Nuxt Content Doc 
The [Nuxt Content Doc](https://content.nuxt.com/components/content-doc) is a Nuxt module that allows you to generate HTML content from markdown files.  Used in combination with Tailwind Typography module to automatically 'up level the default style' Markdown documents to beautiful and readable HTML.

- [Markdown Cheat Sheet](https://markdownlivepreview.com/)
- [Markdown Extended Syntax](https://www.markdownguide.org/extended-syntax/)
- [Markdown Syntax Highlighting - GitHub](https://github.com/github-linguist/linguist/blob/master/lib/linguist/languages.yml)
- [Markdown NuxtContent Usage](https://content.nuxt.com/usage/markdown)


### Installation

Install Content Doc
```shell
npx nuxi@latest module add content
```

### Content Folder
The Content Doc module will automatically scan the `/content` folder in the source tree for markdown files and generate HTML for each. In each page `.vue` file you add a `<ContentDoc />` element within `<template></template>` section. The NuxtContent generated HTML from the markdown file is injected in the `<ContentDoc />` element.

The `/content` directory structure should match the `/pages` folder, so the Markdown file at `/content/about.md` contents will be converted and injected into the `<ContentDoc />` in the `<template></template>` for the page at `/pages/about.vue`.  

#### Mapping Content to Different Pages
To override the default behavior, you can specify that a different Markdown file is included by adding a `path="{contentfolderpath}"` property to the `<ContentDoc />`.  For example, to inject the `/content/blog/2023/hello.md` into the `/pages/about.vue` page, you would add the following.

```vue
<ContentDoc path="/blog/2023/hello" />
```

## NuxtContent Remark Plugin
Nuxt Content uses the MDC Remark plugins process Markdown text and to allow Markdown to support Vue components.  One downside to this approach is that it will convert an image into a `<p><img></p>` structure. For example, an image specified in Markdown like this:

```md
![Logo](/images/PPNDLogoSm.png)
```

It will get converted by the MDC Remark plugin into HTML like this:

```html
<p>
  <img title="Logo" src="/images/PPNDLogoSm.png">
</p>
```

### remark-unwrap-images

The outer `<p></p>` tags can cause formatting issues.  

NuxtContent MDC uses [remark plugins list](https://github.com/remarkjs/remark/blob/master/doc/plugins.md) to do the conversion to code blocks. A [remark-unwrap-images plugin](https://github.com/remarkjs/remark-unwrap-images) will unwrap images from the paragraph elements.

 The [Nuxt Configuration for remark plugins documents](https://content.nuxt.com/get-started/configuration#markdown) on how to enable them.

### Unwrap Installation 

```shell
npm install remark-unwrap-images
```

And then add this to your `nuxt.config.js`

```js
content: {
  markdown: {
    remarkPlugins: ['remark-unwrap-images']
  },
},
```

## Tailwind CSS

The Tailwind CSS module enables the use of Tailwind CSS classes and particularly the Typographic Prose class for NuxtContent Markdown files. Tailwind CSS has a CSS 'reset', which resets the basic default classes for common HTML elements like `<p></p>` and `<h1></h1>`.  The Tailwind Typographic Prose class is an Uber class which will style its element and all of its children elements with carefully chosen defaults for consistency and readability.

### Installation

I installed the Tailwind CSS Typographic Prose module like this:

```shell
npm install --save-dev @nuxtjs/tailwindcss

added 104 packages, and audited 931 packages in 7s

184 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
PS C:\dev\>
```
Further you need to add the Tailwind CSS module to the `nuxt.config.ts` file

```js
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss'
  ]
})
```
Restarting the server will enable the new module.  You can check in the Vue dev tools under the modules section.

### Typographic Prose Class

A common way to add the [Tailwind Typographic](https://github.com/tailwindlabs/tailwindcss-typography?tab=readme-ov-file) prose class is to add the `class="prose"` attribute to the parent element containing the NuxtContent `<ContentDoc />` element, for example the surrounding `<div></div>` or `<article></article>` element. Tailwind CSS, by default, will strip all the normal default HTML styling, i.e. the `<h1></h1>` element is not shown as large by default. When you use the Prose class it reasserts a clean and typography styling.  The `<h1></h1>` elements are all set to this.  You add the tailwind class `prose` for light mode and `dark: prose-invert` for dark mode.

```vue
<template>
  <article class="prose dark:prose-invert">
    <ContentDoc />
  </article>
</template>
```

### Using Tailwind CSS
In a `.vue` file you can use tailwind CSS classes directly in the `<template></template>` section, or you can apply them to CSS rules in the `<style></style>` section.  To add tailwind classes in the style section use the `@apply` line, for example, the class `link` has the tailwind CSS class `p-1` and `hover:bg-gray-200` applied to it.

```vue
<style scoped>
.link {
  @apply p-1 hover:bg-gray-200
}
</style>
```

Note you can also use regular styles, the `:deep()` combinator, `v-bind()`, etc. alongside the `@apply`. 

For example:

```vue
<style>
.monk-inset :deep(p) {
  font-size: v-bind('pFontSizeClass');
  line-height: v-bind('pLineHeightClass');
  height: v-bind('pLineHeightClass');
  margin: -0.2ch 0 0 0;
  @apply p-0
}
</style>
```
