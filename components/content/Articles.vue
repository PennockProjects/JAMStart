<script setup>
const props = defineProps({
  path: {
    type: String,
    default: '/articles'
  }
})
const sort = {format:2, topic:1};

const targetPath = (props.path == '/articles' || props.path == '/ops' || props.path == '/articles' ) ? props.path : '/articles'

</script>

<template>
  <ContentList v-slot="{list}" :path="targetPath" :sort="sort">
    <section class="not-prose font-mono mr-2 md:mr-8">
      <div class="grid grid-cols-12 font-light text-sm capitalize italic md:text-lg/10 border-b">
        <div class="col-span-6 md:col-span-8">article</div>
        <div class="col-span-3 md:col-span-2">topic</div>
        <div class="col-span-3 md:col-span-2">format</div>
      </div>
      <ul>
        <li class="article-list" v-for="article in list" :key="article._path">
          <NuxtLink 
            v-if="article._path != targetPath && !article.isListExclude"
            :to="article._path" 
            class="grid grid-cols-12 border-b hover:bg-gray-00 dark:hover:bg-gray-600"
          >
            <div class="col-span-6 md:col-span-8 font-semibold">{{ article.title }}</div>
            <div class="col-span-3 md:col-span-2 align-text-top text-xs md:text-lg/9 font-light">{{ article.topic }}</div>
            <div class="col-span-3 md:col-span-2 align-text-top text-xs md:text-lg/9 font-light">{{ article.format }}</div>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </ContentList>
</template>

<style lang="css" scoped>
.article-list:nth-child(even), .article-list:first-child {
    @apply bg-gray-200 dark:bg-gray-700;
}
</style>