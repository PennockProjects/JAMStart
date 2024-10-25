<script setup>
const activeId = ref(null)
const route = useRoute()
const socialDefaults = inject("socialDefaults");
const author = ref(socialDefaults.author)
const ogTitle = ref(socialDefaults.title)
const ogDescription = ref(socialDefaults.description)
const ogImage = ref(socialDefaults.image2x1)
const ogImageAlt = ref(socialDefaults.imageAlt)
const ogUrl = ref(socialDefaults.rootUrl)
const twitterTitle = ref(socialDefaults.title)
const twitterDescription = ref(socialDefaults.description)
const twitterImage = ref(socialDefaults.image2x1)
const twitterImageAlt = ref(socialDefaults.imageAlt)
const twitterCard = ref(socialDefaults.twitterCard)
const twitterCreatorHandle = ref(socialDefaults.twitterCreatorHandle)

// Canonical is in the head and not meta tags
useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: socialDefaults.rootUrl + route.path,
    },
  ],
}))


useSeoMeta({
  author: () => author.value,
  ogType: socialDefaults.type,
  ogTitle: () => ogTitle.value,
  ogDescription: () => ogDescription.value,
  ogImage: () => ogImage.value,
  ogImageAlt: () => ogImageAlt.value,
  ogSiteName: socialDefaults.siteName,
  ogUrl: () => ogUrl.value,
  twitterTitle: () => twitterTitle.value,
  twitterDescription: () => twitterDescription.value,
  twitterImage: () => twitterImage.value,
  twitterImageAlt: () => twitterImageAlt.value,
  twitterCard: () => twitterCard.value,
  twitterSite: socialDefaults.twitterSiteHandle,
  twitterCreator: () => twitterCreatorHandle.value
})

const onDocReady = (doc) => {
  let oTitle = (doc.ogTitle || doc.title)
  let xTitle = (doc.twitterTitle || doc.title)

  ogTitle.value =  oTitle && oTitle != socialDefaults.title ? `${socialDefaults.title} ${oTitle}` : socialDefaults.title
  ogDescription.value = doc.ogDescription || doc.description || socialDefaults.description
  ogImage.value = doc.ogImage || doc.image || socialDefaults.image2x1
  ogImageAlt.value = doc.ogImageAlt || doc.imageAlt || socialDefaults.imageAlt
  ogUrl.value = socialDefaults.rootUrl + doc._path 
  twitterTitle.value = xTitle && xTitle != socialDefaults.title ? `${socialDefaults.title} ${xTitle}` : socialDefaults.title
  twitterDescription.value = doc.twitterDescription || doc.description || socialDefaults.description
  if(socialDefaults.isProdEnv) {
    twitterImage.value = socialDefaults.rootUrl + (doc.twitterImage || doc.image || socialDefaults.image2x1)
  } else {
    twitterImage.value = doc.twitterImage || doc.image || socialDefaults.image2x1
  }
  twitterImageAlt.value = doc.twitterImageAlt || doc.imageAlt || socialDefaults.imageAlt
  twitterCard.value = doc.twitterCard || socialDefaults.twitterCard
  twitterCreatorHandle.value = doc.twitterCreatorHandle || socialDefaults.twitterCreatorHandle
  author.value = doc.createAuthor || socialDefaults.author

  // console.log("onDocReady, twitterImage.value", twitterImage.value, twitterImageAlt.value)
}

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
      {{ onDocReady(doc)  }}
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