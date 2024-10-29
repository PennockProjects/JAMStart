<script setup>
const activeId = ref(null)
const route = useRoute()
const socialDefaults = inject("socialDefaults");

const { data } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
let doc = data.value || {}
let oTitle = (doc.ogTitle || doc.title)
let xTitle = (doc.twitterTitle || doc.title)
let twitterImage = doc.twitterImage || doc.image || socialDefaults.image2x1
let seoInput = {}

seoInput.author = doc.createAuthor || socialDefaults.author
seoInput.ogTitle = (oTitle && oTitle != socialDefaults.title) ? `${socialDefaults.title} ${oTitle}` : socialDefaults.title
seoInput.twitterTitle = (xTitle && xTitle != socialDefaults.title) ? `${socialDefaults.title} ${xTitle}` : socialDefaults.title
seoInput.ogDescription = doc.ogDescription || doc.description || socialDefaults.description
seoInput.twitterDescription = doc.twitterDescription || doc.description || socialDefaults.description
seoInput.ogImage = doc.ogImage || doc.image || socialDefaults.image2x1
seoInput.ogImageAlt = doc.ogImageAlt || doc.imageAlt || socialDefaults.imageAlt
// Note: twitter will not show the static image unless the static non-js version has a full url.
seoInput.twitterImage = socialDefaults.rootUrl + twitterImage
seoInput.twitterImageAlt  = doc.twitterImageAlt || doc.imageAlt || socialDefaults.imageAlt
seoInput.ogUrl = socialDefaults.rootUrl + doc._path 
seoInput.twitterCard = doc.twitterCard || socialDefaults.twitterCard
seoInput.twitterCreatorHandle = doc.twitterCreatorHandle || socialDefaults.twitterCreatorHandle

// Canonical is in the head and not meta tags
useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: socialDefaults.rootUrl + route.path,
    },
  ],
}))

// Set the meta tags for this page
useSeoMeta({
  author: seoInput.author,
  ogType: socialDefaults.type,
  ogTitle: seoInput.ogTitle,
  ogDescription: seoInput.ogDescription,
  ogImage: seoInput.ogImage,
  ogImageAlt: seoInput.ogImageAlt,
  ogSiteName: socialDefaults.siteName,
  ogUrl: seoInput.ogUrl,
  twitterTitle: seoInput.twitterTitle,
  twitterDescription: seoInput.twitterDescription,
  twitterImage: seoInput.twitterImage,
  twitterImageAlt: seoInput.twitterImageAlt,
  twitterCard: seoInput.twitterCard,
  twitterSite: socialDefaults.twitterSiteHandle,
  twitterCreator: seoInput.twitterCreatorHandle
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
          <div 
            class="prose dark:prose-invert lg:prose-xl prose-code:bg-gray-100 dark:prose-code:bg-black prose-pre:bg-gray-100 dark:prose-pre:bg-black mr-8 md:mr-4"
            :class="{'col-span-10 md:col-span-7' : doc.isToc, 'col-span-10' : !doc.isToc}"
          >
            <h1 class="article-header">{{ doc.title }}</h1>
            <div class='text-xs mb-1' v-if="doc.createAuthor || doc.createDate">
              <span v-if="doc.createAuthor">by {{ doc.createAuthor }}</span>
              <span v-if="doc.createDate">&nbsp;{{  new Date(doc.createDate).toLocaleDateString() }}</span>
            </div>
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
  margin-bottom: 0.3ch;
}
</style>