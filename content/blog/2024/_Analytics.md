---
title: Fast Analytics
description: How to add analytics to a Nuxt 3 static site generation (SGS) with as low a performance penalty as possible.
topic: Ops
format: How-to
keywords:
  - Analytics
  - Google Analytics
  - Nuxt3
  - SSG
createDate: 2024-11-27
createAuthor: John Pennock
isToc: true
image: /images/2024/f1cartelemetrycutaway.png
imageAlt: A F1 formula racecar model in cutaway
---

## Goals
My goal is to send site usage information, page views, call to action clicks, to a free analytics service without using Personally Identifiable Information (PII). I want the data to help me understand what my readers/users were engaging with on my site and help me develop more useful content and software for them.  I also didn't want to bother them with a cookie banner and complex privacy statement.

## Google Analytics Measurement
I initially started with Google Analytics (GA) as I had used this technology in the past. I was hopeful after watching the [Tim Benniks removing google analytics video](https://www.youtube.com/watch?v=DV5mLxbrTi8){:target="_blank"} that I could skip the whole cookie thing.  Unfortunately, with the [GDPR](https://gdpr.eu/what-is-gdpr/) and [CPPA](https://cppa.ca.gov/) regulations and GA with its V4 reimplementation, I could not avoid cookies.  I got a bit down this path before backing out. 

My approach was:

1. Register a Google Analytics Custom Measurement Protocol API Secret
2. Create a custom Nuxt Client-only Plugin for analytics (since I would use this on a static generated site)
2. Use the plugin to allow sending data to google analytics Custom Measurement Protocol
  - On plugin startup (setup) generate or use local storage to generate a unique User ID but not Identifiable.
3. Add a router.afterEach hook to send analytics for each page opened.

### Google Analytics API Secret

The creation of the Google Analytics stream, Measurement ID and Protocol API Secret was pretty straightforward and free.

- [Google Analytics Account Help](https://support.google.com/analytics/answer/9304153?hl=en){:target="_blank"}
- [Google Analytics login](https://analytics.google.com/analytics){:target="_blank"}

### Client only Nuxt Plugin
Next I learned on how to create client-only Nuxt Plugin using the. [Nuxt plugin guide](https://nuxt.com/docs/guide/directory-structure/plugins) I used the `.client` suffix name fragment was able to create a client only Nuxt Plugin.  Here is the analytics plugin that I created.

```js
//  ./plugins/analytics.client.js

// Create a session variable for the userId
let userId = 'devUser';

// Create a send function 
function send(data) {

  let metric = new URLSearchParams({
    ... {
      v: '1',
      tid: 'G-XXXXXXXXXX',
      cid: userId,
      dl: location.href,
      ua: navigator.userAgent,
      dr: document.referrer || '',
      sr: `${screen.width}x${screen.height}`,
      vp: `${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`,
      sd: `${screen.pixelDepth}-bits`,
      ul: navigator.language,
    },
    ...data
  }).toString();

  // This didn't work to use sendBeacon
    // navigator.sendBeacon(
  //   'https://google-analytics.com/collect',
  //   metric
  // )

  // https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=gtag
  const measurement_id = `G-XXXXXXXXXX`;
  const api_secret = `XXXXXXXXXXXXXXXXX`;

  // This didn't work either (received 204 responses)
  // You have to run the ga.js first and introduce all the PII tracking and cookies for this to work.
  fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`, {
    method: "POST",
    body: JSON.stringify({
      client_id: userId,
      events: [{
        name: 'tutorial_begin',
        params: metric,
      }]
    })
  });
}

// This is the function randomly generate a userID and store it in local session.
function generateUserId() {

  if(process.env.NODE_ENV === "production") {
    if (!localStorage.getItem('ppAutoUserId')) {
      // Generate a random unique ID if it doesn't exist
      const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2);
      localStorage.setItem('ppAutoUserId', uniqueId);
    }
    return localStorage.getItem('ppAutoUserId');
  } else {
    return 'devUser'
  }
}

// This is the magic of the plugin.  I set up the userId and an afterEach page view in the router to send a 'pageview' event.
export default defineNuxtPlugin(() => {
  
  userId = generateUserId()

  const router = useRouter();
  router.afterEach(() => {
    send({ t: 'pageview' })
  })
})

```

### Ultimately Not what I needed
In order for that code to work, you have to run the GA Tag Manager js script which creates the cookie which requires the cookie banner and privacy policy and turning my user data over to Google.

So I abandoned that approach.

## Back to the Drawing Board

I researched the topic.

The [Checking Out Free Web Analytics Service from CloudFlare Video by NetSec](https://www.youtube.com/watch?v=b7bT1QXhWFg&ab_channel=NetSec){target="_blank"} while a bit old (3 years when I viewed it) was influential for what it said. [CloudFlare Web Analytics](https://developers.cloudflare.com/web-analytics/){target="_blank"}, which is free, cookie-less, and PII-free.

## CloudFlare Analytics

1. First Create an account at [CloudFlare](https://cloudflare.com){target="_blank"}
2. Add your site at [CloudFlare Web Analytics](https://developers.cloudflare.com/web-analytics/){target="_blank"}
3. Then is generates a snippet for you.

```html
<!-- Cloudflare Web Analytics -->
 <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX"}'></script><!-- End Cloudflare Web Analytics -->
```

4. Grab the token from there.

### Using Nuxt Module

There is a [CloudFlare Nuxt Module](https://scripts.nuxt.com/scripts/analytics/cloudflare-web-analytics)

where you just place your token in your `nuxt.config.ts` file

```ts
export default defineNuxtConfig({
  modules: [
    'nuxt-cloudflare-analytics'
  ],

  cloudflareAnalytics: {
    token: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  }
})
```

### Web Vitals
Install [Web Vitals](https://www.npmjs.com/package/web-vitals)

```shell
npm install web-vitals
```

There will be a global variable stored for each user who opens our blog.
We will check local storage to see if user has already been generated and stored.
if so, we will store it in the global user variable
if not, we will generate a unique UI randomly generated and store in local storage and global variable.

```vue
const userId = Date.now() + Math.random().toString(36).substr(2, 9);
let storageId;

if(process.client) {
  storageId = getLocalID('userPennockProjects')
  if(storageId) {
    userId.value = storageId;
  }
}

## Resources



```
