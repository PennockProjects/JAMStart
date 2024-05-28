---
title: NuxtUI with NuxtContent
description: A post about using Nuxt NuxtUI module with components such as VerticalNavigation and Dropdown with NuxtContent module components such as tailwind typographic prose, ContentRenderer and ContentNavigation
publishedAt: 2024-05-16 10:00
isToc: true
tags:
  - Vue
  - Nuxt
  - NuxtUI
  - NuxtContent
  - JS
  - HTML
  
---

When using the [Nuxt Components](https://nuxt.com/modules) [Nuxt UI](https://ui.nuxt.com/) and [Nuxt Content](https://nuxt.com/modules/content) together, here are as a couple of tips for integration.

1. NuxtLink Table of Contents
2. NuxtUI VerticalNavigation TOC
3. NuxtUI DropDown TOC

## NuxtLink Table of Contents

The Nuxt Content module takes markdown files and generates html through a `<ContentDoc></ContentDoc>` element in a `Nuxt .vue` template section.

For example, with a markdown file like:

```markdown
## Roman Republic
at its greatest extent - 60 BC with Julius Caesar

### Roman Imperatorial Period
Octavian 

## Roman Empire
at its greatest extent - c. 117 AD under Trajan
```

and a target `.vue` file like:

```vue
<template>
  <article>
    <ContentDoc />
  </article>
</template>
```

the resultant html document would look like:

```html
<article>
  <h2>Roman Republic</h2>
  <p>at its greatest extent - 60 BC with Julius Caesar</p>
  <h3>Roman Imperatorial Period</h3>
  <p>Octavian</p>
  <h2>Roman Empire</h2>
  <p>at its greatest extent - c. 117 AD under Trajan</p>
</article>
```
<!-- 
and rendered in the browser as

<div style="background-color: lightgray">

## Roman Republic
at its greatest extent - 60 BC with Julius Caesar

### Roman Imperatorial Period
Octavian 

## Roman Empire
at its greatest extent - c. 117 AD under Trajan

</div> -->

### Doc Slot

In addition `NuxtContent` module can generate a table of content hashes for each html header element within the document. 

To obtain the table of content data requires using a `Doc Slot` `<template v-slot="{ doc }">` within a [ContentDoc Element](https://content.nuxt.com/components/content-doc). You can still render the full document html as before by passing the `doc` data to a `<ContentRenderer :value="doc"></ContentRenderer>` element, like this.

```vue
<template>
  <article>
    <ContentDoc>
      <template v-slot="{ doc }">
        <ContentRenderer :value="doc" />
      </template>
    </ContentDoc>
  </article>
</template>
```
This is functionally equivalent to the previous `.vue` file.  The difference is that you have programmatic access to the `doc` data object after `NuxtContent` has read the markdown file and generated the html document from it but before it is rendered.  The `doc` data object contains the table of contents data at `doc.body.toc.links` (Note: `<h1></h1>` are not included, only `<h2></h2>` or less.)

The `doc.body.toc.links` is a JSON/JavaScript object that looks like:

```json
[{ 
  "id": "roman-republic", 
  "depth": 2, 
  "text": "Roman Republic", 
  "children": [{ 
    "id": "roman-imperatorial-period", 
    "depth": 3, 
    "text": "Roman Imperatorial Period" 
    }]
  },{ 
    "id": "roman-empire", 
    "depth": 2, 
    "text": "Roman Empire" 
  }]
```

Fields
- `depth`: denotes its header level, with a `depth: 2` for a `<h2>`, `depth: 3` for a `<h3>`, and so forth.
- `id`: the hash to the header element
- `text`: the header text
- `children`: An array of any lesser header elements within this header. For example the `<h3>Roman Imperatorial Period</h3>` being an element in the `children` array of `<h2>Roman Republic</h2>`.  

### Flatten
The NuxtContent table of contents is a recursive structure, but ideally should be flattened so one can easily iterate over the list and use the `depth` for structure.

The following function will flatten the recursive table of contents data into a linear one and creates hash links.

```vue
<script setup>
const route = useRoute()
const flatLinks = ref([])
let isFlattened = false;

function flattenLinks(docLinks) {
  for(const link of docLinks) {
  let linkObj = {
      depth: link.depth,
      id: link.id,
      label: link.text,
      to: `${route.path}#${link.id}`,
    }
    flatLinks.value.push(linkObj)
    if(link.children) flattenLinks(link.children)
  }
}

function flattenOnce(docLinks) {
  if(!isFlattened) {
    isFlattened = true;
    flattenLinks(docLinks);
  }
}
</script>

<template>
  <article class="prose dark:prose-invert">
    <ContentDoc>
      <template v-slot="{ doc }">
        {{ flattenOnce(doc.body.toc.links) }}
        <nav>
          <ul>
            <li v-for="link of flatLinks" :key="link.id">
              <NuxtLink :to="link.to">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </nav>
        <ContentRenderer :value="doc" />
      </template>
    </ContentDoc>
  </article>
