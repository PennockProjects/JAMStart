<script setup>
const activeId = ref(null)
const route = useRoute()
const metaDefaults = inject("metaDefaults");


const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})

const doc = page?.value || {}

const nativeFrontMatter = {
  title: doc.title,
  description: doc.description,
  navigation: doc.navigation
}
const metaPage = { ...nativeFrontMatter, ...doc?.meta}

const seoSettings = setSEO(metaPage, metaDefaults, route.path)
useHead(() => (seoSettings.head))
useSeoMeta(seoSettings.seo)

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
  <article v-if="page" class="mx-auto">
    <div class="grid grid-cols-10 gap-4">
      <div class="col-span-10 prose dark:prose-invert lg:prose-xl mx-auto">
        <h1 class="article-header text-center" v-if="!metaPage.isManualTitle">{{ metaPage.title }}</h1>
        <div class='text-sm text-center mb-1' v-if="metaPage.author">
          <span v-if="metaPage.author">by {{ metaPage.author }}</span>
          <span v-if="metaPage.dateCreated">&nbsp;{{  new Date(metaPage.dateCreated).toLocaleDateString() }}</span>
        </div>
        <div class="not-prose" v-if="metaPage.image && !metaPage.isManualImage">
          <img :src="metaPage.image" :alt="metaPage.imageAlt" class="mx-auto max-h-52">
        </div>
      </div>
      <div 
        class="prose dark:prose-invert lg:prose-xl prose-code:bg-gray-100 dark:prose-code:bg-black prose-pre:bg-gray-100 dark:prose-pre:bg-black mr-8 md:mr-4"
        :class="{'col-span-10 md:col-span-7' : metaPage.isToc, 'col-span-10' : !metaPage.isToc}"
      >
        <ContentRenderer :value="page" />
      </div>
      <div class="hidden md:col-span-3 md:block" v-if="metaPage.isToc">
        <aside class="sticky top-8">
          <div class="font-semibold mb-2">
            <NuxtLink 
              :to="{path: route.path, hash: ''}"
            >
              Table of Contents
            </NuxtLink>
          </div>
          <nav>
            <TocLinks :links="doc?.body?.toc?.links" :activeId="activeId" />
          </nav>
        </aside>
      </div>
      <div class="col-span-10">
        <div class="mt-2 text-center">
          <span class="inline-flex socialsharebank">
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
  <div v-else>
    <h1>Page not found (404)</h1>
    <p>Oops! This page {{ route.path }} doesn't exist</p>
    <NuxtLink to="/">Go back home</NuxtLink>
  </div>
</main>
</template>

<style scoped>
h1.article-header {
  margin-bottom: 0;
}
.socialsharebank > a {
  @apply mr-3
}
</style>