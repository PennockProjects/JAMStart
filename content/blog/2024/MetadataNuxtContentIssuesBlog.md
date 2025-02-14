---
title: Troubleshooting NuxtContent SEO Metadata
description: Troubleshooting issues encountered with a real world implementation of the NuxtContent Markdown driven blog with SEO and Social Sharing on X/Twitter and Facebook Open Graph.
topic: Code
format: Troubleshooting
keywords:
  - NuxtContent
  - Nuxt_js
  - Metadata
  - SEO
  - SocialShare
  - OpenGraph
isToc: true
createDate: 2024-11-11
createAuthor: John Pennock
image: /images/TwitterPostWide.jpg
imageAlt: A mouse pointer hovering over a tweet button
---

When developing my blog platform that relies on `Nuxt.js` `NuxtContent module` Metadata content I encountered some issues and learnings when observing content sharing on X/Twitter, Open Graph Facebook or SEO. In some cases, the issues were due to misunderstandings about static site generation and in other cases it was related to API documentation of the X/Twitter social sharing.

## X/Twitter Image Issues
After deploying my statically generated blog site to AWS CloudFront/S3, I was unable to get the image for the article to appear at all when I tried to share that article in a post on X/Twitter.  I eventually tracked this issue down that X/Twitter may have trouble with relative image links.  Meaning when I specified the data as a relative path vs. a full URL.

```html
<!-- relative path didn't work on X/Twitter -->
<meta name="twitter:image" content="/images/PennockProjectsFB.jpg">
```

```html
<!-- Full URL did work -->
<meta name="twitter:image" content="https://pennockprojects.com/images/PennockProjectsFB.jpg">
```

The OpenGraph specification has a root url metadata `og:url` and therefore the relative path seemed to work just fine everywhere else.

```html
  <meta property="og:image" content="/images/PennockProjectsFB.jpg">
  <meta property="og:url" content="https://pennockprojects.com/">
```

### Trailing Slash Rabbit-hole
Even after discovery of the relative path vs. the full URL for twitter, there still was a sporadic issue.
Only when I shared the article URL with a trailing `/` did it work.  You can read about the Lambda function I implemented to resolve this issue in the blog post [Site 302 Redirect Trailing Slash](/blog/2024/staticsiteredirect).

In the end I think the X/Twitter bot didn't mind the lack of the trailing slash because the issue seemed to go away after 24 hours or so.  I still implemented the lambda function.


## Static Site vs. Reactive 

### Observed Issue
Like in the previous example, the issue was observed is that image for the article was only showing as my *default site image* and *not* the article image.  It didn't matter if I pasted the URL or used Social Share buttons.  

### Troubleshooting Steps

#### Inspecting the HTML

When I inspected the HTML with the browser debugger, all the metadata tags seemed correct, pointing to the correct article image and not the default image.

#### Twitter Validator, Compose and Curl
Debugging this on X/Twitter was more complicated that it should have been. First, for some reason the image preview was removed from the . For my issue, that was exactly issue I was troubleshooting, so I had to use the X/Twitter compose window, to validate the image. It was showing my default site image and not the article image.  Further when I used the `curl` method to see the data, the image was correct. All of these troubleshooting steps are shown [Metadata Cheat Sheet](/articles/metadata/metadatacheatsheet#xtwitter-validator)

## Root Problem

What I realize now is that my use of reactive variables to set the image metadata during the site render was preventing X/Twitter from seeing the image. When I generated the static site, the html for the article static page had the default image in the metadata but the title and the description was the article title and description.  When X/Twitter was pulling the page html it does this *without* JavaScript and therefore it never got the updated image which was set on the render.

### `<ContentDoc>` Is Too Late
By using the [NuxtContent `<ContentDoc>` component](https://content.nuxt.com/components/content-doc) and in the default slot `v-slot="{ doc }"` this is too 'late'?  I was calling a JavaScript function called 'onDocReady' in that render slot to gain access to the Markdown front-matter variables like this.

```html
<template>
  <ContentDoc>
    <template v-slot="{ doc }">
      {{ onDocReady(doc)  }}
    </template>
  </ContentDoc>
</template>
```

In the onDocReady function I was using the Nuxt [`useSeoMeta() composable`](https://nuxt.com/docs/api/composables/use-seo-meta) and [`useHead() composable`](https://nuxt.com/docs/api/composables/use-head) functions to set the metadata tags reactively.

However, when you generate a static site the page it creates that function hasn't executed.  It *will* execute is someone opens it in a browser.

## Solution

### `queryContent` is on time

Instead of accessing the Markdown document during the `<ContentDoc></ContentDoc>` render, you can call the  [NuxtContent queryContent](https://content.nuxt.com/composables/query-content) asynchronous function during the `<script setup></script>` section.  You can access the Markdown front-matter variables after that and use `useSeoMeta` and `useHead` to set the metadata to the custom variables for the page.

```vue
<script setup>

const { data } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
let doc = data.value || {}
useSeoMeta({
  twitterImage: doc.xImage,
})

</script>
```

So even though it is asynchronous to query the Markdown document it happens before render during setup, and therefore when your do a Nuxt generate static site, that async happens the static html page has the proper metadata.

In the resources you can see the full implementation that I use for generating SEO and social sharing metadata.

## Resources
- [Metadata Cheat Sheet](/articles/metadata/metadatacheatsheet)
- [A Metadata system for NuxtContent](/articles/metadata/nuxtcontentmetadata)
