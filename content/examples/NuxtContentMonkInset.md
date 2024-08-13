---
title: MonkInset Component
description: MonkInset creates a floating block of an image, emoji, and/or text with an effect like an illuminated medieval manuscript for NuxtContent authors using simple Markdown text syntax.
topic: NuxtContent
isToc: true
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
onkInset is a Pennock Projects developed NuxtContent custom component that cordons specific character or image content (actually any text or images) in a markdown file and places it in a separate sized `<div></div>` element and floats it right or left. The intent is that one can create an effect similar to large embellished initial characters of an illuminated medieval manuscript and the other text 'flows' around it. See [Examples](#text-examples)



See these blog posts for information regarding how to use NuxtContent Components and how to develop them:
- [Using Custom Components](/blog/2024/nuxtcontentcomponentusage) 
- [Coding and Implementing Custom Components](/blog/2024/nuxtcontentcomponentimplement) 


## Setup

To set up, place the [MonkInset source code](#MonkInsetSource) into a `MonkInset.vue` file in your Nuxt.js project in the `/components/content` folder (note this directory may change, check the NuxtContent documentation on where NuxtContent custom components are placed)

#### MonkInset Slots
MonkInset only has a default slot.

#### MonkInset Parameters
The two main key parameters for MonkInset `float` and `size`
1. `float:` - float to right or left
  - `left`
  - `right`
2. `size:` - pick a size
  - `xs`
  - `sm`
  - `md`
  - `lg`
  - `xl`

Additionally, some CSS parameters can be overridden

- `margin` - This is the margin on the side of the MonkInset `<div></div>` element separating it from the content on the other side.  If `float="left"` it is `margin-right:`, if `"float=right"`, it is `margin-left`.

- `maxHeight` - This the `max-height:` of any `<img><img>` element within MonkInset
- `maxWidth` - This the `max-width` of any `<img><img>` element within MonkInset
- `fontSize` - This is the `fontsize:` of any `<p></p>` element within MonkInset
- `height` - This is the `height:` of any `<p></p>` element within MonkInset
- `lineHeight` - This is the `line-height:` of any `<p></p>` element within MonkInset

### MonkInset Source
```vue
```

## Text Examples

#### xs

Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat. 
::monk-inset{size='xs'}
Xg
::
::monk-inset{size='xs' float='right'}
Q
::

Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat. 

#### sm

Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat. 
::monk-inset{size='sm'}
S
::
::monk-inset{size='sm' float='right'}
Wy
::
Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat. Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat. 

#### md

Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat. 
::monk-inset
Mg
::
::monk-inset{float='right'}
D
::
Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat. Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat. 

#### lg

Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat. 
::monk-inset{size='lg'}
L
::
Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat. 
Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat. 

#### xl

::monk-inset{size='xl'}
Xy
::
::monk-inset{size='xl' float='right'}
Pp
::
Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat. 
Cillum esse pariatur et culpa amet. Commodo non do dolor exercitation. Ad cupidatat commodo quis quis consequat. 

## Emoji Examples

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

## Image Examples

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