</template>
```

The function `FlattenLinks` will create an array that looks like:

```json
[
  {
    "depth": 2,
    "id": "roman-republic",
    "label": "Roman Republic",
    "to": "/example#roman-republic"
  },
  {
    "depth": 3,
    "id": "roman-imperatorial-period",
    "label": "Roman Imperatorial Period",
    "to": "/example#roman-imperatorial-period"
  },
  {
    "depth": 2,
    "id": "roman-empire",
    "label": "Roman Empire",
    "to": "/example#roman-empire"
  }
]
```

The `{{ flattenOnce(doc.body.toc.links) }}` is a call to the semaphore guarded function (so this only happens once), which calls a recursive function `flattenLinks` to linearize the recursive table of contents array into a list of NuxtLinks.

```html
<ul>
  <li>
    <a href="/coins#roman-republic">Roman Republic</a>
  </li>
  <li>
    <a href="/coins#roman-imperatorial-period">Roman Imperatorial Period</a>
  </li>
  <li>
    <a href="/coins#roman-empire">Roman Empire</a>
  </li>
</ul>
```

the array order maintaining the recursive structure.

## VerticalNavigation ToC

[Nuxt UI](https://ui.nuxt.com/) has a [VerticalNavigation](https://ui.nuxt.com/components/vertical-navigation) component which will create a nice vertical list of links. Its `links` prop will take our `flatLinks` array directly. `<UVerticalNavigation :links="flatLinks" />` 

### Tailwind Prose Styling 
Adding some tailwind prose and not-prose styling to the html template gives us a nice list.

```vue
<template>
  <article class="prose dark:prose-invert">
    <ContentDoc>
      <template v-slot="{ doc }">
        {{ flattenOnce(doc.body.toc.links) }}
        <nav class="not-prose">
          <div class="font-semibold mb-1 text-sm ml-2.5">
            Table of Contents
          </div>
          <div class="overflow-y-auto text-xs">
            <UVerticalNavigation :links="flatLinks" />
          </div>
        </nav>
        <ContentRenderer :value="doc" />
      </template>
    </ContentDoc>
  </article>
</template>
```

Inserting some tailwind styling into our flattenLink link object allows further styling of the links and indenting of the header elements less than 2.

```js
    let labelClass = "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
    let linkObj = {
      id: link.id,
      class: 'bg-white hover:bg-gray-100',
      to: `${route.path}#${link.id}`,
      label: link.text,
      labelClass: link.depth >= 3 ? labelClass + ' ml-2 text-xs' : labelClass + ' font-semibold'
    }
```
### exact-hash
Since this table of contents are all local hash links, VerticalNavigation thinks they all should be active. You need to pass the `exact-hash: true` to get it on only highlight the current section.

```js
    let linkObj = {
      // ....
      exactHash: true
    }

```

## DropDown TOC

To create a drop down control table of contents using NuxtUI [Dropdown](https://ui.nuxt.com/components/dropdown) we need to structure the `dropLinks` array a little differently. We add our previous array to it to make it multi-dimensional array instead, like this.

```js
const dropLinks = ref([])
// ....

function flattenOnce(docLinks) {
  if(!isFlattened) {
    isFlattened = true;
    flattenLinks(docLinks);
    dropLinks.value.push([...flatLinks.value])
  }
}
```

then we can add a dropdown control (with some tailwind styling) like this.

```vue
<UDropdown 
  :items="dropLinks" 
  :popper="{ offsetDistance: 0, placement: 'bottom-start' }"
  :ui="{ rounded: 'rounded-sm' }"
  class="block relative"
>
  <UButton 
    color="white"
    icon="i-heroicons-queue-list-solid"
    trailing-icon="i-heroicons-chevron-down-20-solid"
    :ui="{ rounded: 'rounded-sm' }"
  >
    Table of Contents
  </UButton>
</UDropdown>
```

## Putting it all together

Here is a full vue file that will generate a table of contents in both the DropDown and VerticalNavigation.

```vue
<script setup>
const route = useRoute()
const flatLinks = ref([])
const dropLinks = ref([])
let isFlattened = false;

function flattenLinks(docLinks) {
  for(const link of docLinks) {
    let labelClass = "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
    let linkObj = {
      id: link.id,
      class: 'bg-white hover:bg-gray-100',
      to: `${route.path}#${link.id}`,
      label: link.text,
      labelClass: link.depth >= 3 ? labelClass + ' ml-2 text-xs' : labelClass + ' font-semibold',
      exactHash: true
    }
    flatLinks.value.push(linkObj)
    if(link.children) flattenLinks(link.children)
  }
}

function flattenOnce(docLinks) {
  if(!isFlattened) {
    isFlattened = true;
    flattenLinks(docLinks);
    dropLinks.value.push([...flatLinks.value])
  }
}
</script>

<template>
  <article class="prose dark:prose-invert">
    <ContentDoc>
      <template v-slot="{ doc }">
        {{ flattenOnce(doc.body.toc.links) }}
        <nav class="not-prose">
          <UDropdown 
            :items="dropLinks" 
            :popper="{ offsetDistance: 0, placement: 'bottom-start' }"
            :ui="{ rounded: 'rounded-sm' }"
            class="block relative"
          >
            <UButton 
              color="white"
              icon="i-heroicons-queue-list-solid"
              trailing-icon="i-heroicons-chevron-down-20-solid"
              :ui="{ rounded: 'rounded-sm' }"
            >
              Table of Contents
            </UButton>
          </UDropdown>
          <div class="overflow-y-auto text-xs">
            <UVerticalNavigation :links="flatLinks" />
          </div>
        </nav>
        <ContentRenderer :value="doc" />
      </template>
    </ContentDoc>
  </article>
</template>
```