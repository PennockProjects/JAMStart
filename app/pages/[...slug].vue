<script setup lang="ts">
import { setSEO } from '#shared/utils/setSEO'
import type { PageData } from '~~/shared/utils/contentDataSchema'
import type { Ref } from 'vue'
import { useRoute } from 'vue-router'

const activeId: Ref<string | undefined> = ref(undefined)
const route = useRoute()

const normalizeRoutePath = (path: string): string => {
  if (!path || path === '/') {
    return '/'
  }
  return path.replace(/\/+$/, '') || '/'
}

const buildCandidateStems = (path: string): string[] => {
  if (path === '/') {
    return ['index']
  }
  const base = path.replace(/^\//, '')
  return [base, `${base}/index`]
}

const normalizedPath = normalizeRoutePath(route.path)
const stemCandidates = buildCandidateStems(normalizedPath)

const { data: page } = await useAsyncData(`content:${normalizedPath}`, async () => {
  for (const stem of stemCandidates) {
    const match = await queryCollection('content').where('stem', 'LIKE', stem).first()
    if (match) {
      return match
    }
  }
  return null
})

if(!page?.value) {
  console.warn(`No page data found for path: ${normalizedPath}`);
}
const hasLeadingUnderscore = /(^|\/)_/.test(typeof page?.value?.path === 'string' ? page.value.path : '');
const links = page?.value?.body?.toc?.links || [];
const seoSettings = setSEO(page?.value || {}, normalizedPath)
const pageData: PageData  = seoSettings.pageData;

useHead(seoSettings.headData)
useSeoMeta(seoSettings.seoMetaData)

onMounted(() => {
  const callback = (entries: IntersectionObserverEntry[]) => {
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
    <div class="grid grid-cols-10 gap-2">
      <div class="col-span-10 prose dark:prose-invert lg:prose-xl mx-auto">
        <span class="mb-1">
          <span v-if="pageData.author">
            <h1 class="article-header text-center" >{{ pageData.title }}</h1>
            <div class='text-sm text-center mb-1'>
              <span>by {{ pageData.author }}</span>
              <span v-if="pageData.date_created">&nbsp;{{ new Date(pageData.date_created).toLocaleDateString() }}</span>
            </div>
          </span>
          <span v-else>
            <h1 class="text-center" >{{ pageData.title }}</h1>
          </span>
          <div v-if="hasLeadingUnderscore" class="text-sm text-center mb-1">
            <span class="info text-center">Dev Only</span>
          </div>
        </span>
        <div v-if="pageData.image" class="not-prose">
          <img v-if="pageData.image_alt" :src="pageData.image" :alt="pageData.image_alt" class="mx-auto max-h-52">
          <img v-else :src="pageData.image" class="mx-auto max-h-52">
        </div>
      </div>
      <div 
        class="prose dark:prose-invert lg:prose-xl prose-code:bg-gray-100 dark:prose-code:bg-black prose-pre:bg-gray-100 dark:prose-pre:bg-black mr-8 md:mr-4"
        :class="{'col-span-10 md:col-span-7' : pageData.is_toc, 'col-span-10' : !pageData.is_toc}"
      >
        <ContentRenderer v-if="page" :value="page" :data="pageData" />
      </div>
      <div v-if="pageData.is_toc" class="hidden md:col-span-3 md:block">
        <aside class="sticky top-8">
          <div class="font-semibold mb-2">
            <NuxtLink 
              :to="{path: route.path, hash: ''}"
            >
              Table of Contents
            </NuxtLink>
          </div>
          <nav>
            <TocLinks :links="links" :active-id="activeId" />
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
  margin-bottom: 0.5rem;
}
.socialsharebank > a {
  @apply mr-3
}
</style>