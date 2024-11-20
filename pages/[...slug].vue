<script setup>
const activeId = ref(null)
const route = useRoute()
const metaDefaults = inject("metaDefaults");

const { data } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
let doc = data.value || {}
let oTitle = (doc.ogTitle || doc.title)
let xTitle = (doc.xTitle || doc.title)
let xImage = doc.xImage || doc.image || metaDefaults.image2x1
let seoInput = {}

let keywords = doc && doc.keywords && Array.isArray(doc.keywords) ? metaDefaults.keywords.concat(doc.keywords) : metaDefaults.keywords.concat([]);

// TODO remove
// console.log("keywords", keywords.toString())

seoInput.author = doc.createAuthor || metaDefaults.author
seoInput.creator = metaDefaults.creator
seoInput.keywords = keywords.toString()
seoInput.ogTitle = (oTitle && oTitle != metaDefaults.title) ? `${metaDefaults.title} ${oTitle}` : metaDefaults.title
seoInput.xTitle = (xTitle && xTitle != metaDefaults.title) ? `${metaDefaults.title} ${xTitle}` : metaDefaults.title
seoInput.ogDescription = doc.ogDescription || doc.description || metaDefaults.description
seoInput.xDescription = doc.xDescription || doc.description || metaDefaults.description
seoInput.ogImage = doc.ogImage || doc.image || metaDefaults.image2x1
seoInput.ogImageAlt = doc.ogImageAlt || doc.imageAlt || metaDefaults.imageAlt
// Note: X/Twitter will not show the static image unless the static non-js version has a full url.
seoInput.xImage = metaDefaults.rootUrl + xImage
seoInput.xImageAlt  = doc.xImageAlt || doc.imageAlt || metaDefaults.imageAlt
seoInput.ogUrl = metaDefaults.rootUrl + doc._path 
seoInput.xCard = doc.xCard || metaDefaults.twitterCard
seoInput.xCreatorHandle = doc.xCreatorHandle || metaDefaults.twitterCreatorHandle

// Canonical is in the head and not meta tags
useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: metaDefaults.rootUrl + route.path,
    },
  ],
}))

// Set the metadata for this page
useSeoMeta({
  author: seoInput.author,
  creator: seoInput.crator,
  keywords: seoInput.keywords,
  ogType: metaDefaults.ogType,
  ogTitle: seoInput.ogTitle,
  ogDescription: seoInput.ogDescription,
  ogImage: seoInput.ogImage,
  ogImageAlt: seoInput.ogImageAlt,
  ogSiteName: metaDefaults.siteName,
  ogUrl: seoInput.ogUrl,
  twitterTitle: seoInput.xTitle,
  twitterDescription: seoInput.xDescription,
  twitterImage: seoInput.xImage,
  twitterImageAlt: seoInput.xImageAlt,
  twitterCard: seoInput.xCard,
  twitterSite: metaDefaults.twitterSiteHandle,
  twitterCreator: seoInput.xCreatorHandle
})

onMounted(() => {

  const callback = (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        activeId.value = entry.target.id
        break;
      }
    }
  }
  const observer = new IntersectionObserver(callback, {
    root: null,
    threshold: 0.5
  })
  const elements = document.querySelectorAll('h2, h3')

  for (const element of elements) {
    observer.observe(element)
  }

  onBeforeUnmount(() => {
    for (const element of elements) {
      observer.unobserve(element)
    }
  })
})

</script>

<template>
<main>
  <ContentDoc>
    <template v-slot="{ doc }">
      <article class="mx-auto">
        <div class="grid grid-cols-10 gap-4">
          <div class="col-span-10 prose dark:prose-invert lg:prose-xl mx-auto">
            <h1 class="article-header text-center" v-if="!doc.isManualTitle">{{ doc.title }}</h1>
            <div class='text-sm text-center mb-1' v-if="doc.createAuthor || doc.createDate">
              <span v-if="doc.createAuthor">by {{ doc.createAuthor }}</span>
              <span v-if="doc.createDate">&nbsp;{{  new Date(doc.createDate).toLocaleDateString() }}</span>
            </div>
            <div class="not-prose" v-if="doc.image && !doc.isManualImage">
              <img :src="doc.image" :alt="doc.imageAlt" class="mx-auto max-h-52">
            </div>
          </div>
          <div 
            class="prose dark:prose-invert lg:prose-xl prose-code:bg-gray-100 dark:prose-code:bg-black prose-pre:bg-gray-100 dark:prose-pre:bg-black mr-8 md:mr-4"
            :class="{'col-span-10 md:col-span-7' : doc.isToc, 'col-span-10' : !doc.isToc}"
          >
            <ContentRenderer :value="doc" />
          </div>
          <div class="hidden md:col-span-3 md:block" v-if="doc.isToc">
            <aside class="sticky top-8">
              <div class="font-semibold mb-2">
                <NuxtLink 
                  :to="{path: route.path, hash: ''}"
                >
                  Table of Contents
                </NuxtLink>
              </div>
              <nav>
                <TocLinks :links="doc.body.toc.links" :activeId="activeId" />
              </nav>
            </aside>
          </div>
          <div class="col-span-10">
            <div class="mt-2 text-center">
              <span class="text-xl mr-2">Share</span>
              <span class="inline-flex">
                <SocialShare
                  v-for="network in ['facebook', 'x', 'linkedin', 'email']"
                  :key="network"
                  :label="false"
                  :network="network"
                />
              </span>
            </div>
          </div>
        </div>
      </article>
    </template>
    <template #not-found>
      <h1>Document not found (404)</h1>
      <p>This document {{ route.path }} could not be found</p>
    </template>
  </ContentDoc>
</main>
</template>

<style scoped>
h1.article-header {
  margin-bottom: 0;
}
</style>