---
title: NuxtContent
description: Some tips and tricks in working with Nuxt Content
publishedAt: 2024-06-03 10:00
isToc: true
tags:
  - Vue
  - Nuxt
  - NuxtContent
  - prose
  - markdown

---

[Nuxt Content](https://nuxt.com/modules/content) module allows you write beautiful articles using markdown, which is just text with some standardized formatting hints so it can be turned into html with headers, text, images, etc.


## Content Components
One interesting thing you can do it to write a [vue component](https://content.nuxt.com/usage/markdown#vue-components) that can be used in your markdown text.  For example you can create a 'FigureCaption' component that will convert and style a figure with a caption in your html.

### Content Component Location
All custom content components are kept in the `./components/content` directory.

### Markdown Syntax
The markdown syntax for a custom content component is to use a `::{name}` at the start and end `::` tags.  Everything in between in the _body_ of the component.  The `{name}` being the file name without extension in the content component folder.

In this example 

```markdown
::card
The content of the card
::
```

would use the custom vue component at `./components/content/Card.vue`

You use can use pascalCase or snake-case for multi-worded components.  I.e. a file name `FigureCaption.vue` can be invoked in markdown as `::figure-caption`,  `::FigureCaption`, or `::figurecaption` (case is not meaningful) , typically the `::figure-caption` style is used as it might be more readable to non-programmers.

### Slots
Content components make use of slots to allow for different markdown to be used.  For example for a `FigureCaption.vue` component you might have a slot for the figure and a slot for the caption.

#### Slot Markdown Syntax
To specify in markdown which is the caption and which is the figure you used the `#{slotName}` on a single line to specify all the following text up to the end of the component or the next slot specifier.   Default slot does not need a specifier.

#### Style Scope Bug
One 'bug' I encountered is that using a `<style scoped></style>` will not allow you to use css to select a descendent element created within the slot. I.e. a style descendent selector applied to the html for any `<img>` elements in a slot did not work.  Instead I had to put it in a global style `<style></style>`, for example

```vue

<style scoped>
/* does *not* select the image
.figure-image img {
  @apply sm:mx-auto max-h-80 lg:max-h-96 max-w-60 sm:max-w-80 md:max-w-none
} 
*/
</style>

<style>
/* this *does* select the image */
.figure-image img {
  @apply sm:mx-auto max-h-80 lg:max-h-96 max-w-60 sm:max-w-80 md:max-w-none
}
</style>

```

## FigureCaption Full Example

```vue
<template>
  <div class="figure-all">
    <figure class="figure-image not-prose">
      <slot />
    </figure>
    <figcaption v-if="$slots.caption" class="caption-container">
      <span class="figure-caption">
        <slot name="caption" />
      </span>
    </figcaption>
  </div>
</template>

<style scoped>
.figure-all {
  @apply border border-dashed dark:border-gray-700 p-2 m-0 w-full
}

.caption-container {
  @apply my-2 sm:text-center
}
</style>

<style>
.figure-image img {
  @apply sm:mx-auto max-h-80 lg:max-h-96 max-w-60 sm:max-w-80 md:max-w-none
}
</style>

```

Markdown Text

```markdown

::figure-caption

![Asia in the Shape of A Winged Horse Map](/maps/AsiaAsPegasusBunting.jpg)

#caption
**Figure 1** - _Asia in the Shape of a Winged Horse_ is Heinrich Bunting's 16th century map of the continent of Asia shaped in the figure of Pegasus, the winged horse sprung from the decapitated body of Medusa, from Greek mythology

::

```
