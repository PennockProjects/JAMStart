<script setup>
const props = defineProps({
  path: {
    type: String,
    default: '/code'
  }
})
const sort = {topic: 1};

const targetPath = (props.path == '/code' || props.path == '/ops' || props.path == '/contenttips' ) ? props.path : '/code'

</script>

<template>
  <ContentList v-slot="{list}" :path="targetPath" :sort="sort">
    <section class="border border-r-2 border-t-0 border-l-0 border-b-0 not-prose font-mono">
      <div class=" text-gray-400 text-sm grid grid-cols-10">
        <div class="col-span-3 md:col-span-2">Topic</div>
        <div class="col-span-7 md:col-span-8">Article</div>
      </div>
      <ul>
        <li v-for="article in list" :key="article._path">
          <NuxtLink 
            v-if="article._path != targetPath"
            :to="article._path" 
            class="grid grid-cols-10 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <div class="col-span-3 md:col-span-2">{{ article.topic }}</div>
            <div class="col-span-7 md:col-span-8">{{ article.title }}</div>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </ContentList>
</template>