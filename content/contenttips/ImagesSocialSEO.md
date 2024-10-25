---
title: Metadata for SEO Social
description: A metadata reference for content specific images and tags for social posting and SEO
topic: Metadata
createAuthor: John Pennock
createDate: 2023-10-04
isToc: true
image: /images/Metadata.jpg
imageAlt: Mouse pointer ready to click a 'Tweet' button
---

::FigureCaption
![Mouse pointer ready to click a 'Tweet' button](/images/Metadata.jpg)

#caption
Images should be glorious.
::

| Standard | Pixels   | Format | Size  |
|:--------:|:--------:|:------:|:-----:|
| Social - X & OG    | 1200x600 | JPG | ~500k |
| Social - X/Twitter | 1200x600 Summary Large Card | JPG | ~500k |
| Social - OG        | 1200x630 | JPG | ~500k |
| SEO Search Results | Fav Icon Suite | Fav | NA |

Fav Icon Suite generator - [favicon.io](https://favicon.io/)

## X/Twitter

### X/Twitter Card Images
| X/Twitter    | Aspect | Min | Max | Recommended |
|--------------|--------|-----|-----|-------------|
| [Twitter summary large image card](https://developer.x.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image) - DEFAULT Site Share | 2x1 | 300x157 | 4096x2048 | *1024x512* |
| [Twitter summary card](https://developer.x.com/en/docs/twitter-for-websites/cards/overview/summary) | square 1x1 | 144x144 |4096x4096 | 512x512 |
| Profile photo | square | | | 400x400 |
| Landscape post | 16x9 | | | 1600x900 |
| Portrait post | custom | | | 1080x1350 |
| Square post | square | | | 1080x1080 |
| Cover photo | 3x1 | | | 1500x500 |

- Images must be less than 5 MB in size
- Twitter Image Formats - `JPG` `PNG` `WEBP`, `GIF` (Only the first frame of an animated GIF will be used). 
`SVG` is *not* supported.

### X/Twitter Meta Tags
```html
  <meta name="twitter:title" content="Pennock Projects">
  <meta name="twitter:description" content="John Pennock's software development blog and portfolio">
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

## Open Graph Posting

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

### SEO Meta Tags
```html
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Pennock Projects</title>
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" type="image/png" href="/apple-touch-icon.png">
  <link rel="icon" sizes="32x32" type="image/png" href="/favicon-32x32.png">
  <link rel="icon" sizes="16x16" type="image/png" href="/favicon-16x16.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="robots" content="index, follow">
  <meta name="copyright" content="© 2024 by John Pennock">
  <link rel="canonical" href="https://pennockprojects.com/">
  <meta name="author" content="John Pennock">
  <meta name="description" content="John Pennock's software development blog and portfolio">
```

## Blog Posts
[SEO and Social](/blog/2024/nuxtcontentseosocialblog)