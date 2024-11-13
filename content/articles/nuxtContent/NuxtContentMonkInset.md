---
title: MonkInset Component
description: MonkInset creates a floating block of an image, emoji, and/or text with an effect like an illuminated medieval manuscript for NuxtContent authors using simple Markdown text syntax.
topic: Nuxt Content
format: Code
keywords:
  - NuxtContent
  - Vue_js
  - Nuxt_js
  - component
isToc: true
isManualImage: true
createDate: 2024-06-07
createAuthor: John Pennock
image: '/images/IlluminatedManuscriptBiblePage.jfif'
imageAlt: Custom Component as Puzzle Pieces
---

## MonkInset Intro

::monk-inset{size='lg'}
M
::
::monk-inset{float='right' size='xl'}
![Page from a Bible Illuminated Manuscript](/images/IlluminatedManuscriptBiblePage.jfif)
::
onkInset is a Pennock Projects developed NuxtContent custom component that cordons specific character or image content (actually any text or images) in a markdown file and places it in a separate sized `<div></div>` element and floats it right or left. The intent is that one can create an effect similar to large embellished initial characters of an illuminated medieval manuscript and the other text 'flows' around it. See [examples](#examples)



See these blog posts for information regarding how to use NuxtContent Components and how to develop them:
- [Using Custom Components](/blog/2024/nuxtcontentcomponentusage) 
- [Coding and Implementing Custom Components](/blog/2024/nuxtcontentcomponentimplement) 


## Setup

To set up, place the [MonkInset source code](#MonkInsetSource) into a `MonkInset.vue` file in your Nuxt.js project in the `/components/content` folder (note this directory may change, check the NuxtContent documentation on where NuxtContent custom components are placed)

### MonkInset Slots
MonkInset only has a default slot.

### MonkInset Parameters
The two main key parameters for MonkInset `float` and `size`
- `float:` - float to right or left
  - `left` (default)
  - `right`
- `size:` - pick a size
  - `xs`
  - `sm`
  - `md` (default)
  - `lg`
  - `xl`

Additionally, some CSS parameters can be overridden

- `margin` - This is the margin on the side of the MonkInset `<div></div>` element separating it from the content on the other side.  If `float="left"` it is `margin-right:`, if `"float=right"`, it is `margin-left`.

- `maxHeight` - This the `max-height:` of any `<img><img>` element within MonkInset
- `maxWidth` - This the `max-width` of any `<img><img>` element within MonkInset
- `fontSize` - This is the `fontsize:` of any `<p></p>` element within MonkInset
- `height` - This is the `height:` of any `<p></p>` element within MonkInset
- `lineHeight` - This is the `line-height:` of any `<p></p>` element within MonkInset

## MonkInset Code
```vue
<!--
MonkInset - a Nuxt.js NuxtContent component from Pennock Projects, MIT License, Copyright (c) 2024 John Pennock
version: 1.0
-->
<script setup>

const props = defineProps({
  float: {
    type: String,
    default: 'left'
  },
  fontSize: {
    type: String
  },
  height: {
    type: String
  },
  lineHeight: {
    type: String
  },
  margin: { 
    type: String
  },
  maxHeight: {
    type: String
  },
  maxWidth: {
    type: String
  },
  size: {
    type: String,
    default: 'md'
  }
})

const sizeDefaults = {
  xs: {
    size: 'xs',
    divMarginContent: '0.1em',
    imgMaxHeight: '0.9em',
    imgMaxWidth: '0.9em',
    pFontSize: '0.5em',
    pHeight: '1em',
    pLineHeight: '1em',
    pMarginTop: '1.7em'
  },
  sm: {
    size: 'sm',
    divMarginContent: '0.2em',
    imgMaxHeight: '3em',
    imgMaxWidth: '3em',
    pFontSize: '1.3em',
    pHeight: '1.0em',
    pLineHeight: '1.0em',
    pMarginTop: '0.3em'
  },
  md: {
    divMarginContent: '0.3em',
    size: 'md',
    imgMaxHeight: '6em',
    imgMaxWidth: '6em',
    pFontSize: '1.8em',
    pHeight: '1.0em',
    pLineHeight: '1.0em',
    pMarginTop: '0.1em'
  },
  lg: {
    size: 'lg',
    divMarginContent: '0.4em',
    imgMaxHeight: '9em',
    imgMaxWidth: '9em',
    pFontSize:'3em',
    pHeight: '1.0em',
    pLineHeight: '1.0em',
    pMarginTop: '-0.1em'
  },
  xl: {
    size: 'xl',
    divMarginContent: '0.5em',
    imgMaxHeight: '12em',
    imgMaxWidth:  '12em',
    pFontSize: '5em',
    pHeight: '1.0em',
    pLineHeight: '1.0em',
    pMarginTop: '-0.25em'
  }
}

// 'size' parameter validation
const sizeString = ref(props.size)
const sizeStrings = ['xs', 'sm', 'md', 'lg', 'xl']
if(!sizeStrings.includes(sizeString.value)) {
  console.warn("MonkInset", "size='" + sizeString.value + "'", "is not a known value and not one of the known size values", "'" + sizeStrings.toString() + "'")
  sizeString.value = 'md'
}

const floatInsetClass = props.float == 'left' ? 'inset-left' : (props.float == 'right' ? 'inset-right' : '')
const divMarginContentClass = props.margin || sizeDefaults[sizeString.value].divMarginContent;
const divMarginOpposite = '0em'
const imgMaxHeightClass = props.maxHeight || sizeDefaults[sizeString.value].imgMaxHeight
const imgMaxWidthClass = props.maxWidth || sizeDefaults[sizeString.value].imgMaxWidth
const pFontSizeClass = props.fontSize || sizeDefaults[sizeString.value].pFontSize
const pLineHeightClass = props.lineHeight || sizeDefaults[sizeString.value].pLineHeight
const pHeightClass = props.height || sizeDefaults[sizeString.value].pHeight
const pMarginTop = sizeDefaults[sizeString.value].pMarginTop

</script>

<template>
  <div class="monk-inset" :class="floatInsetClass">
    <slot />
  </div>
</template>

<style scoped>
.inset-left {
  margin-left: v-bind('divMarginOpposite');
  margin-right: v-bind('divMarginContentClass');
  @apply clear-left float-left
}

.inset-right {
  margin-left: v-bind('divMarginContentClass');
  margin-right: v-bind('divMarginOpposite');
  @apply clear-right float-right
}


.monk-inset :deep(img) {
  max-width: v-bind('imgMaxWidthClass');
  max-height: v-bind('imgMaxHeightClass');
  margin-top: 1em;
  @apply p-0 mb-0
}

.monk-inset :deep(p) {
  font-size: v-bind('pFontSizeClass');
  margin-top: v-bind('pMarginTop');
  @apply p-0 ml-0 mr-0 mb-0
}

</style>

```

## Examples

### Text

#### xs

::monk-inset{size='xs'}
Xs
::
::monk-inset{size='xs' float='right'}
X
::

Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat. 

#### sm

::monk-inset{size='sm'}
S
::
::monk-inset{size='sm' float='right'}
Sm
::
Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat. 

#### md

::monk-inset
Md
::
::monk-inset{float='right'}
M
::
Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat. 

#### lg

::monk-inset{size='lg'}
L
::
::monk-inset{size='lg' float='right'}
Lg
::

Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat. 
Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat. 

#### xl

::monk-inset{size='xl'}
Xl
::
::monk-inset{size='xl' float='right'}
l
::
Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat. 
Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat. 

### Emojis

#### xs

::monk-inset{size='xs'}
:bomb:
::
::monk-inset{size='xs' float='right'}
:snowman:
::
Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat.

#### sm

::monk-inset{size='sm'}
:snowman:
::
::monk-inset{size='sm' float='right'}
:bomb:
::
Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat.

#### md

::monk-inset
:bomb:
::
::monk-inset{float='right'}
:snowman:
::
Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat.

#### lg

::monk-inset{size='lg'}
:snowman:
::
::monk-inset{size='lg' float='right'}
:bomb:
::
Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat.
Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat.

#### xl

::monk-inset{size='xl'}
:bomb:
::
::monk-inset{size='xl' float='right'}
:snowman:
::
Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat.
Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat.

### Images

#### xs

::monk-inset{size='xs'}
![Pennock Projects Logo as a Circuit Board Badge](/images/PennockProjectsLogo.png)
::
Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat.
Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat.

#### sm

::monk-inset{size='sm' float='right'}
![Pennock Projects Logo as a Circuit Board Badge](/images/PennockProjectsLogo.png)
::
Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat. Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat.

#### md

::monk-inset
![Pennock Projects Logo as a Circuit Board Badge](/images/PennockProjectsLogo.png)
::
Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat.
Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat.

#### lg

::monk-inset{size='lg' float='right'}
![Pennock Projects Logo as a Circuit Board Badge](/images/PennockProjectsLogo.png)
::
Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat.
Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat.
Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat.

#### xl

::monk-inset{size='xl'}
![Pennock Projects Logo as a Circuit Board Badge](/images/PennockProjectsLogo.png)
::
Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat.
Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat.
Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat.
