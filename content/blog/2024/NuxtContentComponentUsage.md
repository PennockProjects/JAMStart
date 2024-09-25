---
title: Using NuxtContent Custom Components
description: How to use Vue.js Nuxt.js NuxtContent Custom Components in Markdown
topic: Markdown
isToc: true
createDate: 2024-07-24
createAuthor: John Pennock
image: '/images/CustomComponentsAs2PuzzlePieces.jpg'
imageAlt: Custom Component as Puzzle Pieces

---

::monk-inset{size='xl'}
N
::

uxtContent Custom Components are vue.js components that reside in a single SFC `.vue` file and are used to add custom presentation of Markdown text. For example a custom component could convert specified markdown image and caption into a `<figure></figure>` and `<figcaption></figcaption>` HTML elements.  I've developed some custom components for this website and others and a discussion about them can be found here:

Pennock Projects NuxtContent Custom Components
- [MonkInset](/code/nuxtcontentmonkinset)
- [FigureCaption](/code/nuxtcontentfigurecaption)

If you interested in the details about software development and various associated issues see this blog post on [coding and implementation](nuxtcontentcomponentimplement)

## Prerequisites
In order to use Pennock Project NuxtContent custom components 'out of the box' the following prerequisites are assumed.
- Nuxt.js project
- NuxtContent module
- Tailwind Typographic Prose module

### NuxtContent Module
The [Nuxt Content](https://nuxt.com/modules/content) module for a Nuxt.js project allows you to write beautiful web pages and articles using [Markdown](/code/markdown). Markdown is a text file syntax that can be quickly converted into HTML with headers, text, images, etc. A Markdown text file is small, readable on its own, and quick to write in any text editor. The NuxtContent module reads the Markdown files and converts them to HTML.

### Tailwind CSS Typographic Prose
The Tailwind CSS Typographic Prose module automatically styles common HTML elements for readability on the web. By adding the `prose` class to the parent element all the children elements are beautifully styled. This is used in combination with the NuxtContent converted files for a seamless content management authoring system. See this [Tailwind Typographic blog post](/blog/2024/sitebuild#tailwind-css) for installation of the module and issues I've encountered with it.

## NuxtContent Custom Components
Further, custom components for NuxtContent, written as an SFC [Vue component](https://content.nuxt.com/usage/markdown#vue-components), can be used to further augment the Markdown to HTML translation process.  For example, you can create a `FigureCaption` custom component that will convert specified text into an HTML figure with a caption.

#### Custom Component Location
Adding the NuxtContent Custom Components files is as simple as placing the `.vue` file in the special `./components/content` directory. For example, a "Card" custom component file would be found at `./components/content/Card.vue`.

### Usage
The syntax for specifying which Markdown content will belong to the custom component is to use start tag `::[name]` and an end `::` tags.  Everything in between is the _default slot_ of the component.  The `[name]` being the name of the custom component. For example, this Markdown shows which text will be used by the `Card` custom component.

```markdown

This is not in the card custom component

::card
The content of the card in the default slot
::

This is not in the card custom component
```

#### Name Casing
To invoke the custom component from your Markdown content, you can use snake-case, `PascalCase` or `camelCase` for multi-worded components, i.e. a custom component `FigureCaption.vue` could be invoked as `::figure-caption`, `::FigureCaption`, `::figureCaption`, or `::figurecaption` (case is not meaningful). Typically, the `::figure-caption` style is used as it might be more easy to type for content writers.

### Slots
Content components can have a single default slot or a default slot and multiple additional slots. Each Custom Component is different, and read the component documentation to see what slots it supports. As an example a `FigureCaption` component, might use the default slot for the figure and a named slot for the caption.

#### Slot Markdown Syntax
Within the NuxtContent Custom Component block, the text up to the next slot or the end of the block is the default slot.  Named slots are specified with `#[SlotName]` on a single line and everything after that until the next named component or end of the block is for that slot. For example, a `FigureCaption` might specify the figure in the default slot, the main caption in the `#caption` named slot, and the sub caption in `#subcaption` named slot.

```md
::FigureCaption
![Pennock Projects Logo as a Circuit Board Badge](/images/PennockProjectsLogo.png)

#caption
This is the caption for the caption named slot

#subcaption
This is the sub caption for the subcaption named slot
::
```

### Passing Props
To pass [properties](https://content.nuxt.com/usage/markdown#props) to a NuxtContent components there are two different methods:
1. Inline Method
2. YAML Method

#### Inline Method
The inline method uses `{}` after the component name (no space) with different `key=value` pairs separated by a space.

```md
::alert{type="warning" icon="exclamation-circle"}
Oops! An error occurred
::
```

#### YAML Method
The YAML method uses `--- {props} ---` in the space below the component name, one per key in YAML syntax, i.e. `key: value`

In this example, you are passing `icon`, `description`, and `title` props to the `IconCard' custom component.

```md
::icon-card
---
icon: IconNuxt
description: Harness the full power of Nuxt and the Nuxt ecosystem.
title: Nuxt Architecture.
---
::
```
