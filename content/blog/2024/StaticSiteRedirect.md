---
title: Site 302 Redirect Trailing Slash
description: Understanding why a Markdown NuxtContent generated static website produces a 302 redirect for page and what to do about it.
topic: Ops
format: Troubleshoot
keywords:
  - Nuxt
  - NuxtContent
  - Markdown
  - Static Site
  - AWS S3
  - AWS CloudFront
  - 302 Redirect
isToc: true
version: 1.0
createDate: 2024-10-31 
createAuthor: John Pennock
image: '/images/2024/TrailingSlash.jpg'
imageAlt: A large trailing slash character
---

## Introduction

NuxtContent allows me to generate a content centered blog post or article by writing in Markdown. I can author with simple text editor without fussing with HTML codes, css, etc. It even handles things like custom SEO and Social Sharing metadata with front-matter variables at the top of the Markdown file. It encapsulates the key programmer principles of simplicity, flexibility, readability, and self-containment. Indeed this blog post was written this way. Further, with the use the Nuxt `npm run generate` command I can turn my fully client functional Vue.js/Nuxt.js web application into a static website that I can deploy to very cheap storage hosting solution such as Amazon S3.

## Markdown to HTML 
When I write an article and then generate a static site with it, underneath the covers it converts the Markdown text and the supporting NuxtContent Vue framework into a directory and 2 files named `index.html` and `_payload.json`

For example, if I write a markdown article into a file named `example.md`, what gets generated for the static site is
```shell
example/
example/index.html
example/_payload.json
```

## Dir or Object
The conversion of the page into a directory with two files is a very clever solution and has many benefits but it does introduce the trailing slash issue. Typically a directory or subfolder is represented in a URL with a trailing slash `/`, i.e. `pennockprojects.com/example/` and an object/file is represented without a trailing slash, i.e. `pennockprojects.com/example`. By default, when a browser sees a trailing slash on a URL it will look for an `index.html` file in that directory, i.e. it will look for `pennocksprojects.com/example/index.html` and when it doesn't see a trailing slash, it will attempt to retrieve the file object directly, i.e. `pennockprojects.com/example`.

## Trailing Slash Issue
When our Nuxt App is hosted with its own Nuxt Server, it can server side render the object requested for the page route. When the route `/example` is called, the server can pull in whatever resources it needs and generate a single object in response. When our Nuxt app is a statically generated, the route becomes a directory `/example/` with an `index.html` file within it.

### AWS S3 302 redirect
When you deploy your statically generated Nuxt site to AWS S3 Website cloud solution, the [AWS S3 web server default behavior](https://docs.aws.amazon.com/AmazonS3/latest/userguide/IndexDocumentSupport.html) responds to any request for an object that is actually a directory with a status code of 302, which means "Found but temporarily moved to a new location", and points to the directory version of the object (with the trailing slash).  For example, a GET at `pennockprojects.com/photos` will return a 302 status code with `pennockprojects.com/photos/` redirect.

### A Small Diff Has Consequences
This response code does not matter for typical web browsing and your users can blissfully type `pennocksprojects.com/photos` and their browser URL doesn't have a trailing slash and everything works. (The browser does all the work to get file underneath the covers.) Where I found out this breaks down is when your site URL is shared on social media, in particular on X/Twitter. I was finding that if you typed a URL without a trailing slash (or copy and pasted from the site URL in the browser) the social share large card image would sometimes not show up like it should. Although this resolved over time, it was still annoying.

#### X/Twitter Validator Difference
At the [twitter card validator tool](https://cards-dev.x.com/validator){:target="_blank"} you can see the difference

::FigureCaption
![Twitter Card Validator - Warning](/images/2024/TwitterValidatorTailingSlash302.jpg)

#caption
A static site URL without a trailing slash gets redirect warning
::

::FigureCaption
![Twitter Card Validator - Clean](/images/2024/TwitterValidatorTailingSlashNoRedirect.jpg)

#caption
A static site URL with trailing slash no warning
::

## Potential Solutions

One potential solution is to use a Lambda function for CloudFront Edge requests.  See this [blog](https://www.vividbytes.io/fixing-redirect-codes-on-static-s3-websites/) for details, which I followed to correct this issue for my website.