---
title: JAMStart Home
description: This is the default home page for the JAMStart repo which is a static web site generated using Nuxt.js front-end, Markdown content, and git based deployment.
topic: General
---

The JAMStart project designed by [Pennock Projects](https://pennockprojects.com) to be a simple, easy-to-use and inexpensive template for static content web sites.

- For guides on how to use JAMStart, please visit [JAMStart Project Documentation](https://pennockprojects.com/projects/jamstart).
- To see this current JAMStart site in action, please visit the [JAMStart Demo Site](https://jamstart.pennockprojects.com).
- To examine the single source text file for this page, see: [JAMStart Home Page Markdown](https://github.com/PennockProjects/JAMStart/blob/main/content/index.md).

### Home Page Markdown Example Content

#### A Picture
![A picture](/images/toastjam.jpg "A picture of toast and jam")

***Strikethrough ~~content~~ ***

## H2 Title 

### H3 Title
Paragraph - This is an example paragraph written in Markdown.

## Unordered list
- Bold - *Bold*
- Italic - ~Italic~
- Strikethrough - ~~Strikethrough~~
## Blocks

### Code Block

```c
#include <stdio.h>

int main()
{
    printf("Hello World");

    return 0;
}
```

### Shell/Console Block
```shell
git clone https://github.com/PennockProjects/JAMStart.git
```

### Markdown Block
```markdown
[info](https://pennockprojects.com/about){.info target=_blank}
[warn]{.warn}
[danger]{.danger}
[success]{.success}
```

## Info/Alert Classes

[info](https://pennockprojects.com/about){.info target=_blank}
[warn]{.warn}
[danger]{.danger}
[success]{.success}

## Dependencies

JAMStart uses the following dependencies

| Dependency | Description |
| --- | --- |
| `nuxt@^3.x`, `vue@^3.x`,`vue-router@&4.x` | Nuxt.js and Vue.js are the application foundation of the JAMStart project. |
| `@nuxtjs/tailwindcss@^6.11.4` | Tailwind CSS. |
| `@tailwindcss/typography@^0.5.13` | Tailwind CSS typography plugin. |
| `@nuxt/content@^3.x` | Nuxt Content, converts Markdown content to HTML pages. |
| `remark-unwrap-images` | Simpler `<img />` markdown conversion. |
| `better-sqlite3` | A performant SQLite3 library required for `@nuxt/content`. |
| `@nuxtjs/color-mode` | Handles light/dark modes. |
| `@stefanobartoletti/nuxt-social-share` | A Nuxt module for adding social sharing buttons to your application. |
| `nuxt-cloudflare-analytics` | Cloudflare Analytics telemetry. |



### Deployment Dependencies
These dependencies are used to build and deploy the JAMStart project.

| Dependency | Description |
| --- | --- |
| `@nuxtjs/sitemap@` | Generates a sitemap to improve SEO and Social |
| `@pennockprojects/nuxtss-s3-fix@^1.0.0` | A deployment tool for fixing Nuxt static sites on AWS S3. |
| `@pennockprojects/sitemap-diff@^0.8.0` | A deployment tool generates sitemap differences. |
