---
title: NuxtContent Prose and Tailwind Typographic
topic: NuxtContent
description: Tips and tricks in working with markdown generated HTML by Nuxt Content, NuxtContent, and Tailwind Typographic prose.
createDate: 2024-05-17 10:00
isToc: true
tags:
  - NuxtContent
  - Tailwind
  - Prose
  - Markdown

---

When using the [Nuxt Content](https://nuxt.com/modules/content) module with the [Tailwind Typography](https://github.com/tailwindlabs/tailwindcss-typography) module I encountered some issues in my usage and implemented methods for my taste.

1. Headers No Underline
1. Pre Code Syntax 
1. Code Inline Syntax

## Headers No Underline

The default styling of headers (each is given an `id=` for a hash link) was <ins>underline</ins> which was distracting.  So to disable underlining you add the following to your `nuxt.config.ts` file.

```ts
export default defineNuxtConfig({
  // ...
  content: {
    markdown: {
      anchorLinks: false
    }
  }
  // ...
})
```

## Pre Code Syntax
To enable syntax highlighting for code blocks NuxtContent uses [Shiki](https://shiki.style/) themes, which are installed by default. You enable a theme by updating `content.highlight.theme` key in the `nuxt.config.ts or .js` file. You can choose a single theme with a string for all light modes or assign to an object with a different theme for each light mode.   A list of [Theme strings] (https://github.com/shikijs/textmate-grammars-themes/tree/main/packages/tm-themes)

```js
export default defineNuxtConfig({
  content: {
    // ...
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: 'min-light',
        // Theme used if `html.dark`
        dark: 'min-dark',
        // Theme used if `html.sepia`
        // sepia: 'monokai'
      }
    }
    // ....
  }
})
```
Once the theme is enabled, the html code block generated has the basic structure

```html
<pre class="language-ts shiki shiki-themes min-light min-dark">
  <code>
    <span class="line" line="1"><span style="--shiki-default:#D32F2F;--shiki-dark:#F97583">export</span>
    <span style="--shiki-default:#D32F2F;--shiki-dark:#F97583"> default</span>
        <!-- each additional word has a <span></span> -->
  </code>
</pre>
```

Stripping out the styles it looks like:

```html
<pre class="language-ts">
  <code>
    <span class="line" line="1"></span>
    <span></span> 
    <!-- each additional word has a <span></span> -->
    <span class="line" line="2"></span>
    <span></span>
    <!-- each additional word has a <span></span> -->
  </code>
</pre>
```

To get the proper background for blocks I added these two classes `prose-pre:bg-gray-100 dark:prose-pre:bg-black` for backgrounds of `pre` elements.

## Code Inline Syntax 

To get the proper background for inline I added these two classes `prose-code:bg-gray-100 dark:prose-code:bg-black` for backgrounds of `code` elements.

There were an additional issue for inline code
1. There was no padding
2. The back ticks \` from markdown were being reinserted.

Finally there was an issue for non syntax specified code block with \`\`\` only.

To address three issues I added the following global styles in my `app.vue` file `<style></style>` section for that specifically.

```css
<style>
.prose code::before, .prose code::after {
  content: "";
}

.prose code:not(pre *) {
  @apply px-1.5 py-1 m-0 rounded
}

.prose code {
  @apply text-black dark:text-white
}
</style>
```

## Article Prose Classes
Here are all the classes I included on `<article></article>` elements.

```html
  <article class="prose dark:prose-invert lg:prose-xl prose-code:bg-gray-100 dark:prose-code:bg-black prose-pre:bg-gray-100 dark:prose-pre:bg-black">
    <ContentDoc />
  </article>
```




