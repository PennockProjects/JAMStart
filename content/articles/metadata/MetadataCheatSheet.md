---
title: Metadata SEO Cheat Sheet
description: A metadata Cheat Sheet for content specific tags and images for SEO and social posting
topic: Metadata
format: Cheat Sheet
keywords:
  - Metadata
  - SEO
  - Social
isToc: true
createAuthor: John Pennock
createDate: 2023-10-04
image: /images/metadata/Metadata.jpg
imageAlt: Source code showing head elements in html
---

A cheat sheet to collect the current best practices for HTML head metadata and SEO tags.

## Images

### Resolution

| Standard                                 | Pixels         | Format |
|:----------------------------------------:|:--------------:|:------:|
| Social - combo X & OG                    | 1200x600       | JPG    |
| Social - X/Twitter ( Summary Large Card) | 4096x2048      | JPG    |
| Social - X/Twitter ( Summary Card)       | 1024x1024      | JPG    |
| Social - OG                              | 1200x630       | JPG    |
| SEO Search Results                       | Fav Icon Suite | Fav    |

Other formats are acceptable, but jpg is default.
File size of the image should be ~500k or less.

## SEO Metadata
The most important SEO that search engine crawlers look for are:
- Title
- Description
- Canonical
- Robots
- Copyright
- Icons

#### SEO Title
```html
<head>
  <title>{ your page title here }</title>>
</head>
```

#### SEO Title Tips
- Keep it short, 60 characters
- Every page should have a unique title
- Add “modifiers” to your title tag (How to |The current year | Review |Best | Tips | Top |Find | Buy | Easy)
- Add numbers to your title (9 Important HTML tags for your website to improve your SEO)
- Start your title tag with your subject
- Don't stuff your keywords

##### SEO Description
```html
<head>
  <meta name="description" content="{page description}">
</head>
```

#### SEO Description Tips
- should be at most 300 characters

#### SEO Canonical
```html
<head>
  <link rel="canonical" href="{canonical url}">
</head>
```

The Canonical link tag is used to disambiguate all the different URLs that refer to the same page.  You could have multiple entry URLs (one for mobile, one for `http`, one for `https`, etc.) but if the canonical link is the same the search engines knows they all refer to the same page.

#### NuxtContent Canonical 
In NuxtContent the `<link rel="canonical" href="{your canonical url}">` element in the `<head>` section is set using the `useHead()` composable.

For example, this constructs a Canonical element from the defined root and adds the relative path.

```js
useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: metaDefaults.rootUrl + route.path,
    },
  ],
}))
```

### SEO Robots
```html
<head>
  <meta name="robots" content="{your robots choice">
</head>
```
The `robots` metadata element is used to tell search engine crawlers whether the page should be indexed or not. The most common rules (if more than one value string, then are concatenated into a CSV string) from [docs](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)

| Rule                   | Explanation |
|:----------------------:|:------------|
| `all`                  | There are no restrictions for indexing or serving. This rule is the default value and has no effect if explicitly listed. |
| `index` or `noindex`   | Show/Do not show this page, media, or resource in search results. If you don't specify this rule, default is `index` and the page, media, or resource may be indexed and shown in search results. |
| `follow` or `nofollow` | Follow/Do not follow the links on this page. If you don't specify this rule, default is `follow` and crawlers may use the links on the page to discover those linked pages. |
| `none`                 | Equivalent to `noindex`, `nofollow`. |

Most common `"index, follow"` = index and follow links


#### metadata vs. `robots.txt`
An alternate option is to use a `robots.txt` file in your root which lists all the pages to index or exclude. Using the meta element is the easier approach

#### SEO Copyright
```html
<head>
  <meta name="copyright" content="{your copyright}">
</head>
```
The SEO Meta copyright element is used to tell search engine crawlers about the copyright of the page.

