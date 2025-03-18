---
title: FigureCaption Component
description: The FigureCaption custom component for NuxtContent that has two slots to take default content into a <figure></figure> element and a caption content into a <figcaption></figcaption> element like you would find in an article.
topic: Nuxt Content
format: Code
keywords:
  - NuxtContent
  - Vue_js
  - Nuxt_js
  - component
isToc: false
isManualImage: true
dateCreated: 2024-08-01
author: John Pennock
image: '/images/FigureCaptionExample.JPG'
imageAlt: Asia in the Shape of Pegasus

---

## FigureCaption Component

::FigureCaption
![Fanciful 16th century map of Asia in the shape of Pegasus](/images/FigureCaptionExample.JPG)

#caption
**Figure 1** - _Asia in the Shape of a Winged Horse_ is Heinrich Bunting's 16th century map of the continent of Asia shaped in the figure of Pegasus, the winged horse sprung from the decapitated body of Medusa, from Greek mythology
::

### How to Use FigureCaption 

FigureCaption is a custom Nuxt Content Component that adds an image with a caption to any Markdown page.  To add this, include the following bare bones text into a Markdown content page.


```markdown

::figure-caption

#caption

::

```

Insert a picture in the form of `[picture alt text](\url\to\image)` between `::figure-caption` and `#caption` 

Write the caption text between `#caption` and `::`

For example, to get the same Figure Capture as is displayed at the top of this page, write the following text into a Markdown content page.

```markdown
## FigureCaption Component

::FigureCaption
![Fanciful 16th century map of Asia in the shape of Pegasus](/images/FigureCaptionExample.JPG)

#caption
**Figure 1** - _Asia in the Shape of a Winged Horse_ is Heinrich Bunting's 16th century map of the continent of Asia shaped in the figure of Pegasus, the winged horse sprung from the decapitated body of Medusa, from Greek mythology
::

```

## Code

The Figure with Caption block component at `\app\components\content\FigureCaption.vue` renders an image as a full block with an optional caption of text below.  It shows:
- Block Component
- Slots
- Default Slot `<slot />`
- Named Slots `<slot name="caption" />`
- Conditional Slot `v-if="$slots.caption"`
- Combinator Selector in Scoped Style `:deep(img)` 

### Source

Here is the copied source code for the component.

```vue
<!--
FigureCaption - a Nuxt.js NuxtContent component from Pennock Projects, MIT License, Copyright (c) 2025 John P. Pennock
version: 1.0
-->

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
  @apply border border-dashed dark:border-gray-800 p-2 m-0 w-full
}

.caption-container {
  @apply my-2 sm:text-center
}

.figure-image :deep(img) {
  max-height: 80%;
  max-width: 100%;
  @apply mx-auto
}
</style>
```


