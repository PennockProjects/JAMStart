---
title: JAMStart Custom Notes
description: Developer notes about the customizations, additions used to create the JAMStart Starter site.
topic: Development
isToc: true
isManualImage: true
dateCreated: 2025-03-10
author: John Pennock
image: '/images/CrownMolding.png'
imageAlt: Decorative crown molding
---

::figure-caption
![Decorative crown molding](/images/CrownMolding.png)
#caption
An actual photo of the custom extras that were added to JAMStart
::

Here are some key customizations that were made to JAMStart after getting the [base](/articles/sitebase) setup



## Framework 
    

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

