---
title: Tailwind Responsive with NuxtUI
topic: Tailwind
description: Responsive design for a site skeleton using NuxtUI components and Tailwind responsive design
publishedAt: 2024-05-10 12:00:00
---

The [NuxtUI](https://ui.nuxt.com/getting-started) module free version, does not contain the basic site skeleton framework elements as their professional version [NuxtUI Pro](https://ui.nuxt.com/pro/getting-started), such as UPageBody, UPageColumns, UPageHero, UAside, and UMain. Tailwind CSS module does support a [Tailwind responsive design](https://tailwindcss.com/docs/responsive-design)  This post will show how to use Tailwind CSS with the Nuxt UI Free module.

## NuxtUI website
When one examines the source of the NuxtUI website itself, you can see that is uses a basic site response skeleton as shown below.


```html
<div class="flex flex-col lg:grid lg:grid-cols-10 lg:gap-8">
  <div class="lg:col-span-2">
    <aside class="hidden overflow-y-auto lg:block lg:max-h-[calc(100vh-var(--header-height))] lg:sticky lg:top-[--header-height] py-8 lg:px-4 lg:-mx-4">
      left nav
    </aside>    
  </div>
  <div class="lg:col-span-8">
    <div class="flex flex-col lg:grid lg:grid-cols-10 lg:gap-8">
      <div class="lg:col-span-8">
        article
      </div>
      <div class="lg:col-span-2 order-first lg:order-last">
        <nav class="sticky top-[--header-height] bg-background/75 backdrop-blur -mx-4 sm:-mx-6 px-4 sm:px-6 lg:px-4 lg:-mx-4 overflow-y-auto max-h-[calc(100vh-var(--header-height))]">
          table of contents
        </nav>
      </div>
    </div>
  </div>
</div>
```

