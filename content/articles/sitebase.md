---
title: JAMStart Base Notes
description: Developer notes about the modules, modifications, and issues used to build the JAMStart Starter site.
topic: Development
isToc: true
dateCreated: 2025-03-04 
author: John Pennock
image: '/images/constructionsite.jpg'
imageAlt: A large building construction site
---

The site is based on (standing on the shoulder of giants) the following dependencies

## Framework 
    
1. Nuxt v3 `nuxt` - Nuxt Framework
    - Vue v3 `vue` - Base JavaScript Framework 
        - included with Nuxt 3 installation
    - Vue Router `vue-router` - Vue Single Page App (SPA) router
        - included with Nuxt 3 installation

### Nuxt Modules
1. Nuxt Content v3 `@nuxt/content` - manages local content and converts markdown content to HTML
    - Nuxt Content Plugin: `remark-unwrap-images` v4 - removes extra `<p></p>` tags
1. Nuxt Tailwind v6 - `@nuxtjs/tailwindcss` - provides base CSS
    - Tailwind Plugin: `@tailwindcss/typography` - readable standard styles for HTML tags like H1, p, etc.
1. Nuxt Color Mode v3 - `@nuxtjs/color-mode` - supports dark/light/sepia modes
1. Social Share Buttons - `@stefanobartoletti/nuxt-social-share`: "^1.2.0"

  - NuxtCloudFlareAnalytics
  - NuxtImage - `@nuxt/image`: "^1.6.0",
  - NuxtSEO sitemap - `@nuxtjs/sitemap`: "^7.2.6",


### devDependencies
1. Nuxt Dev Tools - "@nuxt/devtools": "^2.1.0",

## Modifications

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

#### Nuxt 3 Directories
- `public` - publicly available assets - icons, images, etc.
- `server` - server-side code
- `pages` - Website page components
- `components` - all the components in your application - auto imported by Nuxt from here
- `components/content` - Vue components used in content files
- `layouts` - common layouts like header, every-single page
- `composables` - small pieces of reusable code or components
- `content` - blog, code, and ops markdown article files
- `.nuxt`, `node_modules` - generative by Nuxt and NPM

### Nuxt 4 Compatibility

Nuxt 4 is imminent and the current Nuxt 3 has a mode that will allow you to future proof the directory structure. Opt-in to the v4 directory structure which means they are going to move the client code from the root to the `app` folder. You can enable Nuxt 4 compatibility adding the `future` key in the `nuxt.config.ts` file.

```js
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  }
})

```

#### Nuxt 4 Changes

| Nuxt 3                 | Nuxt 4                 |
|------------------------|------------------------|
| /app.vue               | /app/app.vue           |
| /pages                 | /app/pages             |
| /layouts               | /app/layouts           |
| /components            | /app/components        |

#### Nuxt 4 Unchanged
| Nuxt 3                 | Nuxt 4                 |
| /content               | /content               |
| /app/router.options.js | /app/router.options.js |


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
## Nuxt Color mode

This module helps your website support dark, light, sepia, and default color modes. Docs can be found [here](https://color-mode.nuxtjs.org/)

```bash
npx nuxi module add color-mode
```

make sure it is added to `nuxt.config.ts`
```js
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/color-mode'
  ]
})

```


## Tailwind CSS

The Tailwind CSS module enables the use of Tailwind CSS classes and particularly the Typographic Prose class for NuxtContent Markdown files. Tailwind CSS has a CSS 'reset', which resets the basic default classes for common HTML elements like `<p></p>` and `<h1></h1>`.  The Tailwind Typographic Prose class is an Uber class which will style its element and all of its children elements with carefully chosen defaults for consistency and readability.

### Installation

I installed the Tailwind CSS module using the nuxt cli like this:

```shell
npx nuxi@latest module add tailwindcss
```

And the Tailwind Typographic prose module like this:

```shell
npm install @tailwindcss/typography
```

The typographic prose module is a plugin to the tailwind css nuxt module.  To configure it, create a `tailwind.config.js` file and add the following configuration. The `100ch` is the 100 character standard width for prose sections.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/typography')
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100ch', // add required value here
          }
        }
      }
    },
  },
}
```


Restarting the server will enable the new module.  

### Dev Tools
Auto Install
You just need to go to your nuxt.config file and set dev tools to true:

nuxt.config.ts
```js
export default defineNuxtConfig({
  devtools: { enabled: true },
})
```
Nuxt will automatically install the DevTools module for you.


You can check in the Vue dev tools under the modules section.

### Using Tailwind Typographic Prose

A common way to add the [Tailwind Typographic](https://github.com/tailwindlabs/tailwindcss-typography?tab=readme-ov-file) prose class is to add the `class="prose"` attribute to the parent element containing the NuxtContent `<ContentRenderer />` element, for example the surrounding `<div></div>` or `<article></article>` element. Tailwind CSS, by default, will strip all the normal default HTML styling, i.e. the `<h1></h1>` element is not shown as large by default. When you use the Prose class it reasserts a clean and typography styling.  The `<h1></h1>` elements are all set to this.  You add the tailwind class `prose` for light mode and `dark: prose-invert` for dark mode.

```vue
<template>
  <article class="prose dark:prose-invert">
    <ContentRenderer />
  </article>
</template>
```

### Using Tailwind CSS
In a `.vue` file you can use tailwind CSS classes directly in the elements within the `<template></template>` section, or you can create CSS rules in the `<style></style>` section. To add tailwind classes in the style section use the `@apply` line, for example, the class `link` has the tailwind CSS class `p-1` and `hover:bg-gray-200` applied to it.

#### @apply Tailwind in <style></style>

```vue
<style scoped>
.link {
  @apply p-1 hover:bg-gray-200
}
</style>
```
#### Tailwind in <template></template>

or the same classes used in the `<template></template>` section
```vue
<template>
  <a class="p-1 hover:bg-gray-200" src="">Link</a>
</template>
```

#### Deep() Bind() selectors

Two useful vue functions I found helpful with tailwind css are the `:deep()` and `v-bind()` functions.  `:deep()` is useful to select descendent HTML elements and even ones that are dynamically placed.  `v-bind()` allows you to feed your style section with variables from the `<script></script>` section

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

This `:deep(p)` selects all p sections within the element of class `.monk-inset`.  The `v-bind({variable})` brings the variables `pFontSizeClass`, `pLineHeightClass`, `pLineHeightClass` to set those css styles programmatically.  The `@apply` includes tailwind classes.

## Social Share Buttons
Since each page has custom metadata, I also wanted convenience buttons to quickly share the page on social media. [Stefano Bartoletti Nuxt Social Share module](https://nuxt.com/modules/nuxt-social-share){:target="_blank"} was a good and easy as following the instructions to add the module. Then add the component into the page template.

The terminal command I issued.

```shell
npx nuxi@latest module add nuxt-social-share
```

`nuxt.config.ts` entries required.  You need to replace your public website instead of the placeholder website below.

```ts
  modules: [
    '@stefanobartoletti/nuxt-social-share'
  ],

  socialShare: {
    baseUrl: 'https://placeholder.jamstart.com'
  }
```

Here is the usage within the code.

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

## CloudFlare Analytics

Install

```shell
npm i nuxt-cloudflare-analytics
```

Update `nuxt.config.js`
```js
{
  modules: [
    'nuxt-cloudflare-analytics'
  ],
  cloudflareAnalytics: {
    // See below for more options
    token: 'your-token', // Example 1a2b3v4a5er6ac7r8afd
  }
}
```
