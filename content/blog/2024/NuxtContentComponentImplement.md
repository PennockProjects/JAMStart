---
title: Implementing NuxtContent Components
description: Examples and some developer notes on creating Vue.js Nuxt.js NuxtContent Custom Component
topic: Development
createDate: 2024-06-03
createAuthor: John Pennock
isToc: false
image: '/images/CustomComponentsAs2PuzzlePieces.jpg'
imageAlt: Custom Component as Puzzle Pieces
---

Vue.js NuxtContent Custom Components are `.vue` files which are used to add custom features and presentation for website pages composed using NuxtContent markdown files. Site pages are authored with simple text with Markdown syntax. Authors add a couple of syntax hints that then are transformed.  For example, a page author could add a Figure with a Caption within the text.

```


Here are complete examples of NuxtContent Custom Components I developed (shared for use under the MIT license).

Pennock Projects NuxtContent Custom Components
- [MonkInset](/code/nuxtcontentmonkinset)
- [FigureCaption](/code/nuxtcontentfigurecaption)

See this blog post on [usage](nuxtcontentcomponentusage)

## NuxtContent Components

One interesting thing you can do it to write a [Vue component](https://content.nuxt.com/usage/markdown#vue-components) that can be used in your Markdown text.  For example, you can create a `FigureCaption` component that if designated in the markdown content file will convert text into HTML figure with a caption.

#### Component Location
All NuxtContent Custom Components `.vue` files are kept in the `./components/content` directory.  A Card custom component file would be found at `./components/content/Card.vue`

## Implementation Notes

### Prose Styling 'Bug'
When implementing a new NuxtContent Custom Component I encountered a 'bug' when using a `<style scoped></style>` section and automatic Tailwind Prose components in slots. The Prose components will be considered a child component, and therefore you cannot create a scoped style for them as they are out of scope.

For example, say you created a component that uses a slot to specify an image. MDC converts that image into a Prose component in that slot.  For example, by default an image will be converted to:
```html
<p>
  <img src="...">
</p>
``` 

You can use the Remark Unwrap Images plugin to reduce that to
```html
<img src="..." />
```

But, in either the inserted Prose component is a child component and not normally accessible for CSS descendent selectors. 

For example, if in the template you create a `<div class="[classname]"></div>` around a slot:

```vue
<template>
  <div class="imgDiv">
    <slot name="image" />
  </div>
</template>
```

You will not be able to use a normal CSS descendant selector to any `<img>` element that gets inserted as a prose component child element. 

For example the `.imgDiv img` does not work

```vue
<style scoped>
/* this does *not* select the image */
.imgDiv img {
  @apply sm:mx-auto max-h-80 lg:max-h-96 max-w-60 sm:max-w-80 md:max-w-none
} 
</style>
```

There are two solutions to this 'problem'.

1. Use deep linking combinator
2. Use global style

#### Deep Linking Selector
You can use the deep selector combinator `:deep()` like this:

```vue
<style scoped>
/* this *does* select the image */
.imgDiv :deep(img) {
  @apply sm:mx-auto max-h-80 lg:max-h-96 max-w-60 sm:max-w-80 md:max-w-none
}
</style>

```

#### Global style

Another approach is using global styles (you can have both the scoped and global styles in the same SFC). Notice the lack of `scoped` in the `<style>` element.

```vue
<style>
/* this *does* select the image */
.imgDiv img {
  @apply sm:mx-auto max-h-80 lg:max-h-96 max-w-60 sm:max-w-80 md:max-w-none
}
</style>

```

Even though you are polluting the global CSS space, if you base the global style off a `.class` or `#id` name from within the component it is not likely to conflict.