### SEO Fav Icon
```html
<head>
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" type="image/png" href="/apple-touch-icon.png">
  <link rel="icon" sizes="32x32" type="image/png" href="/favicon-32x32.png">
  <link rel="icon" sizes="16x16" type="image/png" href="/favicon-16x16.png">
  <link rel="manifest" href="/site.webmanifest">
</head>
```

The image of your website in the browser tab or the image shown next to the search results is derived from icon elements in header.  

#### Fav Generator

Fav Icon Suite generator - [favicon.io](https://favicon.io/)
Create a single high-resolution image that can be uploaded to [favicon.io - creation of favicons and web manifests](https://favicon.io/) which will create a suite of icons as well as a `webmanifest` file.

#### `webmanifest` file
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

## X/Twitter

### X/Twitter Card Images
| X/Twitter    | Aspect Min/Max | Recommended |
|--------------|----------------|-------------|
| [large image card](https://developer.x.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image) - DEFAULT | 2x1 300x157 - 4096x2048 | *1024x512* |
| [summary card](https://developer.x.com/en/docs/twitter-for-websites/cards/overview/summary) | square 1x1 144x144 - 4096x4096 | 512x512 |
| Profile photo | square | 400x400 |
| Landscape post | 16x9 | 1600x900 |
| Portrait post | custom | 1080x1350 |
| Square post | square | 1080x1080 |
| Cover photo | 3x1 | 1500x500 |

- Images must be less than 5 MB in size
- Twitter Image Formats - `JPG` `PNG` `WEBP`, `GIF` (Only the first frame of an animated GIF will be used). 
`SVG` is *not* supported.

### X/Twitter HTML metadata
```html
  <meta name="twitter:title" content="Site title">
  <meta name="twitter:description" content="Site description">
  <meta name="twitter:image" content="https://pennockprojects.com/images/PennockProjectsFB.jpg">
  <meta name="twitter:image:alt" content="Pennock Projects Logo">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@PennockProjects">
  <meta name="twitter:creator" content="@JohnPennock">
```

Note: `twitter:image` can not be relative[^1]

[^1]: from the troubleshooter [article](https://devcommunity.x.com/t/card-error-unable-to-render-or-no-image-read-this-first/62736) "Are you using an absolute and full URL (including the https protocol piece), not a relative one?"

### X/Twitter Validator
- [X/Twitter Card Validator](https://cards-dev.twitter.com/validator) - tags
- X/Twitter compose for image validation.
- [X/Twitter troubleshooting](https://devcommunity.x.com/t/card-error-unable-to-render-or-no-image-read-this-first/62736)
  - curl -v -A Twitterbot `<url>`

## Open Graph

### Open Graph Images

| Open Graph | Aspect | Recommended |
|:----------:|:------:|:-----------:|
| Wall | 2x1 (kind of) | 1200 x 630 |

A file size of less than 8 MB. 

### Open Graph Meta tags
```html
  <meta property="og:description" content="John Pennock's software development blog and portfolio">
  <meta property="og:type" content="article">
  <meta property="og:image" content="/images/PennockProjectsFB.jpg">
  <meta property="og:image:alt" content="Pennock Projects Logo">
  <meta property="og:site_name" content="Pennock Projects">
  <meta property="og:url" content="https://pennockprojects.com/">
  <meta property="og:title" content="Pennock Projects">
```

Note: `og:image` can be relative when `og:url` is used.

### OG Facebook LinkedIn Validators
- [Facebook Validator](https://developers.facebook.com/tools/debug/)
- [LinkedIn Validator](https://www.linkedin.com/post-inspector/)

## SEO
Typically all your pages will be represented by your fav icon suite. Starting with at least a 180x180 image use [favicon.io](https://favicon.io/) to create a package of icons as well as a `webmanifest` file.

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

## Resources
[SEO and Social](/blog/2024/metadatanuxtcontentissuesblog)
[A System for NuxtContent Metadata](/articles/metadata/nuxtcontentmetadata)

#### Footnotes