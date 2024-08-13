---
title: SEO and Social
ogTitle: SEO Open Graph Tags
twitterTitle: SEO Twitter Tags
description: A system for Nuxt.js NuxtContent front-matter vars, HTML <head> tags for effective SEO Twitter and open graph social posting
ogDescription: A system for Nuxt.js NuxtContent front-matter vars, HTML <head> tags for effective SEO open graph social posting
twitterDescription: A system for Nuxt.js NuxtContent HTML <head> tags for effective SEO twitter social posting
topic: Development
isToc: true
createDate: 2024-06-25
createAuthor: John Pennock
image: /images/TwitterPostWide.jpg
imageAlt: A mouse pointer hovering over a tweet button
---

::FigureCaption
![A Picture with a Caption FigureCaption example](/images/TwitterPostWide.jpg)

#caption
A System for Content Authoring for SEO and Social
::

For examples or quick snippets see [NuxtContent SEO social examples](/examples/nuxtcontentseosocialsheet)

Each blog post developed should be tagged with specific data so that it will look inviting in search results and/or on social media. The system I developed enables a content author to add that information to the source Markdown file, so that each blog post, article or page authored will have appropriate tags and customized to the page content.

## Front-matter Key:Value Variables
The Nuxt.js NuxtContent module [front-matter](https://content.nuxt.com/usage/markdown#front-matter) allows direct authoring of header tags in the front-matter section at the top of the Markdown source file. The front-matter section is delimited with `---` and the `key: value` pairs are in [YAML syntax](https://en.wikipedia.org/wiki/YAML). The special front-matter `head` key allows the direct 'poking' of header tags (under the covers, NuxtContent uses the [`useContentHead() composable`](https://content.nuxt.com/composables/use-content-head))


### Front-matter head Key
To use front-matter to insert `<head>` keys directly, you would add the `head` front-matter key and use YAML format and indention. For example, the following YAML would generate the `og:title og:description twitter:title twitter:description` header tags. 

```yaml
---
head:
  meta:
    - name: 'og:title'
      content: 'Pennock Projects Blog'
    - name: 'og:description'
      content: 'Pennock Projects is a blog about software engineering by John Pennock'
    - name: 'twitter:title'
      content: 'Pennock Projects Blog'
    - name: 'twitter:description'
      content: 'Pennock Projects is a blog about software engineering by John Pennock'
--- 
```

> For a more complete example see [Examples Direct Vars](/examples/nuxtcontentseosocialsheet#direct-front-matter-vars)

### Front-matter Injection
Front-matter variables declared at the top can be symbolically inserted into the Markdown content by using `{{ <variable key> }}`.  For example, if you have a front-matter variable defined as `name: "Mohonri Moriancumur"` you could inject it in the body with `{{ name }}`.  This would insert the full name `Mohonri Moriancumur` everywhere you did this.

### Front-matter Programmatic
Adding every SEO and Social tag into the front-matter section of every source file would be tedious. For example, even though the article description for SEO, Open Graph, and Twitter are the same, you would have to include all three variables in the header section. Same for the title, image, and others.  To combat this, I developed a system to have minimal variables in the front-matter section and programmatically set all the similar ones.

#### `<ContentDoc>` Dynamic Page Tags
By using the [NuxtContent `<ContentDoc>` component](https://content.nuxt.com/components/content-doc) and the default slot `v-slot="{ doc }"` the document front-matter variables are available before the page is rendered.  This allows us to use the Nuxt [`useSeoMeta() composable`](https://nuxt.com/docs/api/composables/use-seo-meta) and [`useHead() composable`](https://nuxt.com/docs/api/composables/use-head) functions to set the meta head tags. For example, with a single front-matter key 'description' that can be used to set the page, Open Graph and Twitter descriptions. This avoids redundancy and shortens the front-matter data entry section.

In the foollowing code snippet, the function `onDocReady` accepts the `doc` variable.

```html
<template>
  <ContentDoc>
    <template v-slot="{ doc }">
      {{ onDocReady(doc)  }}
      <article class="mx-auto">
        {{ title }}
      </article>
    </template>
  </ContentDoc>
</template>
```

Then in the `onDocReady` function in `<script setup>` section of the `.vue` file, the `useHead()` composable and `useSeoMeta()` composable can set that tags programmatically. In the following code is shown how to reactively use the `useSeoMeta()` composable for the `og:description` and `twitter:description` from a single front-matter `description` variable 

```vue
<script setup>
// create a default.
const socialDefaults = {
  description: 'Pennock Projects is a software engineering blog about front end frameworks, backend services, databases, and AI architecture by John Pennock',
}

// create reactive ref variables
const ogDescription = ref(socialDefaults.description)
const twitterDescription = ref(socialDefaults.description)

// reactively set the SeoMeta
useSeoMeta({
  ogDescription: () => ogDescription.value,
  twitterDescription: () => twitterDescription.value,
})

// Look for overrides 'ogDescription' and 'twitterDescription' 
//  front-matter variables to allow for a custom descriptions
//  but then use the 'description' front-matter variable
//  or the fallback default description
const onDocReady = (doc) => {
  ogDescription.value = doc.ogDescription || doc.description || socialDefaults.description
  twitterDescription.value = doc.twitterDescription || doc.description || socialDefaults.description
}

</script>
```

## Most Important SEO Tags
The most important SEO that search engine crawlers look for are:
- Title
- Description
- Canonical
- Robots 
- Copyright
- Icons

#### SEO Title
Search engine crawlers looks for the `<title></title>` element in the `<head></head>` section for an appropriate title for that page. If you use the [special front-matter variable 'title'](https://content.nuxt.com/usage/markdown#native-parameters) the `<title></title>` element will be set automagically.  
> You can also use the `titleTemplate` member of the `useHead()` composable. This title will also be used in the tab title.

#### SEO Title Tips
- Keep it short
- Every page should have a unique title
- Add “modifiers” to your title tag (How to |The current year | Review |Best | Tips | Top |Find | Buy | Easy)
- Add numbers to your title (9 Important HTML tags for your website to improve your SEO)
- Start your title tag with your subject
- Don't stuff your keywords

#### SEO Description
Search engines look for the `<meta name="description" content="">` element in the `<head>` section for the description of the page. If you use the [special front-matter variable 'description'](https://content.nuxt.com/usage/markdown#native-parameters) the `<meta>` SEO element will be set automagically.

#### SEO Canonical
The Canonical link tag is used to disambiguate all the different URLs that refer to the same page.  You could have multiple entry URLs (one for mobile, one for `http`, one for `https`, etc.) but if the canonical link is the same the search engines knows they all refer to the same page.  The `<link rel="canonical" href="{your canonical url}">` element in the `<head>` section is set using the `useHead()` composable.

For example, this constructs a Canonical element from the defined root and adds the relative path.

```js
useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: socialDefaults.rootUrl + route.path,
    },
  ],
}))
```

#### SEO Robots
The SEO Meta robots `<meta name="robots" content="{your robots choice">` element is used to tell search engine crawlers whether the page should be indexed or not.  By default, we want all your pages to be indexed therefore this is best set globally to `index, follow` and only overridden when you have a special case where you want to exclude a page from being indexed.

#### `robots.txt` vs. meta tag header
The method shown here sets the robots meta tag, the other option is to use a `robots.txt` file in your root which lists all the pages to index or exclude.  Using the meta tag is the easier approach, but there are Nuxt components which could be used to automatically generate a `robots.txt` file instaed.

#### SEO Copyright
The SEO Meta copyright `<meta name="copyright" content="{your copyright}">` element is used to tell search engine crawlers about the copyright of the page.  By default, all pages should have the same copyright and therefore this should be set globally.

#### SEO Icon
The SEO Icon shown next to the search results is derived from the icon elements in header.  While you can set them reactively, ideally you have a single high-resolution icon that can be uploaded to [favicon.io - creation of favicons and webmanifest](https://favicon.io/) which will create a package of icons as well as a `webmanifest` file.  For example:

```js
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      type: 'image/png',
      href: '/apple-touch-icon.png'
    },
    {
      rel: 'icon',
      sizes: '32x32',
      type: 'image/png',
      href: '/favicon-32x32.png'
    },
    {
      rel: 'icon',
      sizes: '16x16',
      type: 'image/png',
      href: '/favicon-16x16.png'
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest'
    },
```

## Most Important Twitter Tags

With [Twitter Cards](https://developer.x.com/en/docs/twitter-for-websites/cards/overview/abouts-cards), your blog article, or page is represented as a Twitter card in the feed. The Twitter card contains the following elements.
1. Title
1. Description
1. Image 
1. Author handle
1. Site handle

The title, description, and image are self-descriptive.  The Author handle is the Twitter handle (`@authorhandle`) for the author of the page.  The Site handle is the Twitter handle (`@sitehandle`) of the page. For me that would be `@JohnPennock` for the author handle and `@PennockProjects` for the site handle. If a page gets posted by a 3rd party follower those posts can lead to the author or the site Twitter feeds.

#### Twitter Title and Description
By default, the title and description will be the same title and description that the SEO search engines uses, e.g. `<title></title>` and `<meta name='description'>` elements. For a custom Twitter title and/or description, Twitter will look for `<meta property='twitter:title'>` and `<meta property='twitter:description'>` elements. In order to set these header elements for a page use the `twitterTitle` and `twitterDescription` fields of the `useSeoMeta()` composable.

```js
// static set the SeoMeta
useSeoMeta({
  twitterTitle: 'Custom Twitter Title',
  twitterDescription: 'Custom Twitter Verbose Description',
})
```

Further, in the system I developed the `title` or `description` will be used and can be overridden `twitterTitle` or `twitterDescription` front-matter keys.

### Twitter Card Images
There are two main different Twitter Cards and they each have a different aspect ratio expected for the image.
- Twitter Summary Card - square image, 1x1
- Twitter Summary Large Image Card - rectangle image, 2x1, twice as wide as tall.

The Large Image Card is the default as it has a larger image display and is similar aspect ratio to the Open Graph image which means you can use the same image for both.

The Image URL provided for either card should be unique image representing the content of the page. You should not use a generic image such as your website logo, author photo, or other image that spans multiple pages. Images must be less than 5MB in size. `JPG`, `PNG`, `WEBP` and `GIF` formats are supported. Only the first frame of an animated GIF will be used. `SVG` is not supported.

You can preview how your page looks on Twitter with the [Twitter Card Validator](https://cards-dev.twitter.com/validator)

#### Summary Image
The [Twitter summary card](https://developer.x.com/en/docs/twitter-for-websites/cards/overview/summary) image supports an aspect ratio of 1:1 (square) with minimum dimensions of 144x144 or maximum of 4096x4096 pixels.  It is recommended size of 512 x 512.

#### Summary Large Image
The [Twitter summary large image card](https://developer.x.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image) image supports an aspect ratio of 2:1 (rectangle wider width than height) with minimum dimensions 300x157 or maximum of 4096x2048 pixels. 


### Table of Twitter Tags
This table shows the HTML header tags that are generated and any Front-matter key values used.

| HTML Header tag       | Front-matter keys                       | Front-matter values               |
|:---------------------:|:---------------------------------------:|:---------------------------------:|
| `twitter:card`        | `twitterCard`                           | `summary_large_image` | `summary` |
| `twitter:title`       | `twitterTitle` then `title`             | < 60 characters                   |
| `twitter:description` | `twitterDescription` then `description` | < 130 characters                  |
| `twitter:image`       | `twitterImage` then `image`             | image URL link to 2x1 or 1x1      |
| `twitter:image:alt`   | `twitterImageAlt` then `imageAlt`       | string, description of image      |
| `twitter:creator`     | `twitterCreatorHandle`                  | twitter handle of author          |
| `twitter:site`        | NA - set globally                       | NA - set globally                 |

 The defaults for twitter card are `summary_large_image` and the title and description on the site title and description.  The Site handle is set globally.


## Social Post Image

### Image Sizes
The recommended size for an Open Graph (OG) image on Facebook is 1200 x 630 pixels, and the recommended size for a Twitter card image is 1024 x 512 pixels. However, Twitter card images can be as large as 4096 x 4096 pixels. Both types of images should have a 2:1 aspect ratio and a file size of less than 8 MB. 

For Website cards, 800 x 800 is recommended.

## Most Important SEO Tags
1. Title tag
2. Meta description
3. Canonical Tag
4. Alternative text (Alt) Tag
5. Robots meta tag
6. Social Media Meta Tags (Open Graph and Twitter Cards)
7. Responsive Design Meta Tag

### Title Tag
Should be short, keep it under 60 characters

tips
- Add “modifiers” to your title tag (How to |The current year | Review |Best | Tips | Top |Find | Buy | Easy)
- Embed long tail keywords in title tags
- Add numbers to your title (9 Important HTML tags for your website to improve your SEO)
- Start your title tag with your main targeted keyword
- Don't stuff your keywords
- Every page should have a unique title tag

### Description
Snippets on mobile truncate to 130 characters and web to 160 characters.  Make it look nice in the search results.

### Canonical
If you are not doing a lot page duplications (different urls to get the same page) you don't need this.

If you want to dedup, you need to setup up a

### Open Graph (OG) Facebook

#### Open Graph Title and Description
By default, the title and description will be the same title and description that the SEO search engines uses, e.g. `<title></title>` and `<meta name='description'>` elements. For a custom Twitter title and/or description, Twitter will look for `<meta property='twitter:title'>` and `<meta property='twitter:description'>` elements. In order to set these header elements for a page use the `twitterTitle` and `twitterDescription` fields of the `useSeoMeta()` composable.

```js
// static set the SeoMeta
useSeoMeta({
  twitterTitle: 'Custom Twitter Title',
  twitterDescription: 'Custom Twitter Verbose Description',
})
```

Further, in the system I developed the `title` or `description` will be used and can be overridden `twitterTitle` or `twitterDescription` front-matter keys.

- og:type: "article"
- og:site_name: "Pennock Projects"


## Full System
The SEO and Social Posting Architecture I developed uses a couple of [Front-matter](https://content.nuxt.com/usage/markdown#front-matter) meta-data entries and the appropriate head meta tags are automagically generated from the markdown which increase Search Engine Optimization (SEO) and engagement on Social Platforms such as Facebook, X/Twitter, or LinkedIn.

