---
title: Images Social SEO
description: A quick reference around images for social posting and SEO
topic: Images
createAuthor: John Pennock
createDate: 2023-10-04
isToc: true
image: /images/TwitterPostWide.jpg
imageAlt: Mouse pointer ready to click a 'Tweet' button
---

::FigureCaption
![Mouse pointer ready to click a 'Tweet' button](/images/TwitterPostWide.jpg)

#caption
Images should be glorious.
::

| Standard | Pixels   | Format | Size  |
|----------|----------|--------|-------|
| Social - X & OG    | 1200x600 | JPG | ~500k |
| Social - X/Twitter | 1200x600 Summary Large Card | JPG | ~500k |
| Social - OG        | 1200x630 | JPG | ~500k |
| SEO Search Results | Fav Icon Suite | Fav | NA |

Fav Icon Suite generator - [favicon.io](https://favicon.io/)

## X/Twitter

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

- [Twitter Card Validator](https://cards-dev.twitter.com/validator)


## Open Graph Images

| Open Graph | Aspect | Recommended |
|------------|--------|-------------|
| Wall | 2x1 (kind of) | 1200 x 630 |

### Open Graph Image Sizes
A file size of less than 8 MB. 

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