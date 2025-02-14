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
createDate: 2024-08-01
createAuthor: John Pennock
image: '/images/FigureCaptionExample.JPG'
imageAlt: A Picture with a Caption FigureCaption example

---

## FigureCaption Intro

::FigureCaption
![A Picture with a Caption FigureCaption example](/images/FigureCaptionExample.JPG)

#caption
An example of FigureCaption showing an old map with a caption below
::

The Figure with Caption block component example renders an image as a full block with an optional caption of text below.  It shows:
- Block Component
- Slots
- Default Slot `<slot />`
- Named Slots `<slot name="caption" />`
- Conditional Slot `v-if="$slots.caption"`
- Combinator Selector in Scoped Style `:deep(img)` 

## Code
```vue
<!--
FigureCaption - a Nuxt.js NuxtContent component from Pennock Projects, MIT License, Copyright (c) 2024 John Pennock
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

Markdown Text

```markdown

::figure-caption

![Asia in the Shape of A Winged Horse Map](/maps/AsiaAsPegasusBunting.jpg)

#caption
**Figure 1** - _Asia in the Shape of a Winged Horse_ is Heinrich Bunting's 16th century map of the continent of Asia shaped in the figure of Pegasus, the winged horse sprung from the decapitated body of Medusa, from Greek mythology

::

```

