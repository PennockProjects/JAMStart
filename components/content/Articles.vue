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
    <section class="not-prose font-mono mr-2 md:mr-8">
      <div class="grid grid-cols-10 font-light text-xs/7 md:text-lg/9 border-b">
        <div class="col-span-4 md:col-span-2">topic</div>
        <div class="col-span-6 md:col-span-8">article</div>
      </div>
      <ul>
        <li class="" v-for="article in list" :key="article._path">
          <NuxtLink 
            v-if="article._path != targetPath"
            :to="article._path" 
            class="grid grid-cols-10 border-b hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <div class="col-span-4 md:col-span-2 text-xs/7 md:text-lg/9 font-light">{{ article.topic }}</div>
            <div class="col-span-6 md:col-span-8 font-semibold">{{ article.title }}</div>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </ContentList>
</template>